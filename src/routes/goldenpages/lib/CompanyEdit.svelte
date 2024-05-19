<script>

    import SelectField from './SelectField.svelte'

    export let company_info  = {}
    export let category_list = {}
    export let mode = 'public' || 'admin'

    //$: console.log('CompanyEdit / company_info', company_info)
    //$: console.log('list_categories', list_categories)
    //$: console.log('list_subcategories', list_subcategories)
    //$: console.log('selected_category_uuid', selected_category_uuid)

    //$: console.log(category_list)
    $: list_categories    = get_list_of_categories(category_list)
    $: list_subcategories = get_list_of_categories(category_list, company_info.main_category_uuid)


    // dynamic state for the 2 select fields 
    // set main_category_uuid by the (sub/parent)category_id
    $: if (company_info?.main_category_uuid == undefined) {
        //console.log('gggetttt main category baaacckkkk')
        for (let main_uuid in category_list) {
            //console.log(main_uuid)
            for (let sub_uuid in category_list[main_uuid].subs) {
                //console.log(sub_uuid, company_info.category_uuid)
                if (sub_uuid == company_info.category_uuid) {
                    //console.log('mamaaaatttchhhh')
                    company_info.main_category_uuid = main_uuid
                    break
                }
            }
        }
    }


    /**
     * transform the treeview back to a normal list for select-options
    */
    function get_list_of_categories (category_list, parent_id = null) {
        try {
            let list = []

            if (parent_id == null) {
                for (let uuid in category_list) {
                    //console.log('uuid', uuid)
                    list.push([ uuid, category_list[uuid].name ])
                }
            } else if (category_list[parent_id]) {
                let subcats = category_list[parent_id].subs
                for (let uuid in subcats) {
                    list.push([ uuid, subcats[uuid].name ])
                }
            }

            //console.log('list', list)
            return list
        } catch (ex) {
            console.log(ex)
        }
    }


    function set_main_category_by_subcategory() {
        
    }



</script>


<style>

    input, textarea {
        width: 100%;
    }

    td {
        white-space: nowrap;
    }

</style>



<table width="100%">

    <tr>
        <td width="1"></td>
        <td></td>
    </tr>
    <tr>
        <td>Naam *</td>
        <td><input name="name" type="text" bind:value="{company_info.name}" placeholder="hoe heet je bedrijf?"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Kategorie</td>
        <td style="white-space: nowrap;">
            <SelectField name="main_category"
                datalist={list_categories}
                bind:selected_id={company_info.main_category_uuid}
                bind:selected_text={company_info.main_category_name}
            />
            /
            <SelectField name="category_uuid"
                datalist={list_subcategories}
                bind:selected_id={company_info.category_uuid}
                bind:selected_text={company_info.category_name}
            />
            <br>
            <input type="text" name="category_wish" value="" placeholder="Geen kategorie gevonden? Maak een voorstel zoals naam / naam">
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Straat</td>
        <td><input name="street" type="text"  bind:value="{company_info.street}"></td>
    </tr>
    <tr>
        <td>PLZ</td>
        <td><input name="postalcode" type="text"  bind:value="{company_info.postalcode}"></td>
    </tr>
    <tr>
        <td>Plaats</td>
        <td><input name="city" type="text"  bind:value="{company_info.city}"></td>
    </tr>
    <!--
        not needed at the moment
    <tr>
        <td>Regio *</td>
        <td><input name="region" type="text"  bind:value="{company_info.region}"></td>
    </tr>
    -->
    <tr>
        <td>Land</td>
        <td>
            <select name="country_id" bind:value={company_info.country_id}>
                <option value="43" selected>Oostenrijk</option>
                <option value="31">Nederland</option>
                <option value="32">Belgie</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Telefoon</td>
        <td><input name="phone" type="text"  bind:value="{company_info.phone}"></td>
    </tr>
    <tr>
        <td>Mobile</td>
        <td><input name="mobile" type="text"  bind:value="{company_info.mobile}" ></td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td><input name="email" type="text"  bind:value="{company_info.email}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Website URL</td>
        <td><input name="urlwww" type="text"  bind:value="{company_info.urlwww}"></td>
    </tr>
    <tr>
        <td>Google URL</td>
        <td><input name="urlgoogle" type="text"  bind:value="{company_info.urlgoogle}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Infotext</td>
        <td><textarea name="infotext" rows="5"  bind:value={company_info.infotext}></textarea></td>
    </tr>
    
    <tr>
        <td>Logo</td>
        <td><input name="logo" type="text"  bind:value="{company_info.logo}"></td>
    </tr>
    <tr>
        <td>Tags</td>
        <td><input name="tags" type="text"  bind:value="{company_info.tags}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2" align="center">

            {#if mode == 'admin'}
               <input type="hidden" name="uuid" value="{company_info.uuid}">
               <button type="submit">Veranderingen opslaan</button>
            {:else}
                <button type="submit">Bedrijf registratie voltooien</button>
            {/if}
            


        </td>
    </tr>
        
</table>
