import mysql from 'mysql2/promise';

let dbconn = null;

export function dbconnect() {
  if (!dbconn) {
    dbconn = mysql.createConnection({
      host: "192.168.69.1",
      user: "wsl_root",
      password: "r00t!",
      database: "nc-presales-repo",
    });
  }
  return dbconn;
}


export async function doQuery(sql) {
  try {
    await mysqlconnFn();
    let res = await mysqlconn.query('test').then( () => {});
    console.log(mysqlconn);
    /*
    let resultset = await mysqlconn.query("SELECT * FROM repo;").then((rows, data) => { 
      console.log('check', rows, data);
      return rows; });
    console.log('yap', resultset);
    return { data: resultset }
    */
  } catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return { data: [] }
  }
  /*
  try
  {
    mysqlconnFn();
    if (mysqlconn) {
      console.log('doQuery()', mysqlconn);
      let resultset = await mysqlconn.query(sql)
        .then((rows, data) => { 
            console.log('check', rows, data);
            return rows; 
        });
      console.log('yap', resultset);
    }
    return 1
  } catch (err) {
    console.log('error', err);
  }*/
}

export async function getAllData () {
  console.log('getAllData()');
  const res = await doQuery('SELECT * FROM repo');
  //console.log(res);
}

/*
function my_sqlconnFn() {
  if (mysqlconn) {
    console.log('do query', mysqlconn);
    mysqlconn.query("SELECT * FROM repo", function (err, result, fields) {
        if (err) throw err;
        console.log(result, fields);          
      });
  }
  return { data: dataset }
}


function load () {
  //console.log(dataset)
  try {
    let resultset = await mysqlconn.query("SELECT * FROM repo;").then((rows, data) => { 
      console.log('check', rows, data);
      return rows; });
    console.log('yap', resultset);
    return { data: resultset }
  } catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return { data: dataset }
  }
}
*/