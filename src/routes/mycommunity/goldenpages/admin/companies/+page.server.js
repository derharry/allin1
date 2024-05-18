import { get_list_of_companies, admin_company_toggle_public, admin_company_update, admin_company_delete } from '../../lib/db/db.helper'


export async function load({ params }) {

    let list = []
    list = await get_list_of_companies('*')
    //let statistic = await get_statistic()

    //console.log( params)

	return {
        list
    }
}




/** @type {import('./$types').Actions} */
export const actions = {
    toggle_public: async ( {request} ) => {
        const formData = await request.formData()
        let uuid  = formData.get('uuid')
        let res   = await admin_company_toggle_public(uuid)
        return res
    },
	update_company: async ( {request} ) => {
		// update the name
		const formData = await request.formData()
		let name     = formData.get('name')
		let uuid     = formData.get('uuid')
		let parent_uuid = formData.get('parent_uuid') // not used yet - needed when subcats can be moved
		let res      = await admin_company_update(uuid, name, parent_uuid)
		res.action   = 'update_category'
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


