<table>
    <tr>
        <td>
            {#if item?.logo}
                <img src="{item.logo}" alt="" class="imgCompany">
            {/if}
        </td>
        <td>
            <table>
                <tr>
                    <td>

                        {#if mode == 'long'}
                            {item.name}
                        {:else}
                            <a href="b{item.uuid}">{item.name}</a>
                        {/if}

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
                            <img src="" alt="P"> {get_adres()}
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
                        
                        <!--
                        {#if item?.fax}
                            <div class="contactdetail">
                                F: {item.fax}
                            </div>
                        {/if}
                        -->
                        
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

                {#if item?.infoshort}
                    <tr>
                        <td>
                            {item.infoshort}
                        </td>
                    </tr>
                {/if}

                {#if mode == 'long'}

                    {#if item?.infolong}
                        <tr>
                            <td>
                                {item.infolong}
                            </td>
                        </tr>
                    {/if}

                {/if}

            </table>
            
        </td>
    </tr>
</table>
