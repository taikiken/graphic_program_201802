<?php
/**
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * author: @taikiken
 * Date: 2017/09/12
 * Time: 19:13
 */
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
<div class="whole area">
  <div class="body-sec">
    <div class="main-sec">
      <?php
      // 地域一覧
      include_once __DIR__ . '/../mobile/category_area_map.php';
      ?>
    </div>
  </div>
</div>
</body>
</html>