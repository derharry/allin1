/*

slug controller

*/

import { get_category_list, get_company_list_by_category, get_company_list_by_search } from '../lib/db.controller'




/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {

        let res_companies

        // perform search
        if (params.slug.startsWith('+')) {
            let slug = params.slug.substring(1)
            res_companies = await get_company_list_by_search( slug )
        }
        // select all via category_slug
        else {
            res_companies = await get_company_list_by_category(params.slug)   //( params.slug , true)
        }
        
        if (!res_companies.ok)
            throw new Error('Problem loading list of companies')

        // return the category_list
        let res_cats = await get_category_list()
        if (!res_cats.ok) 
            throw new Error('Problem loading list of categories')

        return {
            category_list: res_cats.data,
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

