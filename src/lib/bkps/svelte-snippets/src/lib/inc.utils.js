const pl = console.log


/**
 * Description
 * @param {any} args:any
 * @returns null
 */
export function p () {
    console.log(arguments[0])
    for (let i=1; i<arguments.length; i++) {
        console.log('>', arguments[i])
    }
}

export function v() {}


export async function send_request_GET(url, data = null) {
    p('send_request_GET()')
    // serialize
    let searchParams = undefined
    if (data) {
        searchParams = new URLSearchParams(data)
        pl('> searchparams', searchParams.toString())
    }
    if (searchParams) url += '?' + searchParams.toString()
    pl('> url', url)
    const response = await fetch(url)
    return response.json()
}


export async function send_request_POST_form(url, data = null) {
    p('send_request_POST_form()')
    // serialize
    const searchParams = new URLSearchParams(data)
    pl('> searchparams', searchParams.toString())
    // send
    const response = await fetch(url, {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/x-www-form-urlencoded' },
        "body": searchParams.toString()            
    })
    return response.json()
}


export async function send_request_POST_json(url, data = {}) {
    p('send_request_POST_json()')
    // serialize
    const json_data = JSON.stringify(data)
    // send
    const response = await fetch(url , {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": json_data
    })
    return response.json()
}

