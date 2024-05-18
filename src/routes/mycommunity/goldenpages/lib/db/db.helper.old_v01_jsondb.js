import { read_json, write_json } from '$zeelte/db/db.json'
import { generateUID, return_server_response } from '$zeelte/helpers/utils'

// import the database !! this way its cached until server restart - changed to zeelte read
// import database from './database.json'
// path to database file process.cwd() is root of allin1
const db_file_path      = 'src/routes/mycommunity/goldenpages/lib/db/database.json'
const db_cats_file_path = 'src/routes/mycommunity/goldenpages/lib/db/db.categories.json'


/**
 * returns list of categories and subcategories out of all db-entries
 * mainly used only for the goldenpages/+page.svelte with categegories
 * it simulates at the moment a own table for this
 * @returns array [
 *      category_name : [ (subcategory_name), ... ]
 * ]
 */
export async function get_category_list () {
    try {
        let database = await read_json(db_file_path)
        let category_list = {}
        //console.log('get_category_list()', database)
        
        database.forEach( (item) => {

            //if (item._is_public) {
                // add category
                if ( ! category_list[item.category] ) {
                    category_list[item.category] = []
                }
                // add subcategory
                if ( ! category_list[item.category].includes( item.subcategory ))
                    category_list[item.category].push(item.subcategory)
            //}
        })
        //console.log('get_category_list()', category_list)
        
        return category_list
    } catch (ex) {
        console.log(ex)
    }
}





/**
 * returns list of companies by category
 * @returns array [
 *      { (company_values) }, 
 *      ...
 * ]
 */
export async function get_list_of_companies (category) {
    try {
        let database = await read_json(db_file_path)
        let company_list = []
        //console.log('get_list_of_companies()', database)

        for (const item of database) {
            if (category == '*') {
                let data = await get_company_info(item.uuid)
                company_list.push(  data )
            }
            else if ( item.subcategory == category && item._is_public) {
                let data = await get_company_info(item.uuid)
                //console.log(data)
                company_list.push(  data )
                //console.log(company_list.length)
            }
        }
        /* OLD - has problems with async - its not waiting...
        database.forEach( (item) => {
            if ( item.subcategory == category) { //&& ! list.includes(item.name) ) {
                let data = get_company_info(item.uuid)
                company_list.push(  data )
                console.log(company_list.length)
            }
        })
        */
        
        //console.log('get_list_of_companies() ', company_list)
        //console.log(company_list.length)

        return company_list
    } catch (ex) {
        console.log(ex)
    }
}



/**
 * returns key value list of company - without empty values
 * @returns array [
 *      { (company_key_value_list_not_empty) },
 *      ...
 * ]
 */
export async function get_company_info (uuid) {
    try {
        let database = await read_json(db_file_path)
        let company_info = {}

        for (const item of database) {
            if ( item.uuid == uuid ) {
                for ( const [key, value] of Object.entries(item) ) {
                    //console.log(key, value)
                    if (value != '')
                        company_info[key] = value
                }
            }
        }
        /*
        /* OLD - has problems with async - its not waiting...
        await database.forEach( (item) => {
            if ( item.uuid == uuid )
                Object.entries(item).forEach( ([key, value]) => {
                    //console.log('get_company_info() X ', key, value)
                    if (value != '')
                        company_info[key] = value
                })
        })
        */
        //console.log('get_company_info() Y ', company_info)

        return company_info
    } catch (ex) {
        console.log(ex)
    }
}




export async function get_statistic () {
    try {
        let database  = await read_json(db_file_path)
        let statistic = {}

        statistic.total_companies = database.length
        statistic.total_companies_public = null
        for (const item of database) {
            if (item._is_public)
                statistic.total_companies_public += 1
        }
        statistic.total_companies_unpublic = database.length - statistic.total_companies_public


        return statistic
    
    } catch (ex) {
        console.log(ex)
    }    
}



