export const actions = {
	default: async ({cookies, request, event}) => {
		let php_form  = {}
		let php_form1 = {}
		
		const formData  = await request.formData();		
		const formData1 = formData;

		formData.forEach((value, key) => (php_form[key] = value));
		console.log(php_form);
		
        php_form1 = Object.fromEntries(formData1)
		console.log(php_form1);

		return {
			'id': 'id',
			'php_post':  php_form,
			'php_post1': php_form1
		}
	},
}