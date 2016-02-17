<?php

// ログアウト - /logout/
// ==============================
$app->get('/logout[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => 'ログアウト',
    'template' => 'logout',
    'path'     => $args,
  ));

  return $this->renderer->render($response, "default.php", $args);

});

?>