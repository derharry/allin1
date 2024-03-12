import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies, url }) => {
		console.log('login  cookie');
		cookies.set('logged_in', 'true', { path: 'dashboard' });
		throw redirect(302, url.searchParams.get('redirectTo') ?? 'dashboard');
	}
};
