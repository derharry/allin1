

import { get_company_info, get_list_of_companies } from '../lib/db/db.helper';



/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	if (params.slug.startsWith('c')) {
		let slug = params.slug.substring(1)
		let company_list = await get_list_of_companies( slug )
		//console.log('slug/+page.server.js/load()/category', company_list)
		return {
			company_list
		}
	}
	else if (params.slug.startsWith('b')) {
		let slug = params.slug.substring(1)
		let company_info = await get_company_info( slug )
		//console.log('slug/+page.server.js/load()/company_info', company_info)
		return {
			company_info
		}
	} 
	return { 
		error: true
	}
}

