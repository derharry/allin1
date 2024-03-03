import { readdir } from "node:fs/promises";

export async function get_files_from_dir(dir) {
    return await readdir(dir);
}

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