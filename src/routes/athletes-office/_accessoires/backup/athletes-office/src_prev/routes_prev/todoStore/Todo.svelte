<script>

    export let todo;

    export const type_view_todo = {
        ROW: 'ROW',
        GUI: 'GUI'
    }

    /**
     * @typedef ViewTodo
     * @prop {string} ROW view as data-table-row
     * @prop {string} GUI view as nice gui
     */


    /**
     * @type { ViewTodo }
     */
    export let type = type_view_todo.ROW;
    
</script>

{#if type == type_view_todo.ROW}
<tr>
    <td> </td>
    <td>{todo.text}</td>
    <td>{todo.toCompleteAt}</td>
    <td>{todo.toCompleteBy}</td>
    <td></td>
    <td>
        <input type="checkbox" name="done">
        <button formaction="?/saveTodo"   name="uuid" value="{todo.uuid}" disabled={todo._changed ? false : true }> S </button>
        <button formaction="?/deleteTodo" name="uuid" value="{todo.uuid}"> X </button>
    </td>
</tr>
{:else}

{/if}