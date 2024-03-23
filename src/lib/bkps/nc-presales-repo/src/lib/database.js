import { dbconnect } from '$lib/mysql.js';
import { dataset   } from '$lib/data_fixture.js';
import { v4 } from 'uuid';

let db = null;

async function init() {
    if (!db)
        db = await dbconnect();
}

async function do_query(sql) {
    await init()
    let resultset = await db.query(sql)
    .then((rows, data) => { 
        //console.log('check', rows, data);
        return rows; 
    });
    return resultset[0];
}

export async function db_getAllData() {
    const sql = "SELECT * FROM repo;"
    const res = await do_query(sql);
    console.log('db_getAllData()', res);
    return { data: res }
}

export async function db_addRow () {
    const uuid = v4();
    const sql = "INSERT INTO repo (uuid, customername) VALUES ('"+ uuid +"', 'inserted guid')";
    const res = await do_query(sql);
    const sql2 = "SELECT * FROM repo WHERE uuid = '"+ uuid +"'";
    const res2 = await do_query(sql2);
    console.log('db_addRow()', res2)
    return { data: res2 }
}

export async function db_deleteRow(id = -1) {
    console.log('delete row', id);

}


export async function db_updateRows(data) {
}

