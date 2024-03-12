<script lang="ts">

    import * as utils from '$lib/utils/inc.utils'
    import LayoutGlobalSearch from '$components/other/layoutGlobalSearch.svelte';
    import LayoutNavigation from '$components/other/layoutNavigation.svelte';

</script>



<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" 
    style="postition:absolute; bottom:0px; background-color:none; height:100%"
>
    <thead>
        <tr>
                    <header>
                        <table width="100%" height="100%" border="0" cellpadding="3" cellspacing="0">
                            <tr>
                                <td align="left">
                                    <LayoutGlobalSearch></LayoutGlobalSearch>
                                </td>
                                <td align="center">
                                    <!--
                                    <div id="viewDataTransfer">
                                        {#await datatranserPromise}
                                            <img src="loading-buffering.gif" alt="loading" />
                                            <Icon icon="svg-spinners:12-dots-scale-rotate" />
                                        {:then valid}
                                            <div></div>
                                        {:catch error}
                                            <img src="loading-error-icon-32.png" alt="loading" />
                                        {/await}
                                    </div>
                                    -->
                                </td>
                                <td align="right">
                                    <select name="viewCurrentEvent" id="viewCurrentEvent">
                                        <option>Global</option>
                                        <option>Frankfurt Marathon 2023</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </header>
        </tr>
        <tr>
            <td>
                    <LayoutNavigation />
            </td>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td style="overflow: auto">
                    <main>
                        <slot></slot>
                    </main>
            </td>
        </tr>
    </tbody>

    <tfoot>
    </tfoot>

</table>