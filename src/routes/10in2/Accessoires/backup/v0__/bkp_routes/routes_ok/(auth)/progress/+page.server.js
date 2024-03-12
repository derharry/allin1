import mariadb from 'mariadb';

const dbConnInfo = {
    host:     'localhost', 
    user:     'root', 
    password: 'r00mb1',
    database: 'body-change-v0',
    connectTimeout:  5,
    socketTimeout:   5,
    connectionLimit: 5
}

var pool = mariadb.createPool(dbConnInfo);

await pool.getConnection(function(err) {
	if (err) return console.log('nope')
	console.log("Connected!");
});

async function asyncFunction() {
}

export async function load () {
	let conn;
	let rows = [];
	try {  
		conn = await pool.getConnection();
		rows = await conn.query("SELECT * from body_progress");
		//console.log(rows); //[ {val: 1}, meta: ... ]
		//const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
		//console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

		//rows = prepare_ds(rows);
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

export const actions = {
	create: async (event) => {

	},
	remove: async (event) => {
		console.log('action default', event);
	},
	update: async (event) => {
		console.log('action default', event);
	}
};


function create(e) {
	try {

	} catch (e) {
		console.log('exp', e);
	} finally {
		console.log('finally');
	}
}

function remove(id) {
	measures.splice(measures.findIndex(i => i.id == id), 1)
	measures = measures
}

function update(e) {
}