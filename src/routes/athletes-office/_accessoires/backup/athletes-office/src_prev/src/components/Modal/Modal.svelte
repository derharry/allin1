<svelte:options accessors />
<script lang="ts">

    //#region Imports

    import * as utils from "$lib/utils/inc.utils";

    //#endregion


    //#region Properties

    /**
     * access to HTML Dom Element (also public)
     * @type {HTMLDialogElement}
     */
    export let dom_modal:  HTMLDialogElement = undefined
    export let dom_form:   HTMLFormElement   = undefined
    export let show_modal: boolean = false;

    export let form:  object = undefined
    export let form2: object = undefined
    
    export let title: string = '...Modal...'
    export let auto_close_on_success = true

    //#endregion


    //#region Methods public

    export function open  () {  show_modal = false; show_modal = true; }
    export function close () {  show_modal = false;                    }

    //#endregion


    //#region States
 
    // show or hide the modal
    $: if (dom_modal &&  show_modal) dom_modal.showModal();
    $: if (dom_modal && !show_modal) dom_modal.close();

    // auto_close_on_success work with binding form2 data!
    //#buggy: need to find a way to re-open even when form2 is set
    //  $: show_modal = (auto_close_on_success  &&  form2  &&  form2.ok) ? false : show_modal    

    // add listener to show_modal to change type string - happens with Svelte's component props!
    $:   if ( typeof(show_modal) != 'boolean' && show_modal.toString() == 'true'  ) show_modal = true
    else if ( typeof(show_modal) != 'boolean' && show_modal.toString() == 'false' ) show_modal = false

    //#endregion 


    //#region debug
    let debug = false
    let debug_in_html = false
    let debug_run  = 0
    $:  debug_text = 'DEBUG Modal.svelte :'+ debug_run +' #  '
    $: if (debug)  utils.cl(debug_text, {show_modal})
    //#endregion

</script>
<style>
    @import '$css/Modal.css';
</style>


                              <!-- catch the ESC-key -->
<dialog bind:this={dom_modal} on:close={close()}>
    <!--
        when clicking outside of window it would close with following: on:click|self={()=>show_modal=false}> 
    -->

    <slot> <!-- is name="body" by default -->
        <div id="body">
            {title}
        </div>
    </slot>

</dialog>