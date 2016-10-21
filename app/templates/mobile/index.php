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
      <div class="focus-bnr">
        <a href="https://sportsbull.jp/sokuhou/?utm_source=SPORTS%20BULL&utm_content=20161011&utm_campaign=sokuhou&utm_medium=banner"><img src="/assets/sp/images/dummy/bnr-sokuhou.png" alt="サッカー日本代表 リアルタイム速報 日本vsオーストラリア アジア最終予選"></a>
      </div><!-- /.focus-bnr -->

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

