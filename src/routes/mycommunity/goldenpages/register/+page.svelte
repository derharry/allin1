<script>

    import CompanyEdit from '../lib/components/CompanyEdit.svelte'
    import CompanyInfo from '../lib/components/CompanyInfo.svelte'


    /** @type {import('./$types').PageData} */
	export let data;

    /** @type {import('./$types').ActionData} */
    export let form = {}

    //$: console.log(data)
    //$: console.log(form)

    
    let company_info = form?.data || {}
    let frmCompanyInfo;


    function collectFormData() {
        //company_info = frmCompanyInfo.serializeArray()
        company_info = Object.fromEntries(new FormData(frmCompanyInfo));
        //console.log(company_info)
    }
    /*

    //$: console.log(company_info)
    not needed - done by onchange/onkeyup directly on dom-form
    import { onMount } from 'svelte';
    onMount(() => {    
        frmCompanyInfo.addEventListener('change', function() {
           // alert('Hi!');
        });
	});
    */

</script>


{#if form?.company_is_saved}


    <h1>Uw bedrijf is geregistreerd</h1>

    <p>Uw bedrijf staat in onze database</p>
    <p>Wij zullen deze eerst checken en als alles ok is schakeln wij jouw vrij</p>
    <p>Als je in toekomst data wilt verandern stuur ons alstublief een e-mail met de data die verandert moet worden.</p>
    <p>Bedankt dat je jouw bedrijf hebt geregistreerd.</p>

    
{:else}


    <h1>Registreer jouw bedrijf</h1>

    <p>Graag nemen wij jouw bedrijf ook in onze Gouden Gids op.</p>
    <p>Vul het formulier met uw Bedrijfsinformatie in, stuur het in, en na een korte review van ons staat uw bedrijf in de lijst.</p>
    <p>U hoeft niet alle velden in te vullen. Een veld leeg wordt niet in de gids getoont.</p>
    <p>Wilt u later informatie later aanpassen, vragen wij u dit ons per email te sturen.</p>

    <p>* zijn plichtvelden<br>&nbsp;</p>


    <!-- show error messages of any form -->
    {#if form && !form?.ok}
        <div class="error">
            {form?.statusText}
        </div>
    {/if}


    <form action="?/register" method="POST" bind:this={frmCompanyInfo} on:keyup={collectFormData}>
        <CompanyEdit {company_info} />
    </form>

    <h2>Voorbeeld in de resultaten:</h2>
    <CompanyInfo {company_info} />


{/if}


<style>

.error {
        padding: 8px;
        background-color: red;
        border-radius: 10px;
        color: white;
        font-size: 10pt
    }

</style>