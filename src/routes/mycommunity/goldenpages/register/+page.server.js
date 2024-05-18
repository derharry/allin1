import { get_treeview_of_categories, register_company } from '../lib/db/db.helper';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

    let category_list = await get_treeview_of_categories()

	//console.log(category_list)
	return {
        category_list
    }
}



/** @type {import('./$types').Actions} */
export const actions = {
	register: async ( {request} ) => {
		const formData = await request.formData()
		let data = {}
		formData.forEach((value, key) => { data[key] = value});
		console.log(data)
		let res = register_company(data)
		return res
	}
};

