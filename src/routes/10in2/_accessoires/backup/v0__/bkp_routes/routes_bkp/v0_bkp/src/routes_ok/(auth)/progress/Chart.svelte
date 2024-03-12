<script>
    //https://www.chartjs.org/docs/latest/general/data-structures.html
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    export const datasets = [
        {
            label: 'Months',
            fill: true,
            borderColor: 'red',
            data: {
                January: 6,
                February: 22,
                March: 1,
                April: 6,
                May: 5,
                June: 18,
                July: 10,
                August: 17,
                September: 3,
                October: 10,
                November: 26,
                December: 24,
            }
        },
        {
            label: 'goal',
            borderColor: 'green',
            data: {
                January: 85,
                June: 18,
            }
        },
        {
            label: '',
            borderColor: 'lightgreen',
            data: {
                January: 40,
                August: 40,
            }
        }
        
    ]

    const config = {
        type: 'line',
        data: { 
            datasets: datasets 
        }
    }

    let chart;

    onMount(() => {
        const ctx = chart.getContext('2d');
        // Initialize chart using default config set
        var myChart = new Chart(ctx, config);
    })
    /*
    //export const labels   = ['init1', 'init2', 'init3', 'init4', 'init5'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Kilogram',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'BMI',
            data: [20, 30, 27, 26, 24, 21, 30],
            fill: true,
            borderColor: 'red',
            tension: 0.1
        }]
    };
    */

</script>

<div>
<canvas bind:this={chart} width="200" height="100" />
</div>