import { get_statistic } from '../lib/db/db.helper'



/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

    let statistic = await get_statistic()

	return {
        statistic
    }
}
