<script>
    export let data; // data from server
    let data_contacts = data?.data || []

    $: console.log(data_contacts)
</script>

<form method="post" action="?/none">
<table>
    <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Gender</th>
        <th>Nationality</th>
        <th>Age</th>
        <th>Birthday</th>
        <th>Phone Nr 1</th>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <td>..filter..</td>
    </tr>
    {#each data_contacts as contact}
    <tr>
        <td contenteditable="true" bind:innerHTML={contact.firstname} on:input={() => contact._changed=true}>{contact.firstname}</td>
        <td contenteditable="true" bind:innerHTML={contact.lastname} on:input={() => contact._changed=true}>{contact.lastname}</td>
        <td>{contact.gender_id}</td>
        <td>{contact.nationality_id}</td>
        <td>{contact.birthday}</td>
        <td><input type="date" value="{contact.birthday}"></td>
        <td></td>
        <td></td>
        <td>
            <button formaction="?/saveContact"   name="uuid" value="{contact.uuid}" disabled={contact._changed ? false : true }> S </button>
            <button formaction="?/deleteContact" name="uuid" value="{contact.uuid}"> X </button>
        </td>
    </tr>
    {/each}
</table>
</form>

<style>
    aside {

    }

    main {

    }
</style>

