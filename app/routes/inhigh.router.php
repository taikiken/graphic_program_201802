<?php

// #2185 inhigh
// ==============================
$app->group('/{slug:inhigh}',  function () use($app) {


  // /inhigh/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv',
      'og_title'           => 'インハイ.tv | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhigh/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhigh/index.php', $args);

  });


  // photo
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv - フォト',
      'og_title'           => 'インハイ.tv - フォト |'.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhigh/photo/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhigh/photo.php', $args);

  });


  // highlight
  // ==============================
  $this->get('/highlight[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv - ハイライト',
      'og_title'           => 'インハイ.tv - ハイライト| '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhigh/highlight/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhigh/highlight.php', $args);

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

    return $this->renderer->render($response, 'inhigh/webview.php', $args);

  });

});

?>