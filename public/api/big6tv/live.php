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

  $sp_labels = array('自動', '480x270', '640x360');
  $sp_count  = 0;
  foreach( $json['response']['live']['video']['sources'] as $key => $value ) :
    if ( in_array($value['label'],  $sp_labels ) ) :
      $souces[$sp_count] = $value;
      if ( $value['default'] ) :
        $souces[$sp_count]['url'] = $result['response']['live']['video']['source'];
      endif;
      $sp_count++;
    endif;
  endforeach;

  $result['response']['live']['video']['sources_sp'] = $souces;

  if (
    preg_match("/com.sportsbull.test/", $_SERVER['HTTP_USER_AGENT'] ) ||
    preg_match("/com.limret.undotsushin/", $_SERVER['HTTP_USER_AGENT'] ) ||
    preg_match("/com.undotsushin/", $_SERVER['HTTP_USER_AGENT'] ) ||
    preg_match("okhttp", $_SERVER['HTTP_USER_AGENT'])
  ) :
    $is_app = true;
  else :
    $is_app = false;
  endif;

  if( $ua === 'mobile' || $is_app ) :
    $result['response']['live']['video']['sources'] = $souces;
  endif;

endif;

// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>