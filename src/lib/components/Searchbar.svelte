<script lang="ts">
	import { mapCoords } from '$lib/store';
	import type { LakeExported } from '$lib/types';

	export let lakes: LakeExported[];
	let query: string = '';
	let lakesResults: LakeExported[] = [];

	function handleChange() {
		if (!query) {
			lakesResults = [];
			return;
		}
		lakesResults = lakes.filter((v) => v.name.toLowerCase().includes(query.toLowerCase()));
	}

	function setView(lat: number, long: number) {
		query = '';
		lakesResults = [];
		$mapCoords = [lat, long];
	}
</script>

<form on:submit|preventDefault={handleChange} class="search-bar">
	<input
		type="text"
		name="search_query"
		bind:value={query}
		on:input={handleChange}
		placeholder={`Search ${lakes.length} lakes...`}
		id="search-bar"
	/>
</form>

{#if lakesResults.length > 0 && query !== ''}
	<div id="results">
		{#each lakesResults.slice(0, 5) as lakeResult}
			<button class="result" on:click={() => setView(lakeResult.latitude, lakeResult.longitude)}>
				{lakeResult.name}
			</button>
		{/each}
		{#if lakesResults.length > 5}
			<p class="warning">
				There are {lakesResults.length - 5} more elements. Specify a more descriptive search.
			</p>
		{/if}
	</div>
{/if}

{#if lakesResults.length == 0 && query !== ''}
	<p class="warning">
		No lakes with name "{query}" found. Please try a different lake.
	</p>
{/if}

<style>
	.search-bar {
		margin-block: 1rem;
	}

	input {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
	}

	.result {
		display: block;
		width: 50%;
		margin-inline: auto;
		padding-block: 1rem;
		background-color: white;
		border: 1px solid black;
		margin-block: 0.5rem;
		border-radius: 15px;
		cursor: pointer;
	}

	#results {
		margin-bottom: 1rem;
	}

	.warning {
		text-align: center;
	}
</style>
