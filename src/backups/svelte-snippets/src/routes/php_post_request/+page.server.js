export async function load ({ url }) {
	console.log('+page.server load(post)')
	let data = {}
	let php_request = {}

	php_request = Object.fromEntries(url.searchParams)
	console.log('  php_request', php_request);

	return {
		data,
		php_request
	}
}	
	
export const actions = {
	default: async ({cookies, request, event}) => {
		console.log('+page.server actions(post)..')
		let data = {}
		let php_request1 = {}
		let php_request2 = {}
		
		const formData  = await request.formData();		

		// get all key, values
		formData.forEach((value, key) => { php_request1[key] = value});
		php_request2 = Object.fromEntries(formData)

		console.log('  data$', data);
		//console.log('  form$', form);
		console.log('  php_request1$', php_request1);
		console.log('  php_request2$', php_request2);
		
		return {
			data,
			php_request: php_request1
		}
	},
}