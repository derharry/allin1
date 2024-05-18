import { get_category_list_new, admin_category_insert, admin_category_update, admin_category_delete } from '../../lib/db/db.helper'
import { db } from '$lib/db.server'  // import the centralized connection


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let categories = await get_category_list_new()
	return {
		categories
	}
}



/** @type {import('./$types').Actions} */
export const actions = {
	insert_category: async ( {request} ) => {
		// insert the new name
		const formData = await request.formData()
		let parent_uuid = formData.get('parent_uuid') || null  // used for insert subcats. 0 is main cat // truncate starts from 1
		let name   = formData.get('name')
		let res    = await admin_category_insert(name, parent_uuid)
		res.action = 'add_category'
		res.formid = formData.get('formid')
		console.log(res)
		return res
	},
	update_category: async ( {request} ) => {
		// update the name
		const formData = await request.formData()
		let name     = formData.get('name')
		let uuid     = formData.get('uuid')
		let parent_uuid = formData.get('parent_uuid') // not used yet - needed when subcats can be moved
		let res      = await admin_category_update(uuid, name, parent_uuid)
		res.action   = 'update_category'
		res.formid   = formData.get('formid')
		return res
	},
	delete_category: async ( {request} ) => {
		const formData = await request.formData()
		let uuid   = formData.get('uuid')
		let res    = await admin_category_delete(uuid)
		res.action = 'delete_category'
		res.formid = formData.get('formid')
		return res
	}
};
