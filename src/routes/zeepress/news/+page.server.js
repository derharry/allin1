import { get_all_posts } from './data';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let posts = await get_all_posts()
    return {
        posts
    }
}