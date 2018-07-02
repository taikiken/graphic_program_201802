<?php

include_once __DIR__.'/../inhightv/_include.php';

# インハイ2017_ハイライト
$highlight = inhightvGetHighlight(2, $page['site_url_uts']);

# インハイ2017_ダイジェスト
$digest    = inhightvGetDigest(2);


?>
<link rel="stylesheet" href="/assets/css/inhigh/parts_sp.css" />


<!-- assets -->
<?php include_once __DIR__.'/../inhightv/_assets.php'; ?>
<?php include_once __DIR__.'/../inhightv/mobile/_assets.php'; ?>
<!-- //assets -->

<div id="body-section" class="body-sec inhightv">
  <div class="body-sec-inner">

    <?php if ( $page['theme']['images']['sp'] ) : ?>
    <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['category']['theme']['background_color'] : ''; ?>">
      <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
    </div>
    <?php endif; ?>


    <section class="main-sec">


      <!-- adslider -->
      <?php include_once __DIR__.'/../inhightv/_adslider.php'; ?>
      <!-- //adslider -->


      <!-- digest -->
      <?php if ( $digest ) : ?>
      <div class="inhightv__section">
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
      </div>
      <?php endif; ?>
      <!-- //digest -->

      <!-- highlight -->
      <?php if ( $highlight ) : ?>
      <div class="inhightv__section">
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
      </div>
      <?php endif; ?>
      <!-- //highlight -->


      <!-- plan -->
      <div class="inhightv__section">
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
            <img src="/assets/images/inhightv/inhightv-pre-mobile-lineup.png" srcset="/assets/images/inhightv/inhightv-pre-mobile-lineup.png 1x,
               /assets/images/inhightv/inhightv-pre-mobile-lineup.png 2x" alt="2018 配信予定の競技" />
          </figure>

        </section>
      </div>
      <!-- //plan -->



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

      <div id="pickup-container"></div>
      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>


      <!-- part-04 -->
      <div class="inhightv__index__part-04">
        <ul>
          <li>
            <a href="https://img.sportsbull.jp/files/inhightv_2018suibun.pdf" onclick="ga('send', 'event', 'inhightv-2018suibun_pdf', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr04-sp.png" width="728" height="71" alt="Otsuka 大塚製薬 アスリートにかかせない水分補給 パフォーマンスの維持にイオン飲料">
            </a>
          </li>

          <li style="width: 50%;">
            <a href="https://www.koukousoutai.com/2018soutai/" onclick="ga('send', 'event', 'inhightv-2018soutai', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr03.jpg" alt="はばたけ世界へ　南東北総体2017">
            </a>
          </li>

          <li style="width: 50%;">
            <a href="https://pocarisweat.jp/action/yell/" onclick="ga('send', 'event', 'inhightv-yell', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr02.jpg" alt="エールと、ともに">
            </a>
          </li>

          <!--
          <li>
            <a href="http://www.yomiuri.co.jp/sports/interhigh/" onclick="ga('send', 'event', 'inhightv-yomiuri', 'click');" target="_blank">
              <img src="/assets/images/inhightv/banner/bnr01.jpg" alt="YOMIURI ONLINE">
            </a>
          </li>
          -->

        </ul>
      </div>
      <!-- //part-04 -->

    </section>

  </div>
</div>

