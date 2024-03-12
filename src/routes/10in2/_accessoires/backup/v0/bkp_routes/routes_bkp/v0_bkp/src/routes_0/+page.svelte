<script>
    import { datasetChart } from './user_progress_data';
    import Chart from './Chart.svelte'
    import Weight from './WeightCRUD.svelte'
</script>

<Chart titel="weight" datasets={datasetChart} />
<Weight />