export async function admin_get_dashboard_info() {
    try {
        let database = await read_json(db_file_path)

    } catch (ex) {
        console.log(ex)
    }  
}


/**
 * Insert new category name - only main cats
 * @param {string} name 
 * @returns ZeelteServerResponse
 */
export async function admin_category_add(name) {
    try {
        // read the db
        let category_list = await read_json(db_cats_file_path)

        // return nok when name exists
        // else insert the new category
        if (admin_category_name_check_unique(category_list, name)) {
            return return_server_response(403, 'Category already exists', name) 
        }
        else {
            // add new category to object-array
            category_list[name] = {
                uuid: generateUID(),
                subs: []
            }

            // sort the list to A-Z a-z
            category_list = admin_category_sort(category_list)

            // save the new list
            let res = await write_json(db_cats_file_path, category_list)
            if (res.ok) {
                return return_server_response()
            } else {
                res.url = 'admin_category_add()/' + res.url
                return res
            }
        }        
    } catch (ex) {
        console.log(ex)
        return return_server_response(500, null, name, 'admin_category_add()')
    }
}


/**
 * Updates the name of a category or subcategory by its uuid
 * @param {string} uuid 
 * @param {string} name 
 */
/*
export async function admin_category_update(uuid, name) {
    try {
        // read the db and set a new empty list
        let category_list_old = await read_json(db_cats_file_path)
        let category_list_new = {}

        // parse through the database
        // 1st - if match the main categories 
        //        - replace the name and add to new list
        // 2nd - else go through subcats 
        //       - if match the subcategory
        //         - replace the name
        //       - then add to new list
        for (let category in category_list_old) {
            if (category_list_old[category].uuid == uuid) {
                // return nok when name exists
                // else update the new category
                if (admin_category_name_check_unique(category_list_old, name)) {
                    return return_server_response(403, 'Category already exists', name) 
                }
                else {
                    category_list_new[ name ] = category_list_old[ category ]
                }
            }
            else {
                for (let subuuid in category_list_old[category].subs) {
                    if (subuuid == uuid) {
                        category_list_old[category].subs[subuuid] = name

                        // sort the sub list to A-Z a-z
                        category_list_old[category].subs = admin_subcategory_sort(category_list_old[category].subs)
                    }
                }
                category_list_new[ category ] = category_list_old[ category ]
            }
        }
        // sort the list to A-Z a-z
        category_list_new = admin_category_sort(category_list_new)
        //console.log(category_list_new)
        
        // save the new list
        let res = await write_json(db_cats_file_path, category_list_new)
        if (res.ok) {
            return return_server_response()
        } else {
            res.url = 'admin_category_update()/' + res.url
            return res
        }        
    } catch (ex) {
        console.log(ex)
        return return_server_response(500, null, name, 'admin_category_update()')
    }  
}
*/


function admin_category_name_check_unique(category_list, name, check_sub_cats = false) {
    // names are unique!
    let unique_match = false

    // check main cats (false)
    if (!check_sub_cats) {
        for (let category in category_list) {
            if (category == name) {
                unique_match = true
                break
            }
        }
    }
    // check sub cats
    else {
        console.log('update subcat')
    }
    return unique_match
}


/**
 * 
 * @param {*} list 
 * @returns 
 */
function admin_category_sort(list) {
    try {
        let new_list = {}
        let sorted = Object.keys(list).sort();
        for (let key of sorted) 
            new_list[key] = list[key]
        return new_list
        /*
        // sort the object-array A-Z
        let sorted, category_list_tmp
        sorted = Object.keys(category_list).sort();
        category_list_tmp = { ...category_list }
        category_list = {}
        for (let key of sorted) 
            category_list[key] = category_list_tmp[key]
        */
    } catch (ex) {
        console.log(ex)
    }
    return false
}


function admin_subcategory_sort(list) {
    try {
        let new_list = {}
        return list
    } catch (ex) {
        console.log(ex)
    }
    return false
}
