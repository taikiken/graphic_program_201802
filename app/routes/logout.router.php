<?php

// ログアウト - /logout/
// ==============================
$app->get('/logout[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => 'ログアウト',
    'template' => 'logout.php',
    'path'     => $args,
  ));

  return $this->renderer->render($response, "_default.php", $args);

});

?>