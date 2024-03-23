<script>

import * as utils from '$lib/utils/inc.utils.js';
import DataTable from "$lib/components/DataTable.svelte";
import Modal from "$lib/components/Modal.svelte";
import Form from "$lib/components/Form.svelte";

export let data;
export let form;

let ui_modal     = undefined
let ui_datatable = undefined
let ui_datatable_filter = undefined

let ds_dataset = data.dataset || []
let ds_fields  = data.fields  || [] 


$: { 
    utils.ps('+page.svelte', data, form);
}

</script>



<div class="ui_panel">
    <table>
        <tr>
            <td>..panel..</td>
        </tr>
    </table>
</div>

<div class="ui_panel">
<DataTable bind:this={ui_datatable} 
    DataSet={ds_dataset} 
    DataFields={ds_fields}
/>
</div>

<Modal bind:this={ui_modal} >
    <div slot="body">
        <Form DataFields="{ds_fields}" DataSet={ds_dataset}></Form>
    </div>
</Modal>