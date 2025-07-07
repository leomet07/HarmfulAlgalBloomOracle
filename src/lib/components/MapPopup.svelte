<script lang="ts">
	import type { LakeExported, TimeSeriesExported, SpatialPredictionExported } from '$lib/types';
	// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { simpleRasterDates_filtered, selectedDateIndex } from '$lib/store';

	export let lake: LakeExported;
	export let spatialPredictions: SpatialPredictionExported[];
	export let current_raster_url: string | null;

	let timeSeriesURL =
		lake?.expand?.timeSeriesItem &&
		`/api/files/${lake.expand.timeSeriesItem.collectionId}/${lake.expand.timeSeriesItem.id}/${lake.expand.timeSeriesItem.graph}`;

	// Date.toLocaleDateString('en-CA') outputs date in YYYY-MM-DD without swithcing timezone, exactly what is needed here
	async function setTimeline() {
		// clear all overlays
		let newFilteredDates: Date[] = [];

		newFilteredDates = spatialPredictions.filter((v) => v.lake == lake.id).map((v) => v.date) || [];
		newFilteredDates = [...new Set(newFilteredDates)]; // makes unique
		newFilteredDates.sort(); // mutates
		$simpleRasterDates_filtered = newFilteredDates;
		$selectedDateIndex = -1; // do this to register a change
		$selectedDateIndex = 0;
	}
</script>

<div class="lakepopup" id={'lake' + String(lake.id)}>
	<p class="lakename">{lake.name}</p>
	<!-- <p>In situ data recorded on {new Date('error').toLocaleDateString('en-CA')}</p> -->
	{#if lake?.expand?.timeSeriesItem}
		<a class="download_timeseries" href={timeSeriesURL} download="">
			<img src={timeSeriesURL} alt={`Time Series for ${lake.name}`} />
		</a>
	{/if}
	{#if current_raster_url}
		<a class="download_prediction" href={current_raster_url} download>
			Download Prediction GeoTiff
		</a>
	{/if}
	<button on:click={setTimeline}>Restrict Timeline</button>
</div>

<style scoped>
	p {
		margin: 0 !important;
		font-size: 1rem;
	}
	.lakename {
		font-size: 1.2rem;
		font-weight: bold;
		margin-top: 0.75rem !important;
		text-wrap: nowrap;
	}

	a,
	button {
		border: 1px solid black;
		border-radius: 5px;
		background-color: white;
		padding: 0.5rem;
		display: block;
		margin-block: 0.5rem;
		width: fit-content;
		color: black;
		cursor: pointer;
	}
	img {
		width: 100%;
	}
</style>
