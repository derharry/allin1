export const cl = console.log
export const ce = console.error
export const cd = console.debug

/**
 * alias for cl / console.log (too lazy to write long :-) 
 * in future might have other features 
 * @param {any} args:any
 * @returns void
 */
export function p(...args) {
    //for (let i=0; i<arguments.length; i++) {  console.log(arguments[i])  }
    console.log(...args)
}

/**
 * print args with markup and title
 * ##### title ##### 
 * # ...
 * @param {string} title
 * @param {any}    args 
 * @returns void
 */
export function ps(title, args) {
    const markup = '############'
    console.log(markup, title, markup)
    for (let i=1; i<arguments.length; i++) {  cl('#', arguments[i])  }
}

/**
 * print args with - markup
 *   ---- title ----
 * ...
 * @param {string} title
 * @param {any}    args 
 * @returns void
 */
export function pp(title) {
    const markup = '  ----  '
    console.log(markup, title, markup)
    for (let i=1; i<arguments.length; i++) {  cl(arguments[i])  }
}

/**
 * print args with your @ markup 
 * @ ...
 * @param {string} markup any character(s)
 * @param {any}    args  
 * @returns void
 */
export function pm(markup) {
    for (let i=1; i<arguments.length; i++) {  cl(markup, arguments[i])  }
}

/**
 * print args with its type
 * @ ...
 * @param {any}    args  
 * @returns void
 * /
export function pt() {
    for (let i=0; i<arguments.length; i++) {  cl(arguments[i], typeof(arguments[i]))  }
}
*/

/**
 * Description
 * A void function what does nothing but void :-)
 * @returns void
 */
export function v() {}


export function get_key_value_list(object) {
    let res = {}
    Object.entries(object).forEach(([name, attr]) => { res[name] = attr })
    return res
}


export function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("690" + firstPart.toString(36)).slice(-3);
    secondPart = ("690" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}


export function clone_of_object(obj) {
    try {
        //cl('clone_of_object()', typeof(obj), obj)
        if (obj != null || obj != undefined) {
            switch (typeof(obj)) {
                case 'array' :  return JSON.parse(JSON.stringify(obj));  break;
                case 'object':  return JSON.parse(JSON.stringify(obj));  break; //return Object.assign({}, object)
                default:        return (" " + obj.toString()).slice(1);     break;
            }
        }
    } catch (e) {
        ce('EXCEPTION clone_of_object()  ', e)
    }
    return null
}

/**
 * depricated - move to copy_key_value_list
 * @param {*} object_src 
 * @param {*} object_dst 
 * @param {*} ignoreStartWith 
 * @returns 
 */
export function copy_key_value_list_to(object_src, object_dst, ignoreStartWith = '_') {
    try {
        Object.entries( object_src ).forEach( ([key, value]) => {
            if ( ! key.startsWith('_') )
                object_dst[key] = value
        })
        object_dst = object_dst
        return object_dst
    } catch (e) {
        ce(e)
    }
}


export async function grab_http_post_form_data(request) {
    try {
        const formdata = await request.formData();
        var_dump('formdata', formdata, true)
        const data = {}
        for (const [key, value] of formdata) {
            data[key] = value
        }
        var_dump('data', data, true)
        return data
    } catch (e) {
        ce(e)
        return null
    }
    
}


export function return_json_response_attributes(url, bodydata, ok, statusCode, statusText) {
    return {
        ok,
        status: statusCode,
        statusText: statusText,
        data: bodydata, //not!! JSON.stringify(bodydata),
        url
    }
}


export function var_dump(variable_name, variable, std_out = false) {
    //console.info('var_dump()', {variable})
    let str = [] // create array that will finally be returned as string via array.join()
    try {
        let content = ''  // create empty content to add to array $str
        try {
            // try via clone
            content = JSON.stringify( clone_of_object(variable), null, 2)
        } catch (e) {
            // catch error and retry content
            ce('inc.utils.js > var_dump() ' , e)
            content = JSON.stringify( variable , null, 2)
        }
        // add content to str array
        str = [ '<pre>', variable_name, content, '</pre>' ]
    }
    catch (e) {
        // add error to str array
        str = [ '<pre>ERROR ', variable_name, e, '</pre>' ]
    }
    finally {
        if (std_out) {
            cl('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
            cl(str.join('\n'))
            cl('variable:', variable)
            cl('json:', JSON.stringify(variable))
            cl('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        }
        return str.join('\n')
    }
}

export function handle_exception(exept) {
    cl('???????????????????????????????????')
    cl('???????????????????????????????????')
    cl('?????    EXCEPTION            ?????')
    cl('         ~~~~~~~~~                 ')
    cl({exept})
    cl('???????????????????????????????????')
    cl('???????????????????????????????????')
    
}