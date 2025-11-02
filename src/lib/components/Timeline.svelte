<script lang="ts">
	import { selectedDateYYYYMMDD } from '$lib/store';

	// import { selectedDateIndex } from '$lib/store';
	// import { simpleRasterDates_filtered } from '$lib/store';

	function nextDate() {
		// if ($selectedDateIndex < $simpleRasterDates_filtered.length - 1) {
		// 	$selectedDateIndex = $selectedDateIndex + 1;
		// }
		// console.log('Date changed: ', $simpleRasterDates_filtered[$selectedDateIndex]);
	}

	function prevDate() {
		// if ($selectedDateIndex > 0) {
		// 	$selectedDateIndex = $selectedDateIndex - 1;
		// }
		// console.log('Date changed: ', $simpleRasterDates_filtered[$selectedDateIndex]);
	}
</script>

<div class="timeline_container">
	<button class="left" on:click={prevDate}>
		<span>&lt;</span>
	</button>
	<div class="center">
		<p>{$selectedDateYYYYMMDD}</p>
	</div>
	<button class="right" on:click={nextDate}>
		<span>&gt;</span>
	</button>
</div>

<style scoped>
	.timeline_container {
		/* border: 1px solid red; */
		width: 100%;
		height: 70px;
		margin-block: 1rem;
		display: flex;
		position: relative;
	}

	button:active {
		transform: scale(0.99);
	}
	.right,
	.left {
		flex: 1;
		background-color: #fff76b;
		display: flex;
		justify-content: center;
		font-size: 3rem;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		padding: none;
	}

	.right:disabled,
	.left:disabled {
		background-color: grey;
	}

	.center {
		flex: 5;
		display: grid;
		place-items: center;
	}

	.center p {
		font-size: 2rem;
	}
</style>
