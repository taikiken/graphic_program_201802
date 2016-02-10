<?php

$app->group('/reset_password', function () {

  // パスワードリセット - /reset_password/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'reset_password',
      'template' => 'reset_password.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  // パスワードリセット/再設定 - /reset_password/resetting/
  // ==============================
  $this->get('/{slug:resetting}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'reset_password / '.$args['slug'],
      'template' => 'reset_password.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

});

?>