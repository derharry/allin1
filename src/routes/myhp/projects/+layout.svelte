<script>

    import NavMenu from '$zeelte/components/Navigation/NavMenu.svelte';
    import Footer from '$zeelte/components/Footer/Footer.svelte';
    //import { nav_menu } from './data.js'


    export let nav_menu_projects_current = [
        //{ id:0,  name: 'home',   path: '/myhp', icon: ''},
        { id:1,  name: 'Self-Management', path: '/myhp/projects/selfmanagement/', icon: '' },
        { id:2,  name: 'Event-Office', path: '/myhp/projects/eventoffice/', icon: '' },
        { id:3,  name: 'Surf-Office', path: '/myhp/projects/surfoffice/', icon: '' },
        { id:4,  name: 'www.zeepress.at', path: '/myhp/blog', icon: '' },
    ];

    export let nav_menu_projects_archived = [
        { id:1,  name: 'ZeeFramework (PHP)', path: '/myhp/projects/archived/File-Exchange-Server.html', icon: '' },
        { id:2,  name: 'iPod-Book', path: '/myhp/projects/eventoffice/', icon: '' },
    ];
</script>


<NavMenu nav_menu={nav_menu_projects_current} />

<slot></slot>