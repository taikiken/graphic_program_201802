<?php


# インハイ2017_ハイライト
include_once(__DIR__.'/../_include.php');
$digest = inhightvGetDigest(1000);

// header
include_once __DIR__."/../../desktop/_header.php";
include_once __DIR__."/_header.php";

// assets
include_once __DIR__.'/../_assets.php';
include_once __DIR__.'/_assets.php';


?>

  <div class="special-summary">
    <a href="/category/inhightv/">
      <h1 class="special-summary-heading"><img src="/assets/images/inhightv/inhightv-pre-desktop-header-2nd.png" alt="全国高体連公式 インターハイ応援サイト インハイ.tv"></h1>
    </a>
  </div>


  <div class="body-sec inhightv inhightv--digest">
    <div class="body-sec-inner">

      <section class="main-sec">

      <!-- digest -->
      <?php if ( $digest ) : ?>
        <div class="ttl-wrapper">
          <h2 class="ttl highlight"><i></i>ダイジェスト動画一覧</h2>
          <p class="ttl_date"><?php echo $digest['start']; ?> - <?php echo $digest['end']; ?></p>
        </div>

        <?php foreach($digest['movie'] as $k=>$v) { ?>
          <div class="article_list">
            <article class="highlight_article">
              <h3 class="date"><i></i><?=$k?></h3>
                <ul class="thumb_area">
                  <?php
                  for($i=0;$i<count($v);$i++){
                      echo sprintf('<li><a href="%s"><div class="img"><img src="%s" alt="%s"></div><div class="txt_area"><p>%s %s</p></div></a></li>',$v[$i]["url"],$v[$i]["img"],$v[$i]["title"],$v[$i]["date"],$v[$i]["title"]);
                  }
                  ?>
              </ul>
            </article>
          </div>
        <?php } ?>

      <?php endif; ?>
      <!-- //digest -->
      </section>


      <?php include_once __DIR__.'/_side-sec.php'; ?>


    </div>

    <!-- adslider -->
    <?php include_once __DIR__.'/../_adslider.php'; ?>
    <!-- //adslider -->

  </div>

<?php include_once __DIR__.'/_footer.php'; ?>
<?php include_once __DIR__.'/../../desktop/_footer.php'; ?>