import { get_category_list } from './lib/db/db.helper';
import fs from 'node:fs'


const db_file_path = 'src/routes/mycommunity/goldenpages/lib/db/database.json'

/**
 * return list of categories and sub_categories
 */
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	try {
		let category_list = []
		category_list = await get_category_list()
		//console.log(category_list)
		return {
			category_list
		}
	} catch (ex) {
		console.log('exp', ex)
	}
	return false
}

