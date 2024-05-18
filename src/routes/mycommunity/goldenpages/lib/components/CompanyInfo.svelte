<script>
    
    // for admin mode
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();


    export let company_info = { name: 'no info' }
    export let mode = 'normal' || 'admin'

    let item;
    let adres;
    $: { 
        item  = company_info
        adres = get_adres()
    }


    function get_adres() {
        let adresA = []
        if (item?.street)     adresA.push( item.street )
        if (item?.street && (item?.postalcode != '' || item?.city != '') )
            adresA.push( ', ' )
        if (item?.postalcode) adresA.push( item.postalcode +' ')
        if (item?.city)       adresA.push( item.city )
        //console.log( adresA.join('') )
        return adresA.join('')
    }

</script>


<table class="itemBoxMain">
    <tr>
        <td colspan="2" class="itemName">

            {item.name || ''}

            {#if mode == 'admin'}
                <span style="float:right">
                    <button on:click="{ () => dispatch('edit',          item.uuid)  }"><i class='fa fa-edit'></i></button>
                    <button on:click="{ () => dispatch('toggle_public', item.uuid)  }"><i class='fa fa-globe'></i></button>
                    <button on:click="{ () => dispatch('delete',        item.uuid)  }"><i class="fa fa-trash-o"></i></button>
                    &nbsp;
                </span>
            {/if}
        </td>
    </tr>
    <tr>
        <td valign="top">
            {#if item?.logo}
                <div class="imgCompanyBox">
                    <img src="{item.logo}" alt="" class="imgCompany">
                </div>
            {/if}
        </td>
        <td valign="top">
            <table>

                <tr>
                    <td class="categoryPath">
                        {item.category || ''} / {item.subcategory || ''}
                    </td>
                </tr>

                {#if adres != ''}
                    <tr>
                        <td>
                            <img src="" alt="P"> {adres}
                        </td>
                    </tr>
                {/if}

                {#if item?.urlgoogle}
                    <tr>
                        <td>
                            <img src="" alt="G"> <a href="{item.urlgoogle}"> Google Maps</a>
                        </td>
                    </tr>
                {/if}

                <tr>
                    <td>
                        
                        {#if item?.phone}
                            <div class="contactdetail">
                                T: {item.phone}
                            </div>
                        {/if}
                        
                        {#if item?.mobile}
                            <div class="contactdetail">
                                M: {item.mobile}
                            </div>
                        {/if}
                        
                        {#if item?.email}
                            <div class="contactdetail">
                                Email {item.email}
                            </div>
                        {/if}
                        
                        {#if item?.urlwww}
                            <div class="contactdetail">
                                <a href="{item.urlwww}" target="_blank">Website</a>
                            </div>
                            
                        {/if}

                    </td>
                </tr>


                {#if item?.intotext}
                    <tr>
                        <td>
                            {@html item.intotext}
                        </td>
                    </tr>
                {/if}

            </table>
        </td>
    </tr>
    

    {#if mode == 'admin'}
    <tr>
        <td colspan="2">
            <hr>
            <table width="100%" class="admin_hidden">
                <tr>
                    <td width="25%"></td>
                    <td width="25%"></td>
                    <td width="25%"></td>
                    <td width="25%"></td>
                </tr>
                <tr>
                    <td rowspan="3" colspan="2" valign="top">Tags:<br>{item.tags || '-'}</td>
                    <td style="text-wrap: nowrap;">Is Public</td>
                    <td>{item.is_public || 'no'}</td>
                </tr>
                <tr>
                    <!--
                    <td></td>
                    <td></td>
                    -->
                    <td style="text-wrap: nowrap;">Is Public By</td>
                    <td></td>
                </tr>
                <tr>
                    <!--
                    <td></td>
                    <td></td>
                    -->
                    <td style="text-wrap: nowrap;">Register date</td>
                    <td></td>
                </tr>
            </table>
        </td>
    
    {/if}

</table>



<style>

    .itemBoxMain {
        width: 100%;
        border: 1px orange solid;
        background-color: #FFE5B4;
        border-radius: 15px;
        margin-bottom: 20px;
        padding: 8px;

        font-family: Verdana, Arial;
        font-size: 10pt;
    }

    .itemName {
        font-size: 1.1em;
        font-weight: bolder;
    }

    .imgCompanyBox {
        padding: 8px;
        background-color: white;
        max-width: 125px;
        max-height: 100px;
        border-radius: 8px;
        text-align: center;
    }

    .imgCompany {
        max-width: 125px;
        max-height: 100px;
    }

    .categoryPath {
        font-size: 0.9em;
    }

    .contactdetail {
        display: table;
        float: left;
        padding: 5px 10px;
        border-radius: 15px;
        background-color: orange;
        font-size: 0.8em;
    }


    .admin_hidden {
        font-size: 0.8em;
    }

</style>