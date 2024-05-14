/** @type {import('../projects-archived/$types').PageLoad} */
export function load({ params, url }) {
    url.pathname; // retrigger page reload
	if (url.searchParams) {
		if (url.searchParams.has('post')) {
			return {
				uuid: crypto.randomUUID(),
				post: url.searchParams.get('post')
			}
		}
	}
	return {
		uuid: crypto.randomUUID()
	}
}