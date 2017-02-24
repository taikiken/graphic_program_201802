<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <script>
  window.addEventListener("load", function() {
    window.location.href = 'pageloaded:' + window.location.href;
    window.page_status   = 'loaded'
  }, false);
  </script>
</head>
<body>
<div class="whole theme_big6">
<div id="body-section" class="body-sec" style="margin: 0;">
  <div class="body-sec-inner">
    <div class="main-sec">

        <?php include_once __DIR__."/mobile/category.php"; ?>

    </div><?php //.main-sec ?>
  </div><?php //.body-sec-inner ?>
</div><?php //.body-sec ?>
</div><?php //#page ?>


</body>
</html>