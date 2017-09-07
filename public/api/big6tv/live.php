<?php
/*

# big6tv - 順位表

*/

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";
include_once __DIR__."/../../../app/helpers/ua.helper.php";

$ua = new UserAgent();
$ua = $ua->set();

if ( UT_ENV !== 'PRODUCTION' ) :
  $json = 'https://dev.sportsbull.jp/api/ver1/static/big6live.json';
else:
  $json = 'https://sportsbull.jp/api/ver1/static/big6live.json';
endif;


if ( !empty(file_get_contents($json, false, null, 0, 1)) ) :

  $json   = json_decode(file_get_contents($json), true);
  $result = $json;

  foreach( $json['response']['live']['video']['sources'] as $key => $value ) :
    if ( $value['res'] > 2 ) break;

    $souces[$key] = $value;

    if ( $value['default'] ) :
      $souces[$key]['url'] = $result['response']['live']['video']['source'];
    endif;

  endforeach;

  $result['response']['live']['video']['sources_sp'] = $souces;

  if( $ua === 'mobile' ) :
    $result['response']['live']['video']['sources'] = $souces;
  endif;

endif;

// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>