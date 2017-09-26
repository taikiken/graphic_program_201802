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

  <link rel="canonical" href="<?php echo $page['og_url']; ?>">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/sp/css/<?php echo $page['dir_name']; ?>/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
      var gads = document.createElement('script');
      gads.async = true;
      gads.type = 'text/javascript';
      var useSSL = 'https:' == document.location.protocol;
      gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
      var node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(gads, node);
    })();
  </script>

  <script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-74679267-1', 'auto');
   ga('require', 'GTM-KJ33JM9');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('send', 'pageview');

  </script>
  <style>
    .undotsushin-ios .for-browser,
    .undotsushin-android .for-browser {
      display: none;
    }
  </style>
</head>
<body class="appbnr-disable">
<div class="whole <?php echo $page['template_classname']; ?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <?php
  // ?display=entry で enable
  $display_enable = '';
  if ($_GET['display'] == 'entry') {
    $display_enable = 'enable';
  }
  ?>
  <div id="js-ushi__message" class="ushi__message <?php echo $display_enable; ?>">
    <p><img src="/assets/sp/images/ushi/message-entry.png" alt="エントリーが完了しました"></p>
  </div><!-- /.ushi__message -->

  <div id="body-section" class="body-sec">
    <div class="body-sec-inner">

      <div class="ushi__summary">
        <div class="ushi__summary__inner">
          <figure class="ushi__summary__niku">
            <img src="/assets/sp/images/ushi/summary-figure_niku.png" alt="">
            <figcaption class="ushi__summary__notice">※画像はイメージです</figcaption>
          </figure>
          <p class="ushi__summary__lead"><img src="/assets/sp/images/ushi/summary-lead.png" alt="スポーツニュースを3日連続見て最大5,000円分の高級ブランド牛を買えるクーポンがもらえる！"></p>
          <i class="ushi__summary__bull"><img src="/assets/sp/images/ushi/summary-figure_bull.png" alt=""></i>
          <h1 class="ushi__summary__heading"><img src="/assets/sp/images/ushi/summary-heading.png" alt="SPORTS BULL x Wowma! 牛キャンペーン"></h1>
          <p class="ushi__summary__date"><img src="/assets/sp/images/ushi/summary-date.png" alt="エントリー期間 2017年9月25日 - 10月31日まで"></p>
        </div><!-- /.ushi__summary__inner -->
      </div><!-- /.ushi__summary -->

      <div class="ushi__pr_app__wrapper">

        <div id="js-ushi__mom" class="for-browser">
          <div id="js-ushi__pr_app" class="ushi__pr_app cm_disable"><!-- CM公開前は .cm_disable -->
            <div class="ushi__pr_app__outer">
              <div class="ushi__pr_app__inner">
                <figure class="ushi__pr_app__cm"><a href="hoge"><img src="/assets/sp/images/ushi/pr_app-figure-cm.png" alt="TVCM放映中"></a></figure>
                <div class="ushi__pr_app__btn__container">
                  <h3 class="ushi__pr_app__btn__heading"><img src="/assets/sp/images/ushi/pr_app-copy.png" alt="アプリを無料ダウンロードして今すぐ応募する！"></h3>
                  <ul class="ushi__pr_app__btn__list">
                    <li class="ushi__pr_app__btn__item"><a class="ushi__pr_app__btn__link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/ushi/pr_app-btn-ios.png" alt="App Store"></a></li>
                    <li class="ushi__pr_app__btn__item"><a class="ushi__pr_app__btn__link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/ushi/pr_app-btn-android.png" alt="Google play"></a></li>
                  </ul><!-- /.ushi__pr_app__btn__list -->
                </div><!-- /.ushi__pr_app__btn__container -->
              </div><!-- /.ushi__pr_app__inner -->
            </div><!-- /.ushi__pr_app__outer -->
          </div><!-- /.ushi__pr_app -->
        </div>

      </div><!-- /.ushi__pr_app__wrapper -->

      <div class="ushi__flow">
        <h2 class="ushi__flow__heading"><img src="/assets/sp/images/ushi/flow-heading.png" alt="キャンペーンの流れ"></h2>
        <ul class="ushi__flow__list">
          <li class="ushi__flow__item ushi__flow__item--1"><img src="/assets/sp/images/ushi/flow-flow1.png" alt="1. スポーツブルアプリを起動"></li><!-- /.ushi__flow__item--1 -->
          <li class="ushi__flow__item ushi__flow__item--2">
            <p><img src="/assets/sp/images/ushi/flow-flow2.png" alt="2. アプリ内メッセージが届いたらキャンペーンにエントリーをタップ"></p>
            <p class="ushi__flow__notice"> ※アプリ内メッセージ (エントリーボタン) が届くまでには、<br />
            最大インストール翌日まで時間がかかる場合がございます。</p>
          </li><!-- /.ushi__flow__item--1 -->
          <li class="ushi__flow__item ushi__flow__item--3">
            <p><img src="/assets/sp/images/ushi/flow-flow3_text.png" alt="3. エントリーから3日連続アプリ起動でもれなく500円分のクーポンさらに抽選で200名様に5,000円分のクーポンがもらえる"></p>
            <ul>
              <li><img src="/assets/sp/images/ushi/flow-flow3_figure1.png" alt="抽選で200名様に5,000円"></li>
              <li><img src="/assets/sp/images/ushi/flow-flow3_figure2.png" alt="全員に500円"></li>
            </ul>
            <p class="ushi__flow__notice">※クーポンはWowma!サイトでのみ使用できます</p>
          </li><!-- /.ushi__flow__item--3 -->
        </ul><!-- /.ushi__flow__list -->
      </div><!-- /.ushi__flow -->

      <div class="ushi__whatis for-browser">
        <div class="ushi__whatis__inner">
          <h2 class="ushi__whatis__heading"><img src="/assets/sp/images/ushi/whatis-heading.png" alt="「スポーツブル」って？"></h2>
          <div class="ushi__whatis__copy"><img src="/assets/sp/images/ushi/whatis-copy.png" alt="3分でスポーツを語れるようになる無料スポーツニュースアプリ"></div>
          <div class="ushi__whatis__btn__container">
            <h3 class="ushi__whatis__btn__heading"><img src="/assets/sp/images/ushi/whatis-copy-app.png" alt="iPhone / Android対応今すぐダウンロード！"></h3>
            <div class="ushi__whatis__btn"><a href="https://app.adjust.com/7q5y6z" target="_blank"><img src="/assets/sp/images/ushi/whatis-btn.png" alt="ダウンロードはこちら"></a></div>
          </div><!-- /.ushi__pr_app__btn__container -->
        </div><!-- /.ushi__whatis__inner -->
      </div><!-- /.ushi__whatis -->

      <div class="ushi__overview">
        <h2 class="ushi__overview__heading"><img src="/assets/sp/images/ushi/overview-heading.png" alt="キャンペーン詳細"></h2>
        <div class="ushi__overview__inner">
          <table class="ushi__overview__data">
            <tbody>
              <tr>
                <th>エントリー期間</th>
                <td>2017年9月25日 ~ 2017年10月31日</td>
              </tr>
              <tr>
                <th>実施期間</th>
                <td>2017年9月25日 ~ 2017年11月02日</td>
              </tr>
              <tr>
                <th>特典</th>
                <td><strong>●500円クーポン</strong><br />
                条件を達成しましたら、Wowma!ページ上でクーポンを獲得の上、即時でご利用いただけます。<br />
                <strong>●5,000円クーポン</strong><br />
                条件を達成しましたら、Wowma!ページ上で応募が可能となります。当選しましたら、キャンペーン終了一週間を目途にWowma!上で付与されます。</td>
              </tr>
              <tr>
                <th>条件</th>
                <td>エントリー後に、期間内に「スポーツブル」アプリを(エントリー日を含め)3日連続利用すること。<br />
                ※Wowma! クーポンを受け取るには「Wowma!」に会員登録(無料)が必要になります。</td>
              </tr>
              <tr>
                <th>受取方法</th>
                <td>クーポン取得条件を達成されますと、「スポーツブル」アプリ内に表示されるメッセージ(バナー)より「Wowma! クーポンは受け取りサイト」 に移動することができ、特典のWowma! クーポンを取得可能です。<br />
                                <strong class="attention">※ 一度メッセージ（バナー）を消してしまうとクーポンの受取ができなくなりますのでご注意下さい。</strong></td>
              </tr>
              <tr>
                <th>クーポン詳細</th>
                <td><strong>●500円クーポン</strong><br />
                  対象：条件を達成されたお客様全員<br />
                  付与：即時<br />
                  内容：2,000円以上のお買い物に利用できる500円クーポン<br />
                有効期限：2017年11月30日まで<br />
                注意事項：■チケット・金券を含む商品の金額は購入額にカウントされません。■クーポンは「対象のお店」に記載のお店でのみ、ご利用いただけます。■「対象のお店」はWowma!クーポン取得ページにて確認いただけます。■1回のお買物につき1枚のみご利用いただけます。■お一人様1枚、1回のみご利用いただけます。■他キャンペーンで付与されるクーポンとの併用はできません。■スマートフォン、PCでのみご利用いただけます。■ケータイ(フィーチャーフォン)ではご利用いただけません。<br />
                <br />
                <strong>●5,000円クーポン</strong><br />
                対象：条件を達成されたお客様から抽選で200名様<br />
                付与：11月9日頃を目途にメールで当選者様のみにご連絡いたします。<br />
                内容：5,000円以上のお買い物に利用できる5,000円クーポン<br />
                有効期限：2017年11月30日まで<br />
                注意事項：■チケット・金券を含む商品の金額は購入額にカウントされません。■クーポンは「対象のお店」に記載のお店でのみ、ご利用いただけます。■「対象のお店」はWowma!クーポン取得ページにて確認いただけます。■1回のお買物につき1枚のみご利用いただけます。■お一人様1枚、1回のみご利用いただけます。■他キャンペーンで付与されるクーポンとの併用はできません。■スマートフォン、PCでのみご利用いただけます。■ケータイ(フィーチャーフォン)ではご利用いただけません。</td>
              </tr>
              <tr>
                <th>注意事項</th>
                <td>※エントリー後に3日連続ご利用なかった場合、特典は受け取れません。<br />
                ※再エントリーはできません。<br />
                ※本キャンペーンは予告なく変更する場合があります。<br />
                ※本キャンペーンはApple Inc.またはその関連会社の提供・協賛によるもではありません。<br />
                ※スポーツブルの利用規約に反する行為が判明した場合、本キャンペーンの対象外となる場合がございます。</td>
              </tr>
              <tr>
                <th>お問い合わせ先</th>
                <td class="ushi__overview__inquiry" target="_blank">&raquo; <a href="https://sportsbull.jp/p/195780/">スポーツブルに関するお問い合わせ</a><br />
                &raquo; <a href="https://faq.wowma.jp/" target="_blank">クーポンに関するお問い合わせ</a></td>
              </tr>
            </tbody>
          </table><!-- /.ushi__overview__data -->
        </div><!-- /.ushi__overview__inner -->
      </div><!-- /.ushi__overview -->

    </div><!-- .body-sec-inner -->
  </div><!-- /.body-sec -->

  <footer class="ushi__footer for-browser">
    <div class="ushi__footer__btn__container">
      <h3 class="ushi__footer__btn__heading"><img src="/assets/sp/images/ushi/footer-copy-app.png" alt="iPhone / Android対応今すぐダウンロード！"></h3>
      <ul class="ushi__footer__btn__list">
        <li class="ushi__footer__btn__item"><a class="ushi__footer__btn__link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/ushi/footer-btn-ios.png" alt="App Store"></a></li>
        <li class="ushi__footer__btn__item"><a class="ushi__footer__btn__link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/ushi/footer-btn-android.png" alt="Google play"></a></li>
      </ul><!-- /.ushi__pr_app__btn__list -->
    </div><!-- /.ushi__pr_app__btn__container -->
    <p class="ushi__footer__copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
  </footer><!-- /.ushi__footer -->

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

<script src="/assets/js/<?php echo $page['dir_name']; ?>.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>