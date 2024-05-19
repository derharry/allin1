import { db } from '$lib/db.server'  // import the centralized connection
import { generateUID, return_server_response } from '$zeelte/helpers/utils'

try {
    null
} catch (ex) {
    console.log(ex)
}

/**
 * depricated
 * @returns 
 */
export async function get_category_list () {
    return get_treeview_of_categories()
}

/**
 * return the category list in a 2 class treeview style
 * @returns object {
 *    main_category_uuid: {
 *          name: main_category_name,
 *          subs: {
 *              sub_category_uuid: {
 *                  name: sub_category_name,
 *                  subs: {}
 *              }
 *          } 
 *    }
 * }
 */
export async function get_treeview_of_categories () {
    try {
        // select all categories
        // SELECT * FROM gp_categories ORDER BY parent_id ASC, name ASC
        let dataset = await db.gp_categories.findMany({
            orderBy: [
                { parent_uuid: 'asc' },
                { name: 'asc' }
            ]
        })
        //console.log(dataset)

        // create a tree view
        let treeview = {}
        for (let row of dataset) {
            if (row.parent_uuid == null) {
                treeview[row.uuid] = { name: row.name, subs: {} }
                treeview[row.uuid].name = row.name
                treeview[row.uuid].subs = {}
            } else {
                //if (treeview[row.parent_uuid]) // just prevent breaks if data is screwed up

                treeview[row.parent_uuid].subs[row.uuid] = { name: row.name, subs: {} }
            }
        }
        //console.log(treeview)
        return treeview

    } catch (ex) {
        console.log(ex)
    }
}


export async function get_list_of_companies (category) {
    try {
        let list = []

        // get all companies or just by category
        
        if (category == '*')  {
            // SELECT * FROM gp_companies WHERE category
            list = db.gp_companies.findMany()  
        } 
        else {
            // SELECT * FROM gp_companies WHERE category = category
            list = await db.gp_companies.findMany({ where: { category } })  
        }

        //console.log(list)

        return list
    } catch (ex) {
        console.log(ex)
    }
}



/**
 * get GP statistics
 * @returns object
 */
export async function get_statistic () {
    try {
        let statistic = {}
        
        // SELECT count(*) FROM gp_companies
        // SELECT * FROM gp_companies WHERE is_public = true
        // SELECT * FROM gp_companies WHERE is_public = false
        statistic.companies_total    = await db.gp_companies.count()
        statistic.companies_public   = await db.gp_companies.count({ where: { is_public: true } })
        statistic.companies_unpublic = await db.gp_companies.count({ where: { is_public: false } })

        return statistic
    } catch (ex) {
        console.log(ex)
    }
}


export async function register_company (data, admin = false) {
    try {
        console.log('register company', data)
        let ds
        // check if company name already exists

        // if admin == true  update existing
        // else create new
        if (admin) {
            // grap the uuid and delete from data
            let uuid = data.uuid
            delete data.uuid
            ds = await db.gp_companies.update({
                data,
                where: {
                    uuid
                }
            })
        } 
        else {
            // prevent injection
            data.uuid      = null    // done by DBS default primary key UUID
            data.is_public = null    // done by DBS default bool false
            data.is_public_by = null 
            ds = await db.gp_companies.create({  data  })
        }

        //console.log(uuid, ds)

        return return_server_response()
    } catch (ex) {
        console.log(ex)
        return return_server_response(500, ex.name +' '+ex.message, data, 'admin_category_insert' )
    }  
}


//#region ADMIN


/**
 * 
 * @param {string} name 
 * @param {string} optional parent_uuid of parent categorie. if set = sub_category else main_category
 */
