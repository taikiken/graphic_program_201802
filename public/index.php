<?php

/**
*
* ViewのルーティングにSlim導入
* Slim - http://www.slimframework.com
*
* based on slim/slim-skeleton
*/

if (PHP_SAPI == 'cli-server') {
  $file = __DIR__ . $_SERVER['REQUEST_URI'];
  if (is_file($file)) {
    return false;
  }
}

// autoloader
// ==============================
require __DIR__ . '/../app/vendor/autoload.php';


// initialize
// ==============================
$settings = require __DIR__ . '/../app/config/local.php';
$app = new \Slim\App($settings);


// dependencies
// ==============================
require __DIR__ . '/../app/src/dependencies.php';


// middleware
// ==============================
require __DIR__ . '/../app/src/middleware.php';


// routes
// ==============================
$routes = glob( __DIR__.'/../app/routes/*.router.php');
foreach ($routes as $router) {
  require $router;
}


// Run app
$app->run();


?>