<?php
/**
 * モータースポーツ
 * User: @taikiken
 * Date: 2017/07/07
 * Time: 13:24
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=1280">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
  <title><?php echo strip_tags($page['motorsports']['title']).' | '.$page['site_name']; ?></title>
  <meta name="keywords" content="<?php echo $page['motorsports']['keywords']; ?>">
  <meta name="description" content="<?php echo $page["motorsports"]['og_description']; ?>">
  <!-- sns ogp -->
  <meta property="fb:app_id" content="<?php echo $page['app_id']; ?>">
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['motorsports']['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page["motorsports"]['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page["motorsports"]['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page["motorsports"]['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@<?php echo $page['sns']['twitter']; ?>">
  <meta name="twitter:title" content="<?php echo $page['motorsports']['og_title']; ?>">
  <meta name="twitter:image" content="<?php echo $page["motorsports"]['og_image']; ?>">
  <meta name="twitter:url" content="<?php echo $page["motorsports"]['og_url']; ?>">
  <meta name="twitter:description" content="<?php echo $page["motorsports"]['og_description']; ?>">
  <!-- favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/motorsports/<?php echo $option_directory; ?>/">
  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php // #1876 - Google Optimize ?>
  <style>.async-hide { opacity: 0 !important} </style>
  <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  })(window,document.documentElement,'async-hide','dataLayer',4000,
  {'GTM-KJ33JM9':true});</script>
  <?php // Google Optimize ?>

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
</head>
<body>

<div id="whole" class="whole dark layout-list motorsports motorsports--<?php echo $option_directory; ?>">

  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

<?php
// body section
// -------------------------------------------------------------------------------
?>
  <div class="body-sec">

    <div class="special-summary">
      <h1 class="special-summary-heading"><img src="/assets/images/motorsports/summary-heading_<?php echo $option_directory; ?>.png" alt="<?php echo strtoupper($page['motorsports']['url']) ?>(FORMULA1) レース日程・結果"></h1>
    </div><!-- /.special-summary -->

    <nav class="motorsports__category-nav">
      <ul class="motorsports__category-nav__list">
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--top" href="/category/motorsports/">MOTOR SPORTS TOP</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--f1" href="/motorsports/f1/">F1 レース日程・結果</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--sgt" href="/motorsports/sgt/">SGT レース日程・結果</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--wec" href="/motorsports/wec/">WEC レース日程・結果</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--wrc" href="/motorsports/wrc/">WRC レース日程・結果</a></li>
      </ul><!-- /.motorsports__category-nav__list -->
    </nav><!-- /.motorsports__category-nav -->

    <?php
    // pickup-container - carousel
    // ===========================================
    include_once dirname(__DIR__) . '/_include/_pickup_container.php';
    // ===========================================
    ?>
    <div class="body-sec-inner">
      <section class="main-sec">

        <?php
        // ----------------------------------------------------
        // 記事一覧: pc banner
        if ( !empty($page['category']['banner']['pc']['image']) && !empty($page['category']['banner']['pc']['link']) ) :
          ?>
          <div class="sponsor-link mt30">
            <a href="<?php echo $page['category']['banner']['pc']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['pc']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['pc']['image']; ?>" alt="<?php echo $page['category']['banner']['pc']['text'] ? $page['category']['banner']['pc']['text'] : '' ?>"></a>
          </div>
          <?php
        endif;
        // eof: 記事一覧: pc banner
        // ---------------------------------------------------- ?>

        <div class="motorsports_stats">

          <section class="matches">
            <h2 class="matches__heading mod-headingA">オートポリス</h2>
            <table class="matches__table mod-table">
              <thead>
                <tr>
                  <th class="matches__table__th">イベント</th>
                  <th class="matches__table__th">開催日</th>
                  <th class="matches__table__th">日本時間</th>
                  <th class="matches__table__th">1位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>公式練習（GT500）</td>
                  <td>5月20日（土）</td>
                  <td>09:00 ~</td>
                  <td>山本尚貴／伊沢拓也（#100 RAYBRIG NSX-GT）</td>
                </tr>
                <tr>
                  <td>公式練習（GT300）</td>
                  <td>5月20日（土）</td>
                  <td>09:00 ~</td>
                  <td>中山友貴／川端伸太朗（#18 UPGARAGE BANDOH 86）</td>
                </tr>
                <tr>
                  <td>予選（GT500）</td>
                  <td>5月20日（土）</td>
                  <td>13:30 ~</td>
                  <td>山本尚貴／伊沢拓也（#100 RAYBRIG NSX-GT）</td>
                </tr>
                <tr>
                  <td>予選（GT300）</td>
                  <td>5月20日（土）</td>
                  <td>13:30 ~</td>
                  <td>松井孝允／山下健太（#25 VivaC 86 MC）</td>
                </tr>
                <tr>
                  <td>決勝（GT500）</td>
                  <td>5月21日（日）</td>
                  <td>14:00 ~</td>
                  <td>中嶋一貴／ジェームス・ロシター（#36 au TOM'S LC500）</td>
                </tr>
                <tr>
                  <td>決勝（GT300）</td>
                  <td>5月21日（日）</td>
                  <td>14:00 ~</td>
                  <td>松井孝允／山下健太（#25 VivaC 86 MC）</td>
                </tr>
              </tbody>
            </table><!-- /.matches__table -->
          </section><!-- /.matches -->

          <section class="point_rank">
            <h2 class="point_rank__heading mod-headingA">ポイントランキング</h2>

            <nav class="point_rank__nav">
              <ul class="point_rank__nav__list">
                <li class="point_rank__nav__item"><a class="point_rank__nav--driver selected" href="#">ドライバーランキング</a></li>
                <li class="point_rank__nav__item"><a class="point_rank__nav--team" href="#">チームランキング</a></li>
              </ul>
            </nav><!-- /.point_rank__nav -->

            <table id="point_rank--driver" class="point_rank__table mod-table selected">
              <thead>
                <tr>
                  <th class="point_rank__table__th">順位</th>
                  <th class="point_rank__table__th">ドライバー</th>
                  <th class="point_rank__table__th">チーム</th>
                  <th class="point_rank__table__th">ポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>平川亮／ニック・キャシディ</td>
                  <td>#37 KeePer TOM'S LC500</td>
                  <td>36</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ジェームス・ロシター</td>
                  <td>#36 au TOM'S LC500</td>
                  <td>32</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>立川祐路／石浦宏明</td>
                  <td>#38 ZENT CERUMO LC500</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>大島和也／アンドレア・カルダレッリ</td>
                  <td>#6 WAKO'S 4CR LC500</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>中嶋一貴</td>
                  <td>#36 au TOM'S LC500</td>
                  <td>26</td>
                </tr>
              </tbody>
            </table><!-- /.point_rank__table -->

            <table id="point_rank--team" class="point_rank__table mod-table">
              <thead>
                <tr>
                  <th class="point_rank__table__th">順位</th>
                  <th class="point_rank__table__th">チーム</th>
                  <th class="point_rank__table__th">ポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>#37 KeePer TOM'S LC500</td>
                  <td>45</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>#36 au TOM'S LC500</td>
                  <td>41</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>#38 ZENT CERUMO LC500</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>#6 WAKO'S 4CR LC500</td>
                  <td>37</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>#23 MOTUL AUTECH GT-R</td>
                  <td>27</td>
                </tr>
              </tbody>
            </table><!-- /.point_rank__table -->
          </section><!-- /.point_rank -->

          <section class="race_info">
            <h2 class="race_info__heading mod-headingA">グランプリ情報</h2>

            <dl class="race_info__accordion--trigger">
              <dt>岡山</dt>
              <dd>4月8日-9日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>4月8日（土）</td>
                    <td>09:00 ~</td>
                    <td>立川祐路／石浦宏明（#38 ZENT CERUMO LC500）</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>4月8日（土）</td>
                    <td>09:00 ~</td>
                    <td>谷口信輝／片岡龍也（#4 グッドスマイル 初音ミク AMG）</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>4月8日（土）</td>
                    <td>14:45 ~</td>
                    <td>野尻智紀／小林崇志（#8 ARTA NSX-GT）</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>4月8日（土）</td>
                    <td>14:45 ~</td>
                    <td>黒澤治樹／蒲生尚弥（#65 LEON CVSTOS AMG-GT）</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>4月9日（日）</td>
                    <td>14:30 ~</td>
                    <td>平川亮／ニック・キャシディ（#37 KeePer TOM'S LC500）</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>4月9日（日）</td>
                    <td>14:30 ~</td>
                    <td>谷口信輝／片岡龍也（#4 グッドスマイル 初音ミク AMG）</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>富士</dt>
              <dd>5月3日-4日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>5月3日（水）</td>
                    <td>09:00 ~</td>
                    <td>立川祐路／石浦宏明（#38 ZENT CERUMO LC500）</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>5月3日（水）</td>
                    <td>09:00 ~</td>
                    <td>藤井誠暢／スヴェン・ミューラー（#33 D'station Porsche）</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>5月3日（水）</td>
                    <td>14:40 ~</td>
                    <td>立川祐路／石浦宏明（#38 ZENT CERUMO LC500）</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>5月3日（水）</td>
                    <td>14:40 ~</td>
                    <td>谷口信輝／片岡龍也（#4 グッドスマイル 初音ミク AMG）</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>5月4日（木）</td>
                    <td>14:10 ~</td>
                    <td>立川祐路／石浦宏明（#38 ZENT CERUMO LC500）</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>5月4日（木）</td>
                    <td>14:10 ~</td>
                    <td>中山雄一／坪井翔（#51 JMS Lmcorsa RC F GT3）</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>オートポリス</dt>
              <dd>5月20日-21日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>5月20日（土）</td>
                    <td>09:00 ~</td>
                    <td>山本尚貴／伊沢拓也（#100 RAYBRIG NSX-GT）</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>5月20日（土）</td>
                    <td>09:00 ~</td>
                    <td>中山友貴／川端伸太朗（#18 UPGARAGE BANDOH 86）</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>5月20日（土）</td>
                    <td>13:30 ~</td>
                    <td>山本尚貴／伊沢拓也（#100 RAYBRIG NSX-GT）</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>5月20日（土）</td>
                    <td>13:30 ~</td>
                    <td>松井孝允／山下健太（#25 VivaC 86 MC）</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>5月21日（日）</td>
                    <td>14:00 ~</td>
                    <td>中嶋一貴／ジェームス・ロシター（#36 au TOM'S LC500）</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>5月21日（日）</td>
                    <td>14:00 ~</td>
                    <td>松井孝允／山下健太（#25 VivaC 86 MC）</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>SUGO</dt>
              <dd>7月22日-23日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>7月22日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>7月22日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>7月22日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>7月22日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>7月23日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>7月23日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>富士</dt>
              <dd>8月5日-6日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>8月5日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>8月5日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>8月5日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>8月5日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>8月6日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>8月6日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>鈴鹿</dt>
              <dd>8月26日-27日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>8月26日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>8月26日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>8月26日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>8月26日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>8月27日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>8月27日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>タイ</dt>
              <dd>10月7日-9日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>10月8日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>10月8日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>10月8日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>10月8日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>10月9日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>10月9日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->

            <dl class="race_info__accordion--trigger">
              <dt>もてぎ</dt>
              <dd>11月11日-12日</dd>
            </dl><!-- /.race_info__accordion--trigger -->
            <div class="race_info__accordion--body">
              <table class="race_info__table mod-table">
                <thead>
                  <tr>
                    <th class="race_info__table__th">イベント</th>
                    <th class="race_info__table__th">開催日</th>
                    <th class="race_info__table__th">日本時間</th>
                    <th class="race_info__table__th">1位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>公式練習（GT500）</td>
                    <td>11月11日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>公式練習（GT300）</td>
                    <td>11月11日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT500）</td>
                    <td>11月11日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>予選（GT300）</td>
                    <td>11月11日（土）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT500）</td>
                    <td>11月12日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>決勝（GT300）</td>
                    <td>11月12日（日）</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>

              </table><!-- /.race_info__table -->
            </div><!-- /.race_info__accordion--body -->
          </section><!-- /.race_info -->
        </div><!-- /.motorsports_stats -->

        <?php
        // headline-container
        // ===========================================
        include_once dirname(__DIR__) . '/_include/_headline_container.php';
        // ===========================================
        ?>

        <nav class="motorsports__category-btns">
          <ul class="motorsports__category-btns__list">
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/f1/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_f1-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_f1-text.png" alt="F1 / FORMULA 1 レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/sgt/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_sgt-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_sgt-text.png" alt="SGT / Super GT レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/wec/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wec-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wec-text.png" alt="WEC / FIA WORLD ENDURANCE CHAMPIONSHIP レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/wrc/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wrc-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wrc-text.png" alt="WRC / FIA WORLD RALLY CHAMPIONSHIP レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
          </ul>
        </nav><!-- /.motorsports__category-btns -->
      </section>

      <section class="side-sec">
        <?php
       include_once __DIR__."/../../../app/templates/desktop/_sidebar_ad.php";
        ?>
      </section><!-- /.side-sec -->

    </div><!--/.body-sec-inner-->
  </div><!--/.body-sec-->
<?php
// -------------------------------------------------------------------------------
?>

<script src="/assets/js/motorsports.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
include_once __DIR__."/../../../app/templates/desktop/_footer.php";
include_once __DIR__."/../../../app/templates/_debug.php";
?>
