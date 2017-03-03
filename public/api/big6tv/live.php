<?php
/*

# big6tv - ライブ配信

refs. /undotsushin/app/templates/big6tv/desktop/index.php

※ 現状以下のレスポンスは使っていないです。
実データは `.htaccess` のリライトを参考にしてください

*/

include "local.php";


// ダミーpolling用
// 5分で割り切れる分数の時はfalse
$now = intval(date('i'));
if ( ( $now % 5 ) == 0 ) :
  $isPlaying = false;
else :
  $isPlaying = true;
endif;

$live = array(
  'isPlaying' => $isPlaying,

  'video'     => array(
    'source' => 'http://cdn3.viblast.com/streams/hls/airshow/playlist.m3u8',
    'ad'     => 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&pod=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&cust_params=deployment%3Ddevsite%26sample_ar%3Dpreonly&url=https://developers.google.com/interactive-media-ads/docs/sdks/html5/tags&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0',
  ),

  'iframe'    => '<iframe width="560" height="315" src="https://www.youtube.com/embed/wmvl70hTBxk" frameborder="0" allowfullscreen></iframe>',

  'alt' => array(
    "large"  => 'http://placehold.it/1600x900',
    "medium" => 'http://placehold.it/800x450',
  ),

);


$result   = array(
  'response' => array(
    'lastupdate' => date('Y-m-d H:i:s'),
    'live' => $live,
  )
);


// print
// ------------------------------
print_json($result,$_SERVER['HTTP_REFERER']);


?>