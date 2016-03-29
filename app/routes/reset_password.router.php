<?php

$app->group('/reset_password', function () use ($app) {

  // パスワードリセット - /reset_password/
  // ==============================
  $this->any('[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => 'パスワードをリセットする',
      'og_title' => 'パスワードをリセットする | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'reset_password/',
      'template' => 'reset_password',
      'path'     => $args,
      'template_classname' => 'signup',
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // パスワードリセット/再設定 - /reset_password/resetting/
  // ==============================
  $this->any('/{slug:resetting}[/]', function ($request, $response, $args) use ($app)  {

    $args['page'] = $app->model->set(array(
      'title'    => '再設定 | パスワードをリセットする',
      'og_title' => '再設定 | パスワードをリセットする | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'reset_password/resetting/',
      'template' => 'reset_password.resetting',
      'path'     => $args,
      'template_classname' => 'signup',
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


});

?>