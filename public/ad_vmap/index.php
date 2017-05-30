<?php
/*

# ad_vmap

VASTタグをGoogle IMA準拠のVMAPフォーマットにコンバートする
ref. https://docs.google.com/spreadsheets/d/1qbuCw6mWQOBzrUBk2lUnDPLbtWWxgHYZRvJjTQBj-Zg/edit#gid=1084766408

# 想定リクエストURL

https://sportsbull.jp/ad_vmap/?position={$position}&timeOffset=10&source={$ad_url}
- {$position}   : pre-roll | mid-roll | post-roll
- {$timeOffset} : mid-roll の場合の再生開始秒数 max 60秒
- {$ad_url}     : 広告タグURL
  - [timestamp] : 乱数に置き換わる部分
  - [referer]   : https://sportsbull.jp/?ad_vmap='.$timestamp に置き換わる

※ timestampに該当する部分は必ずURL末のパラメータに指定する
NG : https://sportsbull.jp/ad_vmap/?〜rand=[timestamp]&REFURL=http://dev.sportsbull.jp/p/129693/
OK : https://sportsbull.jp/ad_vmap/?〜&REFURL=http://dev.sportsbull.jp/p/129693/&rand=[timestamp]

ex. Advantage - post-roll
https://sportsbull.jp/ad_vmap/?position=post-roll&source=https://web-jp.ad-v.jp/adam/inline?CE=0&cat=undo.SP.CRAZY_vol_8_4&format=post-roll&page=[timestamp]&REFURL=[referer]

ex. DFP - preroll
https://sportsbull.jp/ad_vmap/?https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=[timestamp]

ex. BEYOND X
https://sportsbull.jp/ad_vmap/?source=https://req.tidaltv.com/vmm.ashx?mt=1&xf=35&pid=1&fmid=425759&logs=0&REFURL=https://sportsbull.jp/p/129693/&rand=[timestamp]


*/

header("Content-Type: application/xml; charset=UTF-8");

// タイムスタンプ設定
// ==============================
$timestamp = time();


// リファラデフォルト設定
// ==============================
$referer = 'https://sportsbull.jp/?ad_vmap='.$timestamp;


// フォーマット設定
// ==============================
if ( isset($_GET['position']) ) :
  $position = $_GET['position'];
else :
  $position = 'pre-roll' ;
endif;


// offset設定
// ==============================
if ( isset($_GET['timeOffset']) && is_numeric($_GET['timeOffset']) ) :

  # 小数点3桁までの数字に変換
  $time       = number_format(floatval($_GET['timeOffset']), 3, '.', '');

  # 秒部分は2桁処理する
  $timeArray  = explode('.', $time);
  $timeOffset = sprintf('%02d', $timeArray[0]).'.'.$timeArray[1];

else :
  $timeOffset = 10.000;
endif;


// ad_url
// ==============================

$ad_url = '';

if ( isset($_GET['source']) ) :

  $url    = explode('source=', $_SERVER['QUERY_STRING']);
  $url    = $url[1];

  // [timestamp] : brightcove / cci 用の乱数
  $url    = str_replace('[timestamp]', $timestamp, $url);

  // [referer] : リファラの置き換え
  $url    = str_replace('[referer]', $referer, $url);

  $ad_url = "<![CDATA[{$url}]]>";

endif;


// ad_rule
// ==============================

$ad_rule = '';

if ( $position == 'pre-roll' ) :

    $ad_rule = <<<__EOL__

      <vmap:AdBreak timeOffset="start" breakType="linear" breakId="pre-roll">
        <vmap:AdSource id="pre-roll" allowMultipleAds="false" followRedirects="true">
          <vmap:AdTagURI templateType="vast3">{$ad_url}</vmap:AdTagURI>
        </vmap:AdSource>
      </vmap:AdBreak>

__EOL__;
endif;


if ( $position == 'mid-roll' ) :

    $ad_rule = <<<__EOL__

      <vmap:AdBreak timeOffset="00:00:{$timeOffset}" breakType="linear" breakId="mid-roll">
        <vmap:AdSource id="midr-oll" allowMultipleAds="false" followRedirects="true">
          <vmap:AdTagURI templateType="vast3">{$ad_url}</vmap:AdTagURI>
        </vmap:AdSource>
      </vmap:AdBreak>

__EOL__;
endif;

if ( $position == 'post-roll' ) :

    $ad_rule = <<<__EOL__

    <vmap:AdBreak timeOffset="end" breakType="linear" breakId="post-roll">
      <vmap:AdSource id="post-roll" allowMultipleAds="false" followRedirects="true">
        <vmap:AdTagURI templateType="vast3">{$ad_url}</vmap:AdTagURI>
      </vmap:AdSource>
    </vmap:AdBreak>

__EOL__;
endif;


if ( $ad_rule ) :

echo <<<__EOL__
<vmap:VMAP xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">
{$ad_rule}
</vmap:VMAP>
__EOL__;

endif;


?>