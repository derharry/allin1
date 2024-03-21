https://svelte.dev/repl/cb4d121decc54cc98e312d5b83c96df7?version=3.17.2


App.svelte
    <script>
        import Calendar from './Calendar.svelte';
        
        const today = new Date;
    </script>

    <Calendar {today} year={2020} />