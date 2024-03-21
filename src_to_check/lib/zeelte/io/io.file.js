import fs from 'node:fs'
import { read } from '$app/server';


export async function readfile(file) {
    let data = '405 - error reading file'
    try {
        data = fs.readFileSync(file).toString()
    } catch {}
    /*
    await fs.readFile(file, (err, data) => {
       //if (err) throw err;
       if (err) return '405 - error reading file'
       return _return(data)
    })
    */
    //console.log({data})
    return data
}