<?php

    include('lib/ao.bootstrap.php');

?>
<!DOCTYPE html>
<html>
<head>
    <title>{{SiteTitle}}</title>
    
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    
    <script type="text/javascript" src="/lib/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/lib/fw/kickstart/js/kickstart.js"></script>                   <!-- KICKSTART -->
    <link rel="stylesheet" type="text/css" href="/lib/fw/kickstart/css/kickstart.css" media="all" />   <!-- KICKSTART -->

    <script type="text/javascript" src="lib/js/ao.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/css/style.css" />
</head>
<body>

<header>
<form>
    <table>
        <tr>
            <td style="text-align:left">
                
                <!-- Select -->
                <label for="selectedEvent">Current Event:</label>
                <select id="selectedEvent">
                    <option value="-">-- Choose --</option>
                    <option value="1">Office Mode</option>
                    <option value="-">--</option>
                    <option value="3">Frankfurt Marathon 2015</option>
                </select>
                
            </td>
            <td style="text-align:center">
            
            </td>
            <td style="text-align:right">
                <button type="submit" name="zfwAction_LoadSite" value="application.settings"><i class="fa fa-gear"></i></button>
            </td>
        </tr>
    </table>
<form>
</header>
    
<main>
<?php 

    include('sites/'. $cgi->zfwAction_LoadSite .'.php');

?>
</main>
    
<aside>
<pre>
<?php
    foreach ($errors as $_) {
        printf('<li>%s</li>', $_);
    }
    
    $cgi->Dump();
?>
</pre>
</aside>
    
<footer>
</footer>
    
</body>
</html>