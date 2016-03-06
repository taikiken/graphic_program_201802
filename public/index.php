<?php

include_once "local.php";
include_once "public/ut.php";

/**
*
* ViewのルーティングにSlim導入
* Slim - http://www.slimframework.com
*
* based on slim/slim-skeleton
*/

date_default_timezone_set('Asia/Tokyo');

if (PHP_SAPI == 'cli-server') {
  $file = __DIR__ . $_SERVER['REQUEST_URI'];
  if (is_file($file)) {
    return false;
  }
}


// $_SERVER['SERVER_NAME'] で環境判定します
// `UT_ENV` に環境を定義しslim上で利用します
switch( $_SERVER['SERVER_NAME'] ) :
  case '192.168.33.50' :
    define('UT_ENV', 'LOCAL');
    break;

  case 'undotsushin.local' :
    define('UT_ENV', 'LOCAL');
    break;

  case 'dev.undotsushin.com' :
    define('UT_ENV', 'DEVELOP');
    break;

  case 'stg.undotsushin.com' :
    define('UT_ENV', 'STAGING');
    break;

  default :
    define('UT_ENV', 'PRODUCTION');
endswitch;

if ( $UT_ENV !== 'PRODUCTION' ) :
  ini_set( 'display_errors', 1 );
endif;


require __DIR__ . '/../app/app.php';


?>