<?php
/**
 * [DESKTOP]
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * author: @taikiken
 * Date: 2017/09/04
 * Time: 19:30
 */

// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'/../desktop/_category-heading.php';

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
    <section class="main-sec">

      <div class="guideboard">
        <div class="guideboard__map">
          <h2 class="guideboard__map__heading">エリアを選択</h2>
          <ul class="guideboard__map__button_list">
            <li class="guideboard__map__button--hokkaido"><a class="guideboard__map__button__link" href="hoge">北海道</a></li>
            <li class="guideboard__map__button--tohoku"><a class="guideboard__map__button__link" href="hoge">東北</a></li>
            <li class="guideboard__map__button--kanto"><a class="guideboard__map__button__link" href="hoge">関東</a></li>
            <li class="guideboard__map__button--chubu"><a class="guideboard__map__button__link" href="hoge">中部</a></li>
            <li class="guideboard__map__button--kansai"><a class="guideboard__map__button__link" href="hoge">関西</a></li>
            <li class="guideboard__map__button--chugoku"><a class="guideboard__map__button__link" href="hoge">中国</a></li>
            <li class="guideboard__map__button--shikoku"><a class="guideboard__map__button__link" href="hoge">四国</a></li>
            <li class="guideboard__map__button--kyushu"><a class="guideboard__map__button__link" href="hoge">九州・沖縄</a></li>
          </ul><!-- /.guideboard__map__button_list -->
        </div><!-- /.guideboard__map -->

        <ul class="guideboard__list">
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--hokkaido" href="hoge">
              <h3>北海道</h3>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--tohoku" href="hoge">
              <h3>東北</h3>
              <p>青森県・岩手県・宮城県・秋田県・山形県・福島県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--kanto" href="hoge">
              <h3>関東</h3>
              <p>茨城県・栃木県・群馬県・埼玉県・千葉県・東京都・神奈川県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--chubu" href="hoge">
              <h3>中部</h3>
              <p>新潟県・富山県・石川県・福井県・山梨県・長野県・岐阜県・静岡県・愛知県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--kansai" href="hoge">
              <h3>関西</h3>
              <p>三重県・滋賀県・京都府・大阪府・兵庫県・奈良県・和歌山県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--chugoku" href="hoge">
              <h3>中国</h3>
              <p>鳥取県・島根県・岡山県・広島県・山口県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--shikoku" href="hoge">
              <h3>四国</h3>
              <p>徳島県・香川県・愛媛県・高知県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--kyushu" href="hoge">
              <h3>九州</h3>
              <p>福岡県・佐賀県・長崎県・熊本県・大分県・宮崎県・鹿児島県・沖縄県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
        </ul><!-- /.guideboard__list -->
      </div>

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

      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->

    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/../desktop/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->