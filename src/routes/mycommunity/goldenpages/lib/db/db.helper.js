import { read_json, write_json } from '$zeelte/db/db.json'
import { generateUID } from '$zeelte/helpers/utils'


// import the database !! this way its cached until server restart - changed to zeelte read
// import database from './database.json'
// path to database file process.cwd() is root of allin1
const db_file_path = 'src/routes/mycommunity/goldenpages/lib/db/database.json'
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

            if (item._is_public) {
                // add category
                if ( ! category_list[item.category] ) {
                    category_list[item.category] = []
                }
                // add subcategory
                if ( ! category_list[item.category].includes( item.subcategory ))
                    category_list[item.category].push(item.subcategory)
            }
        })
        //console.log('get_category_list()', category_list)
        
        return category_list
    } catch (ex) {
        console.log(ex)
    }
}


export async function get_category_list_new () {
    try {

        let ds_categories = await read_json(db_cats_file_path)
        

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



export async function insert_company_info (dataset) {
    try {
        let database = await read_json(db_file_path)

        dataset.uuid = generateUID()
        
        dataset.date_inserted = new Date().getTime()
        dataset._date_changed = ""
        dataset._is_public = false
        dataset._is_set_public_by = ''
        dataset._is_set_public_on = ''

        database.push(dataset)
        //console.log('insert_company_info()', database)
        await write_json(db_file_path, database)
    } catch (ex) {
        console.log(ex)
    }
}



export async function get_statistic () {
    try {
        let database  = await read_json(db_file_path)
        let statistic = {}

        statistic.total_companies = database.length
        statistic.total_companies_public = 0
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