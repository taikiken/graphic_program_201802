<?php
include_once __DIR__."/../_include/_bulls_station_func.php";
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <script src="/assets/js/app_ua_detector.bundle.js"></script>
  <title><?php echo strip_tags($page['title']).' | '.$page['site_name']; ?></title>
  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page['og_description']; ?>">
  <!-- sns ogp -->
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sportsbull_jp">
  <!-- favicon -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <?php include_once __DIR__.'/../../_env.php'; ?>

  <link rel="canonical" href="<?php echo $page['og_url']; ?>">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/sp/css/<?php echo $page['dir_name']; ?>/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

</head>
<body class="appbnr-disable">
<div class="whole <?php echo $page['template_classname']; ?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div id="body-section" class="body-sec">
    <div class="body-sec-inner">
      <nav class="bulls_station__local_navi">
        <div class="bulls_station__local_navi__inner">
          <div class="bulls_station__local_navi__heading__container">
            <h2 class="bulls_station__local_navi__heading"><img src="/assets/sp/images/bulls-station/nav-heading.png" alt="スポーツニュース番組 BULL'S STATION"></h2>
          </div><!-- /.local_navi__heading__container -->

          <ul class="bulls_station__local_navi__list">
            <li class="bulls_station__local_navi__item bulls_station__local_navi__item--1"><a class="bulls_station__local_navi__link" href="/category/station/"><img src="/assets/sp/images/bulls-station/nav-nav1.png" alt="BULL'S STATIONを見る"></a></li>
            <li class="bulls_station__local_navi__item bulls_station__local_navi__item--2"><a class="bulls_station__local_navi__link" href="/p/181566/"><img src="/assets/sp/images/bulls-station/nav-nav2.png" alt="PHOTO GALLERY"></a></li>
            <li class="bulls_station__local_navi__item bulls_station__local_navi__item--3"><a class="bulls_station__local_navi__link" href="/bulls-station/off-shot-movie/"><img src="/assets/sp/images/bulls-station/nav-nav3.png" alt="OFFSHOT MOVIE"></a></li>
          </ul><!-- /.bulls_station__local_navi__list -->
        </div><!-- /.bulls_station__local_navi__inner -->
      </nav><!-- /.bulls_station__local_navi -->

      <div class="bulls_station__overview">
        <div class="bulls_station__overview__inner">

          <div id="scene" class="bulls_station__overview__parallax">
            <div data-depth="0.05" class="layer parallax__layer parallax__layer--shadow"><img src="/assets/sp/images/bulls-station/overview-bg2_shadow.png" alt=""></div>
            <div data-depth="0.20" class="layer parallax__layer parallax__layer--bustle"><img src="/assets/sp/images/bulls-station/overview-bg2.png" alt=""></div>
          </div><!-- /#js-parallax -->

          <h1 class="bulls_station__overview__heading"><img src="/assets/sp/images/bulls-station/overview-logo.png" alt="BULL'S STATION"></h1>
          <p class="bulls_station__overview__copy"><img src="/assets/sp/images/bulls-station/overview-copy.png" alt="BULL’S STATIONは最新ニュースを個性あふれるキャスターが真心込めてお届けするスポーツニュース番組です。毎日のランチのお供にぜひ御覧ください！"></p>
          <p class="bulls_station__overview__date"><img src="/assets/sp/images/bulls-station/overview-date.png" alt="毎週平日 月-金 12:30〜 配信"></p>
          <div class="bulls_station__overview__btn">
            <a class="bulls_station__overview__btn__link" href="/category/station/"><img src="/assets/sp/images/bulls-station/overview-btn.png" alt="BULL’S STATIONを見る"></a>
          </div><!-- /.bulls_station__overview__btn -->

          <div class="bulls_station__overview__caster">
            <ul class="bulls_station__overview__caster__list">
              <li class="bulls_station__overview__caster__item bulls_station__overview__caster__item--mon">
                <figure class="bulls_station__overview__caster__figure">
                  <h3 class="bulls_station__overview__caster__figure__heading"><img src="/assets/sp/images/bulls-station/caster-figure_mon.png" alt="エイミー"></h3>
                  <i class="bulls_station__overview__caster__figure__dow"><img src="/assets/sp/images/bulls-station/caster-icon_mon.png" alt="Monday"></i>
                </figure><!-- /.bulls_station__overview__caster__figure -->

                <a class="bulls_station__overview__caster__link" href="https://sportsbull.jp/p/182756/" target="_blank">
                  <span class="bulls_station__overview__caster__btn"><img src="/assets/sp/images/bulls-station/caster-btn.png" alt="紹介VTRを見る"></span>
                </a><!-- /.bulls_station__overview__caster__link -->

                <h4 class="bulls_station__overview__caster__heading">月曜担当キャスター</h4>
                <p class="bulls_station__overview__caster__copy">山や海の大自然が大好きで、家の中に籠ることが苦手。<br />
                寂しがり屋でもあるのでよく外出して人とあったり、体を動かしたりと完全にアウトドア派です。動物と日本のお城巡りも好きで、最近は辛い食べ物にはまっています！</p>
              </li><!-- /.bulls_station__overview__caster__item -->
              <li class="bulls_station__overview__caster__item bulls_station__overview__caster__item--tue">
                <figure class="bulls_station__overview__caster__figure">
                  <h3 class="bulls_station__overview__caster__figure__heading"><img src="/assets/sp/images/bulls-station/caster-figure_tue.png" alt="サヤカ"></h3>
                  <i class="bulls_station__overview__caster__figure__dow"><img src="/assets/sp/images/bulls-station/caster-icon_tue.png" alt="Tuesday"></i>
                </figure><!-- /.bulls_station__overview__caster__figure -->

                <a class="bulls_station__overview__caster__link" href="https://sportsbull.jp/p/182761/" target="_blank">
                  <span class="bulls_station__overview__caster__btn"><img src="/assets/sp/images/bulls-station/caster-btn.png" alt="紹介VTRを見る"></span>
                </a><!-- /.bulls_station__overview__caster__link -->

                <h4 class="bulls_station__overview__caster__heading">火曜担当キャスター</h4>
                <p class="bulls_station__overview__caster__copy">特技は自分の好きなアーティストさんのダンスをコピーして踊ること、バトントワリング、水泳です。最近ではボルダリングに挑戦したりと体を動かすことが大好きです。持ち前の笑顔で毎日のニュースを元気に明るくお伝えします！</p>
              </li><!-- /.bulls_station__overview__caster__item -->
              <li class="bulls_station__overview__caster__item bulls_station__overview__caster__item--wed">
                <figure class="bulls_station__overview__caster__figure">
                  <h3 class="bulls_station__overview__caster__figure__heading"><img src="/assets/sp/images/bulls-station/caster-figure_wed.png" alt="エレナ"></h3>
                  <i class="bulls_station__overview__caster__figure__dow"><img src="/assets/sp/images/bulls-station/caster-icon_wed.png" alt="Wednesday"></i>
                </figure><!-- /.bulls_station__overview__caster__figure -->

                <a class="bulls_station__overview__caster__link" href="https://sportsbull.jp/p/182765/" target="_blank">
                  <span class="bulls_station__overview__caster__btn"><img src="/assets/sp/images/bulls-station/caster-btn.png" alt="紹介VTRを見る"></span>
                </a><!-- /.bulls_station__overview__caster__link -->

                <h4 class="bulls_station__overview__caster__heading">水曜担当キャスター</h4>
                <p class="bulls_station__overview__caster__copy">私はこれまでたくさんのスポーツに携わってきました！身体を動かす事が大好きで、ピラティスやダンス、トレッキングやキャンピングなどの趣味を持っています！見た目でよく落ち着きのある人と思われがちですが、正反対でアクティブ系です！</p>
              </li><!-- /.bulls_station__overview__caster__item -->
              <li class="bulls_station__overview__caster__item bulls_station__overview__caster__item--thu">
                <figure class="bulls_station__overview__caster__figure">
                  <h3 class="bulls_station__overview__caster__figure__heading"><img src="/assets/sp/images/bulls-station/caster-figure_thu.png" alt="イチカ"></h3>
                  <i class="bulls_station__overview__caster__figure__dow"><img src="/assets/sp/images/bulls-station/caster-icon_thu.png" alt="Thursday"></i>
                </figure><!-- /.bulls_station__overview__caster__figure -->

                <a class="bulls_station__overview__caster__link" href="https://sportsbull.jp/p/182768/" target="_blank">
                  <span class="bulls_station__overview__caster__btn"><img src="/assets/sp/images/bulls-station/caster-btn.png" alt="紹介VTRを見る"></span>
                </a><!-- /.bulls_station__overview__caster__link -->

                <h4 class="bulls_station__overview__caster__heading">木曜担当キャスター</h4>
                <p class="bulls_station__overview__caster__copy">牛乳とコーヒーも大好きです。牛乳と紅茶も大好きです。スポーツブルの現場ではボケ担と早い段階でバレつつありますが東京オリンピック頃までにはしっかり者に生まれ変わりたいと思います。笑</p>
              </li><!-- /.bulls_station__overview__caster__item -->
              <li class="bulls_station__overview__caster__item bulls_station__overview__caster__item--fri">
                <figure class="bulls_station__overview__caster__figure">
                  <h3 class="bulls_station__overview__caster__figure__heading"><img src="/assets/sp/images/bulls-station/caster-figure_fri.png" alt="ライカ"></h3>
                  <i class="bulls_station__overview__caster__figure__dow"><img src="/assets/sp/images/bulls-station/caster-icon_fri.png" alt="Friday"></i>
                </figure><!-- /.bulls_station__overview__caster__figure -->

                <a class="bulls_station__overview__caster__link" href="https://sportsbull.jp/p/182770/" target="_blank">
                  <span class="bulls_station__overview__caster__btn"><img src="/assets/sp/images/bulls-station/caster-btn.png" alt="紹介VTRを見る"></span>
                </a><!-- /.bulls_station__overview__caster__link -->

                <h4 class="bulls_station__overview__caster__heading">金曜担当キャスター</h4>
                <p class="bulls_station__overview__caster__copy">来る夏と書いて、来夏です！私は夏と海と体を動かすことが大好きでサップヨガインストラクターとしても活動しています。スポーツを通して心と体の健康もお伝えできたらいいなと思います！いろんな挑戦をしていきたいです！</p>
              </li><!-- /.bulls_station__overview__caster__item -->
              <li class="bulls_station__overview__caster__item bulls_station__overview__caster__item--bull">
                <img src="/assets/sp/images/bulls-station/caster-figure_bull.png" alt="毎週平日月-金 12:30〜 配信中！">
              </li><!-- /.bulls_station__overview__caster__item -->
            </ul><!-- /.bulls_station__overview__caster__list -->
          </div><!-- /.bulls_station__overview__caster -->
        </div><!-- /.bulls_station__overview__inner -->
      </div><!-- /.bulls_station__overview -->

      <div class="bulls_station__follow">
        <div class="bulls_station__follow__app">
          <figure class="bulls_station__follow__app__figure">
            <a href="https://app.adjust.com/cfzxsd?deep_link=sportsbull%3A%2F%2F" target="_blank"><img src="/assets/sp/images/bulls-station/follow-appicon.png" alt=""></a>
          </figure><!-- /.bulls_station__follow__app__figure -->

          <div class="bulls_station__follow__app__text">
            <p class="bulls_station__follow__app__text__copy">アプリをダウンロードして<br />
            BULL’S STATIONの情報を手に入れよう</p>

            <div class="bulls_station__follow__app__text__btn">
              <a href="https://app.adjust.com/cfzxsd?deep_link=sportsbull%3A%2F%2F" target="_blank">ダウンロードはこちら</a>
            </div><!-- /.bulls_station__follow__app__text__btn -->
          </div><!-- /.bulls_station__follow__app__text -->
        </div><!-- /.bulls_station__follow__app__app -->

        <div class="bulls_station__follow__facebook">
          <div class="bulls_station__follow__facebook__likebox">
            <div class="fb-like" data-href="https://www.facebook.com/sportsbull/" data-layout="box_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
          </div><!-- /.bulls_station__follow__facebook__likebox -->
          <p class="bulls_station__follow__facebook__text">Facebookをいいね！して<br />
          <strong class="bulls_station__follow__facebook__text__color1">BULL’S</strong> <strong class="bulls_station__follow__facebook__text__color2">STATION</strong>の情報を手に入れよう</p>
        </div><!-- /.bulls_station__follow__facebook__facebook -->
      </div><!-- /.bulls_station__follow__facebook -->

      <?php
      // -----------------------------------------------
      // photo gallery
      $bulls_station_photos = bulls_station_json_photo();
      if (isset($bulls_station_photos)) :
        $bulls_station_photos_data = $bulls_station_photos->data;
        if (is_array($bulls_station_photos_data) && count($bulls_station_photos_data) > 0) :
          $bulls_station_photo_url = $bulls_station_photos->url;
          $count = 0;
      ?>
      <div class="bulls_station__photo_gallery">
        <h2 class="bulls_station__photo_gallery__heading"><img src="/assets/sp/images/bulls-station/gallery-heading.png" alt="PHOTO GALLERY"></h2>
        <div class="">

        <ul class="bulls_station__photo_gallery__list">
          <?php
          foreach ($bulls_station_photos_data as $bulls_station_photo) :
            // limit 4
            if ($count > 3) {
              break;
            }
          ?>
            <li class="bulls_station__photo_gallery__item">
              <a href="<?php echo $bulls_station_photo_url; ?>">
                <img src="<?php echo $bulls_station_photo->sp_thumb; ?>" alt="">
              </a>
            </li>
          <?php
            $count += 1;
          endforeach;
          ?>
        </ul><!-- /.bulls_station__photo_gallery__list -->

        <div class="bulls_station__photo_gallery__btn"><a href="/p/181566/">すべてのPHOTO GALLERYを見る</a></div>
      </div><!-- /.bulls_station__photo_gallery -->
      <?php
        endif;
      endif;
      // -----------------------------------------------
      ?>
      <?php
      // -----------------------------------------------
      // movie
      $bulls_station_movies = bulls_station_json_movie(4);
      if (isset($bulls_station_movies)) :
        $bulls_station_movie_response = $bulls_station_movies->response;
        if (isset($bulls_station_movie_response)) :
          $bulls_station_movie_response_articles = $bulls_station_movie_response->articles;
          if (is_array($bulls_station_movie_response_articles) && count($bulls_station_movie_response_articles) > 0) :
      ?>
      <div class="bulls_station__offshot_movie">
        <h2 class="bulls_station__offshot_movie__heading"><img src="/assets/sp/images/bulls-station/movie-heading.png" alt="OFFSHOT MOVIE"></h2>

        <ul class="bulls_station__offshot_movie__list">
          <?php
          foreach ($bulls_station_movie_response_articles as $bulls_station_movie_response_article) :
          ?>
            <li class="bulls_station__offshot_movie__item">
              <a href="<?php echo $bulls_station_movie_response_article->url ?>" title="<?php echo $bulls_station_movie_response_article->title; ?>">
                <img src="<?php echo $bulls_station_movie_response_article->img ?>" alt="<?php echo $bulls_station_movie_response_article->title; ?>">
              </a>
            </li>
          <?php
          endforeach;
          ?>
        </ul><!-- /.bulls_station__offshot_movie__list -->

        <div class="bulls_station__offshot_movie__btn"><a href="/bulls-station/off-shot-movie/">すべてのOFFSHOT MOVIEを見る</a></div>
      </div><!-- /.bulls_station__offshot_movie -->
      <?php
          endif;
        endif;
      endif;
      ?>

    </div><!-- .body-sec-inner -->
  </div><!-- /.body-sec -->

  <?php
  // # パンくずリスト
  // ==============================
    $BREADCRUMB = array(
      array(
        'label' => '番組紹介 - BULL\'S STATION',
        'path'  => '/bulls-station/'
      ),
    );
  ?>

  <footer class="foot-sec">
    <?php
    include_once __DIR__."/../../mobile/_footer-sec-inner.php";
    ?>
  </footer><!-- /.foot-sec -->

</div><!-- /.whole -->

<script src="/assets/js/bulls-station/parallax.js"></script>
<script>
  // Pretty simple huh?
  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene, {
    relativeInput: true,
    clipRelativeInput: false,
    hoverOnly: true
  });
</script>

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '842032129256034',
      xfbml      : true,
      version    : 'v2.11'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>

<script src="/assets/js/<?php echo $page['dir_name']; ?>.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>