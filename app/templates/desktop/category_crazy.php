<link rel="stylesheet" href="/assets/css/crazy.css">
<?php
/**
 * desktop: 汎用 category template, exclude `motorsports`
 * motorsports category だけ表示が変わるので分岐する
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 16:31
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
i//nclude_once __DIR__.'/_category-heading.php';
?>
<?php
// https://github.com/undotsushin/undotsushin/issues/1210
// CMS から一面・すべてのバナーを設定できるようにする #1210
// @since 2016-11-02
if ($page['category']['slug'] == 'all') {
    include_once __DIR__ . '/_cms_banner.php';
}
?>

<div class="body-sec">
    <?php
    // ----------------------------------------------------
    //// 冒頭画像
    // 記事一覧: pc theme.images
  if ( $page['theme']['images']['pc'] ) : ?>
    <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page[ 'theme' ][ 'background_color' ] : ''; ?>">
      <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['pc']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
    </div>
    <?php
  endif;
  // eof: 記事一覧: pc theme.images
  // ---------------------------------------------------- ?>

  <?php
  // 2. ピックアップが設定できる
  ?>
  <div id="pickup-container"></div>

  <div class="body-sec-inner">
    <section class="main-sec">
      <?php
      // ----------------------------------------------------
      // 記事一覧: pc banner
      if ( !empty($page['category']['banner']['pc']['image']) && !empty($page['category']['banner']['pc']['link']) ) :
        ?>
        <div class="sponsor-link mt30">
          <a href="<?php echo $page['category']['banner']['pc']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['pc']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['pc']['image']; ?>" alt="<?php echo $page['category']['banner']['pc']['text'] ? $page['category']['banner']['pc']['text'] : '' ?>"></a>
        </div>
        <?php
      endif;
      // eof: 記事一覧: pc banner
      // ---------------------------------------------------- ?>

      <?php
      // 3. ヘッドラインが設定できる
      // @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
      // @since 2016-09-20
      // {@link ViewCategory.js}, {@link ComponentCategoryOption.js}
      ?>
      <div id="js-headline"></div>

        <section class="section_crazy_pickup">
            <div class="ttl-wrapper">
                <h2 class="ttl pickup"><i></i>注目のアスリート</h2>
<?php /*<p class="more sp_hide"><a href="/crazy/list/">すべての選手を見る</a></p>*/?>
            </div>

            <div class="pickup_player_list">
                <ul class="thumb_area">
                    <li><?php /*<a href="/crazy/detail/14/">*/?>
                            <div class="img"><img src="/assets/img/pickup_14.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">川崎宗則</h3>
                                <p class="genre">野球</p>
                            </div>
<?php /*</a>*/?></li>

                    <li><?php /*<a href="/crazy/detail/1/">*/?>
                            <div class="img"><img src="/assets/img/pickup_1.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">遠藤保仁</h3>
                                <p class="genre">サッカー</p>
                            </div>
<?php /*</a>*/?></li>

                    <li><?php /*<a href="/crazy/detail/13/">*/?>
                            <div class="img"><img src="/assets/img/pickup_13.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">田臥勇太</h3>
                                <p class="genre">バスケットボール</p>
                            </div>
<?php /*</a>*/?></li>

                    <li><?php /*<a href="/crazy/detail/4/">*/?>
                            <div class="img"><img src="/assets/img/pickup_4.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">山中慎介</h3>
                                <p class="genre">ボクシング</p>
                            </div>
<?php /*</a>*/?></li>
                </ul>
            </div>

<?php /*<div class="more_btn pc_hide"><a href="/crazy/list/"><i></i>すべての選手を見る</a></div>*/?>
        </section>



        <section class="section_crazy_recommend">
            <div class="ttl-wrapper">
                <h2 class="ttl recommend"><i></i>編集部おすすめの記事</h2>
            </div>

            <div class="recommend_list">
                <ul class="thumb_area">

                </ul>
            </div>
        </section>
      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->

<script src="https://code.jquery.com/jquery-git.min.js"></script>
<script src="/assets/js/libs/crazy.js"></script>