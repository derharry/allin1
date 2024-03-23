<script>
</script>


<fieldset>
    <table>
        <tr>
            <td>

                <table>
                    <tr>
                        <td width="1">Name</td>
                        <td width="150"><input type="text" name="lastname" value=""></td>
                    </tr>
                    <tr>
                        <td>Prename</td>
                        <td><input type="text" name="prename" value=""></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" name="email" value=""></td>
                    </tr>
                    <tr>
                        <td>Phone Nr.</td>
                        <td><input type="text" name="phonenr" value=""></td>
                    </tr>
                    <tr>
                        <td>Mobile Nr.</td>
                        <td>
                            <input type="text" name="mobilenr" value=""></td>
                    </tr>
                    <tr>
                        <td>Street: </td>
                        <td><input type="text" name="frm[street] " value=""></td>
                    </tr>
                    <tr>
                        <td>Postcode / City: </td>
                        <td>
                            <input type="text" name="frm[postalcode] " value="" class="soUI100px">
                            <input type="text" name="frm[city] " value="" class="soUI150px"></td>
                    </tr>
                    <tr>
                        <td>Country: </td>
                        <td><select></select></td>
                    </tr>
                    <tr>
                        <td>Nationality: </td>
                        <td><select></select></td>
                    </tr>
                </table>

            </td>
            <td>

                <table>
                    <tr>
                        <td>Birthday: </td>
                        <td><input type="date" name="frm[birthday]" value="" class="datepicker"></td>
                    </tr>
                    <tr>
                        <td width="1 ">Comments</td>
                        <td><textarea name="frm[comments]" rows="5 " style="height:75px "></textarea></td>
                    </tr>
                    <tr>
                        <td width="1 ">Documents
                            <br>
                            <button id="btnAddFiles" class="small"><i class="fas fa-plus"></i></button>
                            <button name="btnDeleteDocument" value="" class="small"><i class="fas fa-trash"></i></button>
                        </td>
                        <td style="text-align:center">
                        </td>
                    </tr>
                    <tr>
                        <td>Level: </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>DSVGO-Newsletter</td>
                        <td><input type="hidden" name="frm[dsvgo_newsletter]" value="0" />
                            <input type="checkbox" name="frm[dsvgo_newsletter]" value="1" />
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>DSVGO-Media</td>
                        <td><input type="hidden" name="frm[dsvgo_media]" value="0" />
                            <input type="checkbox" name="frm[dsvgo_media]" value="1" />
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Blacklistet</td>
                        <td><input type="hidden" name="frm[blacklisted]" value="0" />
                            <input type="checkbox" name="frm[blacklisted]" value="1" />
                        </td>
                    </tr>
                </table>

            </td>
            <td>
                <table>
                    <tr>

                        <td width="30%">
                            <img alt="picture of cusomter" />
                        </td>
                    </tr>

                </table>

            </td>

        </tr>
    </table>

</fieldset>