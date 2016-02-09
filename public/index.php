<?php

/**
* ViewのルーティングにSlim導入
* Slim - http://www.slimframework.com
*
*/
require '../app/vendor/autoload.php';

$app = new Slim\App();

# HOME
# ==============================
$app->get('/', function ( $request, $response, $args ) {
  $response->write("Welcome to Slim! & undotsushin.com");
  return $response;
});


$app->get('/hello[/{name}]', function ($request, $response, $args) {
  $response->write("Hello, " . $args['name']);
  return $response;
})->setArgument('name', 'World!');


$app->run();


?>