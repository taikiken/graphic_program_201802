<?php
// include_once __DIR__."/../_include/_bulls_station_func.php";
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

      <nav class="id_sports2017__nav">
        <div class="id_sports2017__nav__inner">
          <ul class="id_sports2017__nav--nav">
            <li class="id_sports2017__nav__item"><a href="#anchor-1">大会映像</a></li>
            <li class="id_sports2017__nav__item"><a href="#anchor-2">大会写真</a></li>
            <li class="id_sports2017__nav__item"><a href="#anchor-3">記録映像</a></li>
          </ul><!-- /.id_sports2017__nav--nav1 -->

          <dl class="id_sports2017__nav--sns">
            <dt class="id_sports2017__nav__item"><img src="/assets/sp/images/id-sports-2017/nav-sns-heading.png" alt="SHARE"></dt>
            <dd class="id_sports2017__nav__item"><a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=554, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow"><img src="/assets/images/id-sports-2017/nav-sns-facebook.png" alt="facebookでシェアする"></a></dd>
            <dd class="id_sports2017__nav__item"><a class="twitter btn" href="http://twitter.com/share?url=<?php echo $page['og_url']; ?>&text=「第1回知的障がい者スポーツ交流プログラム」は、アジア地域における知的障がい者スポーツの発展に日韓が協力して推進し、スポーツを通じた国際協力及び交流を目的に行われています。 http://sportsbull.jp/id-sports-2017/" target="_blank"><img src="/assets/images/id-sports-2017/nav-sns-twitter.png" alt="twitterでシェアする"></a></dd>
          </dl><!-- /.id_sports2017__nav--nav2 -->
        </div><!-- /.id_sports2017__nav__inner -->
      </nav><!-- .id_sports2017__nav -->

      <div class="id_sports2017__summary">
        <div class="id_sports2017__summary__movie"></div><!-- /.id_sports2017__summary__movie -->

        <div class="id_sports2017__summary__text">
          <h1 class="id_sports2017__summary__text--1"><img src="/assets/sp/images/id-sports-2017/summary-text1.png" alt="第一回知的障がい者日韓スポーツ交流プログラム"></h1>
          <p class="id_sports2017__summary__text--2"><img src="/assets/sp/images/id-sports-2017/summary-text2.png" alt="JAPAN - KOREA ID SPORTS 2017"></p>
          <p class="id_sports2017__summary__text--3"><img src="/assets/sp/images/id-sports-2017/summary-text3.png" alt="Exchange Program"></p>
          <div class="id_sports2017__summary__text--4"><img src="/assets/sp/images/id-sports-2017/summary-flag.png" alt=""></div>
        </div><!-- /.id_sports2017__summary__text -->
      </div><!-- /.id_sports2017__summary -->

      <div class="id_sports2017__intro">
        <div class="id_sports2017__intro__inner">
          <h2 class="id_sports2017__intro__heading">第一回知的障がい者<br />
          日韓スポーツ交流プログラム</h2>
          <p class="id_sports2017__intro__copy">エクアドル2015 グローバルゲームスに参加した有志により当プログラムは構成され、<br />
          アジア地域における知的障がい者スポーツの発展に日韓が協力して推進し、スポーツを通じた国際協力及び交流を目的に行われるものである。<br />
          また、これらの草の根的活動は、日本政府が進める Sport for Tomorrow の精神に準拠したスポーツ国際貢献事業である。</p>

          <div id="anchor-1" class="id_sports2017__intro__hilight_movie">
            <h3 class="id_sports2017__intro__hilight_movie__heading"><img src="/assets/sp/images/id-sports-2017/intro-highlight-label.png" alt="ハイライト動画"></h3>
            <div class="id_sports2017__intro__hilight_movie__video">
              <a href="/p/196654/" target="_blank"><img src="/assets/sp/images/id-sports-2017/intro-highlight-movie.png" alt=""></a>
            </div><!-- /.id_sports2017__intro__hilight_movie__video -->
          </div><!-- /.id_sports2017__intro__hilight_movie -->
        </div><!-- /.id_sports2017__intro__inner -->
      </div><!-- /.id_sports2017__intro -->

      <div class="id_sports2017__overview">
        <div class="id_sports2017__overview__inner">
          <h2 class="id_sports2017__overview__heading">大会開催概要</h2>
          <table class="id_sports2017__overview__data">
            <tbody>
              <tr>
                <th>大会名</th>
                <td>第1回 知的障がい者日韓スポーツ交流プログラム</td>
              </tr>
              <tr>
                <th>主催</th>
                <td>知的障がい者日韓スポーツ交流プログラム実行委員会</td>
              </tr>
              <tr>
                <th>協力</th>
                <td>(公財)スペシャルオリンピックス日本 / 日本体育大学</td>
              </tr>
              <tr>
                <th>協賛</th>
                <td>(株)JTBコーポレートセールス / (株)グロリアツアーズ / (株)運動通信社(スポーツブル) / (株)カンタベリーオブニュージーランドジャパン</td>
              </tr>
              <tr>
                <th>後援</th>
                <td>(公財)日本障がい者スポーツ協会 日本パラリンピック委員会 / 全国特別支援学校知的障害教育校長会</td>
              </tr>
              <tr>
                <th>実施日</th>
                <td>2017年 9月8日(金) 〜 10日(日)<br />
                ＜9月8日＞ 午前：移動 / 午後：コンディショニング及びトレーニング / 夜：レセプション<br />
                ＜9月9日＞ 終日：スポーツプログラム（日本選手側合流）<br />
                ＜9月10日＞終日：文化交流／夜：移動</td>
              </tr>
              <tr>
                <th>会場</th>
                <td>日本体育大学内各施設（健志台キャンパス）<br />
                〒227-0033 神奈川県横浜市青葉区鴨志田町1212-1<br />
                TEL. 045-963-7910</td>
              </tr>
              <tr>
                <th>参加資格</th>
                <td>知的障害のある者(療育手帳取得者。あるいはその「条件」に合致する者)その程度は問わない。<br />
                医師の診断を受け、スポーツに支障がないと認められた者。</td>
              </tr>
              <tr>
                <th>競技規定</th>
                <td>国際大会における各IFの規定に準ず</td>
              </tr>
              <tr>
                <th>参加チーム数（人数）</th>
                <td>＜韓国側＞<br />
                4競技(以下32名)。陸上競技6名(選手男女各2名・コーチ2名) / 水泳6名(選手男女各2名・コーチ2名) / 卓球6名(選手男女各2名・コーチ2名) / バスケットボール10名(選手男子8名・コーチ2名) / 選手団長1名 / チームリーダー1名 / チームスタッフ2名<br />
                ＜日本側＞<br />
                韓国側と同数に調整</td>
              </tr>
              <tr>
                <th>表彰・参加料</th>
                <td>なし</td>
              </tr>
              <tr>
                <th>宿舎・食事</th>
                <td>宿舎：学校法人日本体育大学健志台ゲストハウス / 食事：健志台キャンパス学生食堂等</td>
              </tr>
            </tbody>
          </table><!-- /.id_sports2017__overview__data -->
        </div><!-- /.id_sports2017__overview__inner -->
      </div><!-- /.id_sports2017__overview -->

      <div class="id_sports2017__gallery_container">
        <div id="anchor-2" class="id_sports2017__photo_gallery">
          <h2 class="id_sports2017__photo_gallery__heading"><img src="/assets/sp/images/id-sports-2017/gallery-heading.png" alt="大会写真"></h2>

          <ul class="id_sports2017__photo_gallery__list">
            <li class="id_sports2017__photo_gallery__item"><a href="/a/196156/?id=69"><img src="https://img.sportsbull.jp/photo/main/59c37a542892c.jpg" alt=""></a></li>
            <li class="id_sports2017__photo_gallery__item"><a href="/a/196156/?id=372"><img src="https://img.sportsbull.jp/photo/main/59c3857aa0763.jpg" alt=""></a></li>
            <li class="id_sports2017__photo_gallery__item"><a href="/a/196156/?id=414"><img src="https://img.sportsbull.jp/photo/main/59c3863756956.jpg" alt=""></a></li>
            <li class="id_sports2017__photo_gallery__item"><a href="/a/196156/?id=111"><img src="https://img.sportsbull.jp/photo/main/59c37b7a48649.jpg" alt=""></a></li>
            <li class="id_sports2017__photo_gallery__item"><a href="/a/196156/?id=261"><img src="https://img.sportsbull.jp/photo/main/59c381380cd12.jpg" alt=""></a></li>
          </ul><!-- /.id_sports2017__photo_gallery__list -->

          <div class="id_sports2017__photo_gallery__btn"><a href="/a/196156/">すべての大会写真を見る</a></div>
        </div><!-- /.id_sports2017__photo_gallery -->

        <div id="anchor-3" class="id_sports2017__offshot_movie">
          <h2 class="id_sports2017__offshot_movie__heading"><img src="/assets/sp/images/id-sports-2017/movie-heading.png" alt="記録映像"></h2>

          <ul class="id_sports2017__offshot_movie__list">
            <li class="id_sports2017__offshot_movie__item"><a href="/p/196654/"><img src="https://img.sportsbull.jp/thumbnail1/img2017092219135763918100.png" alt=""></a></li>
            <li class="id_sports2017__offshot_movie__item"><a href="/p/195275/"><img src="https://img.sportsbull.jp/thumbnail1/img2017091920323831312700.png" alt=""></a></li>
            <li class="id_sports2017__offshot_movie__item"><a href="/p/195272/"><img src="https://img.sportsbull.jp/thumbnail1/img2017091920352797434900.png" alt=""></a></li>
            <li class="id_sports2017__offshot_movie__item"><a href="/p/195271/"><img src="https://img.sportsbull.jp/thumbnail1/img2017091920243129846000.png" alt=""></a></li>
            <li class="id_sports2017__offshot_movie__item"><a href="/p/195273/"><img src="https://img.sportsbull.jp/thumbnail1/img2017091920305424178900.png" alt=""></a></li>
          </ul><!-- /.id_sports2017__offshot_movie__list -->

          <?php
          // <div class="id_sports2017__offshot_movie__btn hide"><a href="/id-sports-2017/off-shot-movie/">すべての記録映像を見る</a></div>
          ?>
        </div><!-- /.id_sports2017__offshot_movie -->
      </div><!-- /.id_sports2017__gallery_container -->

    </div><!-- .body-sec-inner -->
  </div><!-- /.body-sec -->

  <?php
  // # パンくずリスト
  // ==============================
    $BREADCRUMB = array(
      array(
        'label' => '第1回知的障がい者スポーツ交流プログラム',
        'path'  => '/id-sports-2017/'
      ),
    );
  ?>

  <footer class="foot-sec">
    <?php
    include_once __DIR__."/../../mobile/_footer-sec-inner.php";
    ?>
  </footer><!-- /.foot-sec -->

</div><!-- /.whole -->

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '842032129256034',
      xfbml      : true,
      version    : 'v2.5'
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

<?php
/*
<script src="/assets/js/<?php echo $page['dir_name']; ?>.bundle.js?v=<?php echo $page['version']; ?>"></script>
*/
?>

</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>