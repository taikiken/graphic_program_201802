<?php

$ua = mb_strtolower($_SERVER['HTTP_USER_AGENT']);
if ( strpos($ua,'iphone') !== false ) :
  $is_iphone = true;
endif;

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
</head>
<body>
<div class="whole theme_big6">
<div id="body-section" class="body-sec" style="margin: 0;">
  <div class="body-sec-inner">
    <div class="main-sec">

      <?php if ( $is_iphone ) : ?>
        <?php include_once __DIR__.'/live.php'; ?>
      <?php endif; ?>

        <?php include_once __DIR__."/mobile/category.php"; ?>

    </div><?php //.main-sec ?>
  </div><?php //.body-sec-inner ?>
</div><?php //.body-sec ?>
</div><?php //#page ?>

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.9&appId=588648481289313";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

</body>
</html>