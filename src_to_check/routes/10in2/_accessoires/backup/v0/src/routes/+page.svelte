
<script>
	import Modal from './Modal.svelte'
	let dialog
</script>


<h1>Home</h1>

<button on:click={() => dialog.showModal()}>Open It!</button>

<Modal bind:dialog on:close={() => console.log('closed')}>
	This is amazingly simple! (press esc to close)
</Modal>

<hr>

<button on:click={dialog.showModal()}> open </button>

<Modal id="dialog" />