<script>
    let data;
    //console.log(cookies);

    let menu = [
        { id: '', name: 'about', url: './about/', icon: '<i class="fa-regular fa-address-card fa-xl"></i>' },
        { id: '', name: 'wiki',  url: './wiki/',   icon: '<i class="fa-solid fa-book fa-xl"></i>' },
    ]
</script>

<nav style="background-color:azure; width:100%">
    <a href="/"><img src="favicon.png" alt="logo" height="25" valign="middle" /></a>
    <a href="/logout" on:click={toggleLogin}><i class="fa-solid fa-right-from-bracket fa-xl"></i></a>
    &nbsp;
    {#each menu as li}
    <a href="{li.url}">{@html li.icon}</a> &nbsp;
    {/each}
</nav>

<main>
<slot />
</main>

<footer>
    footer auth
</footer>