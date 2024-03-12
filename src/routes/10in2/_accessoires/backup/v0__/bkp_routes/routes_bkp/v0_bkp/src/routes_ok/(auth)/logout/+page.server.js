import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		console.log('logout cookie');
		cookies.delete('logged_in', { path: '/' });
		throw redirect(302, '/');
	}
};
