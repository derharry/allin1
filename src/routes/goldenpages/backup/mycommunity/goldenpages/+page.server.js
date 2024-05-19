import { get_category_list, get_statistic } from './lib/db/db.helper';


const db_file_path = 'src/routes/mycommunity/goldenpages/lib/db/database.json'

/**
 * return list of categories and sub_categories
 */
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	try {
		let category_list = await get_category_list()
		let statistic     = await get_statistic()
		//console.log(category_list)
		return {
			category_list,
			statistic
		}
	} catch (ex) {
		console.log('exp', ex)
	}
	return false
}

