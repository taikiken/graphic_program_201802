<?php
/**
 * stats - banner 一覧
 * User: @taikiken
 * Date: 2017/06/23
 * Time: 22:58
 * @see https://github.com/undotsushin/undotsushin/issues/2080
 */
// PC / SP 共用
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen"></script>
  <?php
  // copy from `/app/template/_head.php`
  if ( $page['ua'] == 'mobile' ) : ?>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php else : ?>
    <meta name="viewport" content="width=1280">
  <?php endif; ?>
  <title><?php echo strip_tags($page['title']).' | '.$page['site_name']; ?></title>

  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page['og_description']; ?>">
  <?php
  // --------------------------
  // css 切替
  if ($page['ua_device'] == 'desktop') :
  // desktop
  ?>
    <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <?php
  else :
  // mobile
  ?>
    <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <?php
  endif;
  // --------------------------
  ?>
</head>
<body>

</body>
</html>