import { register_company } from '../lib/db/db.helper';


/** @type {import('./$types').Actions} */
export const actions = {
	register: async ( {request} ) => {
		const formData = await request.formData()
		let data = {}
		formData.forEach((value, key) => { data[key] = value});
		let res = register_company(data)
		return res
	}
};

