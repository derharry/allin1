/*

slug controller

*/

import { get_company_list } from '../../lib/db.controller'




/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {

        let res_companies = await get_company_list( params.slug , true)

        if (!res_companies.ok)
            throw new Error('Problem loading list of companies')
    
        return {
            company_list:  res_companies.data
        }

        /* previous */
        /*
        if (params.slug.startsWith('c')) {
            let slug = params.slug.substring(1)
            let company_list = await get_company_list( slug )
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
        */        
    } catch (error) {
        console.log(error)
    }
}

