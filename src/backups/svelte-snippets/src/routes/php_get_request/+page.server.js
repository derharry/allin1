
export async function load ({ url }) {
	console.log('+page.server load(get)')
	let data = {}
	let php_request1 = {}
	let php_request2 = {}
	
	// direct key search
	let direct_get = url.searchParams.get('email');

	// get all key, values
	url.searchParams.forEach((value, key) => { php_request1[key] = value; });
	php_request2 = Object.fromEntries(url.searchParams)

	console.log('  url ', url.search);
	console.log('  data', data);
	console.log('  php_request1', php_request1);
	console.log('  php_request2', php_request2);
    
	return {
		data,
		php_request: php_request1
	}
}

export const actions =  {
	default: async() => {
		console.log('+page.server actions(get)..')
	}
}