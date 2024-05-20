<!--
    
-->
<script>

    import CompanyInfo from '../lib/CompanyInfo.svelte'

    /** @type {import('./$types').PageData} */
    export let data;

    // grap loaded data
    $: category_list = data?.category_list || {}
    $: company_list  = data?.company_list || []

</script>


<table>
    <tr>
        <td>
            Zoek resultaten voor: {company_list.length}
        </td>
    </tr>
    <tr>
        <td><hr></td>
    </tr>
</table>

&nbsp;


{#each company_list as company_info}

    <CompanyInfo {company_info} {category_list} mode="short" />

{/each}


<style>

    table {
        width: 100%;
    }

</style>
