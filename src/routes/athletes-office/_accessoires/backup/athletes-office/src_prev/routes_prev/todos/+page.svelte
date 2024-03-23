<script>
    export let data; // data from server

    class Todo {        
        guid = ''
        text = ''
        todo_by = ''
        date_untill  = ''
        date_created = ''
        date_changed = ''
    }

    let data_todos = data?.data || [] 

    //$: { console.log(data, data_todos) }

</script>

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

<form method="post" action="?/none">
<table>
    <tr>
        <th>Text</th>
        <th>Untill</th>
        <th>For (by)</th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <td>----</td>
    </tr>
    {#each data_todos as todo}
    <tr>
        <td contenteditable="true" bind:innerHTML={todo.text} on:input={() => todo._changed=true}>{todo.text}</td>
        <td>{todo.toCompleteAt}</td>
        <td>{todo.toCompleteBy}</td>
        <td></td>
        <td>
            <button formaction="?/saveTodo"   name="uuid" value="{todo.uuid}" disabled={todo._changed ? false : true }> S </button>
            <button formaction="?/deleteTodo" name="uuid" value="{todo.uuid}"> X </button>
        </td>
    </tr>
    {/each}
    <tr>
        <td>----</td>
    </tr>
</table>
</form>
