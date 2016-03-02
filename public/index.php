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


// helper
// ==============================
$helpers = glob( __DIR__.'/../app/helpers/*.helper.php');
foreach ($helpers as $helper) {
  require $helper;
}


// models
// ==============================
$models = glob( __DIR__.'/../app/models/*.model.php');
foreach ($models as $model) {
  require $model;
}


$app->model = new ViewModel();


// routes / render
// ==============================
$routes = glob( __DIR__.'/../app/routes/*.router.php');
foreach ($routes as $router) {
  require $router;
}




// demo
// ==============================
$app->get('/demo/{path:.*}', function ($request, $response, $args) use ( $app ) {

    // log
    $this->logger->info("demo '/demo'", $args);

    $args['args']     = array(
      'path'  => $args['path'],
      'page' => $app->model->set(array(
        'title' => 'demo',
        'args'  => $args['path'],
      )),
    );

    $args['request']  = $request;
    $args['response'] = $response;

    return $this->renderer->render($response, 'demo.php', $args);

});


// Run app
$app->run();


?>