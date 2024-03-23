<svelte:options accessors />
<script lang="ts">
	
    //#region imports
    import * as utils from '$lib/utils/inc.utils.js'
    import {page} from '$app/stores'
    import { enhance } from '$app/forms';
    //#endregion

    //#region properties and callbacks

    export let dom_form     : HTMLFormElement = undefined     // form element in dom
    export let form_action  : string   = ''                   // form action
    export let form_method  : string   = 'POST'               // form method
    export let form_id      : string   = utils.generateUID()  // form id: required for binding elements that are  
                                                              //          outside of the form (like at PanelCRUD)
    export let form_url_binding     : string   = ''           // bind this form to a specific response_url $_REQUEST

    export let form_fields     : object   = {}           // object with fields (column) details
    export let form_data       : object   = {}           // key value list of current row
    //export let form_data_reset : object   = null       // data for on_reset() to set values back that original where given
 
    export let form            : object   = null         // $_REQUEST
    export let form2           : object   = null         // internal clone and usage of form , expose for like PanelCRUD

    //export let form_response  = null                   //
    export let show_form_message   : boolean = false     // show the form message 
    export let use_default_actions : boolean = false     // use default form actions, default false - so component works as a form generator
    
    export let on_submitting       : boolean = false
    export let form_is_enabled     : boolean = false

    let ds_data:  object  = {}
    let ds_reset: object  = {}

    let key_name_original     = '_form_original'
    let key_name_current_edit = '_form_current_edit'
    let key_name_last_submit  = '_form_last_submit'

    export let callback_submitted_success = (form2, this_component) => {}

    //#endregion properties and callbacks

    //#region state listeners

    /**
     * State prop form_is_enabled
     * 203     is successfully deleted
     * true    is on_submitting
     * ds_data is set (not null)
     */
    $: {
        form_is_enabled = form2?.status == 203 ? false :   
                                on_submitting ? false :   
                                    ds_data ? true : false
    } //|| !on_submitting

    /**
     * State and process $page.form
     * check if form data is for this form and process the data.
     * save the date to form2, set internal ds_data and ds_reset.
     * 
     */
    $: if (form && (!form2 || on_submitting) && form?.url  &&  pageform_is_for_this_FormComponent()) {
        // check if given formdata is for this form_url_binding
        // only when form is given &&  is for this form_url_binding  &&  form2 is empty
        //utils.pp('xxxx Form.svelte $:', {form})
        if (debug) utils.cl(debug_text, 'parse pageform_is_for_this_FormComponent()', {form2})

        form_data._form[key_name_last_submit] = utils.clone_of_object(form) // clone form to internal form
        form2 = utils.clone_of_object(form) // clone form to internal form  // bind _form_internal to internal form2
        form  = null                                   // empty form
        on_submitting = false                          // stop on_submitting
        show_form_message = true                       // 

        if (debug) utils.cl('check submitting', {on_submitting}, {form2})
        if (debug) utils.cl('form data is ' + form2?.ok +'...', {on_submitting}, {form2})

        const form2_data_clone = utils.clone_of_object(form2.data)
        if (form2.ok) {
            // copy values back to form_data (source)
            form_data = utils.copy_key_value_list_to(form2_data_clone, form_data)
            delete form_data._form
            form_data = form_data // reset to trigger to get _form back
        }
        else {
            // ! form2?.ok
            ds_data = utils.copy_key_value_list_to(form2_data_clone, ds_data)
        }
        callback_submitted_success(form2, self)
    }
    //#region backup form check before
    /*
    $: if (form) {
        // check if given formdata is for this form_url_binding
        // only when form is given &&  is for this form_url_binding  &&  form2 is empty
        //utils.pp('xxxx Form.svelte $:', {form})
        if ( form?.url  &&  form_is_for_this_Form()  &&  (!form2 || on_submitting) ) {
            if (debug) utils.pp('parse_form() form_url_binding:', form_url_binding, form_is_for_this_Form)
            form2 = utils.clone_of_object(form)            // clone form to form2
            form  = null                                   // empty form
            show_form_message = true                       // 
            on_submitting = false                          // stop on_submitting
            if (debug) utils.cl('check submitting', {on_submitting}, {form2})
            if (form2.ok) {
                Object.entries( form2.data ).forEach( ([key, value]) => {
                    form_data[key] = value
                })
                ds_data = null
                form_data = form_data
            }
            else { // ! form2?.ok
                if (debug) utils.cl('form data NOT OK...')
                Object.entries( form2.data ).forEach( ([key, value]) => {
                    ds_data[key] = value.toString().slice()
                })
            }
            callback_submitted_success()
        }
    }
    */
    //#endregion backup

    /**
     * State on form_data and form_data._form
     * 
     */
    $: if (form_data) {
        if (!form_data._form) {
            const clone_of_form_data = utils.clone_of_object(form_data)
            form_data._form = {}
            form_data._form[key_name_original]       = utils.clone_of_object(clone_of_form_data)
            form_data._form[key_name_current_edit]   = utils.clone_of_object(clone_of_form_data)
            form_data._form[key_name_last_submit]    = form2;
            form_data = form_data
        }
        // bind to internal variables
        form2    = form_data._form[key_name_last_submit]
        ds_data  = form_data._form[key_name_current_edit]
        ds_reset = form_data._form[key_name_original]
    }
    $: if (debug && (form_data && !form_data._form)) utils.cl(debug_text, 'parse  form_data and form_data._form ', {ds_data}, {form_data})
    $: if (debug && (form_data && form_data._form))  utils.cl(debug_text, 'binded form_data to  form_data._form ', {ds_data}, {form_data})

    //#endregion states

    //#region methods

    /**
     * checks if this $page.data is for this Form Component
     */
    function pageform_is_for_this_FormComponent() {
        return form_url_binding.split(',').some(e => form?.url.includes(e))
    }

    export function on_reset_form() {
        if (debug) { debug_run++;  utils.cl(debug_text, debug_run, 'on_reset_form()'); }
        
        // reset to given reset values
        // else simulate default form behaviour (emty all)
        if (ds_reset && Object.entries(ds_reset).length > 0) {
            ds_data = utils.copy_key_value_list_to(ds_reset, ds_data)
        } else {
            if (true) utils.pp('use default', {form_data}, )

            Object.keys(  form_data  ).forEach(key => {
                ds_data[key] = ''
            })
            ds_data = ds_data
        }
        /*
        //if (_ds_data_reset && Object.entries(_ds_data_reset).length > 0) {
        if (ds_data?._original_for_reset) {
            if (true) utils.pp('use form_reset_data clone')
            Object.entries(  utils.clone_of_object(form_data?._original_for_reset)  ).forEach(([key, value]) => {
                utils.cl(' - ', key, ':', value)
                ds_data[key] = value
            });
        }
        else {
        }
        */

        // prevent default behaviour .. it runs twice??
        return async ({ reset }) => {
            await update({ reset: false });
        }
    }

    export function on_submit_form() {
        if (debug) { debug_run++;  utils.cl(debug_text, 'on_submit_form()'); }
        on_submitting = true
        show_form_message = true
        form2 = null
        //show_form_message = false ! instead message "submitting" added
        //form2 = undefined         ! not required with panel?
        //form = undefined          ! done at state form2
        // prevent default behaviour .. it runs twice??
        return async ({ update }) => {
            await update({ reset: false });
        }
    }

    export function flush() {
        show_form_message = false
        ds_data.
        form2 = null
    }

    //#endregion methods

    //#region debug
    export let debug = false
    export let debug_in_html = debug
    let debug_run = 0
    $:  debug_text = 'DEBUG Form.svelte '+ form_url_binding +' :'+ debug_run +' #  '
    $: if (debug)  utils.cl(debug_text, {form_is_enabled})
    $: if (debug)  utils.cl(debug_text, {on_submitting})
    $: if (debug)  utils.cl(debug_text, {form})
    $: if (debug)  utils.cl(debug_text, {form2})
    $: if (debug)  utils.cl(debug_text, {ds_data})
    $: if (debug)  utils.cl(debug_text, {ds_reset})
    $: if (debug)  utils.cl(debug_text, {form_data})
    $: if (debug)  utils.cl(debug_text, {show_form_message})
    $: if (debug)  utils.cl(debug_text, 'FORMDATA', form2?.data.firstname, form2?.data.lastname)
    //$: if (debug) utils.cl(debug_text, {$page})
    //#endregion debug

