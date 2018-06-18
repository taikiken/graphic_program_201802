<?php

// #2185 inhigh
// ==============================
$app->group('/{slug:inhightv}',  function () use($app) {


  // /inhigh/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('https://inhightv.sportsbull.jp/', 301);
  });


  // photo
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv - フォト',
      'og_title'           => 'インハイ.tv - フォト |'.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhightv/photo/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/photo.php', $args);

  });


  // highlight
  // ==============================
  $this->get('/highlight[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv - ハイライト',
      'og_title'           => 'インハイ.tv - ハイライト| '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhightv/highlight/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/highlight.php', $args);

  });


  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv',
      'og_title'           => 'インハイ.tv | '.$app->model->property('title'),
      'path'               => $args,
      'template'           => 'webview',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/webview.php', $args);

  });

});

?>