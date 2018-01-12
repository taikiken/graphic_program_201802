<?php
/**
 * mobile: pyeongchang2018 専用 template - `/pyeongchang2018/photo/`
 * User: @taikiken
 * Date: 2017/12/21
 * Time: 17:52
 * ref: UNDO_SPBL-291 【バックエンド】平昌オリンピック対応 - ルーティング
 */
?>
<?php
// 汎用 header
include_once __DIR__."/../../mobile/_header.php";
?>
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <div class="special-summary">
      <h1 class="special-summary-heading"><img src="/assets/sp/images/pyeongchang2018/special-summary.jpg" alt="平昌五輪"></h1>
    </div><!-- /.special-summary -->

    <?php
    // ----------------------------------------------------
    // 記事一覧: sp theme.images
    if ( $page['theme']['images']['sp'] ) :
      ?>
      <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['category']['theme']['background_color'] : ''; ?>">
        <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
      </div>
    <?php
    endif;
    // eof: 記事一覧: sp theme.images
    // ---------------------------------------------------- ?>
    <div id="pickup-container"></div><!-- /pickup -->

    <?php
    // SP版 Powerd by エリアの追加
    // https://github.com/undotsushin/undotsushin/issues/1211
    include_once __DIR__.'/../../mobile/_category-heading.php';
    ?>
    <?php
    // https://github.com/undotsushin/undotsushin/issues/1210
    // CMS から一面・すべてのバナーを設定できるようにする #1210
    // @since 2016-11-02
    if ($page['category']['slug'] == 'all') {
      include_once __DIR__ . '/../../mobile/_cms_banner.php';
    }
    ?>
    <section class="main-sec">

      <?php
      // ----------------------------------------------------
      // 記事一覧: sp banner
      if ( !empty($page['category']['banner']['sp']['image']) && !empty($page['category']['banner']['sp']['link']) ) :
        ?>
        <div class="sponsor-link">
          <a href="<?php echo $page['category']['banner']['sp']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['sp']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['sp']['image']; ?>" alt="<?php echo $page['category']['banner']['sp']['text'] ? $page['category']['banner']['sp']['text'] : '' ?>"></a>
        </div>
      <?php
      endif;
      // eof: 記事一覧: sp banner
      // ---------------------------------------------------- ?>

      <div class="gallery--photo">
        <header class="gallery__header">
          <h2 class="gallery__heading">フォトギャラリー</h2>
          <p class="gallery__date">2018年2月9日 - 25日</p>
        </header><!-- /.gallery__header -->

        <div id="Widget_articles_tag-1" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018フォトギャラリー" data-offset="0" data-length="9999"></div>
      </div><!-- /.allery--photo -->

      <?php
      // ------------------------------
      // 平昌だけイレギュラー index と同じ
      ?>
      <div id="headline-container"></div>

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

      <div id="js-headline-last-container"></div>
      <?php
      // イレギュラー終わり
      // ------------------------------
      ?>

      <?php
      // medals
      include_once __DIR__ . '/../module/_pyeongchang2018_medals.php';
      ?>

      <div class="gallery--highlight">
        <header class="gallery__header">
          <h2 class="gallery__heading">ハイライト動画</h2>
          <p class="gallery__link"><a href="/pyeongchang2018/movie/">すべて見る</a></p>
        </header><!-- /.gallery__header -->

        <div id="Widget_articles_tag-2" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018ハイライト" data-offset="0" data-length="4"></div>
      </div><!-- /.gallery--highlight -->
    </section><!-- /.main-sec -->
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
include_once __DIR__."/../../mobile/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>
