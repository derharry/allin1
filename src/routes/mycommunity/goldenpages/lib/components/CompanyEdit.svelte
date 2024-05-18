<script>

    export let company_info  = {}
    export let category_list = {}

    //$: console.log(category_list)
    $: list_categories    = get_list_of_categories(category_list)
    $: list_subcategories = get_list_of_categories(category_list, selected_category_uuid)


    //$: console.log('list_categories', list_categories)
    //$: console.log('list_subcategories', list_subcategories)
    //$: console.log('selected_category_uuid', selected_category_uuid)

    // dom value bindings
    let selected_category_
    let selected_category_uuid = 0;

    
    /**
     * transform the treeview back to a normal list for select-options
    */
    function get_list_of_categories (cat_list, parent_id = null) {
        try {
            let list = []

            if (parent_id == null) {
                for (let uuid in cat_list) {
                    //console.log('uuid', uuid)
                    list.push([ uuid, cat_list[uuid].name ])
                }
            } else if (cat_list[parent_id]) {
                let subs = cat_list[parent_id].subs
                //console.log('subcatlist', subs)
                for (let sub in subs) {
                    //console.log('sub', sub, subs[sub])
                    list.push([ sub, subs[sub] ])
                }
            } else {
                console.log('check', selected_category_uuid)
            }

            //console.log('list', list)
            return list
        } catch (ex) {
            console.log(ex)
        }
    }


    function handle_category_change(event) {
        let select = event.target
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
        <td><input name="name" type="text" value="{company_info?.name || ''}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Kategorie</td>
        <td>
            <!-- no name because we don't need this categorie into the db -->
            <select bind:value={selected_category_uuid}>
                {#each list_categories as [key, value] }
                    <option value={key}>{value}</option>
                {/each}
            </select>
        </td>
    </tr>
    <tr>
        <td>Onder kategorie</td>
        <td>
            <select name="category_id">
                {#each list_subcategories as [key, value] }
                    <option value={key}>{value}</option>
                {/each}
            </select>
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Straat</td>
        <td><input name="street" type="text"  value="{company_info?.street || ''}"></td>
    </tr>
    <tr>
        <td>PLZ</td>
        <td><input name="postalcode" type="text"  value="{company_info?.postalcode || ''}"></td>
    </tr>
    <tr>
        <td>Plaats</td>
        <td><input name="city" type="text"  value="{company_info?.city || ''}"></td>
    </tr>
    <!--
        not needed at the moment
    <tr>
        <td>Regio *</td>
        <td><input name="region" type="text"  value="{company_info?.region || ''}"></td>
    </tr>
    -->
    <tr>
        <td>Land</td>
        <td>
            <select name="country_id">
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
        <td><input name="phone" type="text"  value="{company_info?.phone || ''}"></td>
    </tr>
    <tr>
        <td>Mobile</td>
        <td><input name="mobile" type="text" value="{company_info?.mobile || ''}" ></td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td><input name="email" type="text" value="{company_info?.email || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Website URL</td>
        <td><input name="urlwww" type="text"  value="{company_info?.urlwww || ''}"></td>
    </tr>
    <tr>
        <td>Google URL</td>
        <td><input name="urlgoogle" type="text" value="{company_info?.urlgoogle || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Infotext</td>
        <td><textarea name="infotext" rows="5">{company_info?.infotext || ''}</textarea></td>
    </tr>
    
    <tr>
        <td>Logo</td>
        <td><input name="logo" type="text"  value="{company_info?.logo || ''}"></td>
    </tr>
    <tr>
        <td>Tags</td>
        <td><input name="tags" type="text"  value="{company_info?.tags || ''}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <button type="submit">Bedrijf regestratie voltooien</button>
        </td>
    </tr>
        
</table>
