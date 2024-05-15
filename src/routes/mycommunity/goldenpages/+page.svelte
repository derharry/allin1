<script>

    /** @type {import('./$types').PageData} */
	export let data;

    // get the category_list or set empty
    let category_list = data.category_list || []

    //debugging
    //$: console.log(category_list)

</script>




<!--
    List categories with sub-categories
-->
{#each Object.keys(category_list) as category }

    <div class="box_category">

        <h3>{category}</h3>

        <ul>
            {#each category_list[category] as subcategory}

                <li>
                    <a href="goldenpages/{subcategory}">{subcategory}</a>
                </li>

            {/each}
        </ul>

    </div>

{:else}

    <p>Geen data</p>
    
{/each}




<style>

.box_category {
    display: block;
    margin: 10px;
    border-radius: 10px;
    background-color: #FFD580;
    float: left;
}

h3 {
    text-align: center;
    font-size: 14pt;
}

ul {
    list-style: none

}

li {

}


</style>
