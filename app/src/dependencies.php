<?php
// DIC configuration

$container = $app->getContainer();


$container['notFoundHandler'] = function ($c) use ($app) {
  return function ($request, $response) use ($app, $c) {

    $args['page'] = $app->model->set(array(
      'title'    => '404 Not Found',
    ));

    $args['request']  = $request;
    $args['response'] = $response;

    return $c['renderer']->render($response, 'errors/404.php', $args)->withStatus(404);

  };
};


// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], Monolog\Logger::DEBUG));
    return $logger;
};
