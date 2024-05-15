<script>

    export let company_info = { name: 'no info' }

    let item = company_info

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

<table>

    <tr>
        <td>
            <a href="{item}">{item.name}</a>
        </td>
    </tr>
    <tr>
        <td>
            {item.subcategory}
        </td>
    </tr>


    {#if get_adres() != ''}
        <tr>
            <td>
                {get_adres()}
            </td>
        </tr>
    {/if}
    


    <tr>
        <td>
            
            {#if item?.phone}
                T: {item.phone}
            {/if}
            
            {#if item?.fax}
                F: {item.fax}
            {/if}
            
            {#if item?.mobile}
                M: {item.mobile}
            {/if}
            
            {#if item?.email}
                E: {item.email}
            {/if}
            
            {#if item?.urlwww}
                W: {item.urlwww}
            {/if}

        </td>
    </tr>


    {#if item?.shortinfo}
        <tr>
            <td>
                {item.shortinfo}
            </td>
        </tr>
    {/if}

    
</table>