import { json } from '@sveltejs/kit';
import { dataset } from '$lib/stores.js';
import { db_getAllData, db_addRow, db_deleteRow, db_updateRows } from '$lib/database.js';
import { formBody } from '$lib/helpers.js';


export async function GET({ url }) {
    console.log('+server.js GET', url.searchParams) // { 'limit' => '4', 'order' => 'desc' }
    //
    try {
        let res = await db_getAllData()
        return json({ data: res.data })
    } catch (err) {
        console.log('error', err);
        return json({ data: dataset })
    }
    //const limit = Number(url.searchParams.get('limit') ?? 30)
    //const order = url.searchParams.get('order') ?? 'asc'
    //const posts = await db.post.findMany({
    //  orderBy: { id: order },
    //  take: limit
    //})
    //return json(posts)
}

export async function POST({event, request}) {
    //console.log('+server.js POST', request)
    // fetch request paramaters
    //const data = await request.formData();
    //const body = formBody(request.data);
    const data = await request.json();
    //console.log('+server.js POST', data, body, json);
    // find / exec Actions
    const REQUEST = json;
    console.log(data);
    console.log(request.url.search)
    return json({ data: [] })
    // action approach 1
    {
        console.log('request', REQUEST);
        if (REQUEST?.addRow)
            console.log('addroxxxxxxxwwwwwwxxxxxx')
    }
    // action approach 2
    let action = request.url.search.toString();  console.log('action',action)
    let res;
    switch (action) 
    {
        case '?addRow':     res = await db_addRow();    break;
        case '?update':     res = await db_updateRows(action.data); break;
        case '?deleteRow':  res = await db_deleteRow(action.id); break;
        case '?saveAll':    res = await db_updateRows(action.data); break;
    }
    if (res) {
        return json({ data: res.data })
    }
    return json({ data: json( [] )})
}
