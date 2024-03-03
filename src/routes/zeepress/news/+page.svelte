<script>
    //import { get_files_from_dir } from '$lib/zeelte/io/io.directory.js'
    //import { p } from '$lib/zeelte/inc.utils.js'
    //import * as utils from "$lib/zeelte/inc.utils"

    export let load;
    export let data;

    console.log({load}, {data})

    let files = data.files;
  
</script>

<p>.posts.</p>

{#each files as file}
    <p>{file}</p>
{/each}

<style>
</style>