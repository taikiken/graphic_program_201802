<?php

$app->group('/mypage', function () use ($app) {

  // マイページ - /mypage/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ( $app ) {

    $app->model->check_logged_in();

    $args['page'] = $app->model->set(array(
      'title'    => 'マイページ',
      'og_title' => 'マイページ | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'mypage/',
      'template' => 'mypage',
      'path'     => $args,
   ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // マイページ/アクティビティ - /mypage/activities/
  // ==============================
  $this->get('/{slug:activities}[/]', function ($request, $response, $args) use ( $app ) {

    $app->model->check_logged_in();

    $args['page'] = $app->model->set(array(
      'title'    => 'アクティビティ | マイページ',
      'og_title' => 'アクティビティ | マイページ | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'mypage/activities/',
      'template' => 'mypage.'.$args['slug'],
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>