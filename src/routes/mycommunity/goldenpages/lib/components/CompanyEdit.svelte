<script>

    export let company_info;

</script>


<style>

    input, textarea {
        width: 100%;
    }

    td {
        white-space: nowrap;
    }

</style>



<table width="100%">

    <tr>
        <td width="1"></td>
        <td></td>
    </tr>
    <tr>
        <td>Naam *</td>
        <td><input name="name" type="text" value="{company_info?.name || ''}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Categorie</td>
        <td>
            <select>
            </select>
            <input name="category" type="text"  value="{company_info?.category || ''}">
        </td>
    </tr>
    <tr>
        <td>Subcategorie</td>
        <td>
            <select>
            </select>
            <input name="subcategory" type="text" value="{company_info?.subcategory || ''}" >
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Straat</td>
        <td><input name="street" type="text"  value="{company_info?.street || ''}"></td>
    </tr>
    <tr>
        <td>PLZ</td>
        <td><input name="postalcode" type="text"  value="{company_info?.postalcode || ''}"></td>
    </tr>
    <tr>
        <td>Plaats</td>
        <td><input name="city" type="text"  value="{company_info?.city || ''}"></td>
    </tr>
    <tr>
        <td>Regio *</td>
        <td><input name="region" type="text"  value="{company_info?.region || ''}"></td>
    </tr>
    <tr>
        <td>Land</td>
        <td><input name="country" type="text"  value="{company_info?.country || 'Oostenrijk'}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Telefoon</td>
        <td><input name="phone" type="text"  value="{company_info?.phone || ''}"></td>
    </tr>
    <tr>
        <td>Mobile</td>
        <td><input name="mobile" type="text" value="{company_info?.mobile || ''}" ></td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td><input name="email" type="text" value="{company_info?.email || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Website URL</td>
        <td><input name="urlwww" type="text"  value="{company_info?.urlwww || ''}"></td>
    </tr>
    <tr>
        <td>Google URL</td>
        <td><input name="urlgoogle" type="text" value="{company_info?.urlgoogle || ''}" ></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td>Infotext</td>
        <td><textarea name="intotext" rows="5">{company_info?.infotext || ''}</textarea></td>
    </tr>
    
    <tr>
        <td>Logo</td>
        <td><input name="logo" type="text"  value="{company_info?.logo || ''}"></td>
    </tr>
    <tr>
        <td>Tags</td>
        <td><input name="tags" type="text"  value="{company_info?.tags || ''}"></td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <button type="submit">Bedrijf regestratie voltooien</button>
        </td>
    </tr>
        
</table>
