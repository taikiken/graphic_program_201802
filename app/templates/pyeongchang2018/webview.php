<?php
/**
 * mobile: pyeongchang2018 専用 template - `/pyeongchang2018/webview/`
 * User: @taikiken
 * Date: 2017/12/21
 * Time: 17:52
 * ref: UNDO_SPBL-291 【バックエンド】平昌オリンピック対応 - ルーティング
 */
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>"></script>
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <style>
    @media screen and (min-width:320px) {
      .pyeongchang2018-webview {
        /*height: 710px;*/
        height: 430px;
      }
    }

    @media screen and (min-width:321px) and ( max-width:375px) {
      .pyeongchang2018-webview {
        /*height: 752px;*/
        height: 415px;
      }
    }

    @media screen and (min-width:376px) {
      .pyeongchang2018-webview {
        /*height: 784px;*/
        height: 440px;
      }
    }
  </style>
</head>
<body>
<div class="whole pyeongchang2018 pyeongchang2018-webview">
  <?php
  // medals
  include_once __DIR__ . '/../pyeongchang2018/module/_pyeongchang2018_medals.php';
  ?>
  <?php
  /*
  ?>
  <div class="gallery--highlight">
    <header class="gallery__header">
      <h2 class="gallery__heading">ハイライト動画</h2>
      <p class="gallery__link"><a href="/pyeongchang2018/movie/">すべて見る</a></p>
    </header><!-- /.gallery__header -->

    <div id="Widget_articles_tag-1" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018ハイライト" data-offset="0" data-length="4"></div>
  </div><!-- /.gallery--highlight -->
  <?php
  */
  ?>
  <div class="gallery--photo">
    <header class="gallery__header">
      <h2 class="gallery__heading">フォトギャラリー</h2>
      <p class="gallery__link"><a href="/pyeongchang2018/photo/">すべて見る</a></p>
    </header><!-- /.gallery__header -->

    <div id="Widget_articles_tag-2" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018フォトギャラリー" data-offset="0" data-length="2"></div>
  </div><!-- /.gallery--photo -->
</div><!-- /.whole -->
<script src="/assets/widgets/articles-index/Widget_articles_tag.js?v=<?php echo $page['version']; ?>"></script>
</body>
</html>
