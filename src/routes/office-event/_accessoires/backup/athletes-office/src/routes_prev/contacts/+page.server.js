import { db } from '$lib/utils/db.server'


export async function load({ params }) {
	console.log('load contacts')
	const response = await db.contacts.findMany({})
	console.log(response)
	return {
		data: response
	};
}


/** @type {import('./$types').Actions} */
export const actions = {
	addContact:  async ({ cookies, request, event }) => {
		const data = await request.formData();
		const text = data.get('todoContact');
		let newrow = await db.contacts.create({
			data: {
				uuid: crypto.randomUUID(),
				text: text
			}
		})
		//console.log(newrow)
	},
	deleteContact: async ({ cookies, request, event }) => {
		console.log('deleteContact')
		const data = await request.formData();
		const uuid = data.get('uuid');
		console.log(uuid)
		let x = await db.contacts.delete({ 
			where: {
				uuid: uuid
			}
		})
	},
	saveContact: async ({ cookies, request, event }) => {
		console.log('saveContact')
		const data = await request.formData()
		const uuid = data.get('uuid')
		const text = data.get('text')
		console.log(uuid)
		let x = await db.todo.update({ 
			where: {
				uuid: uuid
			},
			data: {
				text: text
			}
		})
	}
};
