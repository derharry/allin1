<script>
	import Events from "./Events.svelte";


	let promise = getRandomNumber();

	function handleClick() {
		promise = getRandomNumber();
	}

	async function getRandomNumber() {
		// Fetch a random number between 0 and 100
		// (with a delay, so that we can see it)
		const res = await fetch('/random-number');

		if (res.ok) {
			return await res.text();
		} else {
			// Sometimes the API will fail!
			throw new Error('Request failed');
		}
	}

</script>

<h2>Promise</h2>
<button on:click={handleClick}>
	generate random number
</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


<h2>Events</h2>
<Events />