<script>
	import { count2 } from './stores.js';
</script>

<h1>The count2 is {$count2} (custom store)</h1>

<button on:click={count2.increment}>+</button>
<button on:click={count2.decrement}>-</button>
<button on:click={count2.reset}>reset</button>
