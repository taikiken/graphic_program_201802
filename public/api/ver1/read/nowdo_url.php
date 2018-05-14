<?php
/*

# nowdo 

*/

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";


  if ( UT_ENV == 'LOCAL' or 'DEVELOP' ) :
    $json = 'https://dev-img.sportsbull.jp/static/bottomtab/nowdo.json';
  elseif( UT_ENV == 'STAGING') :
    $json = 'https://stg-img.sportsbull.jp/static/bottomtab/nowdo.json';
  elseif (UT_ENV == 'PRODUCTION') :
    $json = 'https://img.sportsbull.jp/static/bottomtab/nowdo.json';
  endif;


if ( !empty(file_get_contents($json, false, null, 0, 1)) ) :

    $json   = json_decode(file_get_contents($json), true);
    $result = $json;
else:

    $y=array();
    $y["status"]["code"]=200;
    $y["status"]["message_type"]="success";
    $y["status"]["user_message"]="";
    $y["status"]["developer_message"]="";
    $y["response"]=null;
    $result = $y;
endif;

// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>