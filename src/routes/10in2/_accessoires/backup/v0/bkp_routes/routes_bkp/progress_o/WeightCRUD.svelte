<script>
	//import { defaultOptions } from 'mariadb';
	import { dataset, value_validation } from '../progress/[slug]/user_progress_data';

    // dom bindings
    let domInpWeigth = { };
    let domInpSelect = { };

    //console.log('c', count)
    //console.log('d', dataset)

    function weight_validation() {
        domInpWeigth.value = domInpWeigth.value.replace(',', '.');
        if (!value_validation(domInpWeigth.value)) {
            domInpWeigth.style = 'background-color:red';
            return false;
        }
        domInpWeigth.style = 'background-color:none';
        return true;
    }

    async function add() {
        if (weight_validation()) {
            let uuid = await dataset.insert(domInpWeigth.value)
            if (uuid)
                select(uuid)
        }
    }
    function upd() {
        if (weight_validation())
            dataset.update(getSelectedUUID(), domInpWeigth.value);
    }
    function del() {
        if (getSelectedUUID())
            dataset.remove(getSelectedUUID())
    }

    function getSelectedUUID() {
        try { 
            return domInpSelect.options[domInpSelect.selectedIndex].getAttribute('data-uuid');
        } catch {
            return false;
        }
    }

    function selected(e) {
        domInpWeigth.value = domInpSelect.options[domInpSelect.selectedIndex].value;
    } 

    function select(uuid) {
        for (let i=0; i< domInpSelect.length; i++) {
            //console.log(i, uuid, domInpSelect.options[i].getAttribute('data-uuid'))
            if (domInpSelect.options[i].getAttribute('data-uuid') == uuid) {
                //console.log('match')
                domInpSelect.options[i].selected = 'selected'
            }
        }
    }


</script>


<table>
    <tr>
        <td><input type="text" name="weight" value="" size="3" bind:this={domInpWeigth} on:keyup={weight_validation}> kg</td>
        <td width="1"><button on:click={e => (add())}>+</button></td>
        <td width="1"><button on:click={e => (upd())}>u</button></td>
        <td width="1"><button on:click={e => (del())}>x</button></td>
    </tr>
    <tr>
        <td colspan="4">
            <select size={10} bind:this={domInpSelect} on:change={selected} on:select={selected} on:click={selected}>
                {#each $dataset as row}
                    <option value={row.weigth} data-uuid="{row.uuid}">{row.date} {row.weigth} kg</option>
                {/each}
            </select>
        </td>
    </tr>
</table>



<style>
    button {
        min-width: 20px;
        padding-left: 6px;
        padding-right: 6px;
    }

    select {
        width: 100%;
    }
</style>
