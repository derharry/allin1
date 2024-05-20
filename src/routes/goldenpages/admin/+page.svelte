<script>

    /** 
     * returns stats
     * @type {import('./$types').PageData} 
     * */
    export let data;

    /** statistical data from load */
    let stats = data?.stats || {}

    //debug
    //$: console.log(data, stats)

</script>



<table class="box">
    <tr>
        <th class="title" colspan="2">Companies</th>
    </tr>
    <tr>
        <th>Total:</th>
        <td>{stats?.companies_total || '-'}</td>
    </tr>
    <tr>
        <th>Public:</th>
        <td>{stats.companies_public || '-'}</td>
    </tr>
    <tr>
        <th><a href="">Hidden:</a></th>
        <td>{stats.companies_unpublic || '-'}</td>
    </tr>
</table>