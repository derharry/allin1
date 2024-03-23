<script>
    import Todo from './Todo.svelte';
    import TodoDashboard from './TodoDashboard.svelte';

	// @ts-ignore
    import { todoStore, todoStoreRefresh } from '$lib/stores/todoStore.js';

    let todoStoreFilter  = ''
    $: todoStoreFiltered = $todoStore.filter(row => {
        let match = false;
        return (
            row.text.toString().toLowerCase().match(todoStoreFilter.toLocaleLowerCase())
            ||
            (
                row._changed == true
                ||
                row._new == true
            )
        )
    })

    // @ts-ignore
    //$: { console.log('data_todos', todoStoreFiltered) }

</script>

<!--
<form action="?/addTodo" method="post">
    <label for="inpAddTodoText">Todo</label>
    <input id="inpAddTodoText" name="todoText" value="" type="text">
    <button>+</button>
</form>

<form action="?/addMemo" method="post">
    <label for="inpAddMemoText">Memo</label>
    <input id="inpAddMemoText" name="memoText" value="" type="text">
    <button>+</button>
</form>

<hr>
<button>+ NOTE</button>
<button>+ MEMO</button>
<hr>
-->

<input type="text" name="guiTodoFilter" bind:value="{todoStoreFilter}" placeholder="..search..">
<button on:click={todoStoreRefresh}>Refesh</button>

<table>
    <tr>
        <th>Type</th>
        <th>Text</th>
        <th>Untill</th>
        <th>For (by)</th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <td colspan="10"><hr></td>
    </tr>
    {#each todoStoreFiltered as todo}
        <Todo />
    {/each}
    <tr>
        <td colspan="10"><hr></td>
    </tr>
</table>

<TodoDashboard></TodoDashboard>