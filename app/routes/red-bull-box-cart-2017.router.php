<?php

// red-bull-holy-ride
// ==============================
$app->group('/red-bull-box-cart-2017',  function () use($app) {

  $page = array(
    'title'              => 'RED BULL BOX CART RACE 2017 ライブ配信',
    'site_name'          => 'スポーツブル / SPORTS BULL',
    'og_type'            => 'article',
    'og_title'           => 'RED BULL BOX CART RACE 2017 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'red-bull-box-cart-2017/',
    'og_image'           => $app->model->property('site_url').'assets/images/red-bull-box-cart-2017/ogp.png',
    'og_description'     => '説明文',
    'keywords'           => 'キーワード',
    'template'           => 'index',
    'template_classname' => 'red-bull-box-cart-2017',
    'ua'                 => $app->model->property('ua'),
  );


  // /red-bull-box-cart-2017/ -> /red-bull-box-cart-2017/live/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('/red-bull-box-cart-2017/live/', 301);
  });

  // live
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'red-bull-box-cart-2017/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'red-bull-box-cart-2017/mobile/index.php', $args);
    endif;

  });

});

?>