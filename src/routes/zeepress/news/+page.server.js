
import { get_files_from_dir } from '$lib/zeelte/io/io.directory.js'
//import { p } from '$lib/zeelte/inc.utils.js'
//import * as utils from "$lib/zeelte/inc.utils"



/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let files = await get_files_from_dir('src/routes/zeepress/news/posts')
	return {
		files
	};
}