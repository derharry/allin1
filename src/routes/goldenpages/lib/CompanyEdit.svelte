<script>

    import SelectField from './SelectField.svelte'
    import CompanyInfo from './CompanyInfo.svelte'

    export let company_info  = {}
    export let category_list = {}
    export let mode = 'public' || 'admin'


    //$: console.log(category_list)
    let list_categories    = get_list_of_categories() // we need it only at init
    $: list_subcategories  = get_list_of_categories(company_info?.main_category_uuid, true) 
    let no_category_in_list_69_42_ref = {
        main_uuid: category_list[69].uuid,
        main_text: category_list[69].name,
        sub_uuid : category_list[69].subs[42].uuid,
        sub_text : category_list[69].subs[42].name,
    }


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
     * handle the onchange event of select field and set 
     * and make even more dynamic handlings between them...
     * 
     * this does not work !!
     * //$: if (company_info.category_uuid == 42) company_info.main_category_uuid = 69
     * //$: if (company_info.main_category_uuid != 69) company_info.category_uuid = null
    */
    function handleSelectChange(event) {
        try {
            let select = event.target.name
            let value  = event.target.value
            if (select == 'main_category') {
                //console.log('maincat change && subcats generation...')
                if (value == 69) {
                    //console.log('69.... 42', value)
                    company_info.category_uuid = no_category_in_list_69_42_ref.sub_uuid
                    company_info.category_name = no_category_in_list_69_42_ref.sub_text
                } 
                else if (value != 69 && company_info.category_uuid.includes( 42 , 99) ) {
                    //console.log('not 69.... do nothing?', value)
                    company_info.category_uuid = null
                    company_info.category_name = ''
                }
                return
            }

            if (select == 'category_uuid') {
                //console.log('subcats change...', company_info.main_category)
                if (value == 42) {
                    //console.log('set main to undefined', value)
                    company_info.main_category_uuid = no_category_in_list_69_42_ref.main_uuid
                    company_info.main_category_name = no_category_in_list_69_42_ref.main_text
                }
                else if (value != 42 && company_info.main_category_uuid == 69) {
                    console.log('nothing todo :-)', value)
                    company_info.main_category_uuid = null
                    company_info.main_category_name = ''
                }
                return
            }
            /*
            if (event.target.name == 'category_uuid' && event.target.value == '42') {
                list_subcategories = get_list_of_categories(category_list, company_info.main_category_uuid) 
                company_info.category_uuid = 42
                company_info.main_category_uuid = undefined
                return
            } else if (event.target.name == 'category_uuid') {
                //nothing todo
                return
            }
            */

        } catch (error) {
            console.log(error)
        }
    }


    /**
     * transform the treeview back to a normal list for select-options
    */
    function get_list_of_categories (parent_id = null, get_sub = false) {
        try {
            //console.log(`get_list_of_categories(${parent_id}, ${get_sub})`)

            let list = []
            list.push([ 99, ''])

            if (parent_id == null && !get_sub) {

                //list.push([ 69, ' * geen gevonden * '])
                for (let uuid in category_list) {
                    list.push([ uuid,  category_list[uuid].name ])
                }

            } else if (category_list[parent_id]) {

                // push the references to 69_42
                if (parent_id != 69) {
                    //console.log({no_category_in_list_69_42_ref})
                    list.push( [ no_category_in_list_69_42_ref.sub_uuid , no_category_in_list_69_42_ref.sub_text  ])
                }
                
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


</script>
<style>

    @import './style.css';

    TD, TH {
        margin: 0px;
        padding: 0px;
        text-align: left;
        word-wrap: nowrap;
        white-space: nowrap;
    }

</style>



<table width="100%" cellspacing="0" cellpadding="0">

    <tr>
        <td width="1"></td>
        <td></td>
    </tr>
    <tr>
        <th>Naam *</th>
        <td><input name="name" type="text" bind:value="{company_info.name}" placeholder="hoe heet je bedrijf?"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <th>Kategorie</th>
        <td style="white-space: nowrap;">
            <SelectField name="main_category"
                datalist={list_categories}
                bind:selected_id={company_info.main_category_uuid}
                bind:selected_text={company_info.main_category_name}
                onchange={handleSelectChange}
            />
            /
            <SelectField name="category_uuid"
                datalist={list_subcategories}
                bind:selected_id={company_info.category_uuid}
                bind:selected_text={company_info.category_name}
                onchange={handleSelectChange}
            />
        </td>
    </tr>
    <tr>
        <th></th>
        <td><input type="text" name="category_wish" value="" placeholder="Geen kategorie gevonden? Maak een voorstel zoals naam / naam"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <th>Straat</th>
        <td><input name="street" type="text"  bind:value="{company_info.street}"></td>
    </tr>
    <tr>
        <th>PLZ</th>
        <td><input name="postalcode" type="text"  bind:value="{company_info.postalcode}"></td>
    </tr>
    <tr>
        <th>Plaats</th>
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
        <th>Land</th>
        <td>
            <select name="country_id" bind:value={company_info.country_id}>
                <option value="43" selected>Oostenrijk</option>
                <option value="31">Nederland</option>
                <option value="32">Belgie</option>
            </select>
        </td>
    </tr>
    <tr>
        <th>&nbsp;</th>
        <td></td>
    </tr>
    <tr>
        <th>Telefoon</th>
        <td><input name="phone" type="text"  bind:value="{company_info.phone}" 
            placeholder="Vul hier je telefonnummer nummer in">
       </td>
    </tr>
    <tr>
        <th>Mobile</th>
        <td><input name="mobile" type="text"  bind:value="{company_info.mobile}" 
            placeholder="Vul hier je 06 nummer in">
       </td>
    </tr>
    <tr>
        <th>E-mail</th>
        <td><input name="email" type="text"  bind:value="{company_info.email}" 
            placeholder="Vul hier je email adres in waar je primair gecontacteerd wordt">
       </td>
    </tr>
    <tr>
        <th>&nbsp;</th>
        <td></td>
    </tr>
    <tr>
        <th>URL Website</th>
        <td><input name="urlwww" type="text"  bind:value="{company_info.urlwww}"
            placeholder="Vul hier het adres van jouw website in">
       </td>
    </tr>
    <tr>
        <th>URL Google</th>
        <td><input name="urlgoogle" type="text"  bind:value="{company_info.urlgoogle}" 
             placeholder="Vul hier de URL van jouw Goolge Profile in">
        </td>
    </tr>
    <tr>
        <th>URL Logo</th>
        <td><input name="logo" type="text"  bind:value="{company_info.logo}"
            placeholder="Vul hier de URL van een Logo van je website in">
       </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <th>Infotext</th>
        <td><textarea name="infotext" rows="5"  bind:value={company_info.infotext} 
            placeholder="Geef een korte beschrijving over je bedrijf"
            ></textarea>
        </td>
    </tr>
    
    <tr>
        <th>Tags</th>
        <td><input name="tags" type="text"  bind:value="{company_info.tags}"
            placeholder="bvb: eten drinken bijles medicijnen uitgaan physio">
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2">

            <CompanyInfo bind:company_info={company_info} />

        </td>
    </tr>
    <tr>
        <td colspan="2" align="center" style="text-align:center">
            
            {#if mode == 'admin'}
                <input type="hidden" name="uuid" value="{company_info.uuid}">
               <button type="submit" class="button">Veranderingen opslaan</button>
            {:else}
                <button type="submit" class="button">Bedrijf registratie voltooien</button>
            {/if}
            
        </td>
    </tr>
        
</table>
