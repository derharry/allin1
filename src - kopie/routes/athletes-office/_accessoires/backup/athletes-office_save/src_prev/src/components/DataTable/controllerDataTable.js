import * as utils from '$lib/utils/inc.utils'
import { debug, columns, data, data_filtered } from '$lib/stores/DataTableStore.js'
import { goto } from '$app/navigation'


//#region controller

export function click_action_save_changes () {
    utils.cl('click_action_save_changes')
}

export function click_action_add_new() {
    utils.cl('click_action_add_new')
}

export function click_action_edit(datarow)    {
    datarow._is_selected = true
    data.updated()
    utils.cl('click_action_edit', datarow)
}

export function click_action_delete(datarow)  {
    datarow._is_deleted = true
    data.updated()
    utils.cl('click_action_delete', {datarow})
}

export function click_action_refresh_datatable() {
    utils.cl('click_action_refresh_datatable')
    goto('/users')
}

//#endregion