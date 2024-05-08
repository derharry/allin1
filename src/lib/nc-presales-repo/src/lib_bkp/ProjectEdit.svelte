<script>
    export let showProjectEdit = false;
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

    $: showModal = showProjectEdit;
	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
    <table style="background:red">
        <tr>
            <td>hhiii</td>
        </tr>
    </table>
</dialog>

<style>

</style>