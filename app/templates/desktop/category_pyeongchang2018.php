<?php
/**
 * desktop: pyeongchang2018 専用 category template
 * User: @taikiken
 * Date: 2017/12/21
 * Time: 17:43
 * ref: UNDO_SPBL-291 【バックエンド】平昌オリンピック対応 - ルーティング
 * ref: UNDO_SPBL-293 【ウェブ】平昌オリンピック対応 - ページ作成
 */
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'/_category-heading.php';
?>
<div class="body-sec">

  <div class="body-sec-inner">
    <section class="main-sec">

      <?php
      // medals
      include_once __DIR__ . '/../pyeongchang2018/module/_pyeongchang2018_medals.php';
      ?>

      <div class="gallery--highlight">
        <header class="gallery__header">
          <h2 class="gallery__heading">ハイライト動画</h2>
          <p class="gallery__link"><a href="hoge">すべての動画を見る</a></p>
        </header><!-- /.gallery__header -->

        <div id="Widget_articles_tag-1" class="Widget_articles_tag" data-style="video" data-tag="平昌五輪2018ハイライト" data-offset="0" data-length="4"></div>
      </div><!-- /.gallery--highlight -->

      <div class="gallery--photo">
        <header class="gallery__header">
          <h2 class="gallery__heading">フォトギャラリー</h2>
          <p class="gallery__link"><a href="hoge">すべてのフォトギャラリーを見る</a></p>
        </header><!-- /.gallery__header -->

        <div id="Widget_articles_tag-2" class="Widget_articles_tag" data-style="photo" data-tag="平昌五輪2018フォトギャラリー" data-offset="0" data-length="4"></div>
      </div><!-- /.gallery--photo -->

      <div class="headline">
        <div class="headline-outer">
          <div id="headline-container"></div><!-- /headline -->
          <?php
          /*
           // ComponentHeadlines.js へ移動
          ?>
          <div class="sponsor-link">
            <!--
            株式会社運動通信社 運動通信_PC_WEB_デスクトップ - 一面 - ヘッドライン下部 39882
            -->
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=34481&targetID=adg_34481&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>
          <?php
          */
          ?>
        </div><!-- /.headline-outer -->
      </div><!-- /.headline -->

      <aside class="sns-pr">
        <dl class="sns-pr-inner">
          <dt>
          <p><img src="/assets/images/index/sns-pr-logo.png" alt="SPORTS BULL"><span>を<strong>いいね</strong>して最新ニュースをチェック！</span></p>
          </dt>
          <dd>
            <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
          </dd>
        </dl><!-- /.sns-pr-inner -->
      </aside><!-- /.sns-pr -->

      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php
      // `/category/pyeongchang2018/` - 広告表示しない
      global $on_pyeongchang2018;
      $on_pyeongchang2018 = true;
      ?>
      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->
  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<script src="/assets/widgets/articles-index/Widget_articles_tag.js"></script>