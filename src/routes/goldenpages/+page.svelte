<!--
 main public start page
-->
<script>

    /** @type {import('./$types').PageData} */
	export let data;

    // get the category_list or set empty
    let category_list = data.category_list || []
    let statistic     = data.statistics || {}

    //debugging
    //$: console.log(category_list)
    //$: console.log('stats', statistic)


</script>
<style>

    /*@import './lib/style.css';*/

</style>


<h1>
    Vind Nederlandse bedrijven in Oostenrijk
    <br>of bedrijven waar Nederlanders werken.
    <br><small><small>met adres, contactgegevens, locatie en meer</small></small>
</h1>



<div class="grid">
    <!--
        List categories with sub-categories
    -->
    {#each Object.entries(category_list) as [uuid, main_cat_attrs] }
        
        {#if uuid != '69' && uuid !=  '42' }

            <div class="box">

                <div class="title">{main_cat_attrs.name}</div>

                <!-- todo <p><img src="../lib/images/{category}.jpg" alt="{category}"></p>-->
                {#each Object.entries(main_cat_attrs.subs) as [ uuid, attrs ] }
                    <div class="item">
                        <a href="/goldenpages/{attrs.slug}"  
                            class="{attrs.company_count > 0 ? '' : 'disabled' }"
                        > {attrs.name} </a> ({attrs.company_count})
                    </div>
                {/each}

            </div> 

        {/if}

    {:else}

        <p>Er zijn nog geen bedrijven vrijgeschakelt.</p>
        
    {/each}

</div>


<br>
<hr>
<p>
    Er zijn {statistic.companies_total || '-'} in onze database, waarvan {statistic.companies_public || '-'} u kan vinden. 
    <br>De rest wacht nog op vrijschakeling. ;-)
</p>

