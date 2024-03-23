import * as utils from '$lib/utils/inc.utils.js'
import { db } from '$lib/utils/db.server.connect'
import { select_all_from, prepare_data_for_insert, prepare_data_for_update, parse_error } from '$lib/utils/db.utils.server'

const _table_name = 'users'

export async function load({ params }) {
    return select_all_from(_table_name)
    let data = await select_all_from(_table_name)
    return {
        data: data.dataset[0],
        fields: data.fields
    }
	
}


/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ cookies, request, event }) => {
        let url  = '$page.url +page.server.js ?/create'
        let data = {}
        try {
            // read the form data into the array php-style
            data = await utils.grab_http_post_form_data(request)
            prepare_data_for_insert(data)
            data.active = data.active == 'on' ? true : false

            // insert data into database
            let newrow = await db.users.create({ data })
            utils.cl(data)

            return utils.return_json_response_attributes(url, newrow, true, 201, '')
        }
        catch (error) {
            return parse_error(error, url, data)
        }
    },
    update: async ({ cookies, request, event }) => {
        let url  = '$page.url +page.server.js ?/update'
        let data = {}
        try {
            // read the form data into the array php-style
            data = await utils.grab_http_post_form_data(request)
            let uuid = data.uuid
            prepare_data_for_update(data)
            data.active = data.active == 'on' ? true : false
            
            // update data to database
            let updatedrow = await db.users.update({ 
                where: {
                    uuid: uuid
                },
                data
            })

            return utils.return_json_response_attributes(url, updatedrow, true, 202, '')
        } 
        catch (error) {
            return parse_error(error, url, data)
        }
    },
    delete: async ({ cookies, request, event }) => {
        let url  = '$page.url +page.server.js ?/delete'
        let data = {}
        try {
            // read the form data into the array php-style
            data = await utils.grab_http_post_form_data(request)
            let uuid = data.uuid
            
            // update data to database
            let deletedrow = await db.users.delete({ 
                where: {
                    uuid: uuid
                }
            })

            return utils.return_json_response_attributes(url, deletedrow, true, 203, '')
        }
        catch (error) {
            return parse_error(error, url, data)
        }
    }
}