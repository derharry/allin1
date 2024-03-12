<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    // probs & fixtures
    export let titel = 'init';
    export let datasets = [
        {
            label: 'Months',
            fill: true,
            borderColor: 'red',
            data: {
                February: 22,
                June: 18,
                December: 24,
            }
        },
        {
            label: 'Goal',
            borderColor: 'green',
            data: {
                February: 25,
                December: 20,
            }
        },
        {
            label: 'baseline',
            borderColor: 'lightgreen',
            data: {
                February: 20,
                December: 20,
            }
        }
    ]

    // dom elements
    let domChart;
    let domChartType = 'line';
    $: _dataset = datasets.datasets;


    // chart configuration
    const config = {
        type: domChartType,
        data: { 
            datasets:datasets.datasets
        },
        options: {                                              
            maintainAspectRatio: false              
        }
    }

    onMount(() => {
        
        const ctx = domChart.getContext('2d');
        domChart = new Chart(ctx, config); 
    })

    function updateChart() {
        config.type = domChartType;
        // Initialize chart using default config set
        console.log('update chart')
        domChart.update()
        //domChart.render()
    }

    /*
    */
</script>

<div style="background-color:aliceblue">
    <table>
        <tr>
            <td><h1>{titel}</h1></td>
            <td align="right">
                <select bind:value={domChartType} on:change={updateChart}>
                    <option value="line">Line</option>
                    <option value="bar">Bars</option>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <canvas bind:this={domChart} width="250" height="200"/>
            </td>
        </tr>
    </table>
</div>