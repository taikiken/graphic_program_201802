<div id="pickup-container"></div><!-- /pickup -->

<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
<?php
// https://github.com/undotsushin/undotsushin/issues/1210
// CMS から一面・すべてのバナーを設定できるようにする #1210
// @since 2016-11-02
include_once __DIR__ . '/_cms_banner.php';
?>

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
      <div id="sidebar-moving-container">

        <?php include_once __DIR__."/_sidebar_ad.php"; ?>

        <div id="widget-ranking-container-2"></div><!--/ranking-->

        <div id="widget-recommend-container-2"></div><!--/videos-->

      </div><!--/#sidebar-moving-->
    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->
