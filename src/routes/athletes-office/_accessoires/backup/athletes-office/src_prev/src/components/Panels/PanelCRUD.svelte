<svelte:options accessors />
<script lang="ts">
    
	//#region Imports

    import * as utils from "$lib/utils/inc.utils"

    //#endregion


    //#region properties
    //export let dom_panel:  HTMLElement       = undefined
    export let dom_form:   HTMLFormElement   = undefined
    export let dom_modal:  HTMLDialogElement = undefined

    //export let form: object = undefined

    export let title: string = '...PanelCrud...'

    //#endregion

	//#region states

	export let panel_is_enabled = true;
	//$: panel_is_enabled =  (dom_form && dom_form?.form_is_enabled) ? dom_form?.form_is_enabled : dom_form?.form_is_enabled

	//#endregion

    //#region public probs methods callbacks

		//#region any da

			/**
			 * callback function to call when window closes
			 * @type {function}
			 */
			 export let on_close_callback = undefined;

			/**
			 * callback function to call at form submits
			 * @type {function}
			 */
			export let on_submit_before_callback = undefined;

			/**
			 * callback function to call after form submits (response)
			 * @type {function}
			 */
			export let on_submit_after_callback = undefined;


		//#endregion

		//#region action buttons Cancel  ################################

			/**
			 * show or hide the button
			 */
			export let action_button_Cancel_show = true;

			/**
			 * text in footer button
			 * @type {string}
			 */
			export let action_button_Cancel_text = 'Cancel';

			/**
			 * callback at click
			 * @type {function}
			 */
			export let action_button_Cancel_callback = (event) => { };

			const action_button_Cancel_click = (event) => {
				if (debug) { debug_run++;  utils.cl(debug_text, debug_run, 'action_button_Cancel_click()', {dom_form}, event) }
				if (action_button_Cancel_callback(event))
					dom_form.on_reset_form()
				//return event
				//dom_form.reset_form()
				//dom_form.ds_dataset = Object.entries(dom_form.ds_reset)
				//dom_form.res
			}

		//#endregion

		//#region action button Save  #################################

			export let action_button_Save_formaction = ''

			/**
			* show or hide the button
			*/
			export let action_button_Save_show = action_button_Save_formaction != '' ? true : false

			/**
			* text in footer button
			* @type {string}
			*/
			export let action_button_Save_text = 'Save'

			/**
			* callback at click
			* @type {function}
			*/
			export let action_button_Save_callback = undefined

			/** 
			* formaction for button
			* @type {string}
			*/
			export let action_button_Save_click = (event) => {
				if (debug) { debug_run++;  utils.cl(debug_text, debug_run, 'action_button_Save_click()', {dom_form}, event) }
				action_button_Save_callback
				//dom_form.form_action = action_button_Save_formaction
				//dom_form.unbind('submit').submit()
			};

		//#endregion

		//#region action button Delete  #######################################

			/**
			* show or hide the button
			*/
			export let action_button_Delete_show = true;

			/**
			* text in footer button
			* @type {string}
			*/
			export let action_button_Delete_text       = 'Delete';

			/**
			* callback at click
			* @type {function}
			*/
			export let action_button_Delete_callback   = undefined;

			/** 
			* formaction for button
			* @type {string}
			*/
			export let action_button_Delete_formaction = '?/delete';


			/** 
			* formaction for button
			* @type {string}
			*/
			export let action_button_Delete_click = () => {
				if (debug) { debug_run++;  utils.cl(debug_text, debug_run, 'action_button_Delete_click()', {dom_form}, event) }
				action_button_Delete_callback
				//dom_form.submit()
			};

		//#endregion button Delete

	//#endregion


	//#region debug
    let debug = false
    let debug_in_html = false
    let debug_run = 0
    $:  debug_text = 'DEBUG PanelCRUD.svelte '+ title +' :'+ debug_run +' #  '
    //$: if (debug) utils.cl(debug_text, 'binding enable', dom_form?.form_is_enabled)
	//#endregion

</script>
<style>
    @import '$css/PanelCRUD.css';
</style>


{#if debug}
    {#if panel_is_enabled}
		<button on:click={()=>panel_is_enabled = false}>disable</button>
	{:else}
		<button on:click={()=>panel_is_enabled = true}>enable</button>
	{/if}
{/if}


<table width="100%" cellpadding="0" cellspacing="0" border="0">

    <thead>
        <tr>
            <td class="ui_dialog_head">

                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>

                        <td class="ui_dialog_head_title" nowrap valign="middle">{title}</td>						

                        <td class="ui_dialog_head_actionbar" width="1" nowrap valign="middle">

                            {#if action_button_Delete_show}
                                <button type="submit" form={dom_form?.form_id} formaction="{action_button_Delete_formaction}" on:click={action_button_Delete_click} disabled={!panel_is_enabled}> <!-- on:click={action_button_Delete_click}> -->
                                    <iconify-icon icon="material-symbols:delete"></iconify-icon>
                                </button>
                            {/if}


                            {#if action_button_Cancel_show}
                                <button type="reset" form={dom_form?.form_id} on:click={action_button_Cancel_click} disabled={!panel_is_enabled}>
                                    <iconify-icon icon="grommet-icons:revert"></iconify-icon>
                                </button>
                            {/if}


                            {#if action_button_Save_show}
                                <button type="submit" form={dom_form?.form_id} formaction="{action_button_Save_formaction}" on:click={action_button_Save_click} disabled={!panel_is_enabled}>
                                    <iconify-icon icon="fluent:save-16-filled"></iconify-icon>
                                </button>
                            {/if}

                            <!--
                                keep it for backup in case there is an use-case for it :-)
                                <slot name="buttons"></slot>
                            -->

                        </td>

						{#if dom_modal}
                        <td class="ui_dialog_head_action_close" width="1" align="right"  nowrap valign="middle">
                            <button type="button" on:click={() => dom_modal.close()}><!--on:click={close()}>-->
                                <iconify-icon icon="fa-solid:window-close"></iconify-icon>
                            </button>
                        </td>
						{/if}

                    </tr>
                </table>
            
            </td>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td><slot></slot></td>
        </tr>
    </tbody>
</table>