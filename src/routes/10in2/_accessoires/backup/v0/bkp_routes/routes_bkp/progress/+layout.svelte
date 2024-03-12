<script>
    import SideNav from './SideNav.svelte'
</script>


<div class="posts">
    <aside class="">
        <SideNav />
    </aside>
    
    <main>
        <slot />
    </main>
</div>
    

<style>
    .posts {
        display: grid;
        gap: 1rem;
        grid-template-columns: 150px 60ch;
        margin-top: 1rem;
    }
</style>