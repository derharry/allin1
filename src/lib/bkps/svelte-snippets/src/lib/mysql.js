const mariadb = require('mariadb');
const conn = mariadb.createConnection({host: 'mydb.com', user:'myUser', password: 'myPwd'});
conn.query("SELECT 1 as val", (err, rows) => {
	console.log(rows); //[ {val: 1}, meta: ... ]
	conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"], (err, res) => {
	  console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
	  conn.end();
	});
});