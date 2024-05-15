<script>

    import GPheader from './lib/components/GPheader.svelte'
    import GPfooter from './lib/components/GPfooter.svelte'

</script>



<table>

    <tr>
        <td><GPheader /></td>
    </tr>

    <tr>
        <td class="main"><slot /></td>
    </tr>

    <tr>
        <td><GPfooter /></td>
    </tr>

</table>




<style>
    
    table {
        width: 100%;
    }
    
    div {
        display: table;
    }

    .main {
        padding: 5px
    } 

    .header {
        margin: 10px;
        padding: 3px 15px;
        background-color: #E3DAC9;
        border-radius: 8px;

    }
</style>