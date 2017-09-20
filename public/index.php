<?php


if (PHP_SAPI == 'cli-server') {
  $file = __DIR__ . $_SERVER['REQUEST_URI'];
  if (is_file($file)) {
    return false;
  }
}

// # IS_MAINTENANCE
// true : メンテ中 - アプリ内すべてのページでメンテ表示
// ==============================
$is_maintenance = false;

// メンテ表示のdebug用
if ( isset($_GET['maintenance']) ) :
  $is_maintenance = true;
endif;

// # Slim
// ==============================
/**
*
* ViewのルーティングにSlim導入
* Slim - http://www.slimframework.com
*
* based on slim/slim-skeleton
*/
date_default_timezone_set('Asia/Tokyo');


require __DIR__ . '/../app/app.php';


?>