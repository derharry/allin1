<script>
    //import menu_data from '$lib/data/Navigation.js';
	import { onMount } from 'svelte';

    const menu_data = {
        'logged_out': [
            { id: '', name: 'about',    url: 'about',     icon: '<i class="fa-regular fa-address-card fa-xl"></i>' },
            { id: '', name: 'devices',  url: 'devices',   icon: '<i class="fa-solid fa-mobile-screen fa-xl"></i>' },
            { id: '', name: 'blog',     url: 'blog',      icon: '<i class="fa-brands fa-blogger fa-xl"></i>' },
            { id: '', name: 'wiki',     url: 'wiki',      icon: '<i class="fa-solid fa-book fa-xl"></i>' },



            { id: '', name: 'dashboard', url: 'dashboard', icon: '<i class="fa-solid fa-gauge-high fa-xl"></i>' },
            { id: '', name: 'meals',     url: 'meals',     icon: '<i class="fa-solid fa-utensils fa-xl"></i>' },
            { id: '', name: 'dairy',     url: 'dairy',     icon: '<i class="fa-solid fa-calendar-days fa-xl"></i>' },
            { id: '', name: 'dashboard', url: 'progress',  icon: '<i class="fa-solid fa-weight-scale fa-xl"></i>' },
            { id: '', name: 'wiki',      url: 'wiki',      icon: '<i class="fa-solid fa-book fa-xl"></i>' }
        ],

        'logged_in': [
            { id: '', name: 'dashboard', url: 'dashboard', icon: '<i class="fa-solid fa-gauge-high fa-xl"></i>' },
            { id: '', name: 'meals',     url: 'meals',     icon: '<i class="fa-solid fa-utensils fa-xl"></i>' },
            { id: '', name: 'dairy',     url: 'dairy',     icon: '<i class="fa-solid fa-calendar-days fa-xl"></i>' },
            { id: '', name: 'dashboard', url: 'progress',  icon: '<i class="fa-solid fa-weight-scale fa-xl"></i>' },
            { id: '', name: 'wiki',      url: 'wiki',      icon: '<i class="fa-solid fa-book fa-xl"></i>' }
        ]
    }


    export let logged_in;
    
    let menu  = [];
    let ready = false;


    async function toggle_login(how) {
        if (!ready) return;
        let action = logged_in ? 'logout':'login';
        const res = await fetch('/'+action, {
            method:  'post',
            //body: new JSON.stringify({ id:0 }),            
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(res => { console.log(res) })
        logged_in = logged_in ? false : true;
        set_menu();
    }

    function set_menu () {
        console.log(menu_data);
        if (logged_in)
            menu = menu_data?.logged_in || []
        else
            menu = menu_data?.logged_out || []
    }

    onMount( () => {
		ready = true;
        set_menu();
	});
</script>


<table width="100%" border="1"  style="max-width:800px">
    <tr>
        <td width="50" align="left"><a href="/"><img src="favicon.png" alt="logo" /></a></td>
        <td width="35" align="left">
            {#if logged_in}
                <a href="." on:click={toggle_login}><i class="fa-solid fa-right-from-bracket fa-xl"></i></a>
            {:else}
                <a href="." on:click={toggle_login}><i class="fa-solid fa-user-secret fa-xl"></i></a>
            {/if}
        </td>
        <td align="left">
            {#each menu as li}
                <a href="{li?.url || 'x'}">{@html li?.icon || 'x'}</a> &nbsp;
            {/each}
        </td>
    </tr>
</table>


<style>
    img {
        width: 40px
    }

    i {
        width: 25px;
    }
</style>