export async function admin_category_insert(name, parent_uuid = null) {
    try {
        // we can prepare 1 insert statement to insert both - main and sub. we then not need a if/else

        // if parent_uuid is null we insert a root categorie
        //    we need to check if the categorie name exists already 
        //    (future todo - let it handle by DB-server)
        if (parent_uuid == null) {
            // SELET * FROM gp_categories WHERE name = name AND parent_id = null
            let x = await db.gp_categories.findFirst({ where: {  AND: [  { name: name }, { parent_uuid: null } ]  } })  // { where: name: name } just checks name
            if (x?.name == name) throw new Error(`Categorie ${name} already exists`)
        }

        // now we can insert the category of subcategoy
        // INSERT INTO gp_categories SET (name, uuid)
        // uuid: generateUID() not needed anymore - done by DBS and prisma @default(uuid())
        let newrow = await db.gp_categories.create({ 
            data: {   
                name, parent_uuid
            }
        })
        return return_server_response()

    } catch (ex) {
        //console.log('ex1', ex.code, 'ex2', ex.name, 'ex3', ex.message)
        if (ex?.code == 'P2002') {
            return return_server_response( 403, `${name} already exists`, { name, parent_uuid },  'admin_category_insert' )
        }
        return return_server_response(500, ex.name +' '+ex.message, { name, parent_uuid }, 'admin_category_insert' )
    }
}



/**
 * 
 * @param {string} uuid 
 * @param {string} name 
 * @param {string} parent_uuid  not needed yet - future feature to move subcats to other maincat
 */
export async function admin_category_update (uuid, name, parent_uuid = null) {
    try {
        // UPDATE name = name FROM gp_categoreis WHERE uuid = uuid
        let res = await db.gp_categories.update({ data: {  name }, where: { uuid } })
        //console.log(res)
        return return_server_response()
    } catch (ex) {
        //console.log('ex1', ex.code, 'ex2', ex.name, 'ex3', ex.message)
        if (ex?.code == 'P2002') {
            return return_server_response( 403, `${name} already exists`, { name, uuid },  'admin_category_update' )
        }
        return return_server_response(500, ex.name +' '+ex.message, { name, parent_uuid, error }, 'admin_category_update' )
    }
}



/**
 * 
 * @param {string} uuid 
 */
export async function admin_category_delete (uuid) {
    try {
        //DELETE FROM gp_categories WHERE uuid = uuid
        let ds = await db.gp_categories.delete({ where: { uuid } })
        console.log(ds)
        return return_server_response()
    } catch (ex) {
        console.log(ex)
        if (ex?.code == 'P2003') {
            return return_server_response( 400, `Cannot delete categorie. Categorie may not have child categories or companies`,  'admin_category_update' )
        }        
        return return_server_response(500, ex.name +' '+ex.message, { uuid, ex }, 'admin_category_delete' )
    }
}



/**
 * 
 * @param {string} uuid 
 */
export async function admin_company_toggle_public (uuid) {
    try {
        // first get current value of public
        // toggle it
        // update value of public
        let ds

        // SELECT public FROM gp_companies WHERE uuid = uuid
        // UPDATE public FROM gp_companies WHERE uuid = uuid
        ds = await db.gp_companies.findFirst({ where: { uuid } })
        ds.is_public = ds.is_public == false ? true : false
        ds = await db.gp_companies.update({ data: ds, where: { uuid } })

        return return_server_response()
    } catch (ex) {
        console.log(ex)     
        return return_server_response(500, ex.name +' '+ex.message, { uuid, ex }, 'admin_category_delete' )
    }
}



/**
 * 
 * @param {string} uuid 
 */
export async function admin_company_update (uuid, data) {
    try {
        // first get the ds
        // update ds with content in data
        // save changes to dbs

        // SELECT public FROM gp_companies WHERE uuid = uuid
        ds = db.gp_companies.findFirst({ where: { uuid } })
        // update ds
        for (let [key, value] in ds) {
            console.log(key, value)
            ds[key] = data[key]
        }
        // UPDATE ...ds FROM gp_companies WHERE uuid = uuid
        ds = db.gp_companies.update({ where: { uuid }, ds })


        return return_server_response()
    } catch (ex) {
        console.log(ex)     
        return return_server_response(500, ex.name +' '+ex.message, { uuid, error }, 'admin_category_delete' )
    }
}



/**
 * 
 * @param {string} uuid 
 */
export async function admin_company_delete (uuid) {
    try {
        //DELETE FROM gp_companies WHERE uuid = uuid
        await db.gp_companies.delete({ where: { uuid } })
        return return_server_response()
    } catch (ex) {
        console.log(ex)     
        return return_server_response(500, ex.name +' '+ex.message, { uuid, error }, 'admin_category_delete' )
    }
}

//#endregion


