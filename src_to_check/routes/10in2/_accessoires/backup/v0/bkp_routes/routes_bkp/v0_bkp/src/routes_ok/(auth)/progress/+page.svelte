<script lang="ts">
    import SideNav from './SideNav.svelte';
    import Chart  from './Chart.svelte';
    import Weight from './Weight.svelte';

    //import {} from '$lib/stores/body_measures.js';
    export let data; // store or returned by load()
    //export let form; // store or returned by action()

    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });



    function return_date(date) {
        let d = new Date(date);
        let res = [
            ("0" + d.getDay()).slice(-2),
            " ",
            ("0" + d.getMonth()).slice(-2),
            '.',
            ("0" + d.getFullYear()).slice(-2),
            ' ',
            ("0" + d.getHours()).slice(-2),
            ':',
            ("0" + d.getMinutes()).slice(-2)
        ]
        return res.join('')
    }

    let last_weigth = 0;
    function return_diff(current) {
        let diff = 0;
        let ret  = '0';

        if (last_weigth == 0) last_weigth = data.user_data.weigth_start;
        diff = current - last_weigth;
        ret  = diff.toFixed(1)

        last_weigth = current;
        if (diff > 0)
            return '+ '+ ret.toString();
        return ret.replace('-', '- ');
    } 

    function return_left(current, goal) {
        let diff = 0;
        let ret  = '0';
        diff = goal - current;
        ret  = diff.toFixed(1)
        if (diff > 0)
            return '+ '+ ret.toString();
        return ret.replace('-', '- ');
    }

    function return_bmi(length, weight) {
        return ((weight / (length * length)) * 10000).toFixed(1);
    }


    function crud_create(e) {
        console.log('f', e)

    }

</script>



<table width="100%" border="0">
<tr valign="top">

    <td width="1" class="box">
        <SideNav />
    </td>
    <td width="10"></td>
    <td class="box">

        <Chart datasets="" />

        <slot></slot>

        <table width="100%">
            <tr>
                <td>Current</td>
                <td>Start</td>
                <td>Goal</td>
                <td>Total since</td>
                <td>Left till</td>
                <td>Goal date</td>
            </tr>
            <tr>
                <td>x </td>
            </tr>
        </table>

        <hr>
        <form method="post" action="crud_create()">
            <table width="100%">
                <tr>
                    <td>Weight</td>
                    <td>Date</td>
                    <td></td>
                </tr>
                <tr>
                    <td><input type="number" name="body_weight" value="" size="5"> kg</td>
                    <td><input type="date" name="entry_date"  value="{new Date().toDateInputValue()}"></td>
                    <td align="right"><button><img src="btn_add_circle_black_24dp.svg"></button></td>
                </tr>
            </table>
        </form>

        <!--
        <hr>
        <form method="post">
            <table>
                <tr>
                    <td><i class="fa-solid fa-weight-scale"></i></td>
                    <td><i class="fa-solid fa-child"></i></td>
                    <td><i class="fa-solid fa-droplet"></i></td>
                    <td><i class="fa-solid fa-dumbbell"></i></td>
                    <td><i class="fa-solid fa-dumbbell"></i></td>
                </tr>
                <tr>
                    <td><input name="body_weight" type="text" value="{php_post?.body_weight ?? ''}"></td>
                    <td><input name="body_weight" type="text" value="{php_post?.body_weight ?? ''}"></td>
                    <td><input name="body_weight" type="text" value="{php_post?.body_weight ?? ''}"></td>
                    <td><input name="body_weight" type="text" value="{php_post?.body_weight ?? ''}"></td>
                    <td><input name="body_weight" type="text" value="{php_post?.body_weight ?? ''}"></td>
                </tr>
            </table>
            <button>Save</button>
        </form>
        -->

        <hr>
        <table width="100%">
            <thead>
                <th>Date</th>
                <th >Weight</th>
                <th >Difference</th>
                <th >Left</th>
                <th >BMI</th>
                <th></th>
            </thead>
        {#each data.weight_data as row}
            <tr>
                <td>{return_date(row.date)}</td>
                <td>{row.weigth}</td>
                <td>{return_diff(row.weigth)}</td>
                <td>{return_left(row.weigth, data.user_data.weight_goal)}</td>
                <td>{return_bmi(data.user_data.body_length, row.weigth)}</td>
                <td><button on:click={ () => remove(row.id)}><img src="btn_delete_forever_black_24dp.svg" alt="delete"></button></td>
            </tr>
        {:else}
            <p>No data yet.</p>
        {/each}
        </table>
    </td>
    <td width="10"></td>


</tr>
</table>


<style>

    hr {
        margin: 10px;
        border: 1px silver dotted;
    }

    th {
        text-align: left;
    }
</style>