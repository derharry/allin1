/*

admin/companies


*/

import { admin_company_delete, admin_company_toggle_public, get_category_list, admin_get_company_list_by_public_show, register_company } from "../../lib/db.controller"



export async function load({ params, url }) {
    try {

        let show = url.searchParams.get('show')

        let res_companies = await admin_get_company_list_by_public_show(show);
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
    } catch (error) {
        console.log(error)
    }
}



/** @type {import('./$types').Actions} */
export const actions = {
    toggle_public: async ( {request} ) => {
        //toggle the public state
        const formData = await request.formData()
        let uuid  = formData.get('uuid')
        let res   = await admin_company_toggle_public(uuid)
        return res
    },
	update_company: async ( {request} ) => {
		// update the name
		const formData = await request.formData()
		let data = {}
		formData.forEach((value, key) => { data[key] = value});
        let res = register_company(data, true)
		res.action   = 'update_company'
		res.formid   = formData.get('formid')
		return res
	},
	delete_company: async ( {request} ) => {
		const formData = await request.formData()
		let uuid   = formData.get('uuid')
		let res    = await admin_company_delete(uuid)
		res.action = 'delete_category'
		res.formid = formData.get('formid')
		return res
	}
};