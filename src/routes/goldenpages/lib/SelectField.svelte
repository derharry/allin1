<script>

    /** array[] list of data for option fields */
    export let datalist = [ ['001', 'no data 1'] ]

    /** form name for select field */
    export let name          = ''

    /** selected id (keyvalue) to auto select and return */
    export let selected_id   = null

    /** selected text of the option field - readonly */
    export let selected_text = ''

    /** dom binding of select field */
    let dom_select = undefined


    //$: console.log(`SelectField ${name}`, datalist)

    /** state to update the text value selected_text of selected option */
    $: if (dom_select && dom_select.children.length > 0 && selected_id) {   // we have a binding :-)
        //console.log(`SelectField ${name} selectedIndex change`, selected_id, selected_text, dom_select.selectedIndex)
        if (dom_select.selectedIndex != -1) {
            selected_text = dom_select.options[dom_select.selectedIndex].text
        } else {
            selected_text = ''
        }
        //console.log(`SelectField ${name} selectedIndex change`, selected_id, selected_text, dom_select.selectedIndex)
    }

    // html debug check {selected_id}/{selected_text}
</script>



<select name={name}
    bind:this={dom_select}
    bind:value={selected_id}
>

    {#each datalist as [key, text] }

        <option value={key} > {text} </option>

    {/each}

</select>


    
