<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';
    import Footer from '$zeelte/components/Footer/Footer.svelte';
    import { nav_menu } from './data.js'

</script>




<main>
    <header>
        <NavMenu {nav_menu} logo_text="ZeeTech" logo_href="/myhp" />
    </header>

    <slot />

    <aside>
        aside
    </aside>
    
    <Footer>
        
        <div slot="left">
            <ul>
                <li>ZeeTech</li>
                <li>Harald van Zee</li>
                <li><a href="contact/">Contact</a></li>
                <li><a href="impressum/">Impressum</li>
            </ul>
        </div>
    
        <div slot="right">                    
            <ul>
                <li>Sport Journalist</li>
                <li>Media Services</li>
                <li>Event Consulting</li>
            </ul>
        </div>
    
    </Footer>
    
</main>



<style>
    main {
        width: 800px
    }
</style>
