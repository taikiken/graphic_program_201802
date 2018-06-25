<?php


# インハイ2017_ハイライト
include_once(__DIR__.'/../_include.php');
$highlight = inhightvGetHighlight(100);

// header
include_once __DIR__."/../../mobile/_header.php";
include_once __DIR__."/_header.php";

// assets
include_once __DIR__.'/../_assets.php';
include_once __DIR__.'/_assets.php';

?>
<style>
.header-sticky {
  position: relative;
}
</style>

  <div class="special-summary">
    <a href="/category/inhightv/">
      <h1 class="special-summary-heading"><img src="/assets/images/inhightv/inhightv-pre-mobile-header-2nd.png" alt="全国高体連公式 インターハイ応援サイト インハイ.tv"></h1>
    </a>
  </div>


  <div class="body-sec inhightv inhightv--single">
    <div class="body-sec-inner">

      <section class="main-sec">


      <!-- highlight -->
      <?php if ( $highlight ) : ?>
      <section class="section_interhigh_highlight">
        <div class="inhightv__title">
          <div class="inhightv__headline">
            <h2>
              <i>
                <svg class="icon icon-h-icon-play"><use xlink:href="#icon-h-icon-play"></use></svg>
              </i>
              <span>
                2017 ハイライト動画
              </span>
            </h2>
          </div>
        </div>

        <div class="article_list">
          <article class="highlight_article">
            <ul class="thumb_area">
              <?php foreach( $highlight as $key => $value ) : ?>
              <li>
                <a href="<?php echo $value['url']; ?>">
                  <div class="img">
                    <?php if ( $value['img'] ) : ?>
                      <img src="<?php echo $value['img']; ?>" alt="" />
                    <?php endif; ?>
                  </div>
                  <div class="txt_area">
                    <p>
                      <?php echo $value['title']; ?>
                    </p>
                  </div>
                </a>
              </li>
              <?php endforeach; ?>
            </ul>
          </article>
        </div>
      </section>
      <?php endif; ?>
      <!-- //highlight -->


      </section>

    </div>

    <!-- adslider -->
    <?php include_once __DIR__.'/../_adslider.php'; ?>
    <!-- //adslider -->

  </div>


<?php include_once __DIR__.'/../../mobile/_footer.php'; ?>