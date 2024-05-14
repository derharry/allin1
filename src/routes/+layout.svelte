<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';

    let nav_menu = [
            { name: 'home', path: '/', icon: ''},
            { name: 'MyHP', path: '/myhp', icon: '' },
            { name: '10in2', path: '/10in2', icon: '' },
            { name: 'Surf-Office', path: '/surf-office', icon: '' },
            { name: 'SinglePlanets', path: '/singleplanets', icon: '' },
            { name: 'MyCommunity', path: '/mycommunity', icon: '' },
            { name: 'MyCash', path: '/mycash', icon: '' },
            //{ name: 'ShowCase', path: '/svelteshowcase', icon: '' },
            //{ name: 'Software', path: '/software', icon: '' },
            //{ name: 'Over mij', path: '/aboutme', icon: '' },
            //{ name: 'mycash', path: '/mycash', icon: '' },
            //{ name: 'Athletes-Office', path: '/athletes-office', icon: '' }
    ]

</script>

<main>

    <NavMenu {nav_menu} />

    <slot />

</main>


<style>
    main {
    }
</style>
