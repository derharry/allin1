

import { get_list_of_companies } from '../db/helper';



/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let company_list = get_list_of_companies( params.slug )
	//console.log('slug/+page.server.js/load()', company_list)
	return {
		company_list
	}
}

