<script>

    // Store vars
    let dsIntakeDrinks = [{}]

    // DOM Bindings

    let dsAmountWaterCountCalc = 0;
    let dsAmountWaterCount = 0;


    let domInpAmountWaterObj;
    let domInpAmountWater = 250;
    let domSelAmountWater = 'ml';

    $: {
        dsAmountWaterCountCalc = domSelAmountWater == 'L' ? 1000 : 0;
        console.log(dsAmountWaterCountCalc)
    }


    function addWater() {
        if (validateWaterValue()) {
            domInpAmountWater = parseFloat(domInpAmountWater);
            dsAmountWaterCount += domInpAmountWater + dsAmountWaterCountCalc;
            dsAmountWaterCount = parseFloat(dsAmountWaterCount.toFixed(2))
        }
    }

    function delWater() {
        if (validateWaterValue()) {
            domInpAmountWater = parseFloat(domInpAmountWater);
            let i = dsAmountWaterCount - domInpAmountWater - dsAmountWaterCountCalc;
            dsAmountWaterCount = i < 0 ? 0 : i;
            dsAmountWaterCount = parseFloat(dsAmountWaterCount.toFixed(2))
        }
    }

    function validateWaterValue() {
        console.log(typeof(domInpAmountWater), domInpAmountWater)
        domInpAmountWater = domInpAmountWater.toString().replace(',', '.')
        if (domInpAmountWater.toString().match(/^[0-9]*[\.,]?[0-9]*?$/gi)) {
            console.log('match')
            domInpAmountWaterObj.style="background-color:none";
            return true;
        } else {
            console.log('no match')
            domInpAmountWaterObj.style="background-color:red";
            return false;
        }        
    }

</script>


<table>
    <tr>
        <td>Water intake</td>
    </tr>
    <tr>
        <td>Amount: 
            <input type="text" name="water_amount" bind:value="{domInpAmountWater}" size="3" bind:this={domInpAmountWaterObj} on:keyup={validateWaterValue}>
            <select name="water_amount_many" bind:value="{domSelAmountWater}">
                <option value="ml">ml</option>
                <option value="L">L</option>
            </select>
            <button on:click={addWater}>+</button>
            <button on:click={delWater}>-</button>
        </td>
    </tr>
    <tr>
        <td>
            <input type="range" min="0" minlength="2000" step="1" max="2000" bind:value={dsAmountWaterCount}>
            {dsAmountWaterCount}
        </td>
    </tr>
</table>