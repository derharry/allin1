<script lang="ts">
    import { p } from '$lib/helpers'
    //import { db } from '$lib/server/database'
    import mariadb from 'mariadb';

    let load;

    const dbConnInfo = {
        host:     'localhost', 
        user:     'root', 
        password: 'r00mb1',
        database: 'body-change-v0',
        //connectTimeout:  5,
        //socketTimeout:   5,
        //connectionLimit: 5
    }

    var pool;
    // mariadb.createPool(dbConnInfo);

    async function asyncFunction() {
        p('async', pool);
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT 1 as val");
            console.log(rows); //[ {val: 1}, meta: ... ]
            //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
            //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

        } catch (err) {
            throw err;
        } finally {
            if (conn) return conn.end();
            console.log(conn, pool)
        }
    }

    //asyncFunction();

    
    p  ('page', load);
</script>

<h1>Page</h1>

{dbConnInfo}
{pool}
