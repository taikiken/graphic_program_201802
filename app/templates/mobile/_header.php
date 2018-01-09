<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">


<?php include_once __DIR__."/../_head.php"; ?>

    <?php if(count($page['photo']) > 0):?>

        <link rel="stylesheet" href="/assets/css/style_sp.css?v=<?php echo $page['version']; ?>">
        <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
    <?php endif;?>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <?php
  // header 表示条件 設定
  $template_name = $page['template'];

  $page_has_header = false;

  if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
  $template_name == 'comment' ||
  $template_name == 'search' ||
  $template_name == 'signup_login' ||
  $template_name == 'settings' ||
  $template_name == 'settings.social' ||
  $template_name == 'settings.account' ||
  $template_name == 'settings.interest' ||
  $template_name == 'settings.deactivate' ||
  $template_name == 'mypage' ||
  $template_name == 'mypage.activities' ||
  $template_name == 'notifications' ||
  $template_name == 'logout' ||
  $template_name == 'crazy'
  ) {
    $page_has_header = true;
  }
  ?>
<?php
if ($page_has_header) :
# ---------------------------------------------------------------------------
# Syn. require module
?>
<script src="/assets/sp/js/libs/synapse/synapse.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/sp/js/libs/synapse/extras/jquery.inview.js?v=<?php echo $page['version']; ?>"></script>
<?php
# end of Syn. require module
# ---------------------------------------------------------------------------
endif;
?>
<?php
// app webview を UA 判定する JS を追加します - `app_ua_detector.bundle.js`
// @since 2017-08-21
?>
<script src="/assets/js/app_ua_detector.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <?php
  /*
   Syn. menu end point 本番環境では
    ```
    /assets/js/bundle/main.bundle.js?syn=1
    ```
    ?syn=1 を削除してください
    テストの時はつけてください
   */
  ?>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php include_once __DIR__.'/../_head_bottom.php'; ?>

<?php
// ---------------------------------------------------------------------------
// brightcove

// @since 2016-11-13
// 記事詳細・次の記事一覧のメインビジュアルを動画に変更
// 常に videojs 関連を読込む
//if ( $page['template'] == 'p' ) :

// @since 2016-01-13
// hotfix @see https://github.com/undotsushin/undotsushin/issues/1468
//if ( $page['template'] == 'p' && $page['post']['media']['video']['player'] == 'brightcove' ) :
// @since 2016-01-13
// hotfix だと記事一覧の動画が再生できない
// 記事詳細かつサッカーカテゴリーではない -> ファイル読み込む
// @see https://undo-tsushin.slack.com/archives/product-web/p1484298774000116
if ( $page['template'] == 'p'
  && $page['category']['slug'] != 'soccer'
  && $page['post']['media_vk_refid'] == ''
) :
  // brightcove code をここに
  // JS で非同期で読み込むと付随コードの読み込みが行われない様子
  ?>
  <link href="//vjs.zencdn.net/5.3/video-js.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ads.css" />
  <link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ima.css" />
  <link rel="stylesheet" href="/assets/ima_plugin/css/ima-style.css" />

  <script src="//vjs.zencdn.net/5.3/video.min.js"></script>
  <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>

  <script src="/assets/ima_plugin/js/videojs.hls.js"></script>
  <script src="/assets/ima_plugin/js/videojs.ads.js"></script>
  <script src="/assets/ima_plugin/js/videojs.ima.js"></script>

  <?php
elseif($page['category']['slug'] == 'crazy'):
    ?>
<link rel="stylesheet" href="/assets/css/crazy.css">
<?php
elseif($page['template'] == 'crazy'):
?>
<link rel="stylesheet" href="/assets/css/player.css">
    <?php
endif;
// eof brightcove
// ---------------------------------------------------------------------------

// .whole へ追加する CSS class を設定します
$whole_classes = array();

// $page['template_classname'] に設定されている CSS class を追加します
if ( !empty( $page['template_classname'] ) ) {
  $whole_classes[] = $page['template_classname'];
}
// 記事詳細
if ( $page['template'] == 'p' || $page['template'] == 'comment') {
  // 記事詳細へ識別 CSS class 追加
  $whole_classes[] = 'post-single';

  // theme 設定 class を追加
  // JSON レスポンスの theme.base を CSS class へ追加します
  if ( $page['theme' ]['base'] ) {
    $whole_classes[] = ['theme']['base'];
  }
}

