<?php

include_once __DIR__.'/../inhightv/_include.php';

# インハイ2017_ハイライト
$highlight = inhightvGetHighlight(4, $page['site_url_uts']);

# インハイ2017_ダイジェスト
$digest    = inhightvGetDigest(4);


?>
<link rel="stylesheet" href="/assets/css/inhigh/parts_pc.css">

<!-- assets -->
<?php include_once __DIR__.'/../inhightv/_assets.php'; ?>
<?php include_once __DIR__.'/../inhightv/desktop/_assets.php'; ?>
<!-- //assets -->

<div class="body-sec inhightv">

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

  <!-- adslider -->
  <?php include_once __DIR__.'/../inhightv/_adslider.php'; ?>
  <!-- //adslider -->

  <div class="body-sec-inner">
    <section class="main-sec">

      <!-- digest -->
      <?php if ( $digest ) : ?>
      <section class="section_interhigh_highlight">
        <div class="inhightv__title">
          <a class="inhightv__headline" href="/inhightv/2017-digest-movie/">
            <h2>
              <i>
                <svg class="icon icon-h-icon-play"><use xlink:href="#icon-h-icon-play"></use></svg>
              </i>
              <span>
                2017 ダイジェスト動画
              </span>
            </h2>
          </a>
          <p class="ttl_link"><a href="/inhightv/2017-digest-movie/">すべて見る</a></p>
        </div>

        <div class="article_list">
          <article class="highlight_article">
            <ul class="thumb_area">
              <?php foreach( $digest['movie'] as $date => $section ) : ?>
              <?php foreach( $section as $key => $value ) : ?>
              <li>
                <a href="<?php echo $value['url']; ?>">
                  <div class="img">
                    <?php if ( $value['img'] ) : ?>
                      <img src="<?php echo $value['img']; ?>" alt="" />
                    <?php endif; ?>
                  </div>
                  <div class="txt_area">
                    <p>
                      <?php echo $value['date']; ?> <?php echo $value['title']; ?>
                    </p>
                  </div>
                </a>
              </li>
              <?php endforeach; ?>
              <?php endforeach; ?>
            </ul>
          </article>
        </div>
      </section>
      <?php endif; ?>
      <!-- //digest -->

      <!-- highlight -->
      <?php if ( $highlight ) : ?>
      <section class="section_interhigh_highlight">
        <div class="inhightv__title">
          <a class="inhightv__headline" href="/inhightv/2017-highlight-movie/">
            <h2>
              <i>
                <svg class="icon icon-h-icon-play"><use xlink:href="#icon-h-icon-play"></use></svg>
              </i>
              <span>
                2017 ハイライト動画
              </span>
            </h2>
          </a>
          <p class="ttl_link"><a href="/inhightv/2017-highlight-movie/">すべて見る</a></p>
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


      <!-- plan -->
      <section class="section_interhigh_highlight inhightv__index__plan">
        <div class="inhightv__title">
          <div class="inhightv__headline">
            <h2>
              <i>
                <svg class="icon icon-h-icon-cup"><use xlink:href="#icon-h-icon-cup"></use></svg>
              </i>
              <span>
                2018 配信予定の競技
              </span>
            </h2>
          </div>
        </div>

        <figure class="inhightv__index__plan">
          <img src="/assets/images/inhightv/inhightv-pre-desktop-lineup.png" srcset="/assets/images/inhightv/inhightv-pre-desktop-lineup.png 1x,
             /assets/images/inhightv/inhightv-pre-desktop-lineup@2x.png 2x" alt="2018 配信予定の競技" />
        </figure>

      </section>
      <!-- //plan -->

      <aside class="sns-pr">
        <dl class="sns-pr-inner">
          <dt>
          <p><img src="/assets/images/index/sns-pr-logo.png" alt="SPORTS BULL"><span>を<strong>いいね</strong>して最新ニュースをチェック！</span></p>
          </dt>
          <dd>
            <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
          </dd>
        </dl><!-- /.sns-pr-inner -->
      </aside><!-- /.sns-pr -->

      <div class="board-large">
        <div id="board-container"></div><!--/archive-->
        <div id="board-container-more" data-afterclick="true"></div><!--/archive-more-->
      </div><!-- /.board-large -->


      <!-- part-04 -->
      <div class="inhightv__index__part-04">
        <ul>
          <li>
            <a href="https://inhightv.sportsbull.jp/img/home/suibun_A4_01.pdf" onclick="ga('send', 'event', 'inhightv-water_pdf', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr04.jpg" width="728" height="71" alt="Otsuka 大塚製薬 アスリートにかかせない水分補給 パフォーマンスの維持にイオン飲料">
            </a>
          </li>

          <li>
            <a href="http://2017soutai.jp/" onclick="ga('send', 'event', 'inhightv-2017soutai', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr03.jpg" alt="はばたけ世界へ　南東北総体2017">
            </a>
          </li>

          <li>
            <a href="http://pocarisweat.jp/action/yell/" onclick="ga('send', 'event', 'inhightv-yell', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr02.jpg" alt="エールと、ともに">
            </a>
          </li>

          <li>
            <a href="http://www.yomiuri.co.jp/sports/interhigh/" onclick="ga('send', 'event', 'inhightv-yomiuri', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr01.jpg" alt="YOMIURI ONLINE">
            </a>
          </li>
        </ul>
      </div>
      <!-- //part-04 -->


    </section><!-- /.main-sec -->

    <section class="side-sec">
      <?php include_once __DIR__."/_sidebar_ad.php"; ?>
    </section><!-- /.side-sec -->

  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->
