import { error } from '@sveltejs/kit';
import { get_post_content } from '../data.js'


export async function load({ params }) {
    let postcontent = await get_post_content(params.slug)
    //if (postcontent == '') throw error(404);
    //console.log({postcontent})
    return {
        postcontent
    }
}