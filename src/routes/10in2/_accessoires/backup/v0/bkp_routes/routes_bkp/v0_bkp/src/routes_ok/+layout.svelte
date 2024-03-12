<script>
    export let data;
    //console.log('layout cookie', data.logged_in)
    import Navigation from "./Navigation.svelte";
</script>


<nav>
    <Navigation logged_in={data?.logged_in || false} />
</nav>

<main>
    <slot>nothing to show</slot>
</main>

<footer style="width:100">
    Footer
</footer>