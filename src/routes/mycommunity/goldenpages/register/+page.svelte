<script>

    /*
    import { onMount } from 'svelte';
    onMount(() => {    
        frmCompanyInfo.addEventListener('change', function() {
           // alert('Hi!');
        });
	});
    */

    import CompanyInfo from '../lib/components/CompanyInfo.svelte'

    /** @type {import('./$types').PageData} */
	export let data;

    /** @type {import('./$types').ActionData} */
    export let form = {}

    //$: console.log(data)
    //$: console.log(form)

    let frmCompanyInfo;
    let company_info = {}

    function collectFormData() {
        //company_info = frmCompanyInfo.serializeArray()
        company_info = Object.fromEntries(new FormData(frmCompanyInfo));
        console.log(company_info)
    }

    //$: console.log(company_info)

</script>


<h1>Registreer jouw bedrijf</h1>

<p>Graag nemen wij jouw bedrijf ook in onze Gouden Gids op.</p>
<p>Vul het formulier met uw Bedrijfsinformatie in, stuur het in, en na een korte review van ons staat uw bedrijf in de lijst.</p>
<p>U hoeft niet alle velden in te vullen. Een veld leeg wordt niet in de gids getoont.</p>
<p>Wilt u later informatie later aanpassen, vragen wij u dit ons per email te sturen.</p>

<p>* zijn plichtvelden<br>&nbsp;</p>


<form method="POST" action="?/register" bind:this={frmCompanyInfo} on:keyup={collectFormData}>
<table width="100%">

    <tr>
        <td width="1"></td>
        <td></td>
    </tr>
    <tr>
        <td>Naam *</td>
        <td><input name="name" type="text" value="{form?.name || ''}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Categorie</td>
        <td><input name="category" type="text"  value="{form?.category || ''}"></td>
    </tr>
    <tr>
        <td>Subcategorie</td>
        <td><input name="subcategory" type="text" value="{form?.subcategory || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Straat</td>
        <td><input name="street" type="text"  value="{form?.street || ''}"></td>
    </tr>
    <tr>
        <td>PLZ</td>
        <td><input name="postalcode" type="text"  value="{form?.postalcode || ''}"></td>
    </tr>
    <tr>
        <td>Plaats</td>
        <td><input name="city" type="text"  value="{form?.city || ''}"></td>
    </tr>
    <tr>
        <td>Regio *</td>
        <td><input name="region" type="text"  value="{form?.region || ''}"></td>
    </tr>
    <tr>
        <td>Land</td>
        <td><input name="country" type="text"  value="{form?.country || 'Oostenrijk'}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Telefoon</td>
        <td><input name="phone" type="text"  value="{form?.phone || ''}"></td>
    </tr>
    <tr>
        <td>Mobile</td>
        <td><input name="mobile" type="text" value="{form?.mobile || ''}" ></td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td><input name="email" type="text" value="{form?.email || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Website URL</td>
        <td><input name="urlwww" type="text"  value="{form?.urlwww || ''}"></td>
    </tr>
    <tr>
        <td>Google URL</td>
        <td><input name="urlgoogle" type="text" value="{form?.urlgoogle || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Infotext</td>
        <td><textarea name="intotext" rows="5">{form?.infotext || ''}</textarea></td>
    </tr>
    
    <tr>
        <td>Logo</td>
        <td><input name="logo" type="text"  value="{form?.logo || ''}"></td>
    </tr>
    <tr>
        <td>Tags</td>
        <td><input name="tags" type="text"  value="{form?.tags || ''}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <button type="submit">Bedrijf regestratie voltooien</button>
            <!--
                <button type="button" on:click={collectFormData}>Preview genereren</button>
            -->
        </td>
    </tr>
        
</table>
</form>

<h2>Voorbeeld in de resultaten:</h2>

<CompanyInfo {company_info} />


<style>

    input, textarea {
        width: 100%;
    }

    td {
        white-space: nowrap;
    }

</style>