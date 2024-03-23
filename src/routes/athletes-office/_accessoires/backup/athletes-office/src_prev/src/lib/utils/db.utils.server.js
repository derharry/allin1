import * as utils from '$lib/utils/inc.utils.js'
import { db } from '$lib/utils/db.server.connect'
import { Prisma } from '@prisma/client'


const _columns_add_to_rows = {
    _is_new      : false,
    _is_updated  : false,
    _is_deleted  : false,
    _is_selected : false
}

const columns_invisible_in_UI_by_default = [ 'id', 'uuid', 'created_at', 'updated_at', 'deleted_at' ]
const columns_internal_by_default = [ 'created_at', 'updated_at', 'deleted_at' ]


/**
 * overwrite id, uuid in case given by form
 * @param {object} data 
 * @returns data
 */
export function prepare_data_for_insert(data) {
    delete data?.id
    data["uuid"] = crypto.randomUUID()
    return data
}

/**
 * remove id, uuid - may not be changed
 * @param {object} data 
 * @returns 
 */
export function prepare_data_for_update(data) {
    delete data?.id
    delete data?.uuid
    return data
}

/**
 * 
 * @param {*} table_name 
 * @returns 
 */
export async function select_all_from(table_name) {
    try{
        //utils.pp('db.utils select_all_from_table()')
        //utils.p(table_name)
        const dataset = await db[table_name].findMany({})
        const fields  = await get_columns_info(table_name)
        dataset.forEach(row => (Object.assign(row, _columns_add_to_rows)))
        //utils.p(dataset)
        return {
            fields,
            dataset
        }
    } catch (e) {
        utils.handle_exception(e)
    }
}

export async function get_columns_info(table_name) {
    //source: https://github.com/prisma/prisma/issues/5018
    //utils.pp('db.utils get_columns_info()')
    const all = Prisma.dmmf.datamodel.models.map(
        model => [
            model.name,
            model.fields.map(n=>n.name),
            model.fields.map(t=>t.type)
        ]
    )
    //utils.pp('all', all)
    let datafields = {}
    all.forEach( (table) => {
        if (table[0] == table_name) {
            //utils.pp('table', table[0])
            table[1].forEach((fieldname, i) => {
                datafields[fieldname] = {
                //const _datafields = {}
                //utils.cl(fieldname)
                //_datafields[fieldname] = {
                    text:          fieldname,
                    default:       '',
                    type:          //fieldname == 'password' ? 'Password' :   
                                        columns_internal_by_default.includes(fieldname) ? '_internal_' :
                                            table[2][i], //.toLocaleLowerCase(),
                    placeholder:   fieldname,
                    foreign_key:   null,
                    low_value:     '',
                    max_value:     '',
                    is_visible:   columns_invisible_in_UI_by_default.includes(fieldname) ? false : true
                }
                //Object.assign(datafields, _datafields)
            });
            // add internal variables
            Object.keys(_columns_add_to_rows).forEach(key => {
                datafields[key] = {
                    text:          key,
                    default:       null,
                    type:          '_internal_',
                    placeholder:   '_internal_',
                    foreign_key:   null,
                    _is_visible:   false
                }
            })
        }
    })
    //utils.pp('dataset', dataset)
    return datafields
}


export function parse_error(error, url, data) {
    utils.ps('ERROR')
    let ret
    let status = 69
    let statusText = ''
    switch (error.code) {
        case 'tmpl':  status = 69;  statusText = ''
                    break
        case 'P2002': status = 500; statusText = 'Email already exist'
                    break
        case 'P2025': status = 500; statusText = 'Data to update not found'
                    break
        default:      statusText = JSON.stringify(error)
                    break
    }
    ret = utils.return_json_response_attributes(url, data, false, status, statusText)
    status == 69 ? utils.cl({error})  : utils.cl({ret})
    utils.ps('/ERROR')
    return ret
}