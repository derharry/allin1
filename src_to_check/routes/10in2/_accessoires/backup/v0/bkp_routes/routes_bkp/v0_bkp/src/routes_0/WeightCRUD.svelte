<script>
	import { dataset, value_validation } from './user_progress_data';

    // dom bindings
    let domInpWeigth;
    let domInpSelect;

    let temp = () => {};

    function getSelectedUUID() {
        try { 
            return domInpSelect.options[domInpSelect.selectedIndex].getAttribute('data-uuid');
        } catch {
            return false;
        }
    }

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

    function add() {
        if (weight_validation())
            dataset.insert(domInpWeigth.value);
    }
    function upd() {
        if (weight_validation())
            dataset.update(getSelectedUUID(), domInpWeigth.value);
    }
    function del() {
        if (getSelectedUUID())
            dataset.remove(getSelectedUUID())
    }

</script>


<table>
    <tr>
        <td><input type="text" name="weight" size="3" bind:this={domInpWeigth} on:keyup={weight_validation}> kg</td>
        <td width="1"><button on:click={e => (add())}>+</button></td>
        <td width="1"><button on:click={e => (upd())}>u</button></td>
        <td width="1"><button on:click={e => (del())}>x</button></td>
    </tr>
    <tr>
        <td colspan="4">
            <select size={10} bind:this={domInpSelect} on:change={temp} on:select={temp} on:click={temp}>
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

    .elem-kg {
        text-align: right;
    }

    select {
        width: 100%;
    }
</style>
