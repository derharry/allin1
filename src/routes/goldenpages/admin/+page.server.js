/*

admin/dashboard

main admin page with statistical data



*/



// imports
import { get_statistics } from '../lib/db.controller'



/**
 * load statistical data
 * 
 *  @type {import('../$types').PageServerLoad} 
 */
export async function load() {
    try {

        // get statistical data
        let stats = await get_statistics()

        return {
            stats
        }
        
    } catch (e) {
        console.log(e)
    }
}
