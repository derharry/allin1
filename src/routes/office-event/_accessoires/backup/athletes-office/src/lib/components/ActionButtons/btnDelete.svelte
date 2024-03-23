<script lang="ts">

	export let formaction: string = '?/delete'
	export let type: string       = 'button'
	
	export let name: string       = 'btnDelete'
    export let value: string      = ''

	export let text: string       = ''

	export let style: string      = ''
	export let show: boolean      = true

	export let click_callback = () => { 
		console.log(`name clicked. Assign a callback function`) 
	}

</script>


<button {name} {type} {formaction} 
	on:click={click_callback} 
	class="{show ? '' : 'hide'}"
	{style}
>
	{#if text != ''} 
		{text}
	{:else}
	
		<iconify-icon icon="material-symbols:delete"></iconify-icon>

	{/if}
</button>