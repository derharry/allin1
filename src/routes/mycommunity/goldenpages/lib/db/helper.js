const { writeFile } = require('fs')

// import the database
import database from './database.json'


/**
 * returns list of categories and subcategories out of all db-entries
 * mainly used only for the goldenpages/+page.svelte with categegories
 * it simulates at the moment a own table for this
 * @returns array [
 *      category_name : [ (subcategory_name), ... ]
 * ]
 */
export const get_category_list = () => {
    let category_list = {}
    database.forEach( (item) => {
        // add category
        if ( ! category_list[item.category] ) {
            category_list[item.category] = []
        }
        // add subcategory
        if ( ! category_list[item.category].includes( item.subcategory ))
            category_list[item.category].push(item.subcategory)
    })
    //console.log(category_list)
    return category_list
}



/**
 * returns list of companies by category
 * @returns array [
 *      { (company_values) }, 
 *      ...
 * ]
 */
export const get_list_of_companies = (category) => {
    let company_list = []
    database.forEach( (item) => {
        if ( item.subcategory == category) { //&& ! list.includes(item.name) ) {
            company_list.push( get_company_info(item.uuid) )
        }
    })
    //console.log('get_list_of_companies() ', company_list)
    return company_list
}



/**
 * returns key value list of company - without empty values
 * @returns array [
 *      { (company_key_value_list_not_empty) },
 *      ...
 * ]
 */
export const get_company_info = (uuid) => {
    let company_info = {}
    database.forEach( (item) => {
        if ( item.uuid == uuid )
            Object.entries(item).forEach( ([key, value]) => {
                //console.log('get_company_info() X ', key, value)
                if (value != '')
                    company_info[key] = value
            })
    })
    //console.log('get_company_info() Y ', company_info)
    return company_info
}



export const insert_company_info = (dataset) => {
    //database.push(dataset)
}