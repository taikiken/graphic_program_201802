<?php

// autoloader
// ==============================
require __DIR__ . '/vendor/autoload.php';


// initialize
// ==============================
$settings = require __DIR__ . '/settings/local.php';
$app = new \Slim\App($settings);


// dependencies
// ==============================
require __DIR__ . '/src/dependencies.php';


// middleware
// ==============================
require __DIR__ . '/src/middleware.php';


// helper
// ==============================
$helpers = glob( __DIR__.'/helpers/*.helper.php');
foreach ($helpers as $helper) {
  require $helper;
}


// models
// ==============================
$models = glob( __DIR__.'/models/*.model.php');
foreach ($models as $model) {
  require $model;
}


// set app
// ==============================
$app->model        = new ViewModel();
$app->user_helper  = new UserHelper($app->model);


// routes / render
// ==============================

// // ティザーページ
// $app->get('/', function ($request, $response, $args) use ($app) {
//   return $this->renderer->render($response, "../../public/_index.html");
// });

$routes = glob( __DIR__.'/routes/*.router.php');
foreach ($routes as $router) {
  require $router;
}


// Run app
$app->run();


?>