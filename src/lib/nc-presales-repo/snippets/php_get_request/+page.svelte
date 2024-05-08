<script language="ts">
    export let data; // store or returned by load()
    $: ({ id, php_get } = data);
</script>


<h1>Show the data: {id} {php_get.id}</h1>
<form method="get">
    <label>
        Email
        <input name="id" type="text" value="{id}">
    </label>
    <button>Log in</button>
</form>
