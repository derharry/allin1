<script>
//import { onDestroy, onMount } from "svelte";

//onMount(   () => console.log('mounted: ') )
//onDestroy( () => console.log('Unmounted: ') )

//<footer>
//    BodyFit &copy; 2023
//</footer>
</script>


<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/posts">Posts</a>
    <a href="/test">Test1</a>
    <a href="/test2">Test2</a>
    <a href="/progress">Progress</a>
    <a href="/from_dell">From Dell</a>
</nav>

<slot />



<style>
    nav {
        width: 100%;
        background-color: aliceblue;
    }

    footer {
        background-color: aliceblue;
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        right: 0px;
    }
</style>