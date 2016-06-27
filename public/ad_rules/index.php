<?php

header("Content-Type: application/xml; charset=UTF-8");

// タイムスタンプ設定
// ------------------------------
if ( isset($_GET['page']) ) :
  $timestamp = intval($_GET['page'], 10);
else :
  $timestamp = time();
endif;


// デバイスカテゴリー
// ------------------------------
$cat = 'undo.SP';
if ( isset($_GET['cat']) ) :
  if ( $_GET['cat'] == 'PC' ) :
    $cat = 'undo.PC';
  endif;
endif;

// フォーマット設定
// ------------------------------
if ( isset($_GET['format']) ) :

  // pre-roll
  if ( $_GET['format'] == 'pre-roll' ) :

    $ad_rule = <<<__EOL__

      <vmap:AdBreak timeOffset="start" breakType="linear" breakId="pre-roll">
        <vmap:AdSource id="pre-roll" allowMultipleAds="false" followRedirects="true">
          <vmap:AdTagURI templateType="vast3">
            <![CDATA[https://web-jp.ad-v.jp/adam/inline?CE=0&cat={$cat}&format=pre-roll&page={$timestamp}]]>
          </vmap:AdTagURI>
        </vmap:AdSource>
      </vmap:AdBreak>

__EOL__;
  endif;

  // mid-roll
  if ( $_GET['format'] == 'mid-roll' ) :

    $ad_rule = <<<__EOL__

      <vmap:AdBreak timeOffset="00:00:10.000" breakType="linear" breakId="mid-roll">
        <vmap:AdSource id="midr-oll" allowMultipleAds="false" followRedirects="true">
          <vmap:AdTagURI templateType="vast3">
            <![CDATA[https://web-jp.ad-v.jp/adam/inline?CE=0&cat={$cat}&format=mid-roll-1&page={$timestamp}]]>
          </vmap:AdTagURI>
        </vmap:AdSource>
      </vmap:AdBreak>

__EOL__;
  endif;

  // post-roll
  if ( $_GET['format'] == 'post-roll' ) :

    $ad_rule = <<<__EOL__

    <vmap:AdBreak timeOffset="end" breakType="linear" breakId="post-roll">
      <vmap:AdSource id="post-roll" allowMultipleAds="false" followRedirects="true">
        <vmap:AdTagURI templateType="vast3">
            <![CDATA[https://web-jp.ad-v.jp/adam/inline?CE=0&cat={$cat}&format=post-roll&page={$timestamp}]]>
        </vmap:AdTagURI>
      </vmap:AdSource>
    </vmap:AdBreak>

__EOL__;
  endif;

else :

  $ad_rule == '';

endif;


// echo
// ------------------------------
echo <<<__EOL__
<vmap:VMAP xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">
{$ad_rule}
</vmap:VMAP>
__EOL__;

?>