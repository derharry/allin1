<script>

    /** array[] list of data for option fields */
    export let datalist = [ ['001', 'no data 1'] ]

    /** form name for select field */
    export let name          = ''

    /** selected id (keyvalue) to auto select and return */
    export let selected_id   = null

    /** selected text of the option field - readonly */
    export let selected_text = ''

    export let onchange = null

    /** dom binding of select field */
    let dom_select = undefined


    //$: console.log(`SelectField ${name}`, datalist)
    $: selected_id = selected_id

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


    // reselect id when datalist changes
    // not working. Svelte works with Objectreferences
    // so set just a value (like numeric) does not work
    /*
    let checked = false
    $: if (datalist && checked == false) {
        console.log({selected_id})
        let i = -1
        for (let option of datalist) {
            i+=1
            if (option[0] == selected_id) {
                console.log( 'match', i, option[0], selected_id )
                if (i != dom_select.selectedIndex) {
                    //dom_select.options.selectedIndex = i
                    console.log( 'correct??', i, dom_select.selectedIndex)
                    //let selected_id_tmp = selected_id
                    //selected_id = null
                    //selected_id = selected_id_tmp
                    checked = false
                }
            }
        }
    }
    */

    // html debug check {selected_id}/{selected_text}
    //
</script>
<style>
    @import './style.css';
    

    SELECT {
        width: auto !important
    }
</style>



<select name={name}
    bind:this={dom_select}
    bind:value={selected_id}
    on:change={onchange}
>

    {#each datalist as [key, text] }

        <option value={key} > {text} </option>

    {/each}

</select>


    
