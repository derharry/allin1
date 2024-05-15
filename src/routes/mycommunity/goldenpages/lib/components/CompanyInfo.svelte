<script>

    export let company_info = { name: 'no info' }
    export let mode = 'short'

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
            {item.name}
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
                    <td>
                        {item.subcategory}
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
</table>



<style>

    .itemBoxMain {
        width: 100%;
        border: 1px orange solid;
        background-color: #FFE5B4;
        border-radius: 15px;
        margin-bottom: 20px;
        padding: 8px;
    }

    .itemName {
        font-size: 13pt;
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

    .contactdetail {
        display: table;
        float: left;
        padding: 5px 10px;
        border-radius: 15px;
        background-color: orange;
        font-size: 10pt;
    }


</style>