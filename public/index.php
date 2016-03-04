<?php

include_once "local.php";
include_once "public/ut.php";

/**
*
* ViewのルーティングにSlim導入
* Slim - http://www.slimframework.com
*
* based on slim/slim-skeleton
*/


ini_set( 'display_errors', 1 );
date_default_timezone_set('Asia/Tokyo');


if (PHP_SAPI == 'cli-server') {
  $file = __DIR__ . $_SERVER['REQUEST_URI'];
  if (is_file($file)) {
    return false;
  }
}


require __DIR__ . '/../app/app.php';


?>