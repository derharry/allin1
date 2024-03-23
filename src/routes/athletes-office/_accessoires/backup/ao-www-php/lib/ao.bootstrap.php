<?php  

#namespace ao;

    // define constants
    define('PATH_ROOT', str_replace('\\', '/', pathinfo(__FILE__, PATHINFO_DIRNAME)).'/../');
    define('PATH_DB',   PATH_ROOT.'database/');
    define('FILE_NAV_MAIN',  PATH_DB.'navigation.main.json');
    
    
    // init ZeeFramework
    if ($_SERVER['APPLICATION_ENVIRONMENT'] == 'development') {
        require_once($_SERVER['DOCUMENT_ROOT'].'/lib/php/ZeeFramework/zfw_core.php');
    } else {
        require_once('ZeeFramework/zfw_core.php');
    }
    zfw_Core::Load();

    
    // include all ao classes
    $files = array();
    zfw_IO_Directory::GetFiles('lib/', $files);
    foreach ($files as $_) {
        if (preg_match("/ao.*.php$/", $_)) {
            include("lib/$_");
        }
    }
   
    
    // load config
    $cfg = new zfw_Config(PATH_DB.'config.json', zfwT_Config_Provider::JSON);
    $cfg->Load();


    // capture GET, POST data
    $cgi = new zfw_CGI();
    
    
    // session usage
    $ses = new zfw_Session($cgi);
    
    
    // error collector
    $errors = array();
    
    
    // get Database Connection Info
    $dbCI = new zfw_DB_ConnInfo(
            $cfg->DB_Host,
            $cfg->DB_DatabaseName,
            $cfg->DB_Username,
            $cfg->DB_Password
    );
    
    //$db = new zfw_DB($cfg->DB_Provider, $dbCI);
    
    
    // do some action routing
    //$route = new ao\ActionRouter();


?>
