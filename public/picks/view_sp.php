<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charset="UTF-8">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-cache">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <title>編集部おすすめ記事 BULL'S PICKS | SPORTS BULL</title>
  <meta name="apple-itunes-app" content="app-id=1086719653">
  <meta name="description" content="毎日配信される膨大な記事の中から、オススメ記事と言いつつ編集長が独断と偏見とたっぷりの真心を込めてお届けします。">
  <meta name="keywords" content="スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy">
  <!-- sns ogp -->
  <meta property="og:title" content="編集部おすすめ記事 BULL'S PICKS | SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://sportsbull.jp/assets/images/common/og_image.png">
  <meta property="og:url" content="https://sportsbull.jp/picks/">
  <meta property="og:description" content="毎日配信される膨大な記事の中から、オススメ記事と言いつつ編集長が独断と偏見とたっぷりの真心を込めてお届けします。">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@sportsbull_jp">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/picks/">
  <?php
  endif;
  // -----------------------------------------
  ?>
  <link rel="stylesheet" href="/assets/sp/css/picks/ui.css?v=<?php echo $page['version']; ?>">

  <script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-74679267-1', 'auto');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('send', 'pageview');
  </script>

</head>
<body class="appbnr-disable">
<div class="whole picks">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <?php
  endif;
  // -----------------------------------------
  ?>

  <div class="body-sec">
    <div class="body-sec-inner">

      <section class="main-sec">

        <div class="summary">
          <div class="summary__inner">
            <p class="summary__caption"><img src="/assets/sp/images/picks/overview-caption.png" alt="編集部おすすめ記事"></p>
            <h1 class="summary__heading"><img src="/assets/sp/images/picks/overview-heading.png" alt="BULL'S PICKS"></h1>
            <p class="summary__date"><span><?php echo $xml_date_value; ?></span> UPDATE</p>

            <div class="summary__aboutus">
              <dl id="js-summary__aboutus__inner" class="summary__aboutus__inner">
                <dt id="js-summary__aboutus__heading" class="summary__aboutus__heading">BULL'S PICKSとは</dt>
                <dd id="js-summary__aboutus__text" class="summary__aboutus__text">毎日配信される膨大な記事の中から、オススメ記事と言いつつ編集長が独断と偏見とたっぷりの真心を込めてお届けします。</dd>
              </dl>
            </div><!-- /.summary__aboutus -->
          </div><!-- /.summary__inner -->
        </div><!-- /.summary -->

<?php foreach( $page['data'] as $key => $value ) :
// 記事一覧ループ
?>

        <article class="post">
          <header class="post__header">
            <a href="<?php echo $value['post']['url']; ?>">
              <figure class="post__figure">
                <img src="<?php echo $value['post']['media']['images']['medium']; ?>" alt="">
              </figure>
              <div class="post__data">
                <h1 class="post__heading"><?php echo $value['post']['title']; ?></h1>
                <p class="post__category"><?php echo $value['post']['category']['label']; ?></p>
                <p class="post__date"><?php echo $value['post']['display_date']; ?></p>
              </div><!-- /.post__data -->
            </a>
          </header><!-- /.post__header -->

          <div class="post__highlight">
            <ul class="post__highlight__list">
    <?php foreach( $value['post']['comment'] as $i => $comment ) : ?>
              <li class="post__highlight__item">
                <?php echo $comment; ?>
              </li>
    <?php endforeach; ?>
            </ul><!-- /.post__highlight__list -->
          </div><!-- /.post__highlight -->

          <div class="post__btn">
            <a href="<?php echo $value['post']['url']; ?>">記事を読む</a>
          </div>
        </article><!-- /.post -->

<?php endforeach; ?>

        <div class="link_recent">
          <a href="/category/all/">すべての新着記事をみる</a>
        </div><!-- /.link_recent -->

      </section><!-- /.main-sec -->
    </div>
  </div><!-- /.body-sec -->

  <?php
  // app in webview 時に .foot-sec を非表示にする
  if (!$from_webview) :
  ?>
  <footer class="foot-sec">
    <div class="foot-sec-inner">

      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure class="foot-pr-logo"><img src="/assets/sp/images/common/footer-overview-logo.png" alt="SPORTS BULL"></figure>
          <div class="text-block">
            <h3 class="foot-pr-heading">スポーツブルアプリをダウンロード</h3>
            <ul class="foot-pr-list">
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
          </div>
        </div><!-- /.foot-pr-inner -->

        <div class="fb-page-plugin">
          <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
        </div>

        <div class="foot-pr-bnr"><a href="http://pickup.syndot.jp/about/?utm_source=undou_sp&utm_medium=banner&utm_campaign=search" target="_blank"><img src="/assets/sp/images/common/bnr-footer-synsearch.png" alt="Syn.search チャットで検索？"></a></div>
      </div><!-- /.foot-pr -->

      <div id="js-page_top" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

      <nav class="fnav">
        <ul>
          <li><a href="/about/">サービス紹介</a></li>
          <li><a href="/about/privacy/">プライバシーポリシー</a></li>
          <li><a href="/about/company/">会社概要</a></li>
          <li><a href="/about/terms/">利用規約</a></li>
        </ul>
      </nav><!-- /.fnav -->

      <div class="sns-block">
        <ul>
          <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
          <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
          <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
        </ul>
      </div><!-- /.sns-block -->

      <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->
  <?php
  // -----------------------------------------
  endif;
  ?>

</div><!-- /.whole -->

<?php
// app in webview 時に .foot-sec を非表示にするので FB いらない
if (!$from_webview) :
?>
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
endif;
// -----------------------------------------
?>

<script src="/assets/js/picks.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>
