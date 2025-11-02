<script lang="ts">
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { parseISO } from 'date-fns';

	export let data: PageData;

	let uniqueRasterDates = data.uniqueRasterDateStrings.map((v) => parseISO(v));
</script>

<hgroup>
	<h1>Algal Blooms Map</h1>
	<p>Higher chlorophyll-a concentrations are represented by brighter colors.</p>
</hgroup>

<Searchbar lakes={data.lakes} />

<Timeline {uniqueRasterDates} />

<Map lakes={data.lakes} spatialPredictions={data.spatialPredictions} />
