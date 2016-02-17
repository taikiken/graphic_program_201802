<?php

$app->group('/reset_password', function () use ($app) {

  // パスワードリセット - /reset_password/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => 'パスワードをリセットする',
      'template' => 'reset_password',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // パスワードリセット/再設定 - /reset_password/resetting/
  // ==============================
  $this->get('/{slug:resetting}[/]', function ($request, $response, $args) use ($app)  {

    $args['page'] = $app->model->set(array(
      'title'    => '再設定 | パスワードをリセットする',
      'template' => 'reset_password.'.$args['slug'],
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>