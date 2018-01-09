<?php
/**
 * 平昌2018 メダル
 * ref: UNDO_SPBL-292 【バックエンド】平昌オリンピック対応 - メダルCMS、API作成 - https://aws-plus.backlog.jp/view/UNDO_SPBL-292
 * https://dev-img.sportsbull.jp/static/pyeongchang/medal.json
 * `{"update":"2018-02-14 13:08","medal":{"gold":10,"silver":99,"bronze":25}`
 * Date: 2018/01/09
 * Time: 15:13
 */
?>
<?php
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

endif;
// JSON 取得する
$medals_json_path = BULLS_STATION_ENV == 'DEV' ?
  'https://dev-img.sportsbull.jp/static/pyeongchang/medal.json' :
  'https://img.sportsbull.jp/static/pyeongchang/medal.json';


$data = file_get_contents($medals_json_path);
if (!isset($data)) {
  exit;
}
$encoded = mb_convert_encoding($data, 'UTF8', 'UTF-8,ASCII,JIS,EUC-JP,SJIS-WIN');
$decoded = json_decode($encoded);
if (!isset($decoded->update) || !isset($decoded->medal) || !isset($decoded->medal->gold) || !isset($decoded->medal->silver) || !isset($decoded->medal->bronze)) {
  exit;
}
?>

<div>
  medal
  <p>update: <?php echo $decoded->update; ?></p>
  <p>gold: <?php echo $decoded->medal->gold; ?></p>
  <p>silver: <?php echo $decoded->medal->silver; ?></p>
  <p>bronze: <?php echo $decoded->medal->bronze; ?></p>
</div>
