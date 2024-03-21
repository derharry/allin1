<svelte:options accessors />
<script lang="ts">

    //#region import components and dependencies

    import * as utils from '$lib/utils/inc.utils'
    import { prepare_new_dataset } from '$lib/utils/db.utils.client'

    import DataTableHeader from "$components/DataTable/DataTableHeader.svelte"
    import DataTableData from "$components/DataTable/DataTableData.svelte"
    import PanelCrud     from "$components/Panels/PanelCRUD.svelte"
    import Modal         from "$components/Modal/Modal.svelte"
    import Form          from "$components/Form/Form.svelte"

    //#endregion
    
    //#region props and initial variables

    export let data = undefined
    export let form = undefined

    export let ds_fields  = data?.fields   ||  { name: { text: 'Fixture Fallback', type: 'String', default: 'x', placeholder: 'Fixture Fallback', foreign_key: null, _is_visible: true } }
    export let ds_data    = data?.dataset  ||  [ { name: 'set via $data or §ds_dataset' } ]

    let dom_datatable_header   = undefined
    let dom_datatable_data     = undefined

    let dom_modal_create       = undefined
    let dom_form_create        = undefined
    let dom_form2_create       = undefined

    let dom_modal_update       = undefined
    let dom_form_update        = undefined
    let dom_form2_update       = undefined

    let ds_search_filter: string   = ''
    let dt_edit_inline:   boolean  = false

    let ds_select_multiple   = false    
    let ds_fields_to_hide    = [ 'id' , 'uuid', 'password', 'created_at', 'updated_at' ]
    let ds_fields_searchable = []
    let ds_data_has_changes_to_save = false
    let ds_data_changes_to_save    = []

    let ds_seleted_row = null
    let ds_data_create = null
    let ds_data_create_reset = null

    //#endregion

    //#region methods

    function click_action_add_new_row () {
        if (debug)  utils.cl('click_action_add_new() DataTable()')
        if (dt_edit_inline) {
            // do nothing here - is handled in DataTableData.click_action_add_new_row()
        }
        else {
            if (!ds_data_create || dom_form_create?.form2?.status == 201) {
                
                if (debug)  utils.cl('..modal re-create and flush-form ..', {ds_data_create})
                dom_form_create.flush()
                ds_data_create = null
                ds_data_create_reset = null
                dom_datatable_data.click_action_add_new_row()
                if (debug)  utils.cl('..click_action_add_new() DataTable() after create', {ds_data_create})
            }
            dom_modal_create.open()
        }
    }

    function click_action_edit_row () {
        console.log('open modal edit', dom_modal_update.show_modal)
        if (dt_edit_inline) {
            // do nothing here - is handled in DataTableData row component(s)
        }
        else { // edit via modal
            if (!dom_datatable_data.ds_selected_row || dom_form_create?.form2?.ok) {
                dom_form_update.flush()
            }
            dom_modal_update.open()
        }
    }


    function click_action_save_changes () {}

    
    function process_submitted_success (form_response) {
        utils.cl('process_submitted_success', {form_response} )
        if (form_response.ok) {
            switch (form_response.status) {
                case 201:  dom_datatable_data.insert_row(form_response.data); ds_data_create = null; ds_data_create_reset = null;  break
                case 202:  dom_datatable_data.update_row(form_response.data.uuid, form_response.data);  break
                case 203:  dom_datatable_data.delete_row(form_response.data.uuid);                      break
            }
            if (dom_modal_create.show_modal) dom_modal_create.close()
            if (dom_modal_update.show_modal) dom_modal_update.close()
            ds_data = ds_data
        }
    }

    //#endregion
    
    //#region states filters  

    /**
     * filter excludes ds_fields_to_hide and DataTables private fields starting with '_'
     * case-insensitive search: value of search and row fields get both lower-cased
     * - if  : row not is deleted
     *   - if  : skip search when search value is empty
     *   - else: pass-through values
     */
     $: ds_data_filtered = ds_data.filter(row => {
        if (!row._is_deleted) {
            if (ds_search_filter == '') return row
            else {
                let search_value = ds_search_filter.toLocaleLowerCase()
                let search_doit  = true
                let search_match = false
                
                Object.entries(row).forEach(([key, val]) => {
                    
                    // exclude not searchable fields by hidden, types, ...
                    if     (!ds_fields[key]?._is_visible) search_doit = false
                    else if (ds_fields[key].type == 'Boolean') search_doit = false
                    else if (ds_fields[key].type == '_internal_') search_doit = false
                    else search_doit = true

                    // do the search
                    if (search_doit && val.toString().toLocaleLowerCase().includes(search_value)) {
                        //console.log('', ds_search_filter)
                        search_match = true
                    }
                })
                if (search_match) return row
            }
        }
    })

    /**
     * check if there is data to save
     */
     $: ds_changes_to_save = ds_data.filter(row => { if (row._is_deleted || row._is_updated || row._is_new) return row })

    /**
     * ds_fields and ds_filter_to_hide listener create ds_fields visible list 
     * #previously: ds_fields listener to add internal fields
     */
     $: {  Object.entries(ds_fields).forEach(([key, attr]) => {
            attr._is_visible  = ( 
                ds_fields_to_hide.includes(key.toString()) || key.toString().startsWith('_') 
            ) ? false : true
        })
    }
    
    //#endregion
    
    //#region debug
    let debug = false
    let debug_in_html = debug
    let debug_run = 0
    let debug_text = ''
    $:  debug_text = 'DEBUG DataTable.svelte :'+ debug_run +' #  '
    //#endregion

