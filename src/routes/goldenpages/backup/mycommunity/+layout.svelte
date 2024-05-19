<!--
    Main Layout of Golden Pages
-->
<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';
    
    import { nav_menu } from './data.js'

</script>


<main>

    <header>
        <NavMenu {nav_menu} logo_text="MyCommunity/NLV-Wenen" logo_href="/mycommunity/" />
    </header>

    <article>
        <slot />
    </article>

</main>




<style>
    main {
        width: 550px
    }
</style>