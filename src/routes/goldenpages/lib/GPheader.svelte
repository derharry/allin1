<script>

    import logo from './logo.jpeg'

    let search_string = ''
    
</script>



<table>
    <tr>
        <td>
            <a href="/goldenpages/"><img src="{logo}" alt="logo"></a>
        </td>
        <td class="">
            <form action="/goldenpages/+{search_string}" method="get">
                <input name="search" bind:value={search_string} placeholder="Wat zoek je? " />
                <button type="submit">S</button>
            </form>
        </td>
        <td align="right">
            <a href="/goldenpages/register/">Jouw bedrijf registreeren</a>
        </td>
    </tr>
    <tr>
        <td colspan="3" class="hr">
            <hr>
        </td>
    </tr>
</table>



<style>
    
    table {
        width: 100%;
    }

    img {
        padding-right: 20px;
        max-width: 60px;
    }

    input {
        padding: 5px 10px;
        border-radius: 20px
    }
    

</style>