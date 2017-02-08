<?php

// vagrant forwarded_port - 8080ポートからのアクセスならローカル
if ( $_SERVER['SERVER_PORT'] == '8080' ) :
  define('UT_ENV', 'LOCAL');

elseif ( $_SERVER['SERVER_PORT'] == '8888' ) :
  define('UT_ENV', 'LOCAL_DB');

else :

  switch( $_SERVER['SERVER_NAME'] ) :

    # vagrant - local IP
    case '192.168.33.50' :
      define('UT_ENV', 'LOCAL_DB');
      break;

    # vagrant - hostname
    case 'undotsushin.local' :
    case 'sportsbull.local'  :
      define('UT_ENV', 'LOCAL');
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


// helper
// ==============================
$helpers = glob('../../../app/helpers/*.helper.php');
foreach ($helpers as $helper) {
  require $helper;
}

// models
// ==============================
$models = glob('../../../app/models/*.model.php');
foreach ($models as $model) {
  require $model;
}


// # DB
// ==============================
include_once "local.php";
include_once "public/check.php";

// 初期化＋DB接続
$o = new dbForTemplate;
$o->connect();

// set app
// ==============================
$model = new ViewModel($o);

//$page = $model->set(array(
//  'og_title' => 'BULL\'S PICKS 編集部おすすめ記事',
//  'og_type'  => 'article',
//));


// app webview かを `?app=(ios|android)` から判定します
// ==============================

$from_webview = false;
if (isset($_GET['app'])) {
  if ($_GET['app'] == 'ios' || $_GET['app'] == 'android') {
    $from_webview = true;
  }
}


//// render
// ==============================
// $model->property('ua_device') = mobile | tablet | desktop
if ( $model->property('ua_device') === 'mobile' ) :

  include_once __DIR__.'/view_sp.php';

else :

  include_once __DIR__.'/view.php';

endif;


// 確認用dumpデータ - テンプレ組み込みおわったら削除
//print_r($page);
//print_r($articles);
//print_r($xml_element[0]->articles);
