import { get_files_from_dir } from '$lib/zeelte/io/io.directory.js'
import { readfile } from '$lib/zeelte/io/io.file.js'
//import { p } from '$lib/zeelte/inc.utils.js'
//import * as utils from "$lib/zeelte/inc.utils"

const path_to_posts = 'src/routes/zeepress/news/posts'


export async function get_all_posts() {
    let posts = []
    let title = ''
    let files = await get_files_from_dir(path_to_posts)
    files.forEach(file => {
        title = String(file).replace('.html', '')
        title = title.replaceAll('_', ' ')
        title = title.replaceAll('-', ' ')
        posts.push( {title, file} )
    })
	return posts
}


export async function get_recent_posts() {
    return await get_all_posts()
}

export async function get_post_content(slug) {
    //return 'x'
    let posts = await get_all_posts()
    let postcontent = ''
    posts.forEach(post => {
        if (post.file == slug) {
            postcontent = readfile(path_to_posts +'/'+ post.file)
            //console.log({postcontent})
        }
    });
    return postcontent
}