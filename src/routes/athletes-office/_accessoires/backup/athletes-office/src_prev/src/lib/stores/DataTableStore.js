import { writable, readable, derived } from 'svelte/store';
import * as init from './DataTableStoreInit.js'


export const debug          = init.create_debug()
export const columns        = init.create_columns()
export const data           = init.create_data()


export const view_edit_inline     = init.create_view_edit_inline()
export const view_select_multiple = writable(false)
export const view_text_filter     = init.create_view_text_filter()


//export const data_filtered  = init.create_data_filtered()
export const data_filtered = derived(
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



export function insert(insert_data) {}
export function update(uuid, update_data) {}
export function delete(uuid) {}

/*
function createStore() {
  const { subscribe, get, set, update } = writable({
    columns          : {},
    data             : {},
    data_filtered    : [],
    
    row_selected         : {},
    row_selected_reset   : {},
    row_create_new       : {},
    row_create_new_reset : {},

    view_edit_inline : false,

    count_all_data : derived(x) () => get( (x)  =>  x.data.length          ),
    count_filtered : () => get( (x)  =>  x.data_filtered.length ),

    unselect_rows  : () => update ( (x) => x.data.forEach(row => { row._is_selected = false })  ),

    insert : (data) => update( (x) => {}),
    update : (data) => update( (x) => {}),
    delete : (uuid) => update( (x) => {}),


    return {
      subscribe,
      cou
    }
  })
}
*/