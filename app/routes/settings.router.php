<?php

$app->group('/settings', function () use ($app) {


// 基本情報設定 - /settings/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => '基本情報設定 | 設定',
      'template' => 'settings',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // パーソナライズ設定 - /settings/interest/
  // ==============================
  $this->get('/{slug:interest}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => 'パーソナライズ設定 | 設定',
      'template' => 'settings.'.$args['slug'],
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // ソーシャル連携 - /settings/social/
  // ==============================

  // #433 - 初回リリース見送りのためコメントアウト
  // $this->get('/{slug:social}[/]', function ($request, $response, $args) use ($app) {

  //   $args['page'] = $app->model->set(array(
  //     'title'    => 'ソーシャル連携 | 設定',
  //     'template' => 'settings.'.$args['slug'],
  //     'path'     => $args,
  //   ));

  //   return $this->renderer->render($response, "default.php", $args);

  // });


  // 退会 - /settings/deactivate/
  // ==============================
  $this->get('/{slug:deactivate}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => '基本情報設定 | 設定',
      'template' => 'settings.'.$args['slug'],
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


});

?>