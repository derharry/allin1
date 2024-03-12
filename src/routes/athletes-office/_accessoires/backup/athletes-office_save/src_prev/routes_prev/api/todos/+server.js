import { db } from '$lib/utils/db.server'
import { json } from '@sveltejs/kit'
//import { Todo } from '$lib/models/todo'


export async function GET(event) {
	const dataset = await db.todos.findMany({})
	return json(dataset)
}


export async function POST() {
	
}