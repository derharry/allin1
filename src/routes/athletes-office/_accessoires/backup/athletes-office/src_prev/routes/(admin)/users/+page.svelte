<script>

    import * as utils from '$lib/utils/inc.utils.js';
    import DataTable from "$components/DataTable/DataTable.svelte";
    import Modal from "$components/Modal/Modal.svelte";

    export let data;
    //export let form;

    let ui_datatable = undefined

    let ds_dataset = data.dataset || []
    let ds_fields  = data.fields  || {}

    $: {
        //utils.ps('+page.svelte', data, form);
    }

</script>


<div class="ui_panel">
    <DataTable bind:this={ui_datatable} {ds_dataset} {ds_fields} />
</div>

