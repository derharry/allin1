<script lang="ts">

    import * as utils from '$lib/utils/inc.utils.js';
    import { prepare_new_dataset } from '$lib/utils/db.utils.client'
    import Form from "$components/Form/Form.svelte";
    import Modal from "$components/Modal/Modal.svelte";
	import PanelCrud from '$components/Panels/PanelCRUD.svelte';


    export let data = undefined
    export let form = undefined

    let ds_fields  = data?.fields || { name: { text: 'Name', type: 'String', default: 'x', placeholder: '(name)', foreign_key: null, _is_visible: true } }

    let dom_form_create        = undefined
    let dom_form_create_is_enabled = false
    let ds_data_create         = prepare_new_dataset(ds_fields) || null // || { 'name': 'john',  'uuid': 123 }
    let ds_data_create_reset   = null               //    { 'name': 'Reset', 'uuid': 123 }
    $:  ds_data_create_reset   = utils.clone_of_object(ds_data_create)
    
    let dom_form_update        = undefined
    let dom_form_update_is_enabled = false
    $: ds_data_selected       = (data && data?.dataset.length > 0) ? data.dataset[0] : null // || { 'name': 'john',  'uuid': 123 }
    let ds_data_selected_reset = null               //    { 'name': 'Reset', 'uuid': 123 }
    $:  ds_data_selected_reset = utils.clone_of_object(ds_data_selected)

    
    
    let debug = false
    let debugText = 'DEBUG +page.svelte home'
    $: if (debug)  utils.cl(debugText, {data})
    $: if (debug)  utils.cl(debugText, {form})

    let panel_is_enabled = false

    let dom_modal_create;
    let dom_modal_create_show = true
    let dom_modal_update;
    let dom_modal_update_show = true
</script>

Home 
<hr>

<table>
    <tr>
        <td>
            <button on:click={() => dom_modal_create_show = dom_modal_create_show ? false : true }>toggle create</button>
            <button on:click={() => dom_modal_update_show = dom_modal_update_show ? false : true }>toggle edit</button>
            <button on:click={() => dom_modal_create.open() }>show create</button>
            <button on:click={() => dom_modal_update.open() }>show create</button>
        </td>
    </tr>
</table>

<table width="1" style="width:1px">
    <tr>

        <td>
            <div style="max-width:200px; background-color:beige; display:table">

                {#if dom_modal_create_show}
                    <!--<Modal bind:this={dom_modal_create}
                    ></Modal>  -->
                        <PanelCrud  
                            title="New entry"
                            action_button_Save_formaction="?/create"
                            action_button_Delete_show={false}
                            dom_form={dom_form_create}
                            dom_modal={dom_modal_create}
                            panel_is_enabled={dom_form_create_is_enabled}
                        >
                            <Form bind:this={dom_form_create} 
                                form_fields={ds_fields} 
                                form_data=  {ds_data_create} 
                                form_data_reset= {ds_data_create_reset} 
                                {form} 
                                use_default_actions={false} 
                                form_url_binding='?/create'
                                bind:form_is_enabled={dom_form_create_is_enabled}
                            >
                            </Form>
                        </PanelCrud>
                    
                {/if}
            </div>
        </td>

        <td>
            <div style="max-width:200px; background-color:beige; display:table">
                {#if dom_modal_update_show}
                    <!--<Modal bind:this={dom_modal_update}
                    ></Modal>  -->
                        <PanelCrud  
                            title="Update entry"
                            action_button_Save_formaction="?/update"
                            action_button_Delete_formaction="?/delete"
                            dom_form={dom_form_update}
                            dom_modal={dom_modal_update}
                            bind:panel_is_enabled={dom_form_update_is_enabled}
                            ><!-- -->
                            <Form bind:this={dom_form_update} 
                                form_fields={ds_fields} 
                                form_data=  {ds_data_selected} 
                                form_data_reset= {ds_data_selected_reset} 
                                {form} 
                                use_default_actions={false}
                                form_url_binding='?/update,?/delete'
                                bind:form_is_enabled={dom_form_update_is_enabled}
                            >
                            </Form>
                        </PanelCrud>
                    
                {/if}
            </div>
        </td>
    </tr>

</table>

<style>
    td {
        vertical-align:top
    }
</style>