<?php
/**
 * desktop: pyeongchang2018 専用 template - `/pyeongchang2018/photo/`
 * User: @taikiken
 * Date: 2017/12/21
 * Time: 17:52
 * ref: UNDO_SPBL-291 【バックエンド】平昌オリンピック対応 - ルーティング
 */
?>
<?php
// 汎用 header
include_once __DIR__."/../../desktop/_header.php";
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'../../desktop/_category-heading.php';
?>

<div class="body-sec">

  <div class="special-summary">
    <h1 class="special-summary-heading"><img src="/assets/images/pyeongchang2018/special-summary.jpg" alt="平昌五輪"></h1>
  </div><!-- /.special-summary -->

  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="sponsor-link">
        <!-- /531683568/pyeongchang_ad/pyeongchang_pc_bigbanner1 -->
        <script>
          googletag.cmd.push(function() {
            googletag.defineSlot('/531683568/pyeongchang_ad/pyeongchang_pc_bigbanner1', [728, 90], 'div-gpt-ad-1515757963600-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        </script>
        <div id='div-gpt-ad-1515757963600-0' style='height:90px; width:728px;'>
        <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515757963600-0'); });
        </script>
        </div>
        <!-- // /531683568/pyeongchang_ad/pyeongchang_pc_bigbanner1 -->
      </div><!-- /.sponsor-link -->

      <div class="board-large">

        <div class="gallery--photo">
          <header class="gallery__header">
            <h2 class="gallery__heading">フォトギャラリー</h2>
            <p class="gallery__date">2018年2月9日 - 25日</p>
          </header><!-- /.gallery__header -->

          <div id="Widget_articles_tag-2" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018フォトギャラリー" data-offset="0" data-length="9999"></div>
        </div>
      </div><!-- /.board-large -->

      <div class="sponsor-link">
        <!-- /531683568/pyeongchang_ad/pyeongchang_pc_bigbanner2 -->
        <script>
          googletag.cmd.push(function() {
            googletag.defineSlot('/531683568/pyeongchang_ad/pyeongchang_pc_bigbanner2', [728, 90], 'div-gpt-ad-1515757998552-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        </script>
        <div id='div-gpt-ad-1515757998552-0' style='height:90px; width:728px;'>
        <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515757998552-0'); });
        </script>
        </div>
        <!-- // /531683568/pyeongchang_ad/pyeongchang_pc_bigbanner2 -->
      </div><!-- /.sponsor-link -->

      <div id="js-headline"></div>

      <?php
      // medals
      include_once __DIR__ . '/../module/_pyeongchang2018_medals.php';
      ?>
      <?php
        // https://aws-plus.backlog.jp/view/UNDO_SPBL-296#comment-1187520933
        // リリース時にタブとWebViewのハイライトブロックを、非表示
      ?>
      <div class="gallery--highlight">
        <header class="gallery__header">
          <h2 class="gallery__heading">ハイライト動画</h2>
          <p class="gallery__link"><a href="/pyeongchang2018/movie/">すべての動画を見る</a></p>
        </header><!-- /.gallery__header -->

        <div id="Widget_articles_tag-1" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018ハイライト" data-offset="0" data-length="4"></div>
      </div><!-- /.gallery--highlight -->
      <?php
      // トルツメ解除 - UNDO_SPBL-436 【課題管理】【バックエンド】【WEB】平昌オリンピック コンテンツ制作 : リリース後対応
      // ----
      ?>
      <div class="sponsor-link column2">
        <div class="sponsor-link-item">
          <!-- /531683568/pyeongchang_ad/pyeongchang_pc_rectangle1 -->
          <script>
            googletag.cmd.push(function() {
              googletag.defineSlot('/531683568/pyeongchang_ad/pyeongchang_pc_rectangle1', [300, 250], 'div-gpt-ad-1515758023658-0').addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          </script>
          <div id='div-gpt-ad-1515758023658-0' style='height:250px; width:300px;'>
          <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515758023658-0'); });
          </script>
          </div>
          <!-- // /531683568/pyeongchang_ad/pyeongchang_pc_rectangle1 -->
        </div><!-- /.sponsor-link-item -->
        <div class="sponsor-link-item">
          <!-- /531683568/pyeongchang_ad/pyeongchang_pc_rectangle2 -->
          <script>
            googletag.cmd.push(function() {
              googletag.defineSlot('/531683568/pyeongchang_ad/pyeongchang_pc_rectangle2', [300, 250], 'div-gpt-ad-1515758047885-0').addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          </script>
          <div id='div-gpt-ad-1515758047885-0' style='height:250px; width:300px;'>
          <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515758047885-0'); });
          </script>
          </div>
          <!-- // /531683568/pyeongchang_ad/pyeongchang_pc_rectangle2 -->
        </div><!-- /.sponsor-link-item -->
      </div><!-- /.sponsor-link -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->
  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<script src="/assets/js/related_sidebar_by_env.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/widgets/articles-index/Widget_articles_tag.js?v=<?php echo $page['version']; ?>"></script>
<script>
  (function(window) {
    'use strict';
    var UT = window.UT;
    var SPBL_ENV = window.SPBL_ENV || {};
    UT.ui.NavCurrent.init(SPBL_ENV.category, SPBL_ENV.platform === 'web_mobile');
  }(window));
</script>

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>