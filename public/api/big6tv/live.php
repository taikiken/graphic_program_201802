<?php
/*

# big6tv - ライブ配信

*/

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";

if ( UT_ENV !== 'PRODUCTION' ) :
  $json = 'https://dev-img.sportsbull.jp/static/big6/2017/autumn/live.json';
else:
  $json = 'https://sportsbull.jp/api/ver1/static/big6live.json';
endif;

if ( !empty(file_get_contents($json, false, null, 0, 1)) ) :

  $json   = json_decode(file_get_contents($json), true);
  $result = $json;

endif;

// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>