<?php

// ログアウト - /logout/
// ==============================
$app->get('/logout[/]', function ($request, $response, $args) use ($app) {

  $app->user_helper->delete_cookie();

  header('Location: /');
  exit;

});

?>