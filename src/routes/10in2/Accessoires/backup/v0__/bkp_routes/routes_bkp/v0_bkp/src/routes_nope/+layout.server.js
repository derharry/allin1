import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	return {
		logged_in : !cookies.get('logged_in') ? false : true
	}
}
