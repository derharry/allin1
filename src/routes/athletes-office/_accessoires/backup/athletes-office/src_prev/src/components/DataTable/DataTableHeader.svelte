<svelte:options accessors />
<script>

    import * as utils from '$lib/utils/inc.utils'
    import { click_action_add_new, click_action_refresh_datatable, click_action_save_changes } from './controllerDataTable.js'
    import { view_edit_inline, debug, view_text_filter, data, data_filtered, data_to_save, data_to_delete } from '$lib/stores/DataTableStore.js'

    export let callback_click_action_save_changes = () => {  click_action_save_changes() }
    export let callback_click_action_add_new      = () => {  click_action_add_new()  }

    /**
     * reload the dataset  -> currently refresh the page
     */
    export let callback_click_action_refresh_dataset = () => {  click_action_refresh_datatable()  }

</script>
<style>
    @import '$css/DataTable.css';
</style>


<table width="100%" border="0" cellpadding="3" cellspacing="0">
    <tr>
        <td width="33%" class="left">
            
            <input type="text" name="dom_datatable_filter" bind:value="{$view_text_filter}" placeholder="..search.." style="width:100%">
        
        </td>
        <td></td>
        <td width="1" nowrap align="center">   

            {$data_filtered.length} / 
            {$data.length - $data_to_delete.length} 
            
            {#if $data_to_delete.length > 0}
                // {$data_to_delete.length}
            {/if}

        </td>
        <td></td>
        <td width="1" nowrap>

            <div class="actionbar">
                <button on:dblclick={() => { debug.toggle()  }}>
                    <iconify-icon icon="pixelarticons:debug" style="color: { $debug ? 'lightgreen' : '' }"></iconify-icon>
                </button>
                <button on:dblclick={() => { view_edit_inline.toggle() }}>
                <iconify-icon icon="carbon:data-table-reference" style="color: { $view_edit_inline ? 'lightgreen' : '' }"></iconify-icon>
            </div>

        </td>
        <td width="5"></td>
        <td width="1" nowrap>

            <div class="actionbar">
                {#if $data_to_save.length > 0}
                    <button on:click={callback_click_action_save_changes}>
                        <iconify-icon icon="fluent:save-16-filled"></iconify-icon>
                    </button>
                {/if}

                <button on:click={callback_click_action_add_new}>
                    <iconify-icon icon="typcn:plus"></iconify-icon>
                </button>
                <button on:click={callback_click_action_refresh_dataset}>
                    <iconify-icon icon="mingcute:refresh-3-fill"></iconify-icon>
                </button>
            </div>

        </td>     
    </tr>
</table>