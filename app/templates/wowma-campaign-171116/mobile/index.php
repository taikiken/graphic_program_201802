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
  <div id="js-wowma_cpn__message" class="wowma_cpn__message <?php echo $display_enable; ?>">
    <p><img src="/assets/sp/images/wowma-campaign-171116/message-entry.png" alt="エントリーが完了しました"></p>
  </div><!-- /.wowma_cpn__message -->

  <div id="body-section" class="body-sec">
    <div class="body-sec-inner">

      <div class="wowma_cpn__summary">
        <div class="wowma_cpn__summary__inner">
          <p class="wowma_cpn__summary__lead"><img src="/assets/sp/images/wowma-campaign-171116/summary-lead.png" alt="SPORTS BULLアカウントを新規作成するとWowma!クーポン￥500をプレゼント！"></p>
          <figure class="wowma_cpn__summary__figure"><img src="/assets/sp/images/wowma-campaign-171116/summary-figure.png" alt=""></figure>
          <i class="wowma_cpn__summary__note"><img src="/assets/sp/images/wowma-campaign-171116/summary-note.png" alt="メールアドレスでの登録のみ対象です。Twitter、Facebookでの登録は今回対象外です。"></i>
          <i class="wowma_cpn__summary__catch"><img src="/assets/sp/images/wowma-campaign-171116/summary-catch.png" alt="Wowma!でスポーツ用品を買おう！"></i>
          <h1 class="wowma_cpn__summary__heading"><img src="/assets/sp/images/wowma-campaign-171116/summary-heading.png" alt="Wowma!クーポンプレゼントキャンペーン"></h1>
          <p class="wowma_cpn__summary__date"><img src="/assets/sp/images/wowma-campaign-171116/summary-date.png" alt="エントリー期間 : 2017年11月30日まで"></p>
        </div><!-- /.ushi__summary__inner -->
      </div><!-- /.ushi__summary -->

      <div class="wowma_cpn__regist__wrapper for-browser">

        <div id="js-wowma_cpn__mom" class="for-browser">
          <div id="js-wowma_cpn__regist" class="wowma_cpn__regist">
            <div class="wowma_cpn__regist__outer">
              <div class="wowma_cpn__regist__inner">
                <div class="wowma_cpn__regist__btn"><a href="/signup-wow/"><img src="/assets/sp/images/wowma-campaign-171116/regist-btn.png" alt="アカウント新規作成"></a></div>
              </div><!-- /.wowma_cpn__regist__inner -->
            </div><!-- /.wowma_cpn__regist__outer -->
          </div><!-- /.wowma_cpn__regist -->
        </div>

      </div><!-- /.ushi__pr_app__wrapper --><!-- /.ushi__pr_app__wrapper -->

      <div class="wowma_cpn__flow">
        <h2 class="wowma_cpn__flow__heading"><img src="/assets/sp/images/wowma-campaign-171116/flow-heading.png" alt="キャンペーンの流れ"></h2>
        <ul class="wowma_cpn__flow__list">
          <li class="wowma_cpn__flow__item wowma_cpn__flow__item--1">
            <h3 class="wowma_cpn__flow__item__heading"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow1-heading.png" alt="1. このページの「アカウント新規作成」ボタンを押す"></h3>
            <div class="wowma_cpn__flow__item__btn"><a href="/signup-wow/"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow1-btn.png" alt="アカウント新規作成"></a></div>
            <p class="wowma_cpn__flow__item__note"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow1-note.png" alt="※このページからの登録でないとクーポンは配布できません"></p>
          </li><!-- /.wowma_cpn__flow__item--1 -->
          <li class="wowma_cpn__flow__item wowma_cpn__flow__item--2">
            <h3 class="wowma_cpn__flow__item__heading"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow2-heading.png" alt="2. メールアドレスを入力してスポーツブルアカウントを作成"></h3>
            <p class="wowma_cpn__flow__item__note"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow2-note.png" alt="※Twitter / Facebookでの新規登録ではクーポンは配布できません"></p>
          </li><!-- /.wowma_cpn__flow__item--1 -->
          <li class="wowma_cpn__flow__item wowma_cpn__flow__item--3">
            <h3 class="wowma_cpn__flow__item__heading"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow3-heading.png" alt="3. もれなく！Wowma！で使える500円分のクーポンをプレゼント！"></h3>
            <p class="wowma_cpn__flow__item__note"><img src="/assets/sp/images/wowma-campaign-171116/flow-flow3-note.png" alt="メールでクーポンをお知らせします"></p>
          </li><!-- /.wowma_cpn__flow__item--3 -->
        </ul><!-- /.wowma_cpn__flow__list -->
        <p class="wowma_cpn__flow__notice">※クーポンはWowma!サイトでのみ使用できます</p>
      </div><!-- /.wowma_cpn__flow -->

      <div class="wowma_cpn__whatis">
        <div class="wowma_cpn__whatis__inner">
          <h2 class="wowma_cpn__whatis__heading"><img src="/assets/sp/images/wowma-campaign-171116/whatis-heading.png" alt="「スポーツブル」って？"></h2>
          <div class="wowma_cpn__whatis__copy"><img src="/assets/sp/images/wowma-campaign-171116/whatis-copy.png" alt="3分でスポーツを語れるようになる無料スポーツニュースアプリ"></div>
          <div class="wowma_cpn__whatis__btn__container">
            <h3 class="wowma_cpn__whatis__btn__heading"><img src="/assets/sp/images/wowma-campaign-171116/whatis-copy-app.png" alt="iPhone / Android対応今すぐダウンロード！"></h3>
            <div class="wowma_cpn__whatis__btn"><a href="https://app.adjust.com/6fv6u2" target="_blank"><img src="/assets/sp/images/wowma-campaign-171116/whatis-btn.png" alt="ダウンロードはこちら"></a></div>
          </div><!-- /.ushi__pr_app__btn__container -->
        </div><!-- /.wowma_cpn__whatis__inner -->
      </div><!-- /.wowma_cpn__whatis -->

      <div class="wowma_cpn__overview">
        <h2 class="wowma_cpn__overview__heading"><img src="/assets/images/ushi/overview-heading.png" alt="キャンペーン詳細"></h2>
        <div class="wowma_cpn__overview__inner">
          <table class="wowma_cpn__overview__data">
            <tbody>
              <tr>
                <th>キャンペーン期間</th>
                <td>2017年11月30日まで</td>
              </tr>
              <tr>
                <th>特典</th>
                <td><strong>Wowma！で使える500円分のクーポン</strong><br />
                ※1000円以上でご使用になれます</td>
              </tr>
              <tr>
                <th>条件</th>
                <td>本ページの「アカウント新規作成」ボタンからスポーツブルアカウントを新規作成すること。<br />
                ※Wowma!クーポンを受け取るには「Wowma!」に会員登録（無料）が必要になります。</td>
              </tr>
              <tr>
                <th>受取方法</th>
                <td>クーポン取得条件を達成されますと、ご登録完了メールより「Wowma!クーポン受取サイト」に移動することができ、特典のWowma!クーポンを取得可能です。</td>
              </tr>
              <tr>
                <th>クーポン詳細</th>
                <td>対象：条件を達成されたお客様全員<br />
                付与：1000円以上円以上のお買いもので利用できる500円クーポン<br />
                有効期限：2017年12月7日まで<br />
                注意事項：■チケット・金券を含む商品の金額は購入額にカウントされません。■クーポンは「対象のお店」に記載のお店でのみ、ご利用いただけます。■「対象のお店」はWowma!クーポン取得ページにて確認いただけます。■1回のお買物につき1枚のみご利用いただけます。■お一人様1枚、1回のみご利用いただけます。■他キャンペーンで付与されるクーポンとの併用はできません。■スマートフォン、PCでのみご利用いただけます。■ケータイ(フィーチャーフォン)ではご利用いただけません。</td>
              </tr>
              <tr>
                <th>注意事項</th>
                <td>※新規にスポーツブルアカウントを作成されたお客様のみ対象です<br />
                ※facebook, twitterでの登録は対象とはなりません<br />
                ※本キャンペーンは予告なく変更する場合があります。<br />
                ※本キャンペーンはApple Inc.またはその関連会社の提供・協賛によるもではありません。<br />
                ※スポーツブルの利用規約に反する行為が判明した場合、本キャンペーンの対象外となる場合がございます。</td>
              </tr>
              <tr>
                <th>お問い合わせ先</th>
                <td>メール：<a href="m&#97;&#105;l&#116;&#111;&#58;camp&#97;ig&#110;&#64;&#115;por&#116;&#115;b&#117;ll.j&#112;">&#99;a&#109;p&#97;&#105;&#103;n&#64;&#115;port&#115;bu&#108;l.&#106;p</a></td>
              </tr>
            </tbody>
          </table><!-- /.wowma_cpn__overview__data -->
        </div><!-- /.wowma_cpn__overview__inner -->
      </div><!-- /.wowma_cpn__overview -->

    </div><!-- .body-sec-inner -->
  </div><!-- /.body-sec -->

  <footer class="wowma_cpn__footer">
    <p class="wowma_cpn__footer__copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
  </footer><!-- /.wowma_cpn__footer -->

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