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


// 記事データ取得
// ==============================
include_once __DIR__.'/data.php';

foreach( $articles as $key => $value ) :

  $articles[$key]['post'] = $model->get_post($value['id']);

  // いらないデータ消す
  unset($articles[$key]['post']['ad']);
  unset($articles[$key]['post']['banner']);
  unset($articles[$key]['post']['recommend_articles']);
  unset($articles[$key]['post']['related_articles']);

endforeach;



// $pageに渡したい値があればここに設定
// ==============================
$page = $model->set(array(
  'og_title' => 'BULL\'S PICKS 編集部おすすめ記事',
  'og_type'  => 'article',
  'data'     => $articles,
));



// render
// ==============================
if ( $model->property('ua') === 'mobile' ) :

  include_once __DIR__.'/view.php';

  print_r($page);

else :

  echo 'PC版はホームにリダイレクト / SPでみてね';

  // あとでPC版つくるので302で
  // header("Location: /",TRUE,302);
  // exit;

endif;


?>