// in category
if ( $template_name == 'category' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'layout-list';
  // ---[end 2016-09-01]---

  // template_classname があれば
  if ( !empty($page['template_classname']) && !in_array($page['template_classname'], $whole_classes) ) {
    $whole_classes[] = $page['template_classname'];
  }

  // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
  // @since 2017-05-08 - category slug を追加する
  $whole_classes[] = $page['category']['slug'];
} elseif ( $template_name == 'index' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'home';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'p' ) {
  // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
  // @since 2017-05-08 - category slug を追加する
  $whole_classes[] = $page['category']['slug'];
}
?>


<?php // #1860 記事詳細アンカー広告
if ( $page['template'] == 'p' || $page['template'] == 'comment') :
  if ( $page['post']['is_sponserd'] === false ) :
    echo <<<__EOL__
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-8613117509675807",
    enable_page_level_ads: true
  });
</script>
__EOL__;
  endif;
endif;
?>


</head>
<body>
<div id="page" class="whole <?php echo join( ' ', $whole_classes);?>">
<?php
// header 表示条件 start
if ( $page_has_header ) :
?>
<div id="js-header-appbnr-container">
  <div class="header-appbnr">
    <?php
    if (0) :
      // close トル - https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-331796551
      // since 2017-05-25
    ?>
    <div class="header-appbnr-btn-close"><span>閉じる</span></div>
    <?php
    endif;
    // eof: close トル
    ?>
    <div class="header-appbnr-link">
      <?php
      // banner 差替え
      // @see https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-331796551
      ?>
      <!-- /531683568/download-popup/download-header-big-banner -->
      <script>
        googletag.cmd.push(function() {
          googletag.defineSlot('/531683568/download-popup/download-header-big-banner', [320, 50], 'div-gpt-ad-1506323101947-0').addService(googletag.pubads());
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
      </script>
      <div id='div-gpt-ad-1506323101947-0' style='height:50px; width:320px;'>
        <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1506323101947-0'); });
        </script>
      </div>
      <!-- // /531683568/download-popup/download-header-big-banner -->
    </div><!-- /.header-appbnr-link -->
  </div><!-- /.header-appbnr -->
</div>
<div class="header-sticky">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="https://app.adjust.com/y06cg3?deep_link=sportsbull://action?url=https%3A%2F%2Fsportsbull.jp%2F">スポーツブル（スポブル）</a></h1>

      <div id="menu-opener" class="menu-opener">
        <a id="side-menu-toggle" href="#side-menu-container"><span></span><span></span><span></span></a>
      </div>

      <aside class="f-right clearfix">
        <span id="search-container-opener"></span>

        <div id="user-profile-container"></div><!--/.user-profile-container-->
      </aside>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <div id="head-search-container"></div>
  <nav id="global-nav-container" class="gnav-sec">
    <div id="gnav-sec-inner" class="gnav-sec-inner">
      <ul id="gnav-sec-list">
        <li id="home" class="gnav-home"><a href="/">一面</a></li>

        <?php foreach( $page['site_categories'] as $category ) {
          // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616
          // タブの表示順はAPI通りにする
          ?>
          <li id="<?php echo $category['slug']; ?>" class="gnav-<?php echo $category['slug']; ?>">
            <a href="/category/<?php echo $category['slug']; ?>/"><?php echo $category['label']; ?></a>
          </li>
        <?php }//foreach ?>
      </ul>
    </div><!-- /.gnav-sec-inner -->
  </nav><!-- /.gnav-sec -->
<?php /*

  #205 - backend フラッシュメッセージ対応完までview側の表示コメントアウト

  <div class="dialogue-notice error">
    <div class="dialogue-notice-inner">
      <div class="dialogue-notice-info">
        <p>パスワードが違います</p>
      </div>
      <div class="dialogue-notice-btn-close"><a href="#">CLOSE</a></div>
    </div>
  </div><!-- /.dialogue-notice -->
*/?>
</div><!--/.header-sticky-->
<?php
endif;
// header 表示条件 end
?>
