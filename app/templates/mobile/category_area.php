<?php
/**
 * [SP]
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * author: @taikiken
 * Date: 2017/09/04
 * Time: 19:30
 */
?>

<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
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
    // SP版 Powered by エリアの追加
    // https://github.com/undotsushin/undotsushin/issues/1211
    include_once __DIR__.'/../mobile/_category-heading.php';
    ?>
    <?php
    // https://github.com/undotsushin/undotsushin/issues/1210
    // CMS から一面・すべてのバナーを設定できるようにする #1210
    // @since 2016-11-02
    if ($page['category']['slug'] == 'all') {
      include_once __DIR__ . '/../mobile/_cms_banner.php';
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

      <div class="guideboard">
        <div class="guideboard-heading">
          <h2 class="guideboard-heading-title">エリアを選択</h2>
        </div><!-- /.guideboard-heading -->

        <ul class="guideboard__list">
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--hokkaido" href="/area/北海道/">
              <h3>北海道</h3>
              <p>北海道</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--tohoku" href="/area/東北/">
              <h3>東北</h3>
              <p>青森県・岩手県・宮城県・秋田県・山形県・福島県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--kanto" href="/area/関東/">
              <h3>関東</h3>
              <p>茨城県・栃木県・群馬県・埼玉県・千葉県・東京都・神奈川県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--hokuriku" href="/area/北陸・甲信越/">
              <h3>北陸・甲信越</h3>
              <p>山梨県・長野県・新潟県・富山県・石川県・福井県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--tokai" href="/area/東海/">
              <h3>東海</h3>
              <p>愛知県・岐阜県・三重県・静岡県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--kansai" href="/area/関西/">
              <h3>関西</h3>
              <p>三重県・滋賀県・京都府・大阪府・兵庫県・奈良県・和歌山県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--chugoku" href="/area/中国/">
              <h3>中国</h3>
              <p>鳥取県・島根県・岡山県・広島県・山口県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--shikoku" href="/area/四国/">
              <h3>四国</h3>
              <p>徳島県・香川県・愛媛県・高知県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
          <li class="guideboard__list__item">
            <a class="guideboard__list__link--kyushu" href="/area/九州・沖縄/">
              <h3>九州</h3>
              <p>福岡県・佐賀県・長崎県・熊本県・大分県・宮崎県・鹿児島県・沖縄県</p>
            </a>
          </li><!-- /.guideboard__list__item -->
        </ul><!-- /.guideboard__list -->
      </div><!-- /.guideboard -->

      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->