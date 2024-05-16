<script>

    import CompanyEdit from '../../lib/components/CompanyEdit.svelte'
    import CompanyInfo from '../../lib/components/CompanyInfo.svelte'

    /** @type {import('./$types').PageData} */
    export let data;

    export let form;

    let list = data.list || {}

    $: edit_mode = false


    function company_edit(event) {
        //console.log('fire in the hole! ', event.detail, {event})
        const uuid = event.detail
        let found = false
        console.log(list)
        for (let item in list) {
            if (!found) {
                console.log(item)
                if (item.uuid == uuid) {
                    console.log(item.uuid)
                    found = true
                    form = item
                }
            }
        }
        if (found) {
            edit_mode = true
        }
    }

    function company_delete(event) {
        console.log(`Notify fired! delete: `, {event});
        //console.log('fire in the hole! ', event.detail, {event})
    }
    

</script>


{#if ! edit_mode}

    <ul>
        <li>All</li>
        <li>Unpublic</li>
        <li>Public</li>
        <li><input type="" name="filter"></li>
    </ul>


    {#each list as company_info}
        <CompanyInfo {company_info} mode="admin" on:edit={company_edit} on:delete={company_delete} />
    {/each}


{:else}

    <button on:click="{ () => edit_mode = false }">Terug</button>
    <CompanyEdit {form} />

{/if}

