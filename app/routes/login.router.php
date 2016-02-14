<?php

// ログイン - /login/
// ==============================
$app->get('/login[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = array(
    'title'    => 'ログイン',
    'template' => 'login.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "_default.php", $args);

});

?>