import { get_category_list, get_category_list2 } from './db/helper';


/**
 * return list of categories and sub_categories
 */
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let category_list = get_category_list()
	//console.log(category_list)
	return {
		category_list
	}
}

