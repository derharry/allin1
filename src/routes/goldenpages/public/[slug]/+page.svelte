<!--
    
-->
<script>

    import CompanyInfo from '../../lib/CompanyInfo.svelte'

    /** @type {import('./$types').PageData} */
    export let data;

    $: company_list = data?.company_list || []

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