<script>

    import CompanyShort from './CompanyShort.svelte'

    /** @type {import('./$types').PageData} */
	export let data;

    let company_list = data.company_list || []

    //$: console.log(company_list)

</script>


{#each company_list as company_info}
    <li>
        <CompanyShort {company_info} />
    </li>
{/each}

