<?php
/**
 * BULL'S STATION / 番組ページの作成 #2259 - JSON
 * User: @taikiken
 * Date: 2017/08/24
 * Time: 19:34
 */

// ref: `/picks/index.php`
// ==============================
// vagrant forwarded_port - 8080ポートからのアクセスならローカル
if ( $_SERVER['SERVER_PORT'] == '8080' ) :
  define('BULLS_STATION_ENV', 'DEV');

elseif ( $_SERVER['SERVER_PORT'] == '8888' ) :
  define('BULLS_STATION_ENV', 'DEV');

else :

  switch( $_SERVER['SERVER_NAME'] ) :

    # vagrant - local IP
    case '192.168.33.50' :
      define('BULLS_STATION_ENV', 'DEV');
      break;

    # vagrant - hostname
    case 'undotsushin.local' :
    case 'sportsbull.local'  :
      define('BULLS_STATION_ENV', 'DEV');
      break;

    case 'dev.sportsbull.jp' :
      define('BULLS_STATION_ENV', 'DEV');
      break;

    # www -  〜 4/1 t2.small : 4/1 〜 production
    default :
      define('BULLS_STATION_ENV', 'PRODUCTION');

  endswitch;

//  # production以外の環境ではdisplay_errorsする
//  if ( $BULLS_STATION_ENV !== 'PRODUCTION' ) :
//    ini_set( 'display_errors', 1 );
//  endif;

endif;

// JSON 設定
// ==============================
// @see https://github.com/undotsushin/undotsushin/issues/2259#issuecomment-324579752
define('JSON_PHOTO', 'https://img.sportsbull.jp/json/181566.json');

if (BULLS_STATION_ENV == 'DEV') {
  define('JSON_MOVIE', 'https://dev.sportsbull.jp/api/v1/articles/video/station');
} else {
  define('JSON_MOVIE', 'https://sportsbull.jp/api/v1/articles/video/station');
}

// JSON 取得
// ==============================
/**
 * photo gallery JSON を取得します
 * - https://img.sportsbull.jp/json/181566.json
 * @return mixed
 */
function bulls_station_json_photo() {
  $data = file_get_contents(JSON_PHOTO);
  $decode = mb_convert_encoding($data, 'UTF8', 'UTF-8,ASCII,JIS,EUC-JP,SJIS-WIN');
  return json_decode($decode);
}

/**
 * offshot movie JSON を取得します
 * - dev: https://dev.sportsbull.jp/api/v1/articles/video/station
 * - www: https://sportsbull.jp/api/v1/articles/video/station
 * @return mixed
 */
function bulls_station_json_movie() {
  $data = file_get_contents(JSON_MOVIE);
  $decode = mb_convert_encoding($data, 'UTF8', 'UTF-8,ASCII,JIS,EUC-JP,SJIS-WIN');
  return json_decode($decode);
}
