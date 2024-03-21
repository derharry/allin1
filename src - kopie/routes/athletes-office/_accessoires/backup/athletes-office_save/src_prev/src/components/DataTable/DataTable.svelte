<svelte:options accessors />
<script lang="ts">

    import DataTableHeader from "$components/DataTable/DataTableHeader.svelte"
    import DataTableData   from "$components/DataTable/DataTableData.svelte"
    import PanelCrud       from "$components/Panels/PanelCRUD.svelte"
    import Modal           from "$components/Modal/Modal.svelte"
    import Form            from "$components/Form/Form.svelte"
    import { 
        data as dt_data, 
        columns as dt_columns 
    } from '$lib/stores/DataTableStore.js'

    export let fields = {}
    export let data   = []
    export let form   = null

    dt_columns.set(fields)
    dt_data.set(data)
    
    console.log('################################')
    console.log('################################')
    console.log('################################')

</script>
<style>
    @import '$css/DataTable.css';
</style>

<table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <DataTableHeader />
        </td>
    </tr>
    <tr>
        <td>
            <DataTableData />
        </td>
    </tr>
    <tr>
        <td>
            <!-- FOOTER  -->
            <!-- /FOOTER -->
        </td>
    </tr>
</table>