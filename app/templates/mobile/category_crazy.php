<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <?php
    // since 2017-12-18
    // お知らせ表示
    // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
    ?>
    <div id="js-announce-container"></div>
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
    include_once __DIR__.'/_category-heading.php';
    ?>
    <?php
    // https://github.com/undotsushin/undotsushin/issues/1210
    // CMS から一面・すべてのバナーを設定できるようにする #1210
    // @since 2016-11-02
    if ($page['category']['slug'] == 'all') {
      include_once __DIR__ . '/_cms_banner.php';
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

        <section class="section_crazy_popular pc_hide">
            <div class="ttl-wrapper pc_hide">
                <h2 class="ttl popular"><i></i>人気の記事</h2>
            </div>
            <div id="Widget_articles-2" class="Widget_articles" data-category="crazy" data-type="ranking"></div>
        </section>

      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>
      <?php
      // since 2018-01-015 - 一面や一覧系の末広告タグ
      include_once __DIR__ . '/_ad_below_more.php';
      ?>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

<script src="https://code.jquery.com/jquery-git.min.js"></script>
<script src="/assets/widgets/articles-index/Widget_articles.js"></script>