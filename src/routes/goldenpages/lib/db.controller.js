/*

Golden Pages DB Controller

Layer between Svelte and Server

*/

import { db } from "$lib/db.server"
import { generateUID } from "$zeelte/helpers/utils"



/**
 * collect database statistics
 * @returns object
 */
export async function get_statistics() {
    try {
        let stats = {}

        // SELECT count(*) FROM gp_companies
        // SELECT * FROM gp_companies WHERE is_public = true
        // SELECT * FROM gp_companies WHERE is_public = false
        stats.companies_total    = await db.gp_companies.count()
        stats.companies_public   = await db.gp_companies.count({ where: { is_public: true } })
        stats.companies_unpublic = await db.gp_companies.count({ where: { is_public: false } })
        //console.log(stats)

        return stats
    } catch (error) {
        console.log(error)
    }
}



/**
 * return the category list in a 2 class treeview style
 *    main_category_uuid: {
 *          name: main_category_name,
 *          subs: {
 *              sub_category_uuid: {
 *                  name: sub_category_name,
 *                  subs: {}
 *              }
 *          } 
 *    }
 * @returns object
 */
export async function get_category_list () {
    try {
        let treeview = {}
        let dataset  = []

        // select all categories
        // SELECT * FROM gp_categories ORDER BY parent_id ASC, name ASC
        dataset = await db.gp_categories.findMany({
            orderBy: [
                { parent_uuid: 'asc' },
                { name: 'asc' }
            ]
        })
        //console.log(dataset)

        // create a tree view - we only have a root/sub
        for (let row of dataset) {
            if (row.parent_uuid == null) {
                treeview[row.uuid] = { name: row.name, uuid: row.uuid, subs: {} }
            } else {
            //} else if (treeview[row.parent_uuid]) {
                //console.log(treeview[row.parent_uuid].subs)
                treeview[row.parent_uuid].subs[row.uuid] = { name: row.name, uuid: row.uuid, slug: row.slug, subs: {} }
                //treeview[row.parent_uuid].subs[row.uuid].name = row.name,
                //treeview[row.parent_uuid].subs[row.uuid].subs = {}
            }
        }
        //console.log(treeview)
        //return get_response_ok({})
        return get_response_ok(treeview)

    } catch (error) {
        return get_response_err('get_category_list', error)
    }
}



/**
 * get all companies or just by category of parent_uuid
 * @param {string} category_uuid * for all, uuid for specific categorie parent_uuid-
 * @returns 
 */
export async function get_company_list(category_uuid, by_slug = false) {
    try {

        let company_list = []

        if (category_uuid == '*')  {
            // SELECT * FROM gp_companies WHERE category
            company_list = await db.gp_companies.findMany({ orderBy: [ { name: 'asc' } ] })
        }
        else {
            // get the category_uuid first when by_slug
            if (by_slug) {
                let ds = await db.gp_categories.findFirst({ where: { slug: category_uuid }})
                category_uuid = ds.uuid
            }
            // SELECT * FROM gp_companies WHERE category_uuid
            company_list = await db.gp_companies.findMany({ where: { category_uuid }, orderBy: [ { name: 'asc' } ] })
        }
        //console.log(company_list)

        return get_response_ok(company_list)

    } catch (error) {
        return get_response_err('get_companies_list()', error)
    }
}


export async function get_company_list_by_search(search_string) {
    try {
        let company_list = []

        search_string = `%${search_string}%`
        // SELECT * FROM gp_companies WHERE name LIKE *search_string*, infotext *search_string*, 
        company_list = await db.gp_companies.findMany({ 
            where: { 
                OR: [
                    { name: { contains: search_string } },
                    { infotext: { contains: search_string } },
                    { urlwww: { contains: search_string } },
                    { tags: { contains: search_string } },
                ]
            }, 
            orderBy: [ { name: 'asc' } ] 
        })

        return get_response_ok(company_list)
        
    } catch (error) {
        return get_response_err('get_companies_list()', error)
    }
} 



/**
 * register or update a company
 * @param {object} data 
 * @param {bool} admin mode
 * @returns 
 */
