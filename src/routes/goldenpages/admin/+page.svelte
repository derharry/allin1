<script>

    import { onMount } from "svelte";

    /** 
     * returns stats
     * @type {import('./$types').PageData} 
     * */
    export let data;

    /** statistical data from load */
    let stats = data?.stats || {}

    //debug
    //$: console.log(data, stats)
    onMount( () => {
        doit();
    })

    async function doit() {
        
    }


</script>



<table class="box_category">
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
        <th><a href="/goldenpages/admin/companies?show=onlyNonPublic">Hidden:</a></th>
        <td>{stats.companies_unpublic || '-'}</td>
    </tr>
</table>