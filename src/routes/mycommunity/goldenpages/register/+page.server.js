


/** @type {import('./$types').Actions} */
export const actions = {
	register: async ( {request} ) => {

		const formData = await request.formData();
		let data = {}

		// grap all values into data
		formData.forEach((value, key) => { data[key] = value});

		//validate formData
		console.log('formData', formData)
		console.log('data', data)

		// if validated
		if (true) {
			//writeFile('../')
		} 
		
		return data
	}
};

