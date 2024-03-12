// auto
// 
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


export function getConnection() {
    console.log('test')
    return pool.getConnection()
}

console.log(pool)