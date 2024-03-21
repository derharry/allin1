<script>
    
    //export let load;
    export let data;
    let posts = data.posts || []
  
</script>



<p>.posts.</p>
<ul>
    {#each posts as post}
    <li><a href="/zeepress/news/{post.file}">{post.title}</a></li>
    {/each}
</ul>



<style>
</style>