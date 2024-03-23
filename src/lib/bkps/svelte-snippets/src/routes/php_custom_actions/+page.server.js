export async function load ({ url }) {
	console.log('+page.server load(get)')
	let data = {}
	let request = {}
	
	// direct key search
	let direct_get = url.searchParams.get('email');

	// get all key, values
	request = Object.fromEntries(url.searchParams)

	console.log('  url ', url.search);
	//console.log('  data', data);
	console.log('  request', request);
    
	return {
		data,
		request
	}
}


export const actions =  {
	default: async() => {
		console.log('+page.server actions(get)..')
	}
}