<?php
/**
 * モータースポーツ - カルーセル・ヘッドライン
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 14:20
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */

// property
// ==============================
// default 設定を確認する
if (!isset($option_directory)) {
  exit(0);
}


// ref: `/picks/index.php`
// ==============================
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

$page = $model->set(array(
  'og_title' => '',
  'og_type'  => 'article',
));

// host 設定
// ==============================
// local `https://dev.sportsbull.jp` それ以外空
$app_host_name = $page['apiRoot'];
// 空の時は `get_site_url` から取得する
if ($app_host_name == '') {
  // host name 取得
  $app_host_name = $model->get_site_url();
}

// JSON 取得
// ==============================
// postfix `$option_directory` は各 f1 / sgt / wec / wrc view で
$pickup_path = $app_host_name . '/api/v1/articles/static/pickup_' . $option_directory;
$headline_path = $app_host_name . '/api/v1/articles/static/headline_' . $option_directory;

// PICKUP
// =============
$pickup_json = file_get_contents($pickup_path);
$pickup_json = mb_convert_encoding($pickup_json, 'UTF8', 'UTF-8,ASCII,JIS,EUC-JP,SJIS-WIN');
$pickup_data = json_decode($pickup_json);

// HEADLINE
// =============
$headline_json = file_get_contents($headline_path);
$headline_json = mb_convert_encoding($headline_json, 'UTF8', 'UTF-8,ASCII,JIS,EUC-JP,SJIS-WIN');
$headline_data = json_decode($headline_json);

// 日程結果・ランキング
// @see https://github.com/undotsushin/undotsushin/issues/1916 - モータースポーツ / Phase2 : 日程結果・ランキング / データ連携 #1916
// @since 2017-07-20
// =============
$s3_host = 'https://dev-img.sportsbull.jp';
$schedule_path = $s3_host . '/static/motorsports/' . $option_directory . '.json';
//var_dump($schedule_path);

$schedule_json = file_get_contents($schedule_path);
$schedule_json = mb_convert_encoding($schedule_json, 'UTF8', 'UTF-8,ASCII,JIS,EUC-JP,SJIS-WIN');
$schedule_data = json_decode($schedule_json);

$page = $model->set(array(
  'pickup'    => $pickup_data,
  'headline'  => $headline_data,
  'schedule'  => $schedule_data,
));

// app webview かを `?app=(ios|android)` から判定します
// ==============================
$from_webview = false;
if (isset($_GET['app'])) {
  if ($_GET['app'] == 'ios' || $_GET['app'] == 'android') {
    $from_webview = true;
  }
}

// template - テンプレート条件をハードコード
// ==============================
if ($page['template'] == '') {
  $page['template'] = 'motorsports';
}

// タイトル情報
$option_title = strtoupper($option_directory);
if ( $option_title == 'SGT' ) {
  $option_title = 'SuperGT';
}

// url 情報
// =============
$page["motorsports"] = array(
  'url'                => $option_directory,
  'label'              => 'モータースポーツ',
  'title'              => $option_title.' - モータースポーツ',
  'og_title'           => $option_title.' - モータースポーツ'.' | '.$page['site_name'],
  'keywords'           => $option_title.',モータースポーツ,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
  'og_description'     => $option_title.' - モータースポーツ情報見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
  'og_url'             => $page['og_url'].'motorsports/'.$option_directory.'/',
  'og_image'           => $page['og_url'].'assets/images/motorsports/og_image_'.$option_directory.'.jpg',
);

// render
// ==============================
// $model->property('ua_device') = mobile | tablet | desktop
$mobile_device = false;
if ( $model->property('ua_device') === 'mobile' ) :

  // SP:
  $mobile_device = true;
  include_once __DIR__ . '/' . $option_directory . '/view_sp.php';

else :

  // PC版
  include_once __DIR__ . '/' . $option_directory . '/view_desktop.php';

endif;

// 確認用dumpデータ - テンプレ組み込みおわったら削除
// =======================================================================
//print_r($page['schedule']);