</script>
<style>
    @import '$css/DataTable.css';
</style>


<table width="100%" border="0" cellpadding="3" cellspacing="0">
    
    <!-- <thead> -->
        <tr>
            <td align="right" colspan="10">
                <button on:click={() => dom_modal_create.open() }>show create</button>
                <!--<button on:click={() => dom_modal_update.open() }>show create</button>-->
            </td>

            {#if debug_in_html}
                <td rowspan="{ds_data_filtered.length + 3}" style="vertical-align:top">
                    {@html utils.var_dump('ds_selected_row', ds_seleted_row)}
                </td>
                <td rowspan="{ds_data_filtered.length + 3}" style="vertical-align:top">
                    {@html utils.var_dump('ds_fields', ds_fields)}
                </td>
            {/if}

        </tr>
        <tr>
            <td>
                <DataTableHeader 
                    bind:this={dom_datatable_header}
                    bind:dt_edit_inline={dt_edit_inline}
                    bind:ds_search_filter={ds_search_filter}
                    {ds_data}
                    ds_data_filtered={ds_data_filtered}
                    callback_click_action_add_new={click_action_add_new_row}
                />
            </td>
        </tr>
        <tr>
            <td>            
                <hr style="border: 1px black solid">
            </td>
        </tr>


        <tr>
            <td>
                <DataTableData 
                    bind:this={dom_datatable_data}
                    {debug} 
                    {debug_in_html}
                    {dt_edit_inline}
                    bind:ds_data = {ds_data}
                    {ds_fields}
                    {ds_data_filtered}
                    bind:ds_seleted_row = {ds_seleted_row}
                    bind:ds_data_create = {ds_data_create}
                    bind:ds_data_create_reset = {ds_data_create_reset}
                    callback_click_action_edit_row   = {click_action_edit_row}
                />
            </td>
        </tr>

    <tfoot>
        <tr>
            <td>
            </td>
        </tr>
    </tfoot>

</table>


<Modal bind:this={dom_modal_create}
    bind:dom_form={dom_form_create}
    form2={dom_form2_create}
>
    <PanelCrud  
        title="New entry"
        action_button_Save_formaction="?/create"
        action_button_Delete_show={false}
        dom_form ={dom_form_create}
        dom_modal={dom_modal_create}
    ><!--  -->
        <Form bind:this={dom_form_create} 
            form_fields={ds_fields} 
            form_data=  {ds_data_create}
            bind:form={form}
            bind:form2={dom_form2_create}
            use_default_actions={false} 
            form_url_binding='?/create'
            callback_submitted_success={process_submitted_success}
        />
    </PanelCrud>
</Modal>

<Modal bind:this={dom_modal_update}
    bind:dom_form={dom_form_update}
    form2={dom_form2_update}
>
    <PanelCrud  
        title="Update entry"
        action_button_Save_formaction="?/update"
        action_button_Delete_formaction="?/delete"
        dom_form ={dom_form_update}
        dom_modal={dom_modal_update}
        ><!-- -->
        <Form bind:this={dom_form_update} 
            form_fields={ds_fields} 
            form_data=  {ds_seleted_row} 
            bind:form={form}
            bind:form2={dom_form2_update}
            use_default_actions={false}
            form_url_binding='?/update,?/delete'
            callback_submitted_success={process_submitted_success}
        />
    </PanelCrud>
</Modal>