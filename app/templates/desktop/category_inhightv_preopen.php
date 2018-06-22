<!-- assets -->
<?php
/*

- DS指定のassets読み込み
- 広告用のGTM読み込み
- 一部スタイル調整

*/
?>
<link rel="stylesheet" href="/assets/css/inhigh/parts_pc.css">
<!-- Ad / DFP - GTM -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N7WLDK9');</script>
<!-- // Ad / DFP - GTM -->

<style>
.inhightv .article_list {
  margin-top: -20px;
}

.inhightv__headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inhightv__headline h2 {
  display: flex;
  align-items: center;
  line-height: 26px;
}

.inhightv__headline h2 * {
  line-height: 1;
}

.inhightv__headline h2 svg {
  width: 26px;
  height: 26px;
  stroke-width: 0;
  line-height: 0;
}

.inhightv__headline h2 span {
  font-size: 16px;
  font-weight: bold;
  padding-left: 8px;
}

.inhightv__index__adslider {
  width: 1088px;
  margin: 38px auto 8px;
}

.inhightv__index__adslider__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inhightv__index__adslider__wrapper > div {
  width: 320px;
  height: 140px;
  background: #eee;
  margin: 0 20px;
}

/*  overwrite -  parts_pc.css */

[class*=section_interhigh_] .ttl-wrapper {
  border-color: #dddddd;
  color: #333333;
  padding: 0;
}

.article_list .highlight_article .thumb_area li {
  border-bottom: none;
}

.article_list .highlight_article .thumb_area li .img {
  width: 174px;
  height: 98px;
  background: #eee;
}

</style>
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
  <div class="inhightv__index__adslider">
    <div class="inhightv__index__adslider__wrapper">
      <div id="div-gpt-ad-inhightv_carousel_1"></div>
      <div id="div-gpt-ad-inhightv_carousel_2"></div>
    </div>
  </div>
  <!-- //adslider -->

  <div class="body-sec-inner">
    <section class="main-sec">

      <?php include __DIR__."./../inhightv/inc.php"; ?>

      <!-- digest -->
      <section class="section_interhigh_highlight">
        <div class="ttl-wrapper">
          <div class="inhightv__headline">
            <h2>
              <i>
                <svg class="icon icon-h-icon-cup"><use xlink:href="#icon-h-icon-play"></use></svg>
              </i>
              <span>
                2017 ダイジェスト動画
              </span>
            </h2>
          </div>
          <p class="ttl_link"><a href="/inhightv/2017-highlight-movie/">すべて見る</a></p>
        </div>

        <div class="article_list">
          <article class="highlight_article">
            <ul class="thumb_area">
              <?php echo $movie; ?>
            </ul>
          </article>
        </div>
      </section>
      <!-- //digest -->

      <!-- highlight -->
      <section class="section_interhigh_highlight">
        <div class="ttl-wrapper">
          <div class="inhightv__headline">
            <h2>
              <i>
                <svg class="icon icon-h-icon-cup"><use xlink:href="#icon-h-icon-play"></use></svg>
              </i>
              <span>
                2017 ハイライト動画
              </span>
            </h2>
          </div>
          <p class="ttl_link"><a href="/inhightv/2017-highlight-movie/">すべて見る</a></p>
        </div>

        <div class="article_list">
          <article class="highlight_article">
            <ul class="thumb_area">
              <?php echo $movie; ?>
            </ul>
          </article>
        </div>
      </section>
      <!-- //highlight -->


      <!-- plan -->
      <section class="inhightv__index__plan">
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
        <div id="board-container-more"></div><!--/archive-more-->
      </div><!-- /.board-large -->


      <!-- part-04 -->
      <div class="inhightv__index__part-04">
        <?php echo $page['parts']['part-04']; ?>
      </div>
      <!-- //part-04 -->

    </section><!-- /.main-sec -->

    <section class="side-sec">
      <?php include_once __DIR__."/_sidebar_ad.php"; ?>
    </section><!-- /.side-sec -->

  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->


<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-h-icon-cup" viewBox="0 0 32 32">
<title>h-icon-cup</title>
<path fill="#000" style="fill: var(--color1, #000)" d="M24.005 0h-15.99c-0.586 0-1.046 0.46-1.046 1.046v14.273c0 4.583 3.516 8.371 7.995 8.79v5.797h-4.939c-0.586 0-1.046 0.46-1.046 1.046s0.46 1.046 1.046 1.046h11.95c0.586 0 1.046-0.46 1.046-1.046s-0.46-1.046-1.046-1.046h-4.918v-5.797c4.479-0.419 7.995-4.207 7.995-8.79v-14.273c0-0.586-0.481-1.046-1.046-1.046zM22.959 15.32c0 3.725-3.014 6.739-6.739 6.739h-0.419c-3.725 0-6.739-3.014-6.739-6.739v-13.227h13.897v13.227z"></path>
<path fill="#000" style="fill: var(--color1, #000)" d="M31.707 4.667c-0.188-0.209-0.46-0.314-0.753-0.314h-4.186c-0.586 0-1.046 0.46-1.046 1.046s0.46 1.046 1.046 1.046h3.056c-0.272 2.428-1.172 6.551-3.495 7.681-0.523 0.251-0.733 0.879-0.481 1.402 0.188 0.377 0.544 0.586 0.942 0.586 0.146 0 0.314-0.042 0.46-0.105 4.416-2.114 4.751-10.234 4.772-10.569 0-0.293-0.105-0.565-0.314-0.774z"></path>
<path fill="#000" style="fill: var(--color1, #000)" d="M6.279 5.4c0-0.586-0.46-1.046-1.046-1.046h-4.186c-0.293 0-0.565 0.126-0.753 0.314-0.188 0.209-0.293 0.481-0.293 0.774 0.021 0.335 0.356 8.455 4.772 10.569 0.146 0.063 0.293 0.105 0.46 0.105 0.398 0 0.774-0.209 0.942-0.586 0.251-0.523 0.021-1.151-0.481-1.402-2.323-1.109-3.244-5.232-3.495-7.681h3.035c0.565 0 1.046-0.46 1.046-1.046z"></path>
</symbol>
<symbol id="icon-h-icon-play" viewBox="0 0 32 32">
<title>h-icon-play</title>
<path fill="#000" style="fill: var(--color1, #000)" d="M15.989 0c-8.82 0-15.989 7.169-15.989 15.989 0 8.842 7.169 15.989 15.989 15.989 8.842 0 15.989-7.169 15.989-15.989 0.022-8.82-7.147-15.989-15.989-15.989zM15.989 30.045c-7.734 0-14.034-6.3-14.034-14.056s6.3-14.034 14.034-14.034c7.734 0 14.034 6.3 14.034 14.034s-6.278 14.056-14.034 14.056z"></path>
<path fill="#000" style="fill: var(--color1, #000)" d="M12.665 22.68c-0.196 0-0.369-0.043-0.543-0.152-0.326-0.196-0.543-0.543-0.543-0.934v-7.386c0-0.608 0.478-1.086 1.086-1.086s1.086 0.478 1.086 1.086v5.518l6.452-3.737-8.081-4.649c-0.521-0.304-0.695-0.956-0.391-1.477s0.956-0.695 1.477-0.391l9.711 5.605c0.326 0.196 0.543 0.543 0.543 0.934s-0.217 0.739-0.543 0.934l-9.711 5.605c-0.174 0.087-0.348 0.13-0.543 0.13z"></path>
</symbol>
</defs>
</svg>
