<?php

// ログイン - /login/
// ==============================
$app->get('/login[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => 'ログイン',
    'template' => 'login',
    'path'     => $args,
    'template_classname' => 'signup',
  ));

  return $this->renderer->render($response, "default.php", $args);

});

?>