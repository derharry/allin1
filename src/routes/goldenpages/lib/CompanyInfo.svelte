<script>
    
    // for admin mode
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();


    export let company_info  = { name: 'no info' }
    export let category_list = {}
    export let mode = 'public' || 'admin'
    
    //$: { console.log('company_info.svelte', company_info ) }

    // dynamic state for the address
    $: adres = get_adres()
    

    // dynamic state for the 2 select fields 
    // set main_category_name and sub_category_name by the (sub/parent)category_id 
    $: if (company_info.main_category_name == undefined || company_info.sub_category_name == undefined) {
        for (let main_uuid in category_list) {
            for (let sub_uuid in category_list[main_uuid].subs) {
                if (sub_uuid == company_info.category_uuid) {
                    company_info.main_category_name = category_list[main_uuid].name
                    company_info.sub_category_name  = category_list[main_uuid].subs[sub_uuid].name
                    break
                }
            }
        }        
    }
    


    function get_adres() {
        let adresA = []
        if (company_info?.street)     adresA.push( company_info.street )
        if (company_info?.street && (company_info?.postalcode != '' || company_info?.city != '') )
            adresA.push( ', ' )
        if (company_info?.postalcode) adresA.push( company_info.postalcode +' ')
        if (company_info?.city)       adresA.push( company_info.city )
        //console.log( adresA.join('') )
        return adresA.join('')
    }

    function get_date_time_form_Date(obj) {
        try {
            //if (typeof obj !== "date") 
            //    return '-'
            //let obj = new Date();
            let day = obj.getUTCDate().toString().padStart(2, "0");
            let month = (obj.getUTCMonth() + 1).toString().padStart(2, "0");
            let year = obj.getUTCFullYear();
            let hour = obj.getHours().toString().padStart(2, "0");
            let minute = obj.getMinutes().toString().padStart(2, "0");
            return `${day}-${month}-${year} ${hour}:${minute} `            
        } catch (error) {
            return '-'        
        }
    }

</script>
<style>
    @import './style.css';
</style>

<table class="itemBoxMain">
    <tr>
        <td colspan="2" class="itemName">

            {company_info.name}

            {#if mode == 'admin'}
                <!-- previously the buttons where here-->
            {/if}
        </td>
    </tr>
    <tr>
        <td valign="top">
            {#if company_info?.logo}
                <div class="imgCompanyBox">
                    <img src="{company_info.logo}" alt="" class="imgCompany">
                </div>
            {/if}
        </td>
        <td valign="top">
            <table>

                <tr>
                    <td class="categoryPath">
                        {company_info?.main_category_name || ''} / {company_info?.sub_category_name || ''}
                    </td>
                </tr>

                {#if adres != ''}
                    <tr>
                        <td>
                            <i class='fa fa-street-view'></i>&nbsp; {adres}
                        </td>
                    </tr>
                {/if}

                {#if company_info?.urlgoogle}
                    <tr>
                        <td>
                            <i class='fa fa-map-pin'></i>&nbsp; <a href="{company_info.urlgoogle}"> Google Maps</a>
                        </td>
                    </tr>
                {/if}

                <tr>
                    <td>
                        
                        {#if company_info?.phone}
                            <div class="contactdetail">
                                <i class="fa fa-phone"></i>&nbsp; <a href="tel:{company_info.phone}">{company_info.phone}</a>
                            </div>
                        {/if}
                        
                        {#if company_info?.mobile}
                            <div class="contactdetail">
                                <i class="fa fa-mobile-phone"></i>&nbsp; <a href="tel:{company_info.mobile}">{company_info.mobile}</a>
                            </div>
                        {/if}
                        
                        {#if company_info?.email}
                            <div class="contactdetail">
                                <i class="fa fa-envelope"></i>&nbsp; <a href="mailto:{company_info.email}">{company_info.email}</a>
                            </div>
                        {/if}
                        
                        {#if company_info?.urlwww}
                        
                            <div class="contactdetail">
                                <i class="fa fa-globe"></i>&nbsp; <a href="{company_info.urlwww}" target="_blank">Website</a>
                            </div>
                            
                        {/if}

                    </td>
                </tr>


                {#if company_info?.infotext}
                    <tr>
                        <td>
                            {@html company_info.infotext}
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
                    <td width=""></td>
                    <td width="25%"></td>
                    <td width=""></td>
                    <td width="25%"></td>
                </tr>
                <tr>
                    <td>Tags:</td>
                    <td colspan="3" valign="top">
                        {company_info.tags || '-'}
                        
                        <span style="float:right">
                            <button on:click="{ () => dispatch('edit',          company_info.uuid)  }"><i class='fa fa-edit'></i></button>
                            <button on:click="{ () => dispatch('toggle_public', company_info.uuid)  }"><i class='fa fa-globe'></i></button>
                            <button on:click="{ () => dispatch('delete',        company_info.uuid)  }"><i class="fa fa-trash-o"></i></button>
                            &nbsp;
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="text-wrap: nowrap;">Is Public</td>
                    <td>{company_info.is_public ? 'yes' : 'no'}</td>
                    <td style="text-wrap: nowrap;">Register date</td>
                    <td>{get_date_time_form_Date(company_info.date_created)}</td>
                </tr>
                <tr>
                    <td style="text-wrap: nowrap;">Is Public By</td>
                    <td></td>
                    <td style="text-wrap: nowrap;">Last updated date</td>
                    <td>{get_date_time_form_Date(company_info.date_updated)}</td>
                </tr>
            </table>
        </td>
    
    {/if}

</table>
