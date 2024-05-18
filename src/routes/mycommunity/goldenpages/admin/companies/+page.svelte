<script>

    // import components that are used at admin and public
    import CompanyEdit from '../../lib/components/CompanyEdit.svelte'
    import CompanyInfo from '../../lib/components/CompanyInfo.svelte'


    /** @type {import('./$types').PageData} */
	export let data;

    /** @type {import('./$types').ActionData} */
    export let form = {}


    //$: console.log({data})
    //$: console.log({form})


    // grep the loaded data
    let list = data?.list || {}
    let category_list = data?.category_list || {}

    // state edit mode needed for company edit
    $: edit_mode = false


    // component bindings

    /**
     * hidden HTLM Form Element to delete any category by using Svelte-actions
    */  
    let frm_actions

    // component logic

    function company_edit(event) {
        //console.log('fire in the hole! ', event.detail, {event})
        const uuid = event.detail
        for (let company of list) {
            if (company.uuid == uuid) {
                //console.log(company.uuid)
                form = company
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



<!--
    Either 
        edit an entry when edit_mode is true
    OR
        list all entries
-->

{#if edit_mode}

    <button on:click="{ () => edit_mode = false }">Terug</button>
    <form action="?/update_company" method="POST">
        <CompanyEdit company_info={form} {category_list} />
    </form>
    
{:else}

    <!-- 
        show filters for list
    -->
    <div>
        <a href="">All</a>
        <a href="">Unpublic</a>
        <a href="">Public</a>
        <a href=""><input type="" name="filter"></a>
    </div>
    <hr>

    <!--
        list all entries
    -->
    {#each list as company_info}
        <CompanyInfo {company_info}  mode="admin" on:edit={company_edit} on:delete={company_delete} on:toggle_public={company_toggle_public} />
    {/each}

    <!--
        hidden form to perform the dispatched actions
    -->
    <form action="" method="POST" bind:this={frm_actions}>
        <input type="hidden" name="uuid" value="">
    </form>

{/if}

