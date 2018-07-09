  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <!-- <script src="/assets/js/libs/jquery2/jquery.min.js?v="></script> -->

  <script src="/assets/js/live/libs.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/css/live/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">

  <link rel="stylesheet" href="/assets/css/basic.css?v=<?php echo $page['version']; ?>" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/sp/css/basic.css?v=<?php echo $page['version']; ?>" media="only screen and (max-width: 768px)">

  <link rel="stylesheet" href="/stats/assets/univbb/css/videoPlayer.css" />

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

  <script>
    var isApp = false;
    (function(){
    var param = window.location.search;
    if ( /app=ios/i.test(param) ) {
    document.querySelector('html').classList.add("undotsushin-ios");
    isApp = true;
    }
    if ( /app=android/i.test(param) ) {
    document.querySelector('html').classList.add("undotsushin-android");
    isApp = true;
    }

    if ( isApp ) {
    document.querySelector('html').classList.add("is-app");
    }
    })();
  </script>

  <?php include_once __DIR__ . '/../../_env.php'; ?>
</head>

<body>
  <div id="whole" class="whole <?php echo $page['template_classname']; ?>">
    <?php
    // app in webview 時に非表示にする
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
      <div class="bg-container">
        <div class="live--head">
            <img src="/assets/images/live/murasaki-shonan-open-2018/ttl_live.png" alt="" class="live-hide-pc">
            <img src="/assets/images/live/murasaki-shonan-open-2018/ttl_live_pc.png" alt="" class="live-hide-sp">
        </div>