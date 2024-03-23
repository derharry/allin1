import * as utils from '$lib/utils/inc.utils' 
import { select_all_from_table } from '$lib/utils/db.utils'


const _table_name = 'events'


export async function load({ params }) {
	utils.ps('+page.server.js load')
	return await select_all_from_table(_table_name)
	/*
	const dataset = await db.events.findMany({})
    console.log('dataset', dataset)
	return {
		data: dataset
	};
	*/
}