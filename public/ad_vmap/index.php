<?php
/*

# ad_vmap

VASTタグをGoogle IMA準拠のVMAPフォーマットにコンバートする

ref. https://docs.google.com/spreadsheets/d/1qbuCw6mWQOBzrUBk2lUnDPLbtWWxgHYZRvJjTQBj-Zg/edit#gid=1084766408


# 想定リクエストURL

https://sportsbull.jp/ad_vmap/?position={$position}&timeOffset=10&source={$ad_url}
=> {$adtag url} にパラメータの値を踏襲してアクセス

ex.
https://sportsbull.jp/ad_vmap/?position=post-roll&source=https://web-jp.ad-v.jp/adam/inline?CE=0&cat=undo.SP.CRAZY_vol_8_4&format=post-roll&page=[timestamp]

*/

header("Content-Type: application/xml; charset=UTF-8");

// タイムスタンプ設定
// ==============================
$timestamp = time();

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

$ad_url == '';

if ( isset($_GET['source']) ) :

  $url    = explode('source=', $_SERVER['QUERY_STRING']);
  $url    = $url[1];

  // [timestamp] : brightcove / cci 用の乱数
  $url    = str_replace('[timestamp]', $timestamp, $url);
  // correlator : DFP用の乱数
  $ad_url = "<![CDATA[{$url}&correlator={$timestamp}]]>";

endif;

// play position
// ==============================
if ( $position == 'pre-roll' ) :

    $ad_rule = <<<__EOL__

      <vmap:AdBreak timeOffset="start" breakType="linear" breakId="pre-roll">
        <vmap:AdSource id="pre-roll" allowMultipleAds="false" followRedirects="true">
          <vmap:AdTagURI templateType="vast3">
            {$ad_url}
          </vmap:AdTagURI>
        </vmap:AdSource>
      </vmap:AdBreak>

__EOL__;
endif;


if ( $position == 'mid-roll' ) :

    $ad_rule = <<<__EOL__

      <vmap:AdBreak timeOffset="00:00:{$timeOffset}" breakType="linear" breakId="mid-roll">
        <vmap:AdSource id="midr-oll" allowMultipleAds="false" followRedirects="true">
          <vmap:AdTagURI templateType="vast3">
            {$ad_url}
          </vmap:AdTagURI>
        </vmap:AdSource>
      </vmap:AdBreak>

__EOL__;
endif;

if ( $position == 'post-roll' ) :

    $ad_rule = <<<__EOL__

    <vmap:AdBreak timeOffset="end" breakType="linear" breakId="post-roll">
      <vmap:AdSource id="post-roll" allowMultipleAds="false" followRedirects="true">
        <vmap:AdTagURI templateType="vast3">
          {$ad_url}
        </vmap:AdTagURI>
      </vmap:AdSource>
    </vmap:AdBreak>

__EOL__;
endif;


// echo
// ------------------------------
echo <<<__EOL__
<vmap:VMAP xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">
{$ad_rule}
</vmap:VMAP>
__EOL__;

?>