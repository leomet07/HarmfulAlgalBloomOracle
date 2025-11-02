<script lang="ts">
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	export let data: PageData;
</script>

<hgroup>
	<h1>Algal Blooms Map</h1>
	<p>Higher chlorophyll-a concentrations are represented by brighter colors.</p>
</hgroup>

<Searchbar lakes={data.lakes} />

<Timeline />

<Map lakes={data.lakes} spatialPredictions={data.spatialPredictions} />
