
<script>
    import BtnDelete from "$lib/components/ActionButtons/btnDelete.svelte";
	import { cl } from "$lib/utils/inc.utils";


    function click_test() {
        console.log('click_test as callback')
    }
</script>

<BtnDelete></BtnDelete>









<div style="
    margin:auto;
    left: 25%;
    position:absolute;
    bottom:0px;
    font-family:arial;
    font-size:10pt
">
    <table>
        <tr>

            <td>
                Powered By
                <ul>
                    <li>Svelte</li>
                    <li>Iconfiy</li>
                    <li>Bun / NodeJS / npm</li>
                    <li>XAMPP + MariaDB</li>
                </ul>
            </td>
            
            <td>
                Future features?
                <ul>
                    <li>Skeletion UI</li>
                </ul>
            </td>

        </tr>
    </table>
</div>