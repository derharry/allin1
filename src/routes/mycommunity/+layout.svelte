<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';
    
    import { nav_menu } from './data.js'

</script>


<main>

    <NavMenu {nav_menu} logo_text="MyCommunity/NLV-Wenen" logo_href="/mycommunity" />

    <slot />

</main>




<style>
    main {
        width: 500px
    }
</style>