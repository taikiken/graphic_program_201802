<?php
/**
 * 記事詳細「続きを読む」本文を iframe 化する
 * User: @taikiken
 * Date: 2017/04/11
 * Time: 20:39
 * @see https://github.com/undotsushin/undotsushin/issues/1475#issuecomment-293174913
 * @see https://github.com/undotsushin/undotsushin/issues/1818
 */

// copy from `/picks/index.php`

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
$helpers = glob('../../app/helpers/*.helper.php');
foreach ($helpers as $helper) {
  require $helper;
}

// models
// ==============================
$models = glob('../../app/models/*.model.php');
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

// GET query
// ==============================
$page_id = '104669';
if (isset($_GET['page'])) {
  $page_id = $_GET['page'];
}

$post = $model->get_post($page_id);
$page = $model->set(array(
  'post' => $post,
  'ua_device' => $model->property('ua_device'),
));

// VIEW
// ==============================

include_once __DIR__.'/view.php';

// 確認用dumpデータ - テンプレ組み込みおわったら削除
//print_r('-----------------------------------------------------<br>');
//print_r($page);
//print_r($model->property('ua_device'));
