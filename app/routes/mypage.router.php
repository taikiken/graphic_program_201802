<?php

$app->group('/mypage', function () use ($app) {

  // マイページ - /mypage/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ( $app ) {

    $args['page'] = $app->model->set(array(
      'title'    => 'マイページ',
      'template' => 'mypage',
      'path'     => $args,
   ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // マイページ/アクティビティ - /mypage/activities/
  // ==============================
  $this->get('/{slug:activities}[/]', function ($request, $response, $args) {

    $args['page'] = $app->model->set(array(
      'title'    => 'アクティビティ | マイページ',
      'template' => 'mypage.'.$args['slug'],
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>