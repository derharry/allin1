import { derived, readable, writable } from 'svelte/store';
import { promise } from '$lib/stores/datatransferStore';
import * as utils from '$lib/utils/inc.utils.js';

class Todo {        
	guid = ''
	text = ''
	todo_by = ''
	date_untill  = ''
	date_created = ''
	date_changed = ''
}


export const todoStore         = writable([]);
export const todoStorePromise  = writable()
export const todoStoreRefresh  = () => loadStore();


const loadStore = async () => {
    try {
        const response = await fetch('/api/todos');
        promise.set(response)
        const data = await response.json();
        todoStore.set(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
loadStore();


/*
function initStore() {
	const { subscribe, set, update } = writable(new Map);
    loadStore()
	return {
		subscribe,
		addTodo: () => update((n) => n + 1),
		deleteTodo: () => update((n) => n - 1),
        updateTodo: () => update((n) => n - 1),
		reset: () => set([])
	};
}
*/
//export const todoStore = initStore();

/*
export const todoStoreFiltered = derived(
    [todoStore, todoStoreFilter], 
    ([$todoStore, $todoStoreFilter]) => {
        utils.p('derived')
        $todoStore.filter(row =>  
            row.($todoStoreFilter) 
        ));
    }
);
*/

/*
$: {
    let saveStore = todoStore
    //let datasetSave = todoStore //.filter(row => row.changed == true || row.new == true);
    //utils.p(datasetSave)
}

export const addTodo = async ({ cookies, request, event }) => {
    // prepare POST vars

    // update to API (mysql)
    // send POST
    //const response = await fetch('/api/todos');
    //const data = await response.json();
    // from update new row is returned with uuid
    // add row to store


    	const text = data.get('todoText');
		let newrow = await db.todos.create({
			data: {
				uuid: crypto.randomUUID(),
				text: text
			}
		})
}

export const deleteTodo = async () => {}
export const updateTodo = async () => {}
*/