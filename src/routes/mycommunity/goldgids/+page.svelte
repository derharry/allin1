<script>
    
    import { data, get_category_list } from './data.js'

    let category_list = get_category_list()

</script>



<ul>
        {#each category_list as category}
            <li>
                <a href="?{category}">
                    {category}
                </a>
            </li>
        {/each}
</ul>





