<?php
/**
 * パラボード 設定
 * @since 2018-01-30
 */

// 動作環境取得
// ==============================
// vagrant forwarded_port - 8080ポートからのアクセスならローカル
if ( $_SERVER['SERVER_PORT'] == '8080' ) :
  define('BULLS_STATION_ENV', 'LOCAL');

elseif ( $_SERVER['SERVER_PORT'] == '8888' ) :
  define('BULLS_STATION_ENV', 'LOCAL');

else :

  switch( $_SERVER['SERVER_NAME'] ) :

    # vagrant - local IP
    case '192.168.33.50' :
      define('BULLS_STATION_ENV', 'LOCAL');
      break;

    # vagrant - hostname
    case 'undotsushin.local' :
    case 'sportsbull.local'  :
      define('BULLS_STATION_ENV', 'LOCAL');
      break;

    case 'dev.sportsbull.jp' :
      define('BULLS_STATION_ENV', 'DEV');
      break;

    # www -  〜 4/1 t2.small : 4/1 〜 production
    default :
      define('BULLS_STATION_ENV', 'PRODUCTION');

  endswitch;

endif;

// API 一覧
// ==============================
// パラボードで使用する大会の一覧を取得する
//` /recent` が直近の絞り込み
// `/{sport_id}{year}` がスポーツと西暦での絞り込み
define('COMPETITION_RECENT', '/api/v1/competition_list/recent');
define('COMPETITION_RECENT_ID_YEAR', '/api/v1/competition_list/');
// パラボード 大会一覧ページのプルダウンに使用する
define('COMPETITION_PULL_DOWN', '/api/v1/competition_pulldown');
// パラボード 大会概要ページの情報を取得する
define('COMPETITION_OUTLINE', '/api/v1/competition/');

// API 取得 METHOD
// ==============================
function hostname() {
  return BULLS_STATION_ENV == 'LOCAL' ? 'https://dev.sportsbull.jp' : 'https://' . $page['hostname'];
}

// ------------------------
// API PATH
// パラボードで使用する大会の一覧を取得する
function api_recent() {
  return hostname() . COMPETITION_RECENT;
}

// スポーツと西暦での絞り込み
function api_recent_id_year($sport_id, $year) {
  $path = hostname() . COMPETITION_RECENT_ID_YEAR . $sport_id;
  if ( !empty( $year ) ) {
    $path .= '/' . $year;
  }
  return $path;
}

// パラボード 大会一覧ページのプルダウンに使用する
function api_pull_down() {
  return hostname() . COMPETITION_PULL_DOWN;
}

// パラボード 大会概要ページの情報を取得する
function api_outline() {
  return hostname() . COMPETITION_OUTLINE;
}

// ------------------------
// API PATH - get data

// JSON decode します
function data_decode($result) {
  return $result ? json_decode($result, true) : null;
}

// パラボードで使用する大会の一覧を取得する
function get_recent() {
  return data_decode( file_get_contents( api_recent() ) );
}

// スポーツと西暦での絞り込み
function get_recent_id_year($sport_id = 0, $year = '') {
  return data_decode( file_get_contents( api_recent_id_year( $sport_id, $year ) ) );
}

// パラボード 大会一覧ページのプルダウンに使用する
function get_pull_down() {
  return data_decode( file_get_contents( api_pull_down() ) );
}

// パラボード 大会概要ページの情報を取得する
function get_outline() {
  return data_decode( file_get_contents( api_outline() ) );
}
