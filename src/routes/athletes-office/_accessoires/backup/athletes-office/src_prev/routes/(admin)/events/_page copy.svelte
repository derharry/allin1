<script>
    import DataTable from '$lib/components/DataTable.svelte';


    import * as utils from '$lib/utils/inc.utils.js';
    import Modal from '$lib/components/Modal.svelte';
	import { page } from '$app/stores';
    let uiModal;

    export let data; // action load data
    export let form; // action data

    $: console.log('data', data)
    $: console.log('form', form)
    $: console.log('status', $page.status)
    $: console.log('error',  $page.error)


    let uiEventStoreFilter = '';
    $: dsEventStore = data?.data || [];
    $: dsEventStoreFiltered = dsEventStore.filter(row => {
        return (row.name.includes(uiEventStoreFilter)
            ||  row.lastname.includes(uiEventStoreFilter)
            ||  row.email.includes(uiEventStoreFilter)
        )
        dsEventStoreFiltered = dsEventStoreFiltered
    });    


    let uiEventStoreReload = () => {};
    let setUIaddNewEvent   = () => {};


</script>


<div class="uiPanel">
    <table>
        <tr>
            <td>
                <input type="text" name="uiUserStoreFilter" bind:value="{uiEventStoreFilter}" placeholder="..search..">
                <button on:click={uiEventStoreReload}>Refresh</button>
                <button on:click={setUIaddNewEvent}> + </button>
            </td>
        </tr>
    </table>
</div>



<div class="uiPanel">
    <table cellspacing="0" cellpadding="5" class="uiDataTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>from</th>
                <th>untill</th>
                <th>Country</th>
                <th>active</th>
                <th></th>
            </tr>
            <tr>
            </tr>
        </thead>
        <tbody>
            {#each dsEventStoreFiltered as user}
                <tr 
                    on:dblclick={() => {}} 
                    id="{dsSelectedUser.uuid == user.uuid ? 'datatableSelected' : ''}"
                >
                <td>hi</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<Modal bind:uiModal bind:this={uiModal}>
</Modal>