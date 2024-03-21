import { get_recent_posts } from './news/data';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let posts = await get_recent_posts()
    return {
        posts
    }
    return {
        posts: [
        { title: 'hi', file: 'xx' }
    ]}
}