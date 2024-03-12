import { writable, readable, derived, get } from 'svelte/store'
import { prepare_new_dataset } from '$lib/utils/db.utils.client'
import * as init from './storeDataTableInit'
import * as utils from '$lib/utils/inc.utils'


export const debug                = init.create_debug()
export const view_edit_inline     = init.create_view_edit_inline()
export const view_select_multiple = writable(false)
export const view_text_filter     = init.create_view_text_filter()


export const columns        = init.create_columns()
export const data           = init.create_data()

export const data_filtered  = derived(
     [view_text_filter , data , columns ], 
    ([$view_text_filter, $data, $columns]) => $data.filter(row => {
      if (!row._is_deleted) {
        if ($view_text_filter == '') return row
        else {
          
          let search_value = $view_text_filter.toLocaleLowerCase()
          let search_doit  = true
          let search_match = false
        
          Object.entries(row).forEach(([key, val]) => {
              // exclude not searchable fields by hidden, types, ...
              if     (!$columns[key].is_visible)           search_doit = false
              else if ($columns[key].type == 'Boolean')    search_doit = false
              else if ($columns[key].type == '_internal_') search_doit = false
              else search_doit = true

              // do the search
              if (search_doit && val.toString().toLocaleLowerCase().includes(search_value)) {
                  //console.log('', search_value)
                  search_match = true
              }
          })

          if (search_match) return row
        }
      }
    })
)
export const data_to_delete = derived( [data], ($data) => $data.filter(row => { if (row._is_deleted) return row  }) )
export const data_to_save   = derived( [data], ($data) => $data.filter(row => { if (row._is_new || row._is_updated || row._is_deleted) return row }) )


export function insert_get_new_rowdata () {  return prepare_new_dataset( get(columns) )  }

export function insert_row (insert_data) {
  let newrow = insert_get_new_rowdata()
  if (insert_data) newrow = utils.copy_key_value_list_to(insert_data, newrow)
  newrow._is_new      = true
  newrow._is_selected = true
  newrow._is_deleted  = false
  newrow._is_updated  = false
  if (get(debug))  utils.cl('insert_row()', {newrow})
  data.insert(newrow)
}
export function update_row (uuid, update_data) {}
export function delete_row (uuid) {}


export function unselect_selected_rows () {}



/*
function createStore() {
  const { subscribe, get, set, update } = writable({
    
    row_selected         : {},
    row_selected_reset   : {},
    row_create_new       : {},
    row_create_new_reset : {},

    unselect_rows  : () => update ( (x) => x.data.forEach(row => { row._is_selected = false })  ),
  })
}
*/