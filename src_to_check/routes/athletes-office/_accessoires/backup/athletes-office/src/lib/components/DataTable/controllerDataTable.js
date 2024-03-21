import * as utils from '$lib/utils/inc.utils'
import { goto } from '$app/navigation'

import { 
    debug, data,
    insert_row, insert_get_new_rowdata,  

} from '$components/DataTable/storeDataTable.js'


//#region controller

export function click_action_save_changes () {
    utils.cl('click_action_save_changes')
}

export function click_action_add_new() {
    getutils.cl('click_action_add_new')
    let newrow = insert_get_new_rowdata()
    console.log(newrow)
    insert_row(null)
}

export function click_action_edit(datarow)    {
    datarow._is_selected = true
    data.ping()
    utils.cl('click_action_edit', datarow)
}

export function click_action_delete(datarow)  {
    datarow._is_deleted = true
    data.ping()
    utils.cl('click_action_delete', {datarow})
}

export function click_action_refresh_datatable() {
    utils.cl('click_action_refresh_datatable')
    goto('/users')
}

//#endregion