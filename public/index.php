<?php

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


// config
// TODO : 外出しするなり拡張するなり
// ==============================
$app->config = array(
  'title' => '運動通信',
);


// dependencies
// ==============================
require __DIR__ . '/../app/src/dependencies.php';


// middleware
// ==============================
require __DIR__ . '/../app/src/middleware.php';


// TODO - これDBからひっぱる必要あり〼 ref. #117
// カテゴリーを取得する
// ひとまず file_get_contentsで取得しておきますがパフォーマンスでないのでDBから直接 or キャッシュなりが理想です
$categories = file_get_contents('http://undotsushin.com/api/v1/category');
if ( $categories ) :
  $categories = json_decode($categories, true);
  foreach( $categories['response']['categories'] as $key => $value ) :
    // APIから取得したカテゴリー一覧を$appに格納しておく
    $app->config['categories'][$value['slug']] = $value;
  endforeach;
endif;


// routes
// ==============================
$routes = glob( __DIR__.'/../app/routes/*.router.php');
foreach ($routes as $router) {
  require $router;
}


// helper
// ==============================
$helpers = glob( __DIR__.'/../app/helpers/*.helper.php');
foreach ($helpers as $helper) {
  require $helper;
}

// UA - 設定 mobile|tablet|others
$ua      = new UserAgent();
$app->ua = $ua->set();


// demo
// ==============================
$app->get('/demo/{path:.*}', function ($request, $response, $args) use ( $app ) {

    // log
    $this->logger->info("demo '/demo'", $args);

    $args['request']  = $request;
    $args['response'] = $response;
    $args['args']     = array(
      'path' => $args['path'],
      'ua'   => $app->ua
    );

    return $this->renderer->render($response, 'demo.php', $args);

});


// Run app
$app->run();


?>