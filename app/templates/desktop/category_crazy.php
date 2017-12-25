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
          <a href="<?php echo $page['category']['banner']['pc']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['banner']['banner']['pc']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['pc']['image']; ?>" alt="<?php echo $page['banner']['banner']['pc']['text'] ? $page['banner']['banner']['pc']['text'] : '' ?>"></a>
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
                <p class="more sp_hide"><a href="/category/crazy/athletes/">すべての選手を見る</a></p>
            </div>

            <div class="pickup_player_list">
                <ul class="thumb_area">
                    <?php foreach($page['list'] as $player):?>
                        <li><a href="/athlete/<?php echo $player->body->no?>/">
                                <div class="img"><img src="/prg_img/img/<?php echo $player->body->img?>" alt=""></div>
                                <div class="txt_area">
                                    <h3 class="name"><?php echo $player->body->name?></h3>
                                    <p class="genre"><?php echo $player->body->competition?></p>
                                </div>
                            </a></li>
                    <?php endforeach;?>
                </ul>
            </div>

            <div class="more_btn pc_hide"><a href="/category/crazy/athletes/"><i></i>すべての選手を見る</a></div>
        </section>



        <section class="section_crazy_recommend">
            <div class="ttl-wrapper">
                <h2 class="ttl recommend"><i></i>編集部おすすめの記事</h2>
            </div>
            <div id="Widget_articles-1" class="Widget_articles" data-category="crazy" data-type="recommend"></div>
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
<script src="/assets/widgets/articles-index/Widget_articles.js"></script>