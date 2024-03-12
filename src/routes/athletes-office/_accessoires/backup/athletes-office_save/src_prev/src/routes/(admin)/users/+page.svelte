<script lang="ts">

	import DataTable from '$components/DataTable/DataTable.svelte';
    
    let dom_datatable: DataTable = undefined

    export let data;  // select()
    export let form;  // $_REQUEST

</script>



<h1>Users</h1>
<hr>

<table width="500" border="0" cellspacing="0" cellpadding="1" style="max-width:500px" class="ui_panel">
    <tr valign="top">
        <td valign="top">
            <DataTable 
                bind:this={dom_datatable}
                fields = {data.fields  || {}}
                data   = {data.dataset || {}}
            ></DataTable>
        </td>
    </tr>
</table>