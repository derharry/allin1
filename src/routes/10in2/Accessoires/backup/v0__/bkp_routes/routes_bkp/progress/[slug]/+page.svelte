<script>
    import { page } from '$app/stores'
    import { dataset, datasetChart } from './user_progress_data';
    import Chart from './Chart.svelte'
    import MeasuresCrud from './MeasuresCRUD.svelte';
    //<Chart titel="{slug}" datasets={datasetChart} />
    //<MeasuresCrud />

    $: {
        dataset = dataset;
        datasetChart.update('x')
    }

</script>


<h1>Progress Measures {$page.params.slug}</h1>
<Chart titel={$page.params.slug} datasets={datasetChart} />
<MeasuresCrud slug={$page.params.slug} />

<pre>
    {JSON.stringify($page, null, 2)}
</pre>