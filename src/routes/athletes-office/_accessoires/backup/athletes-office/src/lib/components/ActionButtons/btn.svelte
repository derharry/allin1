<script lang="ts">
    
    //import { setContext } from 'svelte'
    
    export let text: string = 'xx'
    
    // This makes the value available to child components
    //setContext('text', text);

	export let click_callback = () => { 
		console.log(`${name} clicked. Assign a callback function`) 
	}

</script>


<button on:click="{click_callback}">
    
    hi

</button>