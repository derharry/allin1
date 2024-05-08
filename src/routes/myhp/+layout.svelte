<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';
    import Footer from '$zeelte/components/Footer/Footer.svelte';
    import { nav_menu } from './data.js'

</script>


<header>
    <h1>ZeeTech  MyHP  TransApp</h1>
    <NavMenu {nav_menu} />
</header>

<main>
    <slot />
</main>

<aside>
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
