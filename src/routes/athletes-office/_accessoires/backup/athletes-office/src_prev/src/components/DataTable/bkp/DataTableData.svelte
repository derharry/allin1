<svelte:options accessors />
<script lang="ts">

    //#region imports

    import * as utils from "$lib/utils/inc.utils";
    import { prepare_new_dataset } from '$lib/utils/db.utils.client'

    //#endregion

    //#region properties and callbacks

    export let dt_edit_inline   = false
    export let ds_fields        = {}
    export let ds_data          = []
    export let ds_data_filtered = []

    export let ds_seleted_row   = {} // (data && data?.dataset.length > 0) ? data.dataset[0] : null // || { 'name': 'john',  'uuid': 123 }
    export let ds_seleted_rows  = []
    export let ds_data_selected_reset  = {}  //    { 'name': 'Reset', 'uuid': 123 }
    //$:  ds_data_selected_reset  = utils.clone_of_object(ds_seleted_row)

    export let ds_data_create          = null  // || { 'name': 'john',  'uuid': 123 }
    export let ds_data_create_reset    = null //    { 'name': 'Reset', 'uuid': 123 }
    //$:  ds_data_create_reset    = utils.clone_of_object(ds_data_create)


    export let callback_click_action_add_new_row = () => {}
    export let callback_click_action_edit_row    = () => {}
    export let callback_click_action_delete_row  = () => {}

    //#endregion

    //#region methods

    export function unselect_previous_rows() {
        ds_data_filtered.forEach(row => {
            row._is_selected = false
        })
    }

    export function click_action_add_new_row() {
        if (debug)  utils.cl('click_action_add_new() DataTableData()')
        if (dt_edit_inline) {
            if (debug)  utils.cl('..inline...')
            unselect_previous_rows()
            insert_row(null)
            // do not set ds_data_create at inline editing
        } 
        else { // edit via modal
            if (debug)  utils.cl('..modal..')
            if (!ds_data_create) {
                if (debug)  utils.cl('..create new DS..')
                ds_data_create = get_new_rowdata()
                ds_data_create_reset = utils.clone_of_object(ds_data_create)
            }
        }
    }

    function click_action_edit_row(datarow) {
        if (debug)  utils.cl('click_action_edit_new()')
        unselect_previous_rows()
        if (!datarow?._dt_original_for_reset) 
             datarow. _dt_original_for_reset = utils.clone_of_object(datarow)
        datarow._is_selected  = true
        ds_seleted_row        = datarow
        ds_data_filtered      = ds_data_filtered
        if (debug) utils.cl('click_action_edit_row()', {datarow}, {ds_seleted_row})
        callback_click_action_edit_row()
        ds_data = ds_data
    }

    function click_action_delete_row(datarow) {
        datarow._is_deleted  = true
        if (debug) utils.cl('click_action_delete_row()', {datarow}, {ds_seleted_row})
        delete_row(datarow.uuid)
        callback_click_action_delete_row(datarow)
        ds_data = ds_data
    }

    //#endregion

    //#region methods direct data processing

    export function get_new_rowdata() {
        return prepare_new_dataset(ds_fields)
    }

    export function insert_row(newdata) {
        let newrow = get_new_rowdata()
        if (newdata)
            newrow = utils.copy_key_value_list_to(newdata, newrow)
        newrow._is_selected = true
        newrow._is_deleted  = false
        newrow._is_updated  = false
        newrow._is_new      = true
        if (debug)  utils.cl('insert_row()', {newrow})
        ds_data.unshift( utils.clone_of_object(newrow) )
        ds_data = ds_data
    }

    export function update_row(uuid, newdata) {
        ds_data.forEach( row => {
            if (row.uuid == uuid) {
                row = utils.copy_key_value_list_to(newdata, row)
            }
        })
        if (debug)  utils.cl('update_row()', {newdata})
        ds_data = ds_data
    }

    export function delete_row(uuid) {
        let count_before = ds_data.length
        ds_data = ds_data.filter( row => {
            if (row.uuid != uuid) { return row } 
            else {  utils.cl('deleted row!') }
        })
        if (debug)  utils.cl('delete_row()', {uuid}, count_before, ds_data.length)
        ds_data = ds_data
    }

    //#endregion

    //#region states and listeners
    //#endregion

    //#region debug

    export let debug = false
    export let debug_in_html = debug
    let debug_run = 0
    let debug_text = ''
    $:  debug_text = 'DEBUG DataTableData.svelte :'+ debug_run +' #  '
    
    //#endregion

</script>
<style>
    @import '$css/DataTable.css';
</style>


<table width="100%" border="0" cellpadding="3" cellspacing="0" class="datatable">
    <thead>
        <tr>

            {#each Object.entries(ds_fields) as [key,attr]}
                {#if attr._is_visible}

                    <th width="1">{attr.text}</th>

                {/if}
            {/each}

            <th><!-- actions field --></th>

            {#if debug_in_html}
                <td>_is_selected</td>
                <td>_is_updated</td>
                <td>_is_deleted</td>
                <td>_is_new</td>
            {/if}

        </tr>
        <tr>

            <!--
            {#each Object.entries(ds_fields) as [key,attr]}
                {#if attr._is_visible}

                    <th><input type="text" style="width:100%"></th>

                {/if}
            {/each}
            -->

        </tr>
    </thead>

    <tbody>

        {#if !ds_data_filtered || ds_data_filtered.length == 0}
            <tr>
                <td colspan="{Object.keys(ds_fields).length}" height="50">- no data -</td>
            </tr>
        {:else}
        <!--{#each Object.entries(ds_filtered) as [id, datarow]}-->
        {#each ds_data_filtered as datarow}
            <tr
                on:dblclick={()=>click_action_edit_row(datarow)} 
                class="{datarow._is_selected ? 'row_selected' : ''}"
            >
                {#each Object.entries(datarow) as [key, value]}
                    {#if ds_fields[key]?._is_visible}


                        {#if ds_fields[key].type == 'String'}
                            <td>{value}</td>


                        {:else if ds_fields[key].type == 'Boolean'}
                            <td><input type="checkbox" name="{key}" checked={value} disabled={dt_edit_inline ? false : true }></td>


                        {:else if ds_fields[key].type == 'Int'}
                            <td><input type="number" name="{key}" value={value}></td>


                        {:else if ds_fields[key].type == 'Date'}
                            <td><input type="date" name="{key}" value={value}></td>


                        {:else if ds_fields[key].type == 'DateTime'}
                            <td><input type="datetime-local" name="{key}" value={value}></td>


                        {:else}
                            <td>{ds_fields[key].type}</td>


                        {/if}
                    {/if}
                {/each}                            



                <td width="1" nowrap class="actionbar">

                    <button on:click={click_action_edit_row(datarow)}>
                        <iconify-icon icon="ic:twotone-mode-edit"></iconify-icon>
                    </button>

                    {#if dt_edit_inline}
                        <button on:click={click_action_delete_row(datarow)}>
                            <iconify-icon icon="ic:twotone-delete-forever"></iconify-icon>
                        </button>
                    {/if}

                </td>

                {#if debug_in_html}
                    <td>{datarow._is_selected}</td>
                    <td>{datarow._is_updated}</td>
                    <td>{datarow._is_deleted}</td>
                    <td>{datarow._is_new}</td>
                {/if}


            </tr>
        {/each}
        {/if}
    </tbody>

    <tfoot>
    </tfoot>

</table>