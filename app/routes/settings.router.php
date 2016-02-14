<?php

$app->group('/settings', function () use ($app) {


// 基本情報設定 - /settings/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = array(
      'title'    => '基本情報設定 | 設定',
      'template' => 'settings.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  // パーソナライズ設定 - /settings/interest/
  // ==============================
  $this->get('/{slug:interest}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = array(
      'title'    => 'パーソナライズ設定 | 設定',
      'template' => 'settings.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  // ソーシャル連携 - /settings/social/
  // ==============================
  $this->get('/{slug:social}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = array(
      'title'    => 'ソーシャル連携 | 設定',
      'template' => 'settings.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  // 退会 - /settings/deactivate/
  // ==============================
  $this->get('/{slug:deactivate}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = array(
      'title'    => '基本情報設定 | 設定',
      'template' => 'settings.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


});

?>