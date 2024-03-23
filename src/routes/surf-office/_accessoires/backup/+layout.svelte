<script>
    import CustomerMain from './CustomerMain.svelte';
</script>

<div class="col_2">

    <fieldset style="width:100%">
        <button><i class="fas fa-plus-circle soBtnNew"></i></button>
        <select>
            <option>All</option>
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Next 7 days</option>
            <option>Custom...</option>
        </select>
        <input name="" value="" placeholder="search for name">
    </fieldset>

    <fieldset style="width:100%">
        <ul class="alt left">
            <li>result1</li>
            <li>result2</li>
        </ul>
    </fieldset>

</div>



<div class="col_10">
    <CustomerMain />
    <slot />
</div>