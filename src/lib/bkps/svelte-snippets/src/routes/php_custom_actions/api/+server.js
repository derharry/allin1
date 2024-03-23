import { json } from '@sveltejs/kit'
import * as utils from "$lib/inc.utils"
import fs from 'fs/promises'
import database from '../database.json'
import database_fix from '../database_fix.json'
const pp = console.log



async function exec_action(action, php_request) {
    let data = null
    let changed = false
    console.log('Database', database)
    data = Object.assign(database)
    utils.p('exec_action('+action+')', php_request)
    if (action) {
        switch (action) {
            case 'load':    data = database;           
                        break
            case 'add':     database.number += 1;
                            data = database;
                            changed = true
                        break
            case 'del':     database.number -= 1;
                            data = database;
                            changed = true
                        break
            case 'test':    data.number = 6969; // LocalStorage till next reload!
                        break
        }
        if (changed)
            await fs.writeFile('src/routes/php_custom_actions/database.json', JSON.stringify(database))
            utils.v()
    }
    pp('> data', data)
    //return data
    return {
        data,
        php_request  
    }
}



export async function GET({ url, request }) 
{
    utils.p('+server.js GET', 'url.search '+url.search, url.searchParams) //, request)
    let [action, php_request] = destruct_actions(url)
    let data = await exec_action(action, php_request)
    utils.p('> return data get', data)
    return json(data)
}



export async function POST({ url, request }) 
{
    utils.p('+server.js POST')
    let data = null
    let [action, php_request] = destruct_actions(url)
    let php_req
    switch (request.headers.get('content-type')) {
        case 'application/json':                    php_req = await request.json();                           break;
        case 'application/x-www-form-urlencoded':   php_req = Object.fromEntries(await request.formData());   break;
    }
    //copy php_request if required
    if (php_req)
        php_request = Object.assign(php_request, php_req)
    console.log('> php_request', php_request)
    data = await exec_action(action, php_request)
    utils.p('> return data post', data)
    return json(data)
}



function destruct_actions(url) {
    utils.p('destruct_actions()')//, url)
	let php_request = {}
    let action   = false
    let matches  = undefined
    let wrongKey = url.searchParams.keys().next().value
    pp('> match', url.search.toString(), wrongKey)
    let regex
    regex = /(^\?\/?([^?=]+)\?([^?=&]+))|(^\?\/[^?=]+)/      //new approach
    regex = /\?\/(.*)\?(.+?)[=&]|\?\/(.*)|\?(.*)\?(.+?)[=&]/ //init approach
    //regex = //
    //regex = /(.*)/gm
    if (matches = url.search.match(regex)) {
        pp('- matches ', matches)
        let newKey = null
        //grab the matches
        action = matches[1] || matches[3] || matches[4]
        newKey = matches[2] || matches[5]
        utils.p('- replace ', wrongKey, newKey, action)
        //add key,value params to php_request -> replace wrongKey with newKey
        url.searchParams.forEach((value, key) => { 
            if (!newKey) return
            if (key == wrongKey) key = newKey
            php_request[key] = value
        });
    } else {
        pp('- no regex', url.searchParams)
        php_request = url.searchParams
    }
    utils.p('- php_request', php_request)
    return [
        action,
        php_request
    ]
}

/*
https://regex101.com

?/load?number=1&foo=baz
?/xx?yyy&
?/add
=
url?number
?test?number=1&foo=baz
?test&number=1&foo=baz
fasb
?x=1

(^\?\/?([^?=]+)\?([^?=&]+))|(^\?\/[^?=]+)

previous  \?\/(.*)\?(.+?)[=&]|\?\/(.*)|([a-z]+)\?(.*) 

*/
