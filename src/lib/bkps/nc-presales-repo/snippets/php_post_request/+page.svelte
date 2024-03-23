<script language="ts">
    export let data; // store or returned by load()
    export let form; // store or returned by action()
    $: ({ id, php_post } = form ?? data );
</script>

<h1>Show the data: {php_post?.id ?? '--'}</h1>
<form method="post">
    <label>
        Email
        <input name="id" type="text" value="{php_post?.form ?? ''}">
    </label>
    <label>
        test
        <input name="bool" type="checkbox" value="{php_post?.id ?? ''}">
    </label>
    <button>Log in</button>
</form>
