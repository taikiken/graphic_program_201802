<?php
/**
 * desktop: motorsports category template
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

<div class="body-sec">
  <?php
  // ----------------------------------------------------
  // 冒頭画像
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
    <style type="text/css">
      .ttl-wrapper{background-color:#000;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;height:60px;color:#fff;font-weight:700;border-top:4px solid #cc141d;padding:0 20px}.ttl-wrapper>*{font-weight:700;padding-top:3px}.ttl-wrapper .ttl{font-size:22px;font-size:"2.2rem"}.ttl-wrapper .ttl.pickup i{width:20px;height:20px;background:url(/assets/img/sp_icon_pickup.png) 0 0/contain no-repeat}.ttl-wrapper .ttl i{margin-right:10px;position:relative;top:2px;display:inline-block}.ttl-wrapper .more{font-size:14px;font-size:"1.4rem"}.ttl-wrapper .more a{display:block;padding-right:12px;position:relative;color:#fff;-webkit-transition:.4s ease;transition:.4s ease}.ttl-wrapper .more a:hover{color:#333}.main-sec a:hover{text-decoration:none}.ttl-wrapper .more a:hover:after{right:-3px}.ttl-wrapper .more a:after{display:inline-block;content:"";background:url(/assets/images/seriku/icon_arrow_white.png) 100% 0 no-repeat;width:7px;height:12px;position:absolute;top:4px;right:0;-webkit-transition:.3s ease;transition:.3s ease}.section_pickup_player{margin-top:30px}.section_pickup_player .ttl-wrapper{margin-bottom:30px}.pickup_player_list{margin-bottom:5px}.pickup_player_list .thumb_area{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;padding:0 14px;margin-left:-20px}.pickup_player_list .thumb_area li{width:160px;margin-left:20px}.pickup_player_list .thumb_area li a{display:block}.pickup_player_list .thumb_area li .img{position:relative;overflow:hidden;border-radius:50%;margin-bottom:10px;height:160px;width:160px;border:2px solid #cc141d;background-color:#000}.pickup_player_list .thumb_area li .img img{-webkit-transition:.4s ease;transition:.4s ease;position:relative;border-radius:50%;width:100%}.pickup_player_list .thumb_area li .txt_area{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:center;font-weight:700}.pickup_player_list .thumb_area li .txt_area .name{font-size:18px;font-size:"1.8rem";font-weight:700;color:#fff}.pickup_player_list .thumb_area li a:hover .txt_area .name{color:#cc141d}.pickup_player_list .thumb_area li .txt_area p{font-size:14px;font-size:"1.4rem";-webkit-transition:.4s ease;transition:.4s ease;color:#999}
    </style>
    <section class="main-sec">
        <?php if(empty($page['list']) === false) : ?>
          <section class="section_pickup_player">
              <div class="ttl-wrapper">
                  <h2 class="ttl pickup"><i></i>注目のアスリート</h2>
                  <p class="more"><a href="/category/<?php echo $page['category']['slug'] ?>/athletes/">すべての選手を見る</a></p>
              </div>
              <div class="pickup_player_list">
                  <ul class="thumb_area">
                      <?php foreach ($page['list'] as $player): ?>
                        <li>
                            <a href="/athlete/<?php echo $player->body->no ?>/">
                                <div class="img"><img src="/prg_img/img/<?php echo $player->body->img ?>" alt=""></div>
                                <div class="txt_area">
                                    <h3 class="name"><?php echo $player->body->name ?></h3>
                                    <p class="genre"><?php echo $player->body->competition ?></p>
                                </div>
                            </a>
                        </li>
                      <?php endforeach; ?>
                  </ul>
              </div>
          </section>
        <?php endif; ?>
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

        <?php
        // ----------------------------------------------------
        // 記事一覧: pc banner
        if ( !empty($page['category']['banner']['pc']['image']) && !empty($page['category']['banner']['pc']['link']) ) :
        ?>
        <div class="sponsor-link mt30">
            <a href="/motorsports/crazy-for-racing/" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '/motorsports/crazy-for-racing/', true);"><img src="/motorsports/crazy-for-racing/assets/img/729x90.png" alt="CRAZY FOR RACING"></a>
        </div>
        <?php
    endif;
      // eof: 記事一覧: pc banner
      // ---------------------------------------------------- ?>
      
      <?php
      // motor sports navigation
      // @since 2017-05-26
      ?>
      <nav class="motorsports__category-btns">
        <ul class="motorsports__category-btns__list">
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/f1/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_f1-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_f1-text.png" alt="F1 / FORMULA 1 レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/sgt/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_sgt-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_sgt-text.png" alt="SGT / Super GT レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/wec/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wec-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wec-text.png" alt="WEC / FIA WORLD ENDURANCE CHAMPIONSHIP レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/wrc/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wrc-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wrc-text.png" alt="WRC / FIA WORLD RALLY CHAMPIONSHIP レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
        </ul>
      </nav><!-- /.motorsports__category-btns -->

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
