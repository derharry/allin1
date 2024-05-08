<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';

    let nav_menu = [
            { name: 'home',   slug: '/', icon: ''},
            { name: 'MyHP', slug: '/myhp', icon: '' },
            { name: '10in2', slug: '/10in2', icon: '' },
            { name: 'Surf-Office', slug: '/surf-office', icon: '' },
            { name: 'SinglePlanets', slug: '/singleplanets', icon: '' },
            { name: 'MyCommunity', slug: '/mycommunity', icon: '' },
            { name: 'MyCash', slug: '/mycash', icon: '' },
            //{ name: 'ShowCase', slug: '/svelteshowcase', icon: '' },
            //{ name: 'Software', slug: '/software', icon: '' },
            //{ name: 'Over mij', slug: '/aboutme', icon: '' },
            //{ name: 'mycash', slug: '/mycash', icon: '' },
            //{ name: 'Athletes-Office', slug: '/athletes-office', icon: '' }
    ]

</script>

<NavMenu {nav_menu} />


<slot />
