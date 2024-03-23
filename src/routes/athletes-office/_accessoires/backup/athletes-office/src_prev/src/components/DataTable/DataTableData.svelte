<svelte:options accessors />
<script lang="ts">

    import * as utils from '$lib/utils/inc.utils'
    import { click_action_edit, click_action_delete } from './controllerDataTable'
    import { view_edit_inline, debug, columns, data_filtered } from '$lib/stores/DataTableStore.js'

    $: _columns   = $columns
    $: _data_view = $data_filtered 

    export let callback_click_action_edit_row   = (datarow) => {  click_action_edit(datarow)    }
    export let callback_click_action_delete_row = (datarow) => {  click_action_delete(datarow); }

</script>
<style>
    @import '$css/DataTable.css';
</style>


<table width="100%" border="0" cellpadding="3" cellspacing="0">

    <thead>
        <tr>
            {#if _columns.length == 0}
                - no columns defined -
            {:else}
                {#each Object.entries(_columns) as [key,attr]}
                    {#if attr.is_visible}
                        <th>{attr.text}</th>
                    {/if}
                {/each}
            {/if}
        </tr>
    </thead>

    <tbody>
            {#if _data_view.length == 0}
                <tr>
                    <td colspan="{Object.keys(_columns).length}" height="50">
                        - no data -
                    </td>
                </tr>
            {:else}
            {#each _data_view as datarow}
                <tr
                    on:dblclick={()=>callback_click_action_edit_row(datarow)} 
                    class="{datarow._is_selected ? 'row_selected' : ''}"
                >

                    {#each Object.entries(datarow) as [key, value]}
                        {#if _columns[key]?.is_visible}
                            <td>

                            {#if _columns[key].type == 'String'}
                                {value}


                            {:else if _columns[key].type == 'Boolean'}
                                <input type="checkbox" name="{key}" checked={value} disabled={$view_edit_inline?false:true}>


                            {:else if _columns[key].type == 'Int'}
                                <input type="number" name="{key}" value={value}>


                            {:else if _columns[key].type == 'Date'}
                                <input type="date" name="{key}" value={value}>


                            {:else if _columns[key].type == 'DateTime'}
                                <input type="datetime-local" name="{key}" value={value}>


                            {:else}
                                {_columns[key].type}


                            {/if}

                            </td>
                        {/if}
                    {/each}                            


                    <td width="1" nowrap class="actionbar">

                        <button on:click={callback_click_action_edit_row(datarow)}>
                            <iconify-icon icon="ic:twotone-mode-edit"></iconify-icon>
                        </button>

                        {#if view_edit_inline}
                            <button on:click={callback_click_action_delete_row(datarow)}>
                                <iconify-icon icon="ic:twotone-delete-forever"></iconify-icon>
                            </button>
                        {/if}

                    </td>


                    {#if $debug}
                        <td>{datarow._is_selected}</td>
                        <td>{datarow._is_updated}</td>
                        <td>{datarow._is_deleted}</td>
                        <td>{datarow._is_new}</td>
                    {/if}

                </tr>
            {/each}
        {/if}
    </tbody>

</table>

