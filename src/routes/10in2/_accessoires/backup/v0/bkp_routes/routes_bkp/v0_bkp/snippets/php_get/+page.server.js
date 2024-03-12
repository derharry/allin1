
export async function load ({ url }) {
	let data;
	let get = {};
	
	data = url.searchParams.get('id');

	url.searchParams.forEach((value, key) => { get[key] = value; });
	console.log(':: ', value, key);
    
	return {
		'id': data,
		'php_get': get,
		'php_request': get
	}
}