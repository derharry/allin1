export const prerender = false;
export const ssr = false;

import {goto} from '$app/navigation';


export async function load( { fetch } ) {
    let url = 'http://localhost/wordpress_test/api.php?id=adm';
    let response = await fetch(url)
    let result = await response.json();
    console.log({result})
    //if (!result.valid_session == 0)
    //    goto('../')
    //console.log(result)
}


async function request_json_api(id) {
    try {
        const response = 0
        //console.log('/fetching')
        if (response.ok) {
            console.log('data', response)
            return response.json()
        } else {
            throw new Error('uuuuiii')
        }
    } catch (error) {
        console.log(error)
    }
}