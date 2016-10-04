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

    <div id="pickup-container"></div><!-- /pickup -->

    <section class="main-sec">
      <div class="headline-section">
        <div id="headline-container"></div>
        <div class="sponsor-link">
          <?php
          /*
           * @since 2016-10-03 差替え
           * @see https://github.com/undotsushin/undotsushin/issues/1125#issuecomment-251032265
           * <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35255&targetID=adg_35255&displayid=2&adType=INFEED&async=true&tagver=2.0.0"></script>
           */
          ?>
          <script src="http://i.socdm.com/sdk/js/adg-script-loader.js?id=42707&targetID=adg_42707&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
        </div>
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

