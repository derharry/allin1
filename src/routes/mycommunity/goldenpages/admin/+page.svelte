<script>
    
    /** @type {import('./$types').PageData} */
	export let data;

    let stats = data.statistic || {}

    $: console.log(stats)
    
</script>


&nbsp;
<table>
    <tr>
        <td>Total:</td>
        <td>{stats.total_companies}</td>
    </tr>
    <tr>
        <td>Public:</td>
        <td>{stats.total_companies_public}</td>
    </tr>
    <tr>
        <td><a href="">Hidden:</a></td>
        <td>{stats.total_companies}</td>
    </tr>
</table>