</script>
<style>
    @import '$css/Form.css';

    .debug_panel {
        margin:  5px 5px;
        padding: 2px 2px; 
        background-color: darkslategrey; 
        color: silver;
        border-radius: 10px;
    }

    .debug_panel BUTTON {
        border-radius: 10px;
    }

    .debug_panel TD {
        vertical-align: top;
    }

</style>


<form 
    bind:this={dom_form} 
    action={form_action} 
    method={form_method} 
    id={form_id}
    on:reset|preventDefault={on_reset_form} 
    use:enhance={on_submit_form}
>
<!--  on:submit={on_submit_form}    -->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
   

    {#each Object.entries(form_fields) as [name, attr]}
        <!-- parsethrough all form_fields to get the fields, and grab data from ds_datasource -->
        {@const id          = 'field_'+ name   }
        {@const placeholder = attr.placeholder }
        {@const value       = form_is_enabled    }


        {#if attr.type == '_internal_'}
            <!-- no output for internal fields / avoid svelte's empty block message -->


        {:else if !attr._is_visible}
            <!-- output hidden fields -->
            {#if !form_is_enabled}
                <input type="hidden" {name} disabled="true" />
            {:else}
                <input type="hidden" {name} bind:value={ds_data[name]} />
            {/if}             
            <!-- 
            <tr>
                <td>-! {name}</td>
                <td>{ds_data[name]}</td>
            </tr>
            -->

        {:else}            
            <!-- output every form fields and data -->
            <tr>
                <th><span class="th">{attr.text}</span></th>
                <td>

                    {#if attr.type == 'String'}
                        {#if !form_is_enabled}
                            <input type="text" {name} disabled="true" />
                        {:else}
                            <input type="text" {name} bind:value={ds_data[name]} {placeholder} />
                        {/if}
                        

                    {:else if attr.type == 'Password'}
                        {#if !form_is_enabled}
                            <input type="password" {name} disabled="true" />
                        {:else}
                            <input type="password" {name} bind:value={ds_data[name]} {placeholder} />
                        {/if}


                    {:else if attr.type == 'Int'}
                        {#if !form_is_enabled}
                            <input type="number" {name} disabled="true" />
                        {:else}
                            <input type="number" {name} bind:value={ds_data[name]} {placeholder} />
                        {/if}


                    {:else if attr.type == 'Boolean'}
                        {#if !form_is_enabled}
                            <input type="checkbox" {name} disabled="true" />
                        {:else}
                            <input type="hidden"   {name} value=""><!-- fix the on/off aka true/false issue when unchecked -->
                            <input type="checkbox" {name} bind:checked={ds_data[name]} {placeholder} />
                        {/if}


                    {:else if attr.type == 'Date'}
                        {#if !form_is_enabled}
                            <input type="date" {name} disabled="true" />
                        {:else}
                            <input type="date" {name} bind:value={ds_data[name]} {placeholder} />
                        {/if}


                    {:else if attr.type == 'DateTime'}
                        {#if !form_is_enabled}
                            <input type="datetime" {name} disabled="true" />
                        {:else}
                            <input type="datetime" {name} bind:value={ds_data[name]} {placeholder} />
                        {/if}


                    {:else}
                        {attr.type}: {ds_data[name]}


                    {/if}

                </td>
            </tr>
            <tr class="spacer">
                <td></td>
                <td></td>
            </tr>
        {/if}

    {/each}



    {#if $$slots.actionbuttons || use_default_actions}
        <tr>
            <td colspan="2" align="center" class="form_default_actions">
                <slot name="actionsbuttons">
                    <button type="reset"  >Reset</button>
                    <button type="submit" formaction="{form_action}">Send</button> <!-- disabled={form2?.ok ? true : false } -->
                </slot>
            </td>
        </tr>
    {/if}



    {#if show_form_message}
    <tr>
        <td colspan="2" class="form_message_SLOT">
            <slot name="message">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        {#if on_submitting == true}
                            <td class="form_message form_message_submitting">
                                Submitting...
                            </td>
                        {:else if form2?.ok}
                            <td class="form_message form_message_okay">
                                {#if form2?.status == 201}
                                    Ok, data is created
                                {:else if form2?.status == 202}
                                    Ok, data is updated.
                                {:else if form2?.status == 203}
                                    Ok, data is deleted
                                {:else}
                                    Ok. Form submitted. {form2}
                                {/if}
                                <!--
                                    {#switch form2?.status}
                                        {:case 201}
                                            Ok. Data is saved.
                                        {:case 202}
                                            Ok. Data is updated.
                                        {:case 203}
                                            Ok. Data is deleted.
                                        {:default}
                                            Ok.
                                    {/switch}
                                -->
                            </td>
                        {:else}
                            <td class="form_message form_message_error">
                                {form2?.status}: {form2?.statusText}
                            </td>
                        {/if}
                    </tr>
                </table>
            </slot>
        </td>
    </tr>
    {/if}


    {#if debug_in_html}
        <tr>
            <td colspan="2">
                <table class="debug_panel">
                    <tr>
                        <td>
                            {#if form_is_enabled}
                                <button on:click={()=>form_is_enabled = false}>disable</button>
                            {:else}
                                <button on:click={()=>form_is_enabled = true}>enable</button>
                            {/if}
                            <table>
                                <tr>
                                    <td> {@html utils.var_dump('form_data', form_data),true      } </td>
                                    <td> {@html utils.var_dump('ds_data'  , ds_data)        } </td>
                                    <td> {@html utils.var_dump('ds_reset' , ds_reset)       } </td>
                                    <td> {@html utils.var_dump('form2'    , form2)          } </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!--
        <tr>
            <td style="vertical-align:top"><pre>{JSON.stringify(form_data, null, 2)}</pre></td>
            <td style="vertical-align:top"><pre>{JSON.stringify(form_data?.data, null, 2)}</pre></td>
            <td style="vertical-align:top"></td>
        </tr>
        -->
    {/if}

</table>
</form>


