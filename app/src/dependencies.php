<?php
// DIC configuration

$container = $app->getContainer();


$container['notFoundHandler'] = function ($c) use ($app) {
  return function ($request, $response) use ($app, $c) {

    if ( UT_ENV === 'PRODUCTION' ) :
        return $c['response']
            ->withStatus(404)
            ->withHeader('Content-Type', 'text/html')
            ->write('<h1>404 : Page not found</h1>');

    else :

        $args['page'] = $app->model->set(array(
          'title'    => '404 Not Found',
          'template' => 404,
        ));

        $args['request']  = $request;
        $args['response'] = $response;

        if ( $app->model->property('ua') === 'desktop' ) :
            return $c['renderer']->render($response, 'desktop/404.php', $args)->withStatus(404);
        else :
            return $c['renderer']->render($response, 'mobile/404.php', $args)->withStatus(404);
        endif;

    endif;

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
