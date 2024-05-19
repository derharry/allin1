<!--
    Register or update a company
-->
<script>

    import CompanyEdit from '../lib/CompanyEdit.svelte'
    import CompanyInfo from '../lib/CompanyInfo.svelte'


    /** @type {import('./$types').PageData} */
	export let data;

    /** @type {import('./$types').ActionData} */
    export let form = {}

    // grap loaded data
    let category_list = data?.category_list || {}
    let company_info  = form?.data || {}

    //$: console.log(company_info)

    //#region states

    //#endregion


    //#region component bindings and logic to update the preview

    let frmCompanyInfo;

    //#endregion


</script>


<main>

    {#if form?.ok}

        <h1>Uw bedrijf is geregistreerd</h1>

        <p>Uw bedrijf staat in onze database</p>
        <p>Wij zullen deze eerst checken en als alles ok is schakeln wij jouw vrij.</p>
        <p>Als je in toekomst data wilt verandern stuur ons alstublief een e-mail met de data die verandert moet worden.</p>
        <p>Bedankt dat je jouw bedrijf hebt geregistreerd.</p>
    
    {:else}

        <h1>Registreer jouw bedrijf</h1>

        <p>Graag nemen wij jouw bedrijf ook in onze Gouden Gids op.</p>
        <p>
            Vul het formulier met uw Bedrijfsinformatie in, stuur het in, en na een korte review van ons staat uw bedrijf in de lijst.
            <br>U hoeft niet alle velden in te vullen. Een veld leeg wordt niet in de gids getoont.
            <br>Wilt u later informatie later aanpassen, vragen wij u dit ons per email te sturen.
        </p>

        <p>* zijn plichtvelden
            <br>&nbsp;</p>

        <!-- show error messages of any form -->
        {#if form && !form?.ok}
            <div class="error">
                {form?.message}
            </div>
        {/if}


        <form action="?/register" method="POST">
            <CompanyEdit bind:company_info={company_info} {category_list} />
        </form>
    
        <h2>Voorbeeld in de resultaten:</h2>
        <CompanyInfo bind:company_info={company_info} />

    {/if}

</main>



<style>

    .error {
        padding: 8px;
        background-color: red;
        border-radius: 10px;
        color: white;
        font-size: 10pt
    }

</style>