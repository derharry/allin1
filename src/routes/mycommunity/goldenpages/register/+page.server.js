import { insert_company_info } from '../lib/db/db.helper';


/** @type {import('./$types').Actions} */
export const actions = {
	register: async ( {request} ) => {

		const formData = await request.formData();
		let data = {}

		// grap all values into data
		formData.forEach((value, key) => { data[key] = value});

		//validate formData
		//console.log('data', data)

		// if validated
		if (true) {
			if (insert_company_info(data)) {
				return {
					company_is_saved: true
				}
			}
			else {
				console.log('nope')
			}
		} 
		
		return data
	}
};

