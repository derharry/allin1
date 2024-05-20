<script>

    import logo from './logo.jpeg'

    let search_string = ''
    
</script>
<style>
    @import './style.css';
</style>



<table>
    <tr>
        <td>
            <a href="/goldenpages/"><img src="{logo}" alt="logo" class="gp_logo"></a>
        </td>
        <td class="">
            <form action="/goldenpages/+{search_string}" method="get">
                <table>
                    <tr>
                        <td><input name="search" bind:value={search_string} placeholder="Wat zoek je? " /></td>
                        <td><button type="submit"><i class='fa fa-search'></i></button></td>
                    </tr>
                </table>
            </form>
        </td>
        <td align="right">
            <a href="/goldenpages/register/">Jouw bedrijf registreeren</a>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <hr>
        </td>
    </tr>
</table>