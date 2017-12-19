<?php
// ------------------------------------------------
// ホーム / 一面
// ------------------------------------------------
?>
<?php
// spにも pickup
// @since 2016-09-15 #1010, #1095
?>

<div class="body-sec">
  <div class="body-sec-inner">
    <?php
    // since 2017-12-18
    // お知らせ表示
    // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
    ?>
    <div id="js-announce-container"></div>
    <div id="pickup-container" style="height: 215px;"></div><!-- /pickup -->

    <section class="main-sec">
<?php
// https://github.com/undotsushin/undotsushin/issues/1210
// CMS から一面・すべてのバナーを設定できるようにする #1210
// @since 2016-11-02
include_once __DIR__ . '/_cms_banner.php';
?>
<?php
// 一面タブからの導線を増やす #2080
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
include_once __DIR__ . '/_stats_banner.php';
// ------------------------------------------------------------
?>
      <div class="headline-section">
        <div id="headline-container"></div>
        <?php
        /*
        // @since 2016-10-04
        // JS SPComponentHeadlines.js へ移動
        <div class="sponsor-link">
          <script src="http://i.socdm.com/sdk/js/adg-script-loader.js?id=42707&targetID=adg_42707&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
        </div>
        */
        ?>
      </div><!-- /.headline-outer -->

      <aside class="sns-pr">
        <div class="sns-pr-outer">
          <dl class="sns-pr-inner">
            <dt><span>いいねして最新ニュースをチェック！</span></dt>
            <dd>
              <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
            </dd>
          </dl><!-- /.sns-pr-inner -->
        </div><!-- /.sns-pr-outer -->
      </aside><!-- /.sns-pr -->

      <div class="latest-section">
        <div id="board-container"></div>
        <div id="board-container-more"></div>
      </div>
    </section>
  </div>
</div><!-- /.body-sec -->

