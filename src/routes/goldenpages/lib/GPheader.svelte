<script>

    import SearchField from './SearchField.svelte'
    import logo from './logo.jpeg'

    let search_string = ''
    
</script>
<style>
    @import './style.css';
</style>



<table width="100%">
    <tr>
        <td class="gpHeaderLogoTD">
            <a href="/goldenpages/"><img src="{logo}" alt="logo" class="gpHeaderLogoIMG"></a>
        </td>
        <td class="gpHeaderSearchTD">

            <form action="/goldenpages/+{search_string}" method="get">
                <SearchField name="search" bind:value={search_string} placeholder="Wat zoek je?" />
            </form>

        </td>
        <td class="gpHeaderRightTD">
            <a href="/goldenpages/register/" class="button">Jouw bedrijf registreeren</a>
        </td>
    </tr>
</table>
<hr>