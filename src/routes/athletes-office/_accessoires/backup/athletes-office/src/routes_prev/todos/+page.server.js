import { db } from '$lib/utils/db.server'
//import { Todo } from '$lib/models/todo'


export async function load({ params }) {
	//console.log('load', fixture)
	const response = await db.todos.findMany({})
	return {
		data: response
	};
}


/** @type {import('./$types').Actions} */
export const actions = {
	addTodo:  async ({ cookies, request, event }) => {
		const data = await request.formData();
		const text = data.get('todoText');
		let newrow = await db.todos.create({
			data: {
				uuid: crypto.randomUUID(),
				text: text
			}
		})
		//console.log(newrow)
	},
	deleteTodo: async ({ cookies, request, event }) => {
		console.log('deleteNote')
		const data = await request.formData();
		const uuid = data.get('uuid');
		console.log(uuid)
		let x = await db.todos.delete({ 
			where: {
				uuid: uuid
			}
		})
	},
	saveTodo: async ({ cookies, request, event }) => {
		console.log('saveNote')
		const data = await request.formData()
		const uuid = data.get('uuid')
		const text = data.get('text')
		console.log(text, data)
		let x = await db.todos.update({ 
			where: {
				uuid: uuid
			},
			data: {
				text: text
			}
		})
	},
	addMemo: async (event) => {
		// TODO register the user
		console.log('addMemo')
	},
	none: async (event) => {
		console.log('none')
	}
};
