<!--



-->
<script>

    /** @type {import('./$types').PageData} */
	export let data;

    // get the category_list or set empty
    let category_list = data.category_list || []
    let statistic     = data.statistics || {}

    //debugging
    //$: console.log(category_list)
    $: console.log('stats', statistic)


</script>



<table>
    <tr>
        <td>
            <h2>
                Vind Nederlandse bedrijven in Oostenrijk
                <br>of bedrijven waar Nederlanders werken.
                <br><small>met adres, contactgegevens, locatie en meer</small>
            </h2>

        </td>
    </tr>
    <tr>
        <td>

            <!--
                List categories with sub-categories
            -->

            <!-- add  all subcategories form main categories  -->
            {#each Object.entries(category_list) as [uuid, main_cat_attrs] }

                <div class="box_category">
                    <h3>{main_cat_attrs.name}</h3>

                    <!--<p><img src="../lib/images/{category}.jpg" alt="{category}"></p>-->
                    <ul>
                        {#each Object.entries(main_cat_attrs.subs) as [ uuid, attrs ] }
                            <li>
                                <a href="/goldenpages/{attrs.slug}">
                                    {attrs.name}
                                </a>
                            </li>
                        {/each}
                    </ul>

                </div> 

            {:else}

                <p>Er zijn nog geen bedrijven vrijgeschakelt.</p>
                
            {/each}

        </td>
    </tr>
    <tr>
        <td>

            &nbsp;
            <hr>
            Er zijn {statistic.companies_total || '-'} in onze database, waarvan {statistic.companies_public || '-'} u kan vinden. 
            <br>De rest wacht nog op vrijschakeling. ;-)

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
