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



<table class="companyInfoBoxTable">
    <tr>
        <td colspan="2" class="companyInfoBoxName">

            {company_info.name || ''}

            {#if mode == 'admin'}
                <!-- previously the buttons where here-->
            {/if}
        </td>
    </tr>
    <tr>
        <td valign="top">
            
            {#if company_info?.logo}
                <div class="companyInfoBoxIMGbox">
                    <img src="{company_info.logo}" alt="" class="companyInfoBoxIMG">
                </div>
            {/if}
            
        </td>
        <td valign="top">
            <table>

                <tr>
                    <td class="companyInfoBoxCategoryPath">
                        {company_info?.main_category_name || ''} / {company_info?.sub_category_name || ''}
                    </td>
                </tr>
                <tr>
                    <td class="companyInfoBoxSpacer"></td>
                </tr>
                <tr>
                    <td class="companyInfoBoxStreet">
                        {#if adres != ''}
                            <i class='fa fa-street-view'></i>&nbsp; {adres}
                            <br>
                        {/if}
                        {#if company_info?.urlgoogle}
                            <i class='fa fa-map-pin'></i>&nbsp; <a href="{company_info.urlgoogle}"> Google Maps</a>
                        {/if}
                    </td>
                </tr>
                <tr>
                    <td class="companyInfoBoxSpacer"></td>
                </tr>
                <tr>
                    <td>
                        
                        {#if company_info?.phone}
                            <a href="tel:{company_info.phone}" class="companyInfoBoxContactDetail"><i class="fa fa-phone"></i> {company_info.phone}</a>
                        {/if}
                        
                        {#if company_info?.mobile}
                            <a href="tel:{company_info.mobile}" class="companyInfoBoxContactDetail"><i class="fa fa-mobile"></i> {company_info.mobile}</a>
                        {/if}
                        
                        {#if company_info?.email}
                            <a href="mailto:{company_info.email}" class="companyInfoBoxContactDetail"><i class="fa fa-envelope"></i> {company_info.email}</a>
                        {/if}
                        
                        {#if company_info?.urlwww}
                            <a href="tel:{company_info.urlwww}" class="companyInfoBoxContactDetail"><i class="fa fa-globe"></i> Website</a>
                        {/if}

                    </td>
                </tr>
                <tr>
                    <td class="companyInfoBoxInfoText">
                        {#if company_info?.infotext}
                            {@html company_info.infotext}
                        {/if}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    

    {#if mode == 'admin'}
    <tr>
        <td colspan="2">
            <hr>
            <table width="100%" class="companyInfoBoxInfoAdminTable">
                {#if company_info.category_wish != ''}
                    <tr>
                        <td colspan="4" class="error">
                            Category wish: {company_info.category_wish} 
                            <!-- todo - add functionality to remove category wish -->
                            <button style="float:right"><i class="fa">d</button>
                        </td>
                    </tr>
                {/if}
                <tr>
                    <th>Tags:</th>
                    <td colspan="3">
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
                    <th style="text-wrap: nowrap;">Is Public</th>
                    <td>{company_info.is_public ? 'yes' : 'no'}</td>
                    <th style="text-wrap: nowrap;">Register date</th>
                    <td>{get_date_time_form_Date(company_info.date_created)}</td>
                </tr>
                <tr>
                    <th style="text-wrap: nowrap;">Is Public By</th>
                    <td></td>
                    <th style="text-wrap: nowrap;">Last updated date</th>
                    <td>{get_date_time_form_Date(company_info.date_updated)}</td>
                </tr>
            </table>
        </td>
    
    {/if}

</table>
