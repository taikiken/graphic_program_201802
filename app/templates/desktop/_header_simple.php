<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">


<?php include_once __DIR__."/../_head.php"; ?>


  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php include_once __DIR__.'/../_head_bottom.php'; ?>

<?php
// ---------------------------------------------------------------------------
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
if ( $page['template'] == 'p' && $page['category']['slug'] != 'soccer' ) :
  // brightcove code をここに
  // JS で非同期で読み込むと付随コードの読み込みが行われない様子
?>
  <style>
    body.vjs-full-window {
      padding: 0;
      margin: 0;
      height: 100%;
    }
    .video-js.vjs-fullscreen {
      position: fixed;
      overflow: hidden;
      z-index: 1000;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100% !important;
      height: 100% !important;
    }
    .video-js:-webkit-full-screen {
      width: 100% !important;
      height: 100% !important;
    }
    .video-js.vjs-fullscreen.vjs-user-inactive {
      cursor: none;
    }
  </style>

  <link href="//vjs.zencdn.net/5.3/video-js.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ads.css" />
  <link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ima.css" />
  <link rel="stylesheet" href="/assets/ima_plugin/css/ima-style.css" />

  <script src="//vjs.zencdn.net/5.3/video.min.js"></script>
  <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>

  <script src="/assets/js/libs/hls/videojs-contrib-hls.min.js"></script>
  <script src="/assets/ima_plugin/js/videojs.hls.js"></script>
  <script src="/assets/ima_plugin/js/videojs.ads.js"></script>
  <script src="/assets/ima_plugin/js/videojs.ima.js"></script>

  <style type="text/css">
    #mainContainer{
      border: 1px #fff solid;
      box-sizing: border-box;
      overflow: hidden;
      padding: 0;
      margin: 0;
      padding-top: 30px;
      position: relative;
      width:100%;
    }
    #single-visual-container{
      box-sizing: border-box;
    }
    .vjs-poster{
      display: none !important;
    }
    .video-js{
      background-color: #fff !important;
    }
    .vjs-big-play-button{
      z-index: 9999;
    }
  </style>
<?php
 endif;
// eof brightcove
// ---------------------------------------------------------------------------

// header 表示条件 & template_classname に使用する template 名称を $template_name へ
$template_name = $page['template'];

// .whole へ追加する CSS class を設定します
$whole_classes = array();

// $page['template_classname'] に設定されている CSS class を追加します
if ( !empty( $page['template_classname'] ) ) {
  $whole_classes[] = $page['template_classname'];
}
// 記事詳細
if ( $template_name == 'p' ) {

  // 記事詳細へ識別 CSS class 追加
  $whole_classes[] = 'post-single';

  // theme 設定 class を追加
  // JSON レスポンスの theme.base を CSS class へ追加します
  if ( $page['theme']['base'] ) {
    $whole_classes[] = $page['theme']['base'];
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
} elseif ( $template_name == 'search' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'layout-list';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'index' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'home';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'p' ) {
  // @since 2016-09-30
  $whole_classes[] = 'layout-detail';
}
?>
</head>
<body>
<div id="whole" class="whole <?php echo join( ' ', $whole_classes);?>">
<?php
// header 表示条件
if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
  $template_name == 'search' ||
  $template_name == 'settings' ||
  $template_name == 'settings.social' ||
  $template_name == 'settings.account' ||
  $template_name == 'settings.interest' ||
  $template_name == 'settings.deactivate' ||
  $template_name == 'mypage' ||
  $template_name == 'mypage.activities' ||
  $template_name == 'notifications' ||
  $template_name == 'logout'
) :
?>
  <header id="header-container" class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">スポーツブル（スポブル）</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <?php /* グローバルナビ不要
  <nav id="global-nav-container" class="gnav-sec">
    <ul>
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
  </nav><!-- /.gnav-sec -->
  */?>

  <?php /*

  #205 - backend フラッシュメッセージ対応完までview側の表示コメントアウト

  <div id="dialogue-notice" class="dialogue-notice">
    <div class="dialogue-notice-inner">
      <div id="dialogue-notice-info" class="dialogue-notice-info">
        <p>パスワードが違います</p>
      </div>
      <div id="dialogue-notice-btn-close" class="dialogue-notice-btn-close"><a href="#dialogue-notice">CLOSE</a></div>
    </div>
  </div><!-- /.dialogue-notice -->

  */?>
<?php
endif;
// header 表示条件 end
?>
