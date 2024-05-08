<script language="ts">
    /** @type {import('./$types').PageData} */
	export let data;
    /** @type {import('./$types').ActionData} */
    export let form;

    $: ({ data, php_request } = form || data)

    $: console.log('+page.svelt data#', data)
    $: console.log('+page.svelt form#', form)
    $: console.log('+page.svelt php_request#', php_request)
</script>

<h1 style="margin-bottom:0px">PHP POST Request</h1>
<h3 style="margin-top:0px">
    * {php_request?.email || ''} / {form?.email || ''}
    <br>
    * {php_request?.check || ''} / {form?.check || ''}
</h3>
<form method="post"  action="">
    <label>
        Email <input name="email" type="text" value="{php_request?.email ?? ''}">
        <br>
        Check <input name="check" type="checkbox" checked={php_request?.check || ''}>
    </label>
    <br>
    <button type="submit">Log in</button>
    <button type="reset">Reset</button>
    <button formaction="?/register">Register</button>
</form>
