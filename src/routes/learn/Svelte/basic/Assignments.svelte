<script>

    let count = 0

    // reactive declaration / derived from
    $: doubled = count * 2

    // reactive abritrary
    $: console.log(`the count is ${count}`)

    // reactive statement if statement block
    $: if (count >= 10) {
        alert('count his high!');
        count = 0;
    }

    function increment() {
        count += 1
    }

</script>

<h1>Assignments / Reactive Desclaration / Derived from (nested)</h1>
<button on:click={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
</button>

doubled: {doubled} / {count * 2}
{#if count > 10}
	<p>{count} is greater than 10</p>
{/if}
