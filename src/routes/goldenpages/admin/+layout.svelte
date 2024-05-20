<!--
    Root Public Layout of Golden Pages
-->
<script>
</script>
<style>
    @import '../lib/style.css';
</style>



<table>
    <tr>
        <td>
            <table>
                <tr>
                    <td>
                        <a href="/goldenpages/admin/">Dashboard</a>
                        <a href="/goldenpages/admin/categories">Categories</a>
                        <a href="/goldenpages/admin/companies">Companies</a>
                        <!--
                        <a href="/goldenpages/register">Register</a>
                        <a href="/goldenpages/">Public</a>
                        -->
                    </td>
                </tr>
                <tr>
                    <td><hr></td>
                </tr>
            </table>
        </td>
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
        <td><hr></td>
    </tr>
    <tr>
        <td>
            
        </td>
    </tr>
</table>