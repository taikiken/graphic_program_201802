<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
  <script>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
  </script>

  <script>
    googletag.cmd.push(function() {
      googletag.defineSlot('/531683568/app_webview/app_webview_article_bottom', [300, 250], 'div-gpt-ad-1507098798348-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  </script>
</head>
<body>
<div id="page" class="whole post-single ">
<div class="body-sec" style="margin: 0;">
  <div class="body-sec-inner">
    <div class="main-sec">

      <div class="post-detail">

        <?php include_once __DIR__."/_app_body.php"; ?>

        <!-- /531683568/app_webview/app_webview_article_bottom -->
        <div id='div-gpt-ad-1507098798348-0' style='height:250px; width:300px; margin: 20px auto;'>
        <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1507098798348-0'); });
        </script>
        </div>

      </div><?php //.post-detail ?>

    </div><?php //.main-sec ?>
  </div><?php //.body-sec-inner ?>
</div><?php //.body-sec ?>
</div><?php //#page ?>


<?php if(count($page['photo']) > 0):?>

    <link rel="stylesheet" href="/assets/css/style_sp.css?v=<?php echo $page['version']; ?>">
    <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
    <script>
        $(".main").on("scroll", function(){
            // scrollされるたびに呼ばれる
        });

    </script>
<?php endif;?>
</body>
</html>