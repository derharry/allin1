<script>


    /** @type {import('./$types').PageData} */
	export let data;

    // get the category_list or set empty
    let category_list = data.category_list || []
    let statistic     = data.statistic || {}

    //debugging
    //$: console.log(category_list)
    $: console.log(statistic)


</script>


<table>
    <tr>
        <td>
            <h2>
                Vind Nederlandse bedrijven in Oostenrijk
                <br>of bedrijven waar Nederlanders werken.
                <br><small>met adres, contactgegevens, locatie en meer</small>
            </h2>
            <!--
                List categories with sub-categories
            -->
            {#each Object.keys(category_list) as category }

                <div class="box_category">

                    <h3>{category}</h3>
                    <!--<p><img src="../lib/images/{category}.jpg" alt="{category}"></p>-->

                    <ul>
                        {#each category_list[category] as subcategory}
                            <li>&gt; <a href="goldenpages/c{subcategory}/">{subcategory}</a></li>
                        {/each}
                    </ul>

                </div>

            {:else}

                <p>Er zijn nog geen bedrijven vrijgeschakelt.</p>
                
            {/each}

            &nbsp;
            <hr>
            Er zijn {statistic.total_companies} waarvan {statistic.total_companies_unpublic} wachten op vrijschakeling

        </td>
    </tr>
</table>



<style>

    table {
        width: 100%;
    }

    h2 {
        text-align: left;
        font-size: 14pt;
    }

    .box_category {
        display: block;
        float: left;
        margin: 10px;
        padding: 10px 25px;
        border-radius: 10px;
        border: 1px orange solid;
        background-color: #FFE5B4;
    }

    .box_category h3 {
        text-align: center;
    }

    .box_category ul {
        padding: 0px;
    }

    .box_category ul li {
        display: block
    }


</style>
