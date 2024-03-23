<script language="ts">
    export let data; // store or returned by load()

    $: ({ data, php_request } = data)

    $: console.log('+page.svelt data#', data)
    $: console.log('+page.svelt php_request#', php_request)
</script>


<h1 style="margin-bottom:0px">PHP GET Request</h1>
<h3 style="margin-top:0px">
    * {php_request?.email || ''}
    <br>
    * {php_request?.check || ''}
</h3>
<form method="get" action="?/login">
    <label>        
        Email <input name="email" type="text" value="{php_request?.email ?? ''}">
        <br>
        Check <input name="check" type="checkbox" checked={php_request?.check || ''}>
    </label>
    <br>
    <button type="submit">Log in</button>
    <button type="reset">Reset</button>
    <button type="button" formaction="?/register">Register</button>
</form>
