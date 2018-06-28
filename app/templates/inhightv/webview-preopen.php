<?php

include_once __DIR__.'/../inhightv/_include.php';

# インハイ2017_ハイライト
$highlight = inhightvGetHighlight(2, $page['site_url_uts']);

# インハイ2017_ダイジェスト
$digest    = inhightvGetDigest(2);


?>
<!DOCTYPE html>
<html dir="ltr" lang="ja" style="height: auto;">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>インターハイ WebView | SPORTS BULL</title>

  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <link rel="stylesheet" href="/assets/css/inhigh/parts_sp.css?v=<?php echo $page['version']; ?>" />

  <script src='//www.googletagservices.com/tag/js/gpt.js'></script>
  <!-- assets -->
  <?php include_once __DIR__.'/../inhightv/_assets.php'; ?>
  <?php include_once __DIR__.'/../inhightv/mobile/_assets.php'; ?>
  <!-- //assets -->

</head>

<body style="height: auto;" class="inhightv__webview">
<div id="body-section" class="body-sec inhightv inhightv--webview">
  <div class="body-sec-inner">


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

    </section>

  </div>
</body>
</html>