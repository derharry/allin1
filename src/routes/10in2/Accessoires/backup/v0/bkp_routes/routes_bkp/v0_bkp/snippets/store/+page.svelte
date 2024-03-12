<script>
    import { test, users } from './store.js';

    $: console.log(test)
    $: console.log(users)

    test.set([
        ...$test, {name:'jeanne'},
    ])

    users.insert('vicky');

</script>

{#each $test as name}
    {name.name}
{/each}

{#each $users as name}
    {name.name}
{/each}