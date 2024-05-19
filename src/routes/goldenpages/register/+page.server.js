/*

register company

*/

import { get_category_list, register_company } from '../lib/db.controller';



/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        
        // return the category_list
        let res_cats = await get_category_list()
        
        if (!res_cats.ok) 
            throw new Error('Problem loading list of categories')
	    //console.log(res_cats)

	    return {
		    category_list: res_cats.data
	    }

    } catch (e) {
        console.log(e)
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
	register: async ( {request} ) => {
		const formData = await request.formData()
		let data = {}
		formData.forEach((value, key) => { data[key] = value});
		let res = register_company(data, false)
		return res
	}
};