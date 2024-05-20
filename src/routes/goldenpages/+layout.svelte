<script>

    import GPheader from './lib/GPheader.svelte'
    import GPfooter from './lib/GPfooter.svelte'

</script>
<style>
    @import './lib/style.css';

    table {
        max-width: 600px;
    }
</style>


<table>
    <tr>
        <td><GPheader /></td>
    </tr>
    <tr>
        <td>
            <slot>
                <p>Er is een probleem met je browser</p>
                <p>Javascript is nodig om deze site te tonen.</p>
                <p>Oplossing:</p>
                <p>* JavaScript activeeren</p>
                <p>* Een moderne nieuwere versie van je browser installeren zoals:</p>
                <p>** Opera</p>
                <p>** Firefox</p>
                <p>** Google Chrome</p>
                <p>** Microsoft Edge</p> 
                <p>** andere</p>
            </slot>
        </td>
    </tr>
    <tr>
        <td><GPfooter /></td>
    </tr>
</table>