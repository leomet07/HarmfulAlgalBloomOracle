<script lang="ts">
	import type { LakeExported } from '$lib/types';

	export let lake: LakeExported;
</script>

<div class="lakepopup" id={'lake' + String(lake.id)}>
	<p class="lakename">{lake.name}</p>
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
