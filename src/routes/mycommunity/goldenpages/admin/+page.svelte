<script>
    
    /** @type {import('./$types').PageData} */
	export let data;

    let stats = data.statistic || {}

    $: console.log(stats)
    
</script>


&nbsp;
<table>
    <tr>
        <td colspan="2">Companies</td>
    </tr>
    <tr>
        <td>Total:</td>
        <td>{stats.entries_total}</td>
    </tr>
    <tr>
        <td>Public:</td>
        <td>{stats.entries_public}</td>
    </tr>
    <tr>
        <td><a href="">Hidden:</a></td>
        <td>{stats.entries_unpublic}</td>
    </tr>
</table>