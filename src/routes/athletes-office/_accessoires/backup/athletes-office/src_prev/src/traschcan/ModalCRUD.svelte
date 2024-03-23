<svelte:options accessors />
<script lang="ts">

	//#region Imports

    import * as utils from "$lib/utils/inc.utils"

    //#endregion


    //#region Properties

    /**
     * access to HTML Dom Element (also public)
     * @type {HTMLDialogElement}
     */
    export let dom_modal:  HTMLDialogElement = undefined
	export let dom_form:   HTMLFormElement   = undefined
    export let show_modal: boolean = false

	export let form: object = undefined

    // add listener to show_modal to change type string - happens with Svelte's component props!
    $:   if (typeof(show_modal)!='boolean' && show_modal.toString() == 'true' ) show_modal = true
    else if (typeof(show_modal)!='boolean' && show_modal.toString() == 'false') show_modal = false
    
    export let title: string = '...Modal...'

    //#endregion


    //#region states and listeners

    // show or hide the modal
    $: if (dom_modal &&  show_modal) dom_modal.showModal();
	$: if (dom_modal && !show_modal) dom_modal.close();

	$: if (form?.ok && form.ok) dom_modal.close()
	/*
	$: {
		console.log('xxxxxx', dom_form?.form)
		if (dom_form?.form) {
			console.log('xxxxxx', dom_form)
			if (dom_form?.form?.ok) {
				console.log('yyyyyy', dom_form.form)
				dom_modal.close()
			}
		}
	}*/

    //#endregion


	//#region public probs methods callbacks

		//#region any da

			/**
			 * callback function to call when modal window closes
			 * @type {function}
			 */
			 export let on_close_callback = undefined;

			/**
			 * callback function to call at modal form submits
			 * @type {function}
			 */
			export let on_submit_before_callback = undefined;

			/**
			 * callback function to call after modal form submits (response)
			 * @type {function}
			 */
			export let on_submit_after_callback = undefined;


			export const open  = () => {  close();  show_modal = true   }
    		export const close = () => {            show_modal = false  }

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
			export let action_button_Cancel_callback = (event) => {};

			const action_button_Cancel_click = (event) => {
				utils.cl('modal cancel click', {dom_form}, event)
				action_button_Cancel_callback(event)
				return event
				//dom_form.reset_form()
				//dom_form.ds_dataset = Object.entries(dom_form.ds_reset)
				//dom_form.res
			}

		//#endregion

		//#region action button Save  #################################

			/**
			* show or hide the button
			*/
			export let action_button_Save_show = true

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

			export let action_button_Save_formaction = ''

			/** 
			* formaction for button
			* @type {string}
			*/
			export let action_button_Save_click = (event) => {
				utils.cl('modal save click', {dom_form}, event)
				action_button_Save_callback
				dom_form.action = action_button_Save_formaction
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
			export let action_button_Delete_formaction = '';


			/** 
			* formaction for button
			* @type {string}
			*/
			export let action_button_Delete_click = () => {
				utils.cl('modal delete click', {dom_form})
				action_button_Save_callback
				//dom_form.submit()
			};

		//#endregion button Delete

	//#endregion


	//#region private modal methods

		/*
		$: handleSubmit = () => {
		console.log('hi',$page.form?.success,$page?.form)
		let success = $page?.form?.success
		if (success == true) hide()
		}
		*/

	//#endregion


    //debug
    $: if (true) {
        //ds_dataset = ds_dataset
        utils.ps('debug Modal')
        //utils.cl({ds_fields})
        //utils.cl({ds_fields})
        utils.cl({show_modal})
        utils.ps('/END debug Modal')
    }

</script>
<style>
    @import '$css/Modal.css';
</style>



                              <!-- catch the ESC-key -->
<dialog bind:this={dom_modal} on:close={close()}>
<!--
	when clicking outside of window it would close with following: on:click|self={()=>show_modal=false}> 
-->
<!--<form bind:this={dom_form} method="post">-->
	<table width="100%" cellpadding="0" cellspacing="0" border="0">


		<thead>
			<tr>
				<td class="ui_dialog_head">

					<table width="100%" cellpadding="0" cellspacing="0" border="0">
						<tr>

							<td class="ui_dialog_head_title" nowrap valign="middle">{title}</td>						

							<td class="ui_dialog_head_actionbar" width="1" nowrap valign="middle">

								{#if action_button_Delete_show}
									<button type="submit" form={dom_form?.id} formaction="{action_button_Delete_formaction}" on:click={action_button_Delete_click}> <!-- on:click={action_button_Delete_click}> -->
										<iconify-icon icon="material-symbols:delete"></iconify-icon>
									</button>
								{/if}

								{#if action_button_Cancel_show}
									<button type="reset" form={dom_form?.id} on:click={action_button_Cancel_click}>
										<iconify-icon icon="grommet-icons:revert"></iconify-icon>
									</button>
								{/if}


								{#if action_button_Save_show}
									<button type="submit" form={dom_form?.id} formaction="{action_button_Save_formaction}" on:click={action_button_Save_click}>
										<iconify-icon icon="fluent:save-16-filled"></iconify-icon>
									</button>
								{/if}

								<!--
									keep it for backup in case there is an use-case for it :-)
									<slot name="buttons"></slot>
								-->

							</td>

							<td class="ui_dialog_head_action_close" width="1" align="right"  nowrap valign="middle">
								<button type="button" on:click={() => close()}><!--on:click={close()}>-->
									<iconify-icon icon="fa-solid:window-close"></iconify-icon>
								</button>
							</td>

						</tr>
					</table>
				
				</td>
			</tr>
		</thead>


		<tbody>
			<tr>
				<td class="ui_dialog_message">
					<slot name="message"></slot>
				</td>
			</tr>
			<tr>
				<td class="ui_dialog_body">
					<slot></slot>  <!-- name="body" by default -->
				</td>
			</tr>
		</tbody>


		<!--  not in use for ModalCrud .. 
		<tfoot>
			<tr>
				<td class="footer">
					.ACTIONS.
				</td>
			</tr>
		</tfoot>
		-->


	</table>
<!--</form>-->
</dialog>