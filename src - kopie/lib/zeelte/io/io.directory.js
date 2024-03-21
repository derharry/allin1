import { readdir } from "node:fs/promises";


export async function get_files_from_dir(dir) {
    return await readdir(dir);
}

