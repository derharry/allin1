export function load({ cookies }) {
	//console.log('server cookie', cookies.get('logged_in'))
	return {
		logged_in : cookies.get('logged_in') ? true : false
	}
}
