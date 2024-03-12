import { writable, readable, derived } from 'svelte/store';


export function create_debug() {
    const { subscribe, set, update } = writable(true);
    return  {
        subscribe,
        toggle: () => update( (b) => b ? false:true ) 
    }
}

export function create_columns() {  
    const { subscribe, set, update } = writable({});
    return  {
        subscribe, set
    }
}

export function create_data() { 
    const { subscribe, set, update } = writable([]);
    return  {
        subscribe, set,
        ping:           ()        => update( (dt) => dt = dt ),
        insert:         (rowdata) => update( (dt) => dt = [ ...rowdata , dt ] ),
        delete_by_uuid: (uuid)    => update( (dt) => dt.filter( row => {  if (row.uuid != uuid) { return row } } ) ),
        update_by_uuid: (uuid, rowdata) => update( (dt) => dt.forEach( row => { if (row.uuid == uuid) { row = utils.copy_key_value_list_to(rowdata, row) } } ) ),
    }
}

export function create_data_filtered() {
    const { subscribe, set, update } = writable([]);
    return  {
        subscribe,
        set,
        update
    }
}

export function create_view_edit_inline() {
    const { subscribe, set, update } = writable(true);
    return  {
        subscribe,
        toggle: () => update( (b) => b ? false:true )
    }
}

export function create_view_text_filter() {
    const { subscribe, set, update } = writable('');
    return  {
        subscribe,
        set,
        update
    }
}