export async function register_company (data, update = false) {
    try {
        //console.log('register company', data)
       
        // create empty dataset 
        // and copy required fields into empty dataset - so we do not need delete them or in future think about new fields
        let ds_new = {}
        for (let field in db.gp_companies.fields)  ds_new[field] = null
        for (let field in ds_new)  ds_new[field] = data[field]

        //console.log('register_company_data', data)
        //console.log('register_company_empty_dsset', ds_new)

        // prevent injection or even wrong updates or overwrite critical fields
        delete ds_new.uuid          // done by DBS default primary key UUID
        delete ds_new.is_public     // done by DBS default bool false
        delete ds_new.is_public_by  // set via admin_company_toggle_public
        delete ds_new.date_created  // done by DBS
        delete ds_new.date_updated  // done by DBS

        // if update == true  update existing
        // else create new
        if (update) {
            console.log('update')
            // grap the uuid and delete from data
            const uuid = data.uuid
            ds_new = await db.gp_companies.update({ data: ds_new, where: { uuid }})
        } 
        else {
            console.log('insert')

            // check if company name already exists
            {
                let ds = await db.gp_companies.findFirst({
                    where : { name : data.name }
                })
                if (ds != null)
                    throw new Error(`Company ${data.name} already exists`)
            }            

            console.log('insert', ds_new)
            ds_new = await db.gp_companies.create({  data: ds_new, }) //include: { gp_categories: false }
        }
        console.log('register_company_inserted', ds_new)

        return get_response_ok(ds_new)

    } catch (error) {
        console.log(error)
        return get_response_err('register_company()', error, data)
    }
}



//#region ADMIN


/**
 * Insert new main or sub category to database
 * @param {string} name 
 * @param {string} optional parent_uuid of parent categorie. if set = sub_category else main_category
 */
export async function admin_category_insert(name, parent_uuid = null) {
    try {
        if (name.length < 3)
            throw new Error(`Name ${name} must be longer than 3`)

        // we can do 1 insert for both main and sub category.
        // if parent_uuid = null then its a main categorie.
        // we need to check if the name of the main category already exists.
        // - this is not done yet by the DBS to throw an error
        
        // check if the name of main category already exists
        if (parent_uuid == null) {
            // SELET * FROM gp_categories WHERE name = name AND parent_id = null
            let x = await db.gp_categories.findFirst({ where: { AND: [  { name: name }, { parent_uuid: null } ] } })
            if (x?.name == name) 
                throw new Error(`Categorie ${name} already exists`)
        }


        // insert the new category
        // INSERT INTO gp_categories SET (name, parent_uuid)
        let newrow = await db.gp_categories.create({ data: {  name, slug: slugify(name), parent_uuid } })

        return get_response_ok(newrow)
    } catch (error) {
        return get_response_err('admin_category_insert', error, {name,parent_uuid})
    }
}




/**
 * Update category in database
 * @param {string} uuid 
 * @param {string} name 
 * @param {string} parent_uuid  not needed yet - future feature to move subcats to other maincat
 */
export async function admin_category_update (uuid, name, parent_uuid = null) {
    try {
        // UPDATE name = name FROM gp_categoreis WHERE uuid = uuid
        let res = await db.gp_categories.update({ data: {  name, slug: slugify(name) }, where: { uuid } })
        //console.log(res)
        return get_response_ok(res)
    } catch (error) {
        return get_response_err('admin_category_insert', error, {name,parent_uuid})
        // todo        
        //console.log('ex1', ex.code, 'ex2', ex.name, 'ex3', ex.message)
        //if (ex?.code == 'P2002') {
        //    return return_server_response( 403, `${name} already exists`, { name, uuid },  'admin_category_update' )
        //}
        //return return_server_response(500, ex.name +' '+ex.message, { name, parent_uuid, error }, 'admin_category_update' )
    }
}



/**
 * Delete category from database
 * @param {string} uuid 
 */
export async function admin_category_delete (uuid) {
    try {
        console.log('admin_category_delete()', 'uuid')
        //DELETE FROM gp_categories WHERE uuid = uuid
        let ds = await db.gp_categories.delete({ where: { uuid } })
        //console.log(ds)
        return get_response_ok(ds)
    } catch (error) {
        return get_response_err('admin_category_insert', error, { uuid })
        // todo        
        //console.log('ex1', ex.code, 'ex2', ex.name, 'ex3', ex.message)
        //if (ex?.code == 'P2002') {
        //    return return_server_response( 403, `${name} already exists`, { name, uuid },  'admin_category_update' )
        //}
        //return return_server_response(500, ex.name +' '+ex.message, { name, parent_uuid, error }, 'admin_category_update' )
    }
}


