<script lang="ts">
	import { onDestroy, onMount, mount, unmount } from 'svelte';
	import type {
		CircleMarker,
		ImageOverlay,
		LatLngBounds,
		LatLngTuple,
		LeafletEvent,
		Map,
		Marker
	} from 'leaflet';
	import { format } from 'date-fns';
	import { browser } from '$app/environment';
	import type { Lake, LakeExported, SpatialPredictionExported } from '$lib/types';
	import 'leaflet/dist/leaflet.css';
	import { mapCoords, selectedDateYYYYMMDD } from '$lib/store';
	import MapPopup from './MapPopup.svelte';
	import { PUBLIC_PNG_SERVER_PATH } from '$env/static/public';

	export let lakes: LakeExported[];
	export let spatialPredictions: SpatialPredictionExported[];

	let mapElement: HTMLElement;
	let map: Map;

	const defaultViewCoords: LatLngTuple = [42.18778778, -79.38924043]; // LAKE CHAUTAUQUA coords

	let visible_image_overlays: ImageOverlay[] = [];

	async function fetchPredictionsByBounds() {
		let bounds = map.getBounds();
		const response = await fetch('/boundsUpdated', {
			method: 'POST',
			body: JSON.stringify({ BBoxString: bounds.toBBoxString() }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let rjson = await response.json();
		let returnedSpatialPredictions =
			rjson.spatialPredictions as unknown as SpatialPredictionExported[];
		console.log(
			'Lake Chataqua images (if Lake Chatauqua is in frame):',
			returnedSpatialPredictions.filter((v) => v.lagoslakeid == 81353)
		);
		console.log('response json: ', rjson);
		spatialPredictions = returnedSpatialPredictions;
	}

	function clearImageOverlays() {
		for (let imageOverlay of visible_image_overlays) {
			map.removeLayer(imageOverlay);
		}
		visible_image_overlays = [];
	}

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');
			const add_lake_overlay_to_map = function (
				imageUrl: string,
				latLngBounds: LatLngBounds,
				altText: string
			) {
				let imageOverlay = leaflet
					.imageOverlay(imageUrl, latLngBounds, {
						opacity: 0.8,
						alt: altText,
						interactive: true
					})
					.addTo(map);
				imageOverlay.on('click', () => {
					console.log('Map layer clicked!');
				});
				visible_image_overlays.push(imageOverlay);
			};
			const rerenderPredictions = () => {
				clearImageOverlays();
				for (const spatialPrediction of spatialPredictions) {
					let spatialPredictionYYYYMMDD = format(spatialPrediction.date, 'yyyy-MM-dd');

					if (spatialPredictionYYYYMMDD != $selectedDateYYYYMMDD) {
						continue;
					}
					// if date passes the filter
					const image_url = `${PUBLIC_PNG_SERVER_PATH}/png_out_${spatialPrediction.session_uuid}/${spatialPrediction.display_image}`;

					const corresponding_lake = lakes.find((v) => v.id == spatialPrediction.lake); // hacky solution to find lakename
					if (corresponding_lake) {
						add_lake_overlay_to_map(
							image_url,
							leaflet.latLngBounds([
								[spatialPrediction.corner1latitude, spatialPrediction.corner1longitude],
								[spatialPrediction.corner2latitude, spatialPrediction.corner2longitude]
							]),
							corresponding_lake.name
						);
					}
				}
			};
			// Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
			// `createFn` will be called whenever the popup is being created, and should create and return the component.
			// Credit: https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.18
			function bindPopup(marker: Marker | CircleMarker, createFn: (arg0: HTMLElement) => MapPopup) {
				let popupComponent: MapPopup | null;
				marker.bindPopup(() => {
					let container = leaflet.DomUtil.create('div');
					popupComponent = createFn(container);
					return container;
				});

				marker.on('popupclose', () => {
					if (popupComponent) {
						let old = popupComponent;
						popupComponent = null;
						// Wait to destroy until after the fadeout completes.
						setTimeout(() => {
							unmount(old);
						}, 500);
					}
				});
			}

			map = leaflet.map(mapElement, { attributionControl: false }); // use canvas for better performance
			let myAttrControl = leaflet.control.attribution().addTo(map);
			myAttrControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
			// .setView([lakes[7].latitude, lakes[7].longitude], 7); // this sets the view for new york state

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			for (const lake of lakes) {
				let marker = leaflet
					.circleMarker(
						// circle marker for better performance (cred: https://stackoverflow.com/a/43019740)
						{ lat: lake.latitude, lng: lake.longitude },
						{
							radius: 8,
							fillOpacity: 1,
							fillColor: '#fff42c',
							color: 'black'
						}
					)
					.addTo(map)
					.addEventListener('click', (e) => {
						console.log('Marker clicked: ', lake);
					});

				//@ts-ignore
				bindPopup(marker, (container) => {
					let c = mount(MapPopup, {
						target: container,
						props: {
							lake: lake
						} // i don't know if these props will update dynamically, warning for the future
					});
					return c;
				});
			}

			mapCoords.subscribe(async (updatedCoords) => {
				map.setView(updatedCoords || defaultViewCoords, 11);
				// after all onMount initalization is done, load
				await fetchPredictionsByBounds();
				rerenderPredictions();
			});

			selectedDateYYYYMMDD.subscribe((changedDateIndex) => {
				rerenderPredictions();
			});

			// load nys outline (data from https://gis.ny.gov/civil-boundaries)
			// this is done client side to reduce onload package
			// geojson export from NYS shapefiles with https://mapshaper.org/ (-proj wgs84)

			const NYS_geojson_request = await fetch('/NYS_outline.json');
			const NYS_geojson = await NYS_geojson_request.json();

			leaflet
				.geoJSON(NYS_geojson, {
					style: {
						color: 'black',
						weight: 3,
						fill: false
					}
				})
				.addTo(map);

			map.on('moveend', async function (e: LeafletEvent) {
				console.log('Map is moved. Refetching.');
				await fetchPredictionsByBounds();
				rerenderPredictions();
			});
		}
	});
</script>

<div class="map" bind:this={mapElement}></div>

<style>
	.map {
		height: 73vh;
		margin-bottom: 1rem;
	}
</style>
