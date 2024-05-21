/*

main public page - start of the journey

*/


// imports
import { get_category_list, get_statistics } from './lib/db.controller'



/**
 * return list of categories and sub_categories
 */
/** @type {import('./public/$types').PageServerLoad} */
export async function load({ params }) {
	try {
        // return the category_list
        let res_cats  = await get_category_list()
        let res_stats = await get_statistics()

        if (!res_cats.ok) 
            throw new Error('Problem loading list of categories')

        // todo change get_statistics to get_server_response() in db.controller.js
        //if (!res_stats.ok)
        //    throw new Error('Problem loading list of statistics')

        return {
            category_list: res_cats.data,
            statistics:    res_stats
        }

	} catch (ex) {
		console.log('exp', ex)
	}
}

