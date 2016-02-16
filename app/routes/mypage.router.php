<?php

$app->group('/mypage', function () use ($app) {

  // マイページ - /mypage/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ( $app ) {

    $args['page'] = $app->model->set(array(
      'title'    => 'マイページ',
      'template' => 'mypage.php',
      'path'     => $args,
   ));

    return $this->renderer->render($response, "_default.php", $args);

  });


  // マイページ/アクティビティ - /mypage/activities/
  // ==============================
  $this->get('/{slug:activities}[/]', function ($request, $response, $args) {

    $args['page'] = $app->model->set(array(
      'title'    => 'アクティビティ | マイページ',
      'template' => 'mypage.'.$args['slug'].'.php',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "_default.php", $args);

  });

});

?>