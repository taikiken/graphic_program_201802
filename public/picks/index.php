<?php

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

$page = $model->set(array(
  'og_title' => 'BULL\'S PICKS 編集部おすすめ記事',
  'og_type'  => 'article',
));


// 記事データ取得
// ==============================

//include_once __DIR__.'/data.php';
//
//foreach( $articles as $key => $value ) :
//
//  $articles[$key]['post'] = $model->get_post($value['id']);
//
//  // いらないデータ消す
//  unset($articles[$key]['post']['ad']);
//  unset($articles[$key]['post']['banner']);
//  unset($articles[$key]['post']['recommend_articles']);
//  unset($articles[$key]['post']['related_articles']);
//  unset($articles[$key]['post']['body']);
//
//endforeach;


// xml ファイルを読み込む
// ==============================

// host 設定
// @see https://github.com/undotsushin/undotsushin/issues/1426#issuecomment-272060174
// - 開発 : https://dev-img.sportsbull.jp/xml/picks.xml
// - 公開 : https://img.sportsbull.jp/xml/picks.xml

// @since 2017-01-24
// @see https://github.com/undotsushin/undotsushin/issues/1426
// @see https://github.com/undotsushin/undotsushin/issues/1464

// host name 取得
// local `https://dev.sportsbull.jp` それ以外空
$app_host_name = $page['apiRoot'];
// 空の時は `get_site_url` から取得する
if ($app_host_name == '') {
  // host name 取得
  $app_host_name = $model->get_site_url();
}
// host name から xml host name 設定
// default `https://img.sportsbull.jp` - 本番サーバー
$xml_host_name = 'https://img.sportsbull.jp';
// dev のみ `https://dev-img.sportsbull.jp` から取得
if ($app_host_name == 'https://dev.sportsbull.jp' || $app_host_name == 'https://dev.sportsbull.jp/') {
  $xml_host_name = 'https://dev-img.sportsbull.jp';
}

$xml_filename = 'picks.xml';
// stg file名称が違う
if ($app_host_name == 'https://stg.sportsbull.jp' || $app_host_name == 'https://stg.sportsbull.jp/') {
  $xml_filename = 'picks_stg.xml';
}

// xml data を設定する配列
$articles = array();

// path を設定し XML file を取得します
$xml_element = simplexml_load_file($xml_host_name . '/xml/' . $xml_filename);

// 日付: attributes から取得します
$xml_date_value = (string)$xml_element[0]->articles->attributes()->date;

// parse し $articles へセットし不要データは unset します
foreach ($xml_element as $xml_date) :

  foreach( $xml_date->article as $xml_article ) :
    $api_post_data = $model->get_post($xml_article->id);
    unset($api_post_data['ad']);
    unset($api_post_data['banner']);
    unset($api_post_data['recommend_articles']);
    unset($api_post_data['related_articles']);
    unset($api_post_data['body']);
    unset($api_post_data['description']);
    unset($api_post_data['body_escape']);
    $api_post_data['comment'] = $xml_article->comments->comment;
    $articles[]['post'] = $api_post_data;
  endforeach;

endforeach;


// $pageに渡したい値があればここに設定
// ==============================
$page = $model->set(array(
  'data'     => $articles,
));



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

//  echo 'PC版はホームにリダイレクト / SPでみてね';

  // あとでPC版つくるので302で
   header("Location: /",TRUE,302);
   exit;

endif;


// 確認用dumpデータ - テンプレ組み込みおわったら削除
//print_r($page);
//print_r($articles);
//print_r($xml_element[0]->articles);
