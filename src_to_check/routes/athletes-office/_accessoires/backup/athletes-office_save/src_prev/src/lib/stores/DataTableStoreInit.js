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
        subscribe,
        set,
        update
    }
}

export function create_data() { 
    const { subscribe, set, update } = writable([]);
    return  {
        subscribe,
        set,
        updated: () => update( (v) => v = v )
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
