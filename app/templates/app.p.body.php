<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
</head>
<body>
<div id="page" class="whole post-single ">
<div class="body-sec" style="margin: 0;">
  <div class="body-sec-inner">
    <div class="main-sec">

      <div class="post-detail">

        <?php include_once __DIR__."/_app_body.php"; ?>

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