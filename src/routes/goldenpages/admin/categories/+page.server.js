/*

admin/categories

main admin page with statistical data

*/



// imports
import { admin_category_insert, admin_category_delete, admin_category_update, get_category_list } from '../../lib/db.controller'



/**
 * 
 * 
 *  @type {import('./$types').PageServerLoad} 
 */
export async function load() {
    try {
        
        // return the category_list
        let res_cats = await get_category_list(false)
        
        if (!res_cats.ok) 
            throw new Error('Problem loading list of categories')
	    //console.log(res_cats.data)

	    return {
		    category_list: res_cats.data
	    }

    } catch (e) {
        console.log(e)
    }
}



/** @type {import('./$types').Actions} */
export const actions = {

	insert_category: async ( {request} ) => {
        // insert new category - both main and sub categorie
        // if parent_uuid is null then its a main categorie
		const formData = await request.formData()
		let parent_uuid = formData.get('parent_uuid') || null        // grab parent_uuid - if none then null
		let name   = formData.get('name')                            // grab the name
		let res    = await admin_category_insert(name, parent_uuid)  // do the insert
		res.formid = formData.get('formid')                          // set back form info
		res.action = 'insert_category'                               // set back form info
		//console.log(res)
		return res
	},

    update_category: async ( {request} ) => { 
		// update the category name - both main and sub categorie
		const formData = await request.formData()
        let uuid   = formData.get('uuid')                  // grab the uuid
		let name   = formData.get('name')                  // grab the name
		let parent_uuid = formData.get('parent_uuid')      // not used yet - needed when subcats can be moved in ui todo
		let res    = await admin_category_update(uuid, name, parent_uuid) // do the update
		res.formid = formData.get('formid')              // set back form info
		res.action = 'update_category'                    // set back form info
		return res
    },
    
	delete_category: async ( {request} ) => {
        // delete category - both main and sub categorie
		const formData = await request.formData()
		let uuid   = formData.get('uuid')                  // grab the uuid
		let res    = await admin_category_delete(uuid)     // do deletion
        res.formid = formData.get('formid')                // set back form info
		res.action = 'delete_category'                     // set back form info
		return res
	}

}