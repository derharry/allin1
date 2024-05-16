import { insert_company_info } from '../lib/db/db.helper';


/** @type {import('./$types').Actions} */
export const actions = {
	register: async ( {request} ) => {

		const formData = await request.formData();
		let data = {}

		// grap all values into data
		formData.forEach((value, key) => { data[key] = value});

		//validate formData
		//console.log('formData', formData)
		//console.log('data', data)

		// if validated
		if (true) {
			insert_company_info(data)
		} 
		
		return data
	}
};

