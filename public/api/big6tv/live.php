<?php
/*

# big6tv - ライブ配信

*/

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";

$season = $_GET["season"];


if ($season == '2017a') //legacy
{
  if ( UT_ENV !== 'PRODUCTION' ) :
    $json = 'https://dev-img.sportsbull.jp/static/big6/2017/autumn/live.json';
  else:
    $json = 'https://img.sportsbull.jp/static/big6/2017/autumn/live.json';
  endif;
}
else
{
  if ( UT_ENV !== 'PRODUCTION' ) :
    $json = 'https://dev-img.sportsbull.jp/static/big6/' . $season . '/live.json';
  else:
    $json = 'https://img.sportsbull.jp/static/big6/' . $season . '/live.json';
  endif;
}


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