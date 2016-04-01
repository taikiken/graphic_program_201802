<?php


if (PHP_SAPI == 'cli-server') {
  $file = __DIR__ . $_SERVER['REQUEST_URI'];
  if (is_file($file)) {
    return false;
  }
}


// # UT_ENV
// $_SERVER['SERVER_NAME'] で環境判定します
// `UT_ENV` に環境を定義しslim上で利用します
// ==============================

// vagrant forwarded_port - 8080ポートからのアクセスならローカル
if ( $_SERVER['SERVER_PORT'] == '8080' ) :
  define('UT_ENV', 'LOCAL');

else :

  switch( $_SERVER['SERVER_NAME'] ) :

    # vagrant - local IP
    case '192.168.33.50' :
      define('UT_ENV', 'LOCAL');
      break;

    # vagrant - hostname
    case 'undotsushin.local' :
      define('UT_ENV', 'LOCAL');
      break;

    # dev - t2.small
    case 'dev.undotsushin.com' :
      define('UT_ENV', 'DEVELOP');
      break;

    # dev2 - production server
    case 'dev2.undotsushin.com' :
      define('UT_ENV', 'DEVELOP2');
      break;

    # stg - t2.small
    case 'stg.undotsushin.com' :
      define('UT_ENV', 'STAGING');
      break;

    # www -  〜 4/1 t2.small : 4/1 〜 production
    default :
      define('UT_ENV', 'PRODUCTION');

  endswitch;

  # production以外の環境ではdisplay_errorsする
  if ( $UT_ENV !== 'PRODUCTION' ) :
    ini_set( 'display_errors', 1 );
  endif;


endif;



// # for CMS関連のファイルロード
// ==============================
// #219 - ローカルでは現状API動かないのでサーバでのみinclude
// view側で以下つかっているのは 2016-03-28 (月) 今のところ パスワードリマインダのみ
if ( UT_ENV !== 'LOCAL' ) :
  include_once "local.php";
  // if ( UT_ENV !== 'DEVELOP2' || UT_ENV !== 'PRODUCTION' ) :
  //   include_once "public/ut.php";
  // endif;
endif;



// # Slim
// ==============================
/**
*
* ViewのルーティングにSlim導入
* Slim - http://www.slimframework.com
*
* based on slim/slim-skeleton
*/
date_default_timezone_set('Asia/Tokyo');


require __DIR__ . '/../app/app.php';


?>