<script lang="ts">

	export let formaction: string = ''
	export let type: string       = 'reset'
	
	export let name: string       = 'btnReset'
    export let value: string      = ''

	export let text: string       = ''

	export let style: string      = ''
	export let show: boolean      = true

	export let click_callback = () => { 
		console.log(`${name} clicked. Assign a callback function`) 
	}

</script>


<button {type} {formaction} 
	on:click={click_callback} 
	class="{show ? '' : 'hide'}"
	{style}
>
	{#if text != ''} 
		{text}
	{:else}
	
		<iconify-icon icon="radix-icons:reset"></iconify-icon>

	{/if}
</button>