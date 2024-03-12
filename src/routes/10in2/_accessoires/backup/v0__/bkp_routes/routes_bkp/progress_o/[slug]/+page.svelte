<script>    
    import { page } from '$app/stores'
    import { datasetChart } from '../../progress/[slug]/user_progress_data';
    import Chart from '../../progress/[slug]/Chart.svelte'
    import Weight from '../WeightCRUD.svelte'

    const slug = $page.params.slug;
//
</script>

<h1>Progress {slug}</h1>


<Chart titel="{slug}" datasets={datasetChart} />
<Weight />

<pre>
{JSON.stringify($page, null, 2)}
</pre>