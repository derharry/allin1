<script>

    import CompanyInfo from '../lib/components/CompanyInfo.svelte'

    /** @type {import('./$types').PageData} */
	export let data;

    $: company_list = data?.company_list || false
    $: company_info = data?.company_info || false

    //$: console.log('category', company_list)
    //$: console.log('company',  company_info)

</script>


<table>
    <tr>
        <td>
            <button onclick="history.back();">Terug</button>
            Resultaten: {company_list.length}
        </td>
    </tr>
    <tr>
        <td><hr></td>
    </tr>
</table>

&nbsp;


{#if (company_list != false)}

    {#each company_list as company_info}
        <CompanyInfo {company_info} mode="short" />
    {/each}


{:else if (company_info != false)}

    <CompanyInfo {company_info} mode="long"/>


{:else}

        *ERROR*

{/if}


<style>

    table {
        width: 100%;
    }

</style>