/**
 * toggle the is_public state of the company
 * @param {string} uuid of the company 
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

        return get_response_ok(ds)
    } catch (error) {
        console.log(error)
        return get_response_err('admin_category_insert', error, { uuid })
        
        if (ex?.code == 'P2003') {
            return return_server_response( 400, `Cannot delete categorie. Categorie may not have child categories or companies`,  'admin_category_update' )
        }        
        return return_server_response(500, ex.name +' '+ex.message, { uuid, ex }, 'admin_category_delete' )
    }
}



/**
 * delete the company from database
 * @param {string} uuid of the company 
 */
export async function admin_company_delete (uuid) {
    try {
        //DELETE FROM gp_companies WHERE uuid = uuid
        let ds = await db.gp_companies.delete({ where: { uuid } })
        return get_response_ok(ds)
    } catch (error) {
        console.log(error)
        return get_response_err('admin_category_insert', error, { uuid })
           
        return return_server_response(500, ex.name +' '+ex.message, { uuid, error }, 'admin_category_delete' )
    }
}



/**
 * DEPRICATED
 * update the company values
 * @param {string} uuid of the company
 * @param {object} data key value list with updated data
 */
export async function admin_company_update (uuid, data) {
    try {
        // first get the ds
        // update ds with content in data
        // save changes to dbs
        let ds

        // SELECT public FROM gp_companies WHERE uuid = uuid
        ds = db.gp_companies.findFirst({ where: { uuid } })
        // update ds
        for (let [key, value] in ds) {
            console.log(key, value)
            ds[key] = data[key]
        }
        // UPDATE ...ds FROM gp_companies WHERE uuid = uuid
        ds = db.gp_companies.update({ where: { uuid }, ds })
        
        return get_response_ok(ds)

    } catch (error) {
        console.log(error)
        return get_response_err('admin_category_insert', error, { uuid })
            
        return return_server_response(500, ex.name +' '+ex.message, { uuid, error }, 'admin_category_delete' )
    }
}

//#endregion

//#region helpers+




function get_response_ok(data) {
    try {
        return {
            ok: true,
            code: 200,
            message: '',
            data: data,
            url: ''
        }
    } catch (error) {
        get_response_err('get_response_ok()', error, data)
    }
}

function get_response_err(url, error, data, code = 500, message = '') {
    try {
        let codeText = ''

        // parse error codes and set codeText
        switch (code) {
            case 500: codeText = 'A server error occurred'; break;
            default: codeText = '*Unknown error code*'
        }

        // save to log
        // todo
        
        return {
            ok: false,
            code: code,
            codeText: codeText,
            message: error.message,
            url: url,
            data: data,
        }
    } catch (error) {
        return {
            ok: false,
            code: 500,
            message: 'Unknown error occured',
            url: 'get_response_err()',
            data: data,
        }
    }
}




/**
 * slugify a string. check if javascript-normalize could do it?
 * @param {*} str 
 * @returns 
 */
