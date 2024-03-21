import { writable } from 'svelte/store';

export const test = writable([
    { name: 'me' }
]);


const ds = [ {name:'me'} ];
function createUsers() {
    let { subscribe, set, update } = writable(ds);
    return {
        subscribe,
        insert: (value) => {
            set([
                ...ds,
                {'name':value},
            ]
            );
        }
    }
}

//export const users = writable([ {name:'me'} ]);
export const users = createUsers();