<?php

// ログアウト - /logout/
// ==============================
$app->get('/logout[/]', function ($request, $response, $args) use ($app) {

  $app->model->delete_cookie();

  header('Location: /');
  exit;

});

?>