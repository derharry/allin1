import { get_list_of_companies } from '../../lib/db/db.helper'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

    let list = await get_list_of_companies('*')
    //let statistic = await get_statistic()

	return {
        list
    }
}