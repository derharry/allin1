<script lang="ts">
    import { onMount } from "svelte";
    import chartjs from "chart.js/auto";

    //probs
    export let ChartTitle = 'charttitle';
    export let ChartType  = 'doughnut';

    // dom Bindings
    let state;
    let mounted = false;
    let domCtx = null;

    // vars
    let ctx = null;
    let datasets;

    let config = {
        type: 'doughnut',
        label: 'init2',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                borderWidth: 1
            }]
        },
        options: {
            label: 'init',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };


    // update the config on changes
    $: updateConfig(ChartTitle, ChartType);

    function updateConfig(charttitle, charttype) {
        if (!mounted) return;
        config.type = charttype;
        config.label = charttitle;
        console.log('updates...');
        updateChart();
    }


       // type: {ChartType}
       // label: {ChartTitle}
    function updateChart() {
        state = 'update';
        state = ChartType;
        let ds = ctx.data.datasets[0].data;
        //console.log(ds);
        ctx.data.datasets[0].data = [...ds, '50']
        ctx.options.label = 'updated'
        ctx.update()
    }

    function initChart() {
        state = 'init';
        ctx = new chartjs(domCtx, config);
    }

    onMount(() => {
        state = 'init';
        initChart();
        mounted = true;
    });

</script>


<table>
    <tr>
        <td>
            {state}
        </td>
    </tr>
    <tr>
        <td>
            <div>
                <canvas bind:this={domCtx}></canvas>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <button on:click={updateChart}>
                update
            </button>
            <select bind:value={ChartType}>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="doughnut">Donut</option>
            </select>
        </td>
    </tr>
</table>


<style>
    canvas {
        max-height: 300px;
        max-width: 300px;
        margin: 20px auto;
    }
</style>