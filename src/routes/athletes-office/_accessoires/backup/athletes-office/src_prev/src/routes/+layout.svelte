<script lang="ts">

    import * as utils from '$lib/utils/inc.utils'
    import 'iconify-icon'


    //currenty no import:
    //import { datatranserPromise } from '$lib/stores/datatransferStore'
    //import LayoutGlobalSearch from "$components//other/LayoutGlobalSearch.svelte"
    
    
    // print a log reboot :-)
    utils.cl('##########################################################')
    utils.cl('##########################################################')
    utils.cl('##########################################################')
    utils.cl('##########################################################')
    utils.cl('##########################################################')
    utils.cl('##########################################################')
    
</script>
<style>
    @import '$css/+layout.main.css';
</style>


<header>
    <input placeholder="search">
    <!--
    <LayoutGlobalSearch></LayoutGlobalSearch>
    <div id="viewDataTransfer">
        {#await datatranserPromise}
            <img src="loading-buffering.gif" alt="loading" />
            <Icon icon="svg-spinners:12-dots-scale-rotate" />
        {:then valid}
            <div></div>
        {:catch error}
            <img src="loading-error-icon-32.png" alt="loading" />
        {/await}
    </div>
    -->
    <select name="viewCurrentEvent" id="viewCurrentEvent">
        <option>Global</option>
        <option>Frankfurt Marathon 2023</option>
    </select>
</header>

<nav>
    <ul>
        <li><a href="/"><iconify-icon icon="ant-design:dashboard-twotone"></iconify-icon></a></li>
        <li><a href="/PanelCRUD_FORM"><iconify-icon icon="ant-design:dashboard-twotone"></iconify-icon></a></li>
        <li><a href="/users">Users</a></li>

        <!--

        <li><a href="/test"><iconify-icon icon="ant-design:dashboard-twotone"></iconify-icon></a></li>
        <li><a href="users">Users</a></li>
        <li><a href="users_v1">UsersOrg</a></li>
                    
        <li><a href="switch">Switch</a></li>
        <li><a href="events">Events</a></li>
        <li><a href="todoStore">Store</a></li>
        <li><a href="todos">Todos</a></li>
        <li><a href="users">Users</a></li>
        <li><a href="dashboard">Dashboard</a></li>
        <li><a href="contacts">Contacts</a></li>
        <li><a href="event">Event</a></li>
        <li>Office</li>
        <li>Contacts</li>
        <li>Hotel</li>
        <li>Restaurant</li>
        <li>Shuttle</li>
        <li>Timetable</li>
        -->        
    </ul>
</nav>

<div class="main"><slot>problem</slot></div>

