<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <script src="/assets/js/app_divide.bundle.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>フォトギャラリー 関西学生アメリカンフットボールリーグ | 速報 &amp; データ | SPORTS BULL</title>
  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>

  <meta name="keywords" content="">
  <meta name="description" content="">

  <meta property="fb:app_id" content="842032129256034">
  <meta property="og:site_name" content="スポーツブル / SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:title" content="フォトギャラリー 関西学生アメリカンフットボールリーグ | 速報 &amp; データ | SPORTS BULL">
  <meta property="og:image" content="https://sportsbull.jp/assets/stats/ua_kansai/images/ogp.jpg">
  <meta property="og:url" content="https://sportsbull.jp/stats/ua_kansai/photo/">
  <meta property="og:description" content="関西学生アメリカンフットボールリーグ 試合速報&データ見るならスポーツブル(スポブル)で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。">
  <meta property="og:locale" content="ja_JP" />

  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sportsbull_jp">
  <meta name="twitter:title" content="フォトギャラリー 関西学生アメリカンフットボールリーグ | 速報 &amp; データ | SPORTS BULL">
  <meta name="twitter:image" content="https://sportsbull.jp/assets/stats/ua_kansai/images/ogp.jpg">
  <meta name="twitter:url" content="https://sportsbull.jp/stats/ua_kansai/photo/">
  <meta name="twitter:description" content="関西学生アメリカンフットボールリーグ 試合速報&データ見るならスポーツブル(スポブル)で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。">

  <?php include_once __DIR__.'/_head.php'; ?>

  <!-- css & js -->
  <link rel="stylesheet" href="/assets/css/photo/photo.css" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/css/photo/sp_photo.css" media="only screen and (max-width: 768px)">

</head>
<body>

<!-- ad/531683568/appvador -->
<div id='div-gpt-ad-1501126889988-0'>
<style>#div-gpt-ad-1501126889988-0 * { line-height:0; }</style>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1501126889988-0'); });
</script>
<script type="text/javascript" src="//cdn.apvdr.com/js/apv-ifbstr.min.js"></script>
</div>
<!-- ad/531683568/appvador -->

<div id="whole" class="whole">

  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div class="body-sec">
    <div class="body-sec-inner">

      <section class="main-sec">

 <?php
$db=new db;
$db->connect();
$photo="";
$subdomain=preg_match("/dev/",$_SERVER["SERVER_NAME"])?"dev-img":"img";
$i=0;
$sql="select id,img1,title,a1,a2,a3 from repo_n where d2=57 and flag=1 and swf is null order by (a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':'||a6)::timestamp desc";
$db->query($sql);
while($f=$db->fetch_array()){
  $v=array(
    "title"=>htmlspecialchars($f["title"]),
    "date"=>sprintf("%s.%s.%s",$f["a1"],$f["a2"],$f["a3"]),
    "img"=>sprintf("https://%s.sportsbull.jp/img/%s",$subdomain,$f["img1"]),
    "url"=>sprintf("/p/%s/",$f["id"])
  );
  $photo.=sprintf('<li><a href="%s"><div class="img"><img src="%s" alt="%s"></div><p class="txt">%s</p></a></li>',$v["url"],$v["img"],$v["title"],$v["date"]);
  if($i==0)$end=sprintf("%s.%s",$f["a2"],$f["a3"]);
  $start=sprintf("%s.%s.%s",$f["a1"],$f["a2"],$f["a3"]);
  $i++;
}
?>

        <div class="ttl-wrapper">
            <h2 class="ttl photo"><i></i>フォトギャラリー</h2>
            <p class="ttl_date"><?php echo $start; ?> - <?php echo $end; ?></p>
        </div>

        <div id="js-current-post" class="current-post photo_gallery">
            <ul class="photo_list">
<?php echo $photo; ?>
            </ul>
        </div>

      </section><!-- /.main-sec -->

      <section class="side-sec show-for-large">
        <div id="sidebar-moving-container">

          <div class="sponsor-link">
            <!-- /531683568/kansai-amefoot-ad/ua-pc-sidebar-rectabgle -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/kansai-amefoot-ad/ua-pc-sidebar-rectabgle', [300, 250], 'div-gpt-ad-1510649945193-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1510649945193-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1510649945193-0'); });
            </script>
            </div>
            <!-- // /531683568/kansai-amefoot-ad/ua-pc-sidebar-rectabgle -->
          </div>

          <div class="app-bnr">
            <!-- ad/531683568/pc_sidebar_top_2nd -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/pc_sidebar_top_2nd', [300, 120], 'div-gpt-ad-1494939250039-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1494939250039-0' style='height:120px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1494939250039-0'); });
            </script>
            </div>
            <!-- // ad/531683568/pc_sidebar_top_2nd -->
          </div>

          <!-- sidebar recommend, オススメ記事 -->
          <div id="widget-recommend-list-container"></div><!--/recommend-->

          <div id="widget-ranking-container"></div><!--/ranking-->

          <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

          <div id="widget-recommend-container"></div><!--/videos-->
          <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

        </div><!--/#sidebar-moving-->
      </section>
    </div>
  </div><!-- /.body-sec -->

<?php
// # footer
// ==============================
  $BREADCRUMB = array(
    array(
      'label' => '関西アメフト フォトギャラリー',
      'path'  => './'
    ),
  );
  // footer dom
  include_once __DIR__.'/../../_footer-responsive.php';
?>

</div><!-- /.whole -->

<!-- for facebook -->
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<!-- // for facebook -->

<script src="/assets/js/global.bundle.js"></script>
<script src="/assets/stats/ua_kansai/js/amefoot.bundle.js"></script>
</body>
</html>