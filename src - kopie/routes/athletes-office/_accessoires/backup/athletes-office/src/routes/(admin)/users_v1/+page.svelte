<script>
    
    import * as utils from '$lib/utils/inc.utils.js';
    import Modal from '$components/Modal/Modal.svelte';
	
    let uiModal = undefined;

    export let data; // action load data
    //export let form; // action data

    //$: console.log('form', form)
    //$: console.log('status', $page.status)
    //$: console.log('error',  $page.error)

    let uiUserStoreFilter  = '';
    $: dsUserStore = data?.data || [];
    $: dsUserStoreFiltered = dsUserStore.filter(row => {
        return (row.firstname.includes(uiUserStoreFilter)
            ||  row.lastname.includes(uiUserStoreFilter)
            ||  row.email.includes(uiUserStoreFilter)
        )
        dsUserStoreFiltered = dsUserStoreFiltered
    });

    let dsNewUser = {
        uuid: '',
        firstname: '',
        lastname:  '',
        email:     '',
        password:  'init',
        active:    false
    }
    let dsSelectedUser      = dsNewUser;
    let dsSelectedUserReset = {...dsNewUser};

    
    $: uiFormTitle      = dsSelectedUser.uuid == '' ? 'New user' : dsSelectedUser.lastname +', '+ dsSelectedUser.firstname;
    $: uiFormActionUrl  = dsSelectedUser.uuid == '' ? '?/addNewUser' : '?/updateUser';
    $: uiFormActionSave = dsSelectedUser.uuid == '' ? undefined : '?/deleteUser';

    function setUIaddNewUser()  {
        dsSelectedUser = dsNewUser;
        dsSelectedUserReset = {...dsNewUser};
        uiModal.action_button_Delete_show = false;
        uiModal.show()
    }

    function setUIeditUser(row) {
        dsSelectedUser = row
        dsSelectedUserReset = {...row}
        uiModal.action_button_Delete_show = true;
        uiModal.show()
    }

    function setUIresetForm() {
        dsSelectedUser = {...dsSelectedUserReset};
        dsSelectedUserReset = {...dsSelectedUser};
        uiModal.show()
    }

    function userStoreRefresh() {}

</script>



<div class="ui_panel">
    <table>
        <tr>
            <td>
                <input type="text" name="uiUserStoreFilter" bind:value="{uiUserStoreFilter}" placeholder="..search..">
                
                <button on:click={setUIaddNewUser}> + </button>
            </td>
        </tr>
    </table>
</div>


<div class="ui_panel">
    <table cellspacing="0" cellpadding="5" class="uiDataTable">
        <thead>
            <tr>
                <th>Fistname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>active</th>
                <th></th>
            </tr>
            <tr>
            </tr>
        </thead>
        <tbody>
            {#each dsUserStoreFiltered as user}
                <tr 
                    on:dblclick={() => setUIeditUser(user)} 
                    id="{dsSelectedUser.uuid == user.uuid ? 'datatableSelected' : ''}"
                >
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td align="center"><input type="checkbox" checked={user.active} disabled></td>
                    <td>
                        <!-- works :-) 
                        <form method="post">
                            <button formaction="?/deleteUser" name="uuid" value="{user.uuid}">d</button>
                        </form>
                        -->
                        <button on:click={() => setUIeditUser(user)}><iconify-icon icon="fluent:edit-20-filled"></iconify-icon></button>
                    </td>
                </tr>
            {/each}
        </tbody>
        <tfoot>            
        </tfoot>
    </table>
</div>


<Modal bind:uiModal bind:this={uiModal}
    on:close="{setUIresetForm}"
    title={uiFormTitle}
    action_button_Cancel_show=true
    action_button_Save_show=true
    action_button_Cancel_callback   = {setUIresetForm}
    action_button_Save_formaction   = {uiFormActionUrl}
    action_button_Delete_formaction = {uiFormActionSave}
    >
    <!--
    <div slot="buttons">
        {#if dsSelectedUser.uuid != ''}
            <button type="submit" formaction="?/deleteUser">d</button>
        {/if}
        <button type="submit" formaction="{uiFormActionUrl}">s</button>
        <button type="button" on:click={setUIresetForm}>c</button>
    </div>
    -->
    <div slot="body">
        <input type="hidden" name="uuid" bind:value="{dsSelectedUser.uuid}">
        <table>
            <tr>
                <td><label for="firstname">Firstname</label></td>
                <td><input type="text" name="firstname" bind:value="{dsSelectedUser.firstname}" placeholder="firstname"></td>
            </tr>
            <tr>
                <td><label for="lastname">Lastname</label></td>
                <td><input type="text" name="lastname" bind:value="{dsSelectedUser.lastname}" placeholder="lastname"></td>
            </tr>
            <tr>
                <td><label for="email">Email</label></td>
                <td><input type="text" name="email" bind:value="{dsSelectedUser.email}" placeholder="email"></td>
            </tr>
            <tr>
                <td><label for="password">Password</label></td>
                <td><input type="text" name="password" bind:value={dsSelectedUser.password}></td>
            </tr>
            <tr>
                <td><label for="active">Active</label></td>
                <td><input type="checkbox" name="active" bind:checked={dsSelectedUser.active}>
                </td>
            </tr>
        </table>
    </div>
</Modal>