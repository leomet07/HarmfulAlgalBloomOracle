<script lang="ts">
	import { selectedDateYYYYMMDD } from '$lib/store';
	import { format } from 'date-fns';

	export let uniqueRasterDates: Date[];

	console.log(uniqueRasterDates[0]);

	$: selectedDateIndex = uniqueRasterDates.findIndex(
		(v) => format(v, 'yyyy-MM-dd') === $selectedDateYYYYMMDD
	);

	function nextDate() {
		if (selectedDateIndex < uniqueRasterDates.length - 1) {
			$selectedDateYYYYMMDD = format(uniqueRasterDates[selectedDateIndex + 1], 'yyyy-MM-dd'); // increment stored date
		}
		console.log('Date changed to', $selectedDateYYYYMMDD);
	}

	function prevDate() {
		if (selectedDateIndex > 0) {
			$selectedDateYYYYMMDD = format(uniqueRasterDates[selectedDateIndex - 1], 'yyyy-MM-dd'); // increment stored date
		}
		console.log('Date changed to', $selectedDateYYYYMMDD);
	}
</script>

<div class="timeline_container">
	<button class="left" on:click={prevDate} disabled={selectedDateIndex == 0}>
		<span>&lt;</span>
	</button>
	<div class="center">
		<p>{$selectedDateYYYYMMDD} {selectedDateIndex}</p>
	</div>
	<button
		class="right"
		on:click={nextDate}
		disabled={selectedDateIndex == uniqueRasterDates.length - 1}
	>
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
