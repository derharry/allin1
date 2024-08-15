<script>
	let count = 0;

	function increment() {
		count += 1;
	}

	//keyed each-blocks
	import LogicItemThing from './Logic-ItemThing.svelte';
	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];    

    function handleClick_things() {
		things = things.slice(1);
	}
</script>

<h1>Logic</h1>
<h2>If / If Else blocks</h2>

<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else if count < 5}
	<p>{count} is less than 5</p>
{:else}
	<p>{count} is between 5 and 10</p>
{/if}


<h2>Each blocks</h2>

<button on:click={handleClick_things}>
	Remove first thing
</button>
{#each things as thing (thing.id)}
	<LogicItemThing name={thing.name} />
{/each}

<h2>Await blocks</h2>
