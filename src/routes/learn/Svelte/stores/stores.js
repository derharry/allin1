import { writable } from 'svelte/store';

// writeable store
export const count = writable(0);


//custom store
function createCount2() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}
export const count2 = createCount2();


// store bindings
import { derived } from 'svelte/store'; // + writable
export const name = writable('world');
export const greeting = derived(name, ($name) => `Hello ${$name}!`);

