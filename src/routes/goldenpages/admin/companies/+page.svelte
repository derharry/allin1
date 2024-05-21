<!--
    Companies
    page of GoldenPages / admin / companies
-->
<script>
    
    // import components that are used at admin and public
    import SearchField from '../../lib/SearchField.svelte'
    import CompanyEdit from '../../lib/CompanyEdit.svelte'
    import CompanyInfo from '../../lib/CompanyInfo.svelte'
    import { page } from '$app/stores'


    /** @type {import('./$types').PageData} */
	export let data;

    /** @type {import('./$types').ActionData} */
    export let form = {}

    //$: console.log({data})
    //$: console.log({form})

    // grap loaded data
    let category_list = data?.category_list || {}
    let company_list  = data?.company_list || []
    let company_list_filtered = []

    //$: console.log({category_list})
    //$: console.log({company_list})

    $: if (form && form?.data !== undefined && form.data.formid == 'update_company') {
        edit_mode = true
    }


    /**
     * hidden HTLM Form Element to delete any company by using Svelte-actions
    */  
    let frm_actions    
    let SearchFieldValue = ''
    let SearchFieldsExtended = false

    // states
    
    /** do we list companies or edit a company */
    let edit_mode = false

    $:  search_string = SearchFieldValue.toLowerCase()


    // search state
    let search_fields     = ['name', 'infotext', 'tags', 'city', 'street', 'postalcode', 'phone', 'mobile', 'email', 'category_wish',]
    let search_fields_ext = ['urlgoogle', 'urlwww', 'urllogo']
    
    // filter state
    $: search_fields_todo = SearchFieldsExtended ? [...search_fields, ...search_fields_ext] : [...search_fields] 
    $: company_list_filtered = company_list.filter( row => {
            if (search_string == '')
                return row
            else {
                // let search_string = SearchFieldValue.toLowerCase() // this does not work. search_string need to be at top level
                return search_fields_todo.some(key => { 
                    if (key in row)  return row[key].toLowerCase().match(`${search_string}.*`) //console.log(key)
                        
                        
                })
            }
    })
    //$: console.log(search_string)
    //$: console.log(search_fields_todo)


    function company_edit_by_event(event) {
        //console.log('fire in the hole! ', event.detail, {event})
        const uuid = event.detail
        company_edit_by_uuid(uuid)
    }

    function company_edit_by_uuid(uuid) {
        for (let company of company_list) {
            if (company.uuid == uuid) {
                //console.log(company.uuid)
                form = {}
                form.data = company
                edit_mode = true
                break
            }
        }
    }

    function company_delete(event) {
        console.log(`Notify fired! delete: `, {event});
        frm_actions.children.uuid.value = event.detail
        frm_actions.action = '?/delete_company'
        frm_actions.submit()
    }

    function company_toggle_public(event) {
        console.log(`Notify fired! toggle public: `, {event});
        frm_actions.children.uuid.value = event.detail
        frm_actions.action = '?/toggle_public'
        frm_actions.submit()
    }

</script>
<style>
    @import '../../lib/style.css';
</style>


<table>
    <tr>
        <td>
            <a href="?show=all"           target="_self"  class="button {$page.url.searchParams.get('show') == 'all'           ? 'buttonActive' : ''}">All</a>
            <a href="?show=onlyPublic"    target="_self"  class="button {$page.url.searchParams.get('show') == 'onlyPublic'    ? 'buttonActive' : ''}">Public</a>
            <a href="?show=onlyNonPublic" target="_self"  class="button {$page.url.searchParams.get('show') == 'onlyNonPublic' ? 'buttonActive' : ''}">Non public</a>
        </td>
        <td>
            <SearchField name="search" bind:value={SearchFieldValue} placeholder="Wat zoek je?" />
        </td>
        <td class="nowrap" style="padding:15px">
                <input type="checkbox" bind:checked={SearchFieldsExtended} /><br>URL
        </td>
    </tr>
</table>
<hr>
&nbsp;<br>


    <!--
        Either 
            edit an entry when edit_mode is true
        OR
            list all entries
    -->

    <!-- show error messages of any form -->
    {#if form &&  form?.ok == false}
        <div class="error">
            {form?.message}
        </div>
    {/if}


    {#if edit_mode}
        
    
        <button on:click="{ () => edit_mode = false }">Terug</button>
        <form action="?/update_company" method="POST">
            <input type="hidden" name="formid" value="update_company">
            <CompanyEdit bind:company_info={form.data} {category_list} mode="admin" />
        </form>

        
    {:else}

        <!--
            list all entries
        -->
        {#each company_list_filtered as company_info}
            <CompanyInfo {company_info}  {category_list} mode="admin" 
                on:edit={company_edit_by_event} 
                on:delete={company_delete} 
                on:toggle_public={company_toggle_public} 
            />

        {:else}

            Er zijn nog geen bedrijfen geregistreerd.

        {/each}

        <!--
            hidden form to perform the dispatched actions
        -->
        <form action="" method="POST" bind:this={frm_actions}>
            <input type="hidden" name="uuid" value="">
        </form>

    {/if}

