<?php

// autoloader
// ==============================
require __DIR__ . '/vendor/autoload.php';


// initialize
// ==============================
// TODO : 環境に応じてsettingsを切り替える
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

// TODO : この振り分けは4/1公開時削除する
// 現状あるのはアプリ申請のための記事詳細用定義
if ( UT_ENV === 'PRODUCTION' ) :

  // 必要なルーティングだけ読み込み
  // ------------------------------

  // ティザーページ
  $app->get('/', function ($request, $response, $args) use ($app) {
    return $this->renderer->render($response, "../../public/_index.html");
  });

  // 記事詳細 - アプリ向けに
  $app->get('/p/{article_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    // アプリからの記事詳細アクセスならWebView向けページを表示
    if ( $app->model->property('is_app') ) :

      $post = $app->model->get_post($args['article_id']);

      $args['page'] = $app->model->set(array(
        'title'     => $post['title'],
        'category'  => $post['category'],
        'template'  => 'p',
        'path'      => $args,
        'post'      => $post,
        'canonical' => "p/{$post['id']}/",
      ));

      return $this->renderer->render($response, "app.p.php", $args);

    endif;

  });

  // パスワードリセット
  require __DIR__ . '/routes/reset_password.router.php';

else :

  $routes = glob( __DIR__.'/routes/*.router.php');
  foreach ($routes as $router) {
    require $router;
  }

endif;



// Run app
$app->run();


?>