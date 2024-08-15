<script>

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('myMessage', {
			text: 'Hello from Inner!'
		});
	}
	
</script>

<button on:click={sayHello}>
	Click to say hello
</button>
