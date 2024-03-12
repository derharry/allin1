import db from '$lib/server/database.js'

//conn = await db.getConnection();
//rows = await conn.query("SELECT * from body_progress");

//console.log(rows)

export async function load () {
	let conn;
	let rows = [];	
    
	try {  
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	} 

	//console.log(rows)
	let user_data = {
		'body_length':  '176',
		'weigth_start': '85',
		'weight_goal':  '68',
	}  

    return {
		'user_data':   user_data,
		'weight_data': rows
	}
}
