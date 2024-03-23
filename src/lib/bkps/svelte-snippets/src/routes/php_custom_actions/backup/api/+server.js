import { json } from '@sveltejs/kit'
import * as utils from "$lib/inc.utils";
import database_fixture from '../fixture_database.json'


export async function GET({ url, request }) 
{
    utils.p('+server.js GET', url.search, url.searchParams)//, request)
    let data_return = null
    /*
    
    // deserialize GET parameters
    let params = null
    if (url.searchParams.has('json')) {
        params = JSON.parse(url.searchParams.get('json'))
    }
    // actions ?
    let action = url.search
    switch (action) {
        case '?getAllData':             
                            // either fixture or DB
                            // fixture
                            data_return = database_fixture
                        break;
        case '?add':
                            utils.p('jöha add')
                            database_fixture.number += 1
                            data_return = database_fixture
                        break
        case '?del':
                            utils.p('jöha del')
                            database_fixture.number -= 1
                            data_return = database_fixture
                        break
    }
    */
    utils.p('GET() return ', data_return)
    return json(data_return)
}


export async function POST({ request }) 
{
    utils.p('+server.js POST', request)
    let data = 'xxx'

    return json(data)
}
