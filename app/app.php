<?php

// autoloader
// ==============================
require __DIR__ . '/vendor/autoload.php';


// initialize
// ==============================
$settings = require __DIR__ . '/config/local.php';
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


$app->model = new ViewModel();


// routes / render
// ==============================
$routes = glob( __DIR__.'/routes/*.router.php');
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