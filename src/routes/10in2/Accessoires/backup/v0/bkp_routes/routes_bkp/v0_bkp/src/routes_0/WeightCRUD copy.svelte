<script>
    import {v4 as uuidv4} from 'uuid';
    var data;

    // fixture
    if (data == null) {
        data = [
            {
                id: 0,
                uuid: '111',
                date: '2023-03-01 08:00:00',
                weigth: 85
            }
        ]
    }

    function return_date(date) {
        let d = new Date(date);
        let res = [ ("0" + d.getDay()).slice(-2), ".", ("0" + d.getMonth()).slice(-2), '.', ("0" + d.getFullYear()).slice(-2), ' ', ("0" + d.getHours()).slice(-2), ':', ("0" + d.getMinutes()).slice(-2)]
        return res.join('')
    }


    function insert (e) {
        if (!input_validation()) return;
        let date = return_date(new Date().toLocaleString())
        //console.log(date)
        data = data.concat({
            uuid:   uuidv4(),
            date:   date,
            weigth: domInpWeigth.value
        });
        //console.log(data);
    }

    function update (e) {
        if (!input_validation()) return;
        let uuid = getSelectedUUID();
        console.log(getSelectedDataIndex(uuid));
        data[getSelectedDataIndex(uuid)].weigth = domInpWeigth.value;
        domInpWeigth.value = ''
        select(-1)
    }    
    
    function remove (e) {
        let uuid = getSelectedUUID();
        console.log(uuid)
        data.splice(getSelectedDataIndex(uuid), 1);
        domInpWeigth.value = '';
        data = data;
    }

    function input_validation() {
        domInpWeigth.value = domInpWeigth.value.replace(',', '.')
        if (isNaN(domInpWeigth.value)) {
            return false;
        }
        if (domInpWeigth.value === '' || domInpWeigth === null) {
            return false;
        }
        return true;
    }

    function selected(e) {
        domInpWeigth.value = getSelectedValue();
    } 

    function select(index) {
        inpInpSelect.selected = -1;
    }

    function filter() {

    }

    function getSelectedUUID() {
        return inpInpSelect.options[inpInpSelect.selectedIndex].getAttribute('data-uuid');
    }
    function getSelectedDataIndex(uuid) {
        return data.findIndex(obj => {
            return obj.uuid === uuid;
        });
    }
    function getSelectedValue() {
        return inpInpSelect.options[inpInpSelect.selectedIndex].value;
    }


    $: data = data;

    // dom elements
    let inpInpSelect;
    let domInpWeigth;
    
</script>

<table>
    <tr>
        <td><input type="text" name="weight" bind:this={domInpWeigth} size="3"> kg</td>
        <td width="1"><button on:click={insert}>+</button></td>
        <td width="1"><button on:click={update}>u</button></td>
        <td width="1"><button on:click={remove}>x</button></td>
    </tr>
    <tr>
        <td colspan="4">
            <select size={10} bind:this={inpInpSelect} on:change={selected} on:select={selected} on:click={selected}>
                {#each data as row}
                    <option value={row.weigth} data-uuid="{row.uuid}">{return_date(row.date)}  &nbsp;  <span class="elem-kg">{row.weigth} kg</span></option>
                {/each}
            </select>
        </td>
    </tr>
</table>


<style>
    button {
        width: 20px
    }

    .elem-kg {
        text-align: right;
    }

    select {
        width: 100%;
    }
</style>