function slugify(str) {
    try {
        // wtf i found :-)
        // https://gist.github.com/codeguy/6684588?permalink_comment_id=4077919
        // remove accents, swap ñ for n, etc
        const swaps = {
            '0': ['°', '₀', '۰', '０'],
            '1': ['¹', '₁', '۱', '１'],
            '2': ['²', '₂', '۲', '２'],
            '3': ['³', '₃', '۳', '３'],
            '4': ['⁴', '₄', '۴', '٤', '４'],
            '5': ['⁵', '₅', '۵', '٥', '５'],
            '6': ['⁶', '₆', '۶', '٦', '６'],
            '7': ['⁷', '₇', '۷', '７'],
            '8': ['⁸', '₈', '۸', '８'],
            '9': ['⁹', '₉', '۹', '９'],
            'a': ['à', 'á', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ā', 'ą', 'å', 'α', 'ά', 'ἀ', 'ἁ', 'ἂ', 'ἃ', 'ἄ', 'ἅ', 'ἆ', 'ἇ', 'ᾀ', 'ᾁ', 'ᾂ', 'ᾃ', 'ᾄ', 'ᾅ', 'ᾆ', 'ᾇ', 'ὰ', 'ά', 'ᾰ', 'ᾱ', 'ᾲ', 'ᾳ', 'ᾴ', 'ᾶ', 'ᾷ', 'а', 'أ', 'အ', 'ာ', 'ါ', 'ǻ', 'ǎ', 'ª', 'ა', 'अ', 'ا', 'ａ', 'ä'],
            'b': ['б', 'β', 'ب', 'ဗ', 'ბ', 'ｂ'],
            'c': ['ç', 'ć', 'č', 'ĉ', 'ċ', 'ｃ'],
            'd': ['ď', 'ð', 'đ', 'ƌ', 'ȡ', 'ɖ', 'ɗ', 'ᵭ', 'ᶁ', 'ᶑ', 'д', 'δ', 'د', 'ض', 'ဍ', 'ဒ', 'დ', 'ｄ'],
            'e': ['é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'ë', 'ē', 'ę', 'ě', 'ĕ', 'ė', 'ε', 'έ', 'ἐ', 'ἑ', 'ἒ', 'ἓ', 'ἔ', 'ἕ', 'ὲ', 'έ', 'е', 'ё', 'э', 'є', 'ə', 'ဧ', 'ေ', 'ဲ', 'ე', 'ए', 'إ', 'ئ', 'ｅ'],
            'f': ['ф', 'φ', 'ف', 'ƒ', 'ფ', 'ｆ'],
            'g': ['ĝ', 'ğ', 'ġ', 'ģ', 'г', 'ґ', 'γ', 'ဂ', 'გ', 'گ', 'ｇ'],
            'h': ['ĥ', 'ħ', 'η', 'ή', 'ح', 'ه', 'ဟ', 'ှ', 'ჰ', 'ｈ'],
            'i': ['í', 'ì', 'ỉ', 'ĩ', 'ị', 'î', 'ï', 'ī', 'ĭ', 'į', 'ı', 'ι', 'ί', 'ϊ', 'ΐ', 'ἰ', 'ἱ', 'ἲ', 'ἳ', 'ἴ', 'ἵ', 'ἶ', 'ἷ', 'ὶ', 'ί', 'ῐ', 'ῑ', 'ῒ', 'ΐ', 'ῖ', 'ῗ', 'і', 'ї', 'и', 'ဣ', 'ိ', 'ီ', 'ည်', 'ǐ', 'ი', 'इ', 'ی', 'ｉ'],
            'j': ['ĵ', 'ј', 'Ј', 'ჯ', 'ج', 'ｊ'],
            'k': ['ķ', 'ĸ', 'к', 'κ', 'Ķ', 'ق', 'ك', 'က', 'კ', 'ქ', 'ک', 'ｋ'],
            'l': ['ł', 'ľ', 'ĺ', 'ļ', 'ŀ', 'л', 'λ', 'ل', 'လ', 'ლ', 'ｌ'],
            'm': ['м', 'μ', 'م', 'မ', 'მ', 'ｍ'],
            'n': ['ñ', 'ń', 'ň', 'ņ', 'ŉ', 'ŋ', 'ν', 'н', 'ن', 'န', 'ნ', 'ｎ'],
            'o': ['ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ø', 'ō', 'ő', 'ŏ', 'ο', 'ὀ', 'ὁ', 'ὂ', 'ὃ', 'ὄ', 'ὅ', 'ὸ', 'ό', 'о', 'و', 'θ', 'ို', 'ǒ', 'ǿ', 'º', 'ო', 'ओ', 'ｏ', 'ö'],
            'p': ['п', 'π', 'ပ', 'პ', 'پ', 'ｐ'],
            'q': ['ყ', 'ｑ'],
            'r': ['ŕ', 'ř', 'ŗ', 'р', 'ρ', 'ر', 'რ', 'ｒ'],
            's': ['ś', 'š', 'ş', 'с', 'σ', 'ș', 'ς', 'س', 'ص', 'စ', 'ſ', 'ს', 'ｓ'],
            't': ['ť', 'ţ', 'т', 'τ', 'ț', 'ت', 'ط', 'ဋ', 'တ', 'ŧ', 'თ', 'ტ', 'ｔ'],
            'u': ['ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'û', 'ū', 'ů', 'ű', 'ŭ', 'ų', 'µ', 'у', 'ဉ', 'ု', 'ူ', 'ǔ', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'უ', 'उ', 'ｕ', 'ў', 'ü'],
            'v': ['в', 'ვ', 'ϐ', 'ｖ'],
            'w': ['ŵ', 'ω', 'ώ', 'ဝ', 'ွ', 'ｗ'],
            'x': ['χ', 'ξ', 'ｘ'],
            'y': ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ', 'ÿ', 'ŷ', 'й', 'ы', 'υ', 'ϋ', 'ύ', 'ΰ', 'ي', 'ယ', 'ｙ'],
            'z': ['ź', 'ž', 'ż', 'з', 'ζ', 'ز', 'ဇ', 'ზ', 'ｚ'],
            'aa': ['ع', 'आ', 'آ'],
            'ae': ['æ', 'ǽ'],
            'ai': ['ऐ'],
            'ch': ['ч', 'ჩ', 'ჭ', 'چ'],
            'dj': ['ђ', 'đ'],
            'dz': ['џ', 'ძ'],
            'ei': ['ऍ'],
            'gh': ['غ', 'ღ'],
            'ii': ['ई'],
            'ij': ['ĳ'],
            'kh': ['х', 'خ', 'ხ'],
            'lj': ['љ'],
            'nj': ['њ'],
            'oe': ['ö', 'œ', 'ؤ'],
            'oi': ['ऑ'],
            'oii': ['ऒ'],
            'ps': ['ψ'],
            'sh': ['ш', 'შ', 'ش'],
            'shch': ['щ'],
            'ss': ['ß'],
            'sx': ['ŝ'],
            'th': ['þ', 'ϑ', 'ث', 'ذ', 'ظ'],
            'ts': ['ц', 'ც', 'წ'],
            'ue': ['ü'],
            'uu': ['ऊ'],
            'ya': ['я'],
            'yu': ['ю'],
            'zh': ['ж', 'ჟ', 'ژ'],
            '(c)': ['©'],
            'A': ['Á', 'À', 'Ả', 'Ã', 'Ạ', 'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'Å', 'Ā', 'Ą', 'Α', 'Ά', 'Ἀ', 'Ἁ', 'Ἂ', 'Ἃ', 'Ἄ', 'Ἅ', 'Ἆ', 'Ἇ', 'ᾈ', 'ᾉ', 'ᾊ', 'ᾋ', 'ᾌ', 'ᾍ', 'ᾎ', 'ᾏ', 'Ᾰ', 'Ᾱ', 'Ὰ', 'Ά', 'ᾼ', 'А', 'Ǻ', 'Ǎ', 'Ａ', 'Ä'],
            'B': ['Б', 'Β', 'ब', 'Ｂ'],
            'C': ['Ç', 'Ć', 'Č', 'Ĉ', 'Ċ', 'Ｃ'],
            'D': ['Ď', 'Ð', 'Đ', 'Ɖ', 'Ɗ', 'Ƌ', 'ᴅ', 'ᴆ', 'Д', 'Δ', 'Ｄ'],
            'E': ['É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'Ë', 'Ē', 'Ę', 'Ě', 'Ĕ', 'Ė', 'Ε', 'Έ', 'Ἐ', 'Ἑ', 'Ἒ', 'Ἓ', 'Ἔ', 'Ἕ', 'Έ', 'Ὲ', 'Е', 'Ё', 'Э', 'Є', 'Ə', 'Ｅ'],
            'F': ['Ф', 'Φ', 'Ｆ'],
            'G': ['Ğ', 'Ġ', 'Ģ', 'Г', 'Ґ', 'Γ', 'Ｇ'],
            'H': ['Η', 'Ή', 'Ħ', 'Ｈ'],
            'I': ['Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'Î', 'Ï', 'Ī', 'Ĭ', 'Į', 'İ', 'Ι', 'Ί', 'Ϊ', 'Ἰ', 'Ἱ', 'Ἳ', 'Ἴ', 'Ἵ', 'Ἶ', 'Ἷ', 'Ῐ', 'Ῑ', 'Ὶ', 'Ί', 'И', 'І', 'Ї', 'Ǐ', 'ϒ', 'Ｉ'],
            'J': ['Ｊ'],
            'K': ['К', 'Κ', 'Ｋ'],
            'L': ['Ĺ', 'Ł', 'Л', 'Λ', 'Ļ', 'Ľ', 'Ŀ', 'ल', 'Ｌ'],
            'M': ['М', 'Μ', 'Ｍ'],
            'N': ['Ń', 'Ñ', 'Ň', 'Ņ', 'Ŋ', 'Н', 'Ν', 'Ｎ'],
            'O': ['Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'Ø', 'Ō', 'Ő', 'Ŏ', 'Ο', 'Ό', 'Ὀ', 'Ὁ', 'Ὂ', 'Ὃ', 'Ὄ', 'Ὅ', 'Ὸ', 'Ό', 'О', 'Θ', 'Ө', 'Ǒ', 'Ǿ', 'Ｏ', 'Ö'],
            'P': ['П', 'Π', 'Ｐ'],
            'Q': ['Ｑ'],
            'R': ['Ř', 'Ŕ', 'Р', 'Ρ', 'Ŗ', 'Ｒ'],
            'S': ['Ş', 'Ŝ', 'Ș', 'Š', 'Ś', 'С', 'Σ', 'Ｓ'],
            'T': ['Ť', 'Ţ', 'Ŧ', 'Ț', 'Т', 'Τ', 'Ｔ'],
            'U': ['Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'Û', 'Ū', 'Ů', 'Ű', 'Ŭ', 'Ų', 'У', 'Ǔ', 'Ǖ', 'Ǘ', 'Ǚ', 'Ǜ', 'Ｕ', 'Ў', 'Ü'],
            'V': ['В', 'Ｖ'],
            'W': ['Ω', 'Ώ', 'Ŵ', 'Ｗ'],
            'X': ['Χ', 'Ξ', 'Ｘ'],
            'Y': ['Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ', 'Ÿ', 'Ῠ', 'Ῡ', 'Ὺ', 'Ύ', 'Ы', 'Й', 'Υ', 'Ϋ', 'Ŷ', 'Ｙ'],
            'Z': ['Ź', 'Ž', 'Ż', 'З', 'Ζ', 'Ｚ'],
            'AE': ['Æ', 'Ǽ'],
            'Ch': ['Ч'],
            'Dj': ['Ђ'],
            'Dz': ['Џ'],
            'Gx': ['Ĝ'],
            'Hx': ['Ĥ'],
            'Ij': ['Ĳ'],
            'Jx': ['Ĵ'],
            'Kh': ['Х'],
            'Lj': ['Љ'],
            'Nj': ['Њ'],
            'Oe': ['Œ'],
            'Ps': ['Ψ'],
            'Sh': ['Ш'],
            'Shch': ['Щ'],
            'Ss': ['ẞ'],
            'Th': ['Þ'],
            'Ts': ['Ц'],
            'Ya': ['Я'],
            'Yu': ['Ю'],
            'Zh': ['Ж'],
        };
        Object.keys(swaps).forEach((swap) => {
            swaps[swap].forEach(s => {
                str = str.replace(new RegExp(s, "g"), swap);
            })
        });

        // last change :-)
        // https://pineco.de/snippets/convert-text-to-slugs/
        str = str.toString().toLowerCase().trim()
            .replace(/é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
            .replace(/á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
            .replace(/ö|ő|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
            .replace(/ü|ű|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
            .replace(/ß/gi, 'ss')
            .replace(/í/gi, 'i')
            .replace(/đ/gi, 'd')
            .replace(/ļ/gi, 'l')
            .replace(/\s*$/g, '')
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')  // collapse dashes
            .replace(/-+/g, '-') // remove consecutive hyphens
            .replace(/\/|\\/g, '-')
            .replace(/[^a-z0-9 -]/g, '') // remove any rest non-alphanumeric characters
            //same as trim() str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space

        return str
    } catch (error) {
        console.log(error)
    }
}





//#endregion