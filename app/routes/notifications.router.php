<?php

// お知らせ - /notifications
// ==============================
$app->get('/notifications[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => 'お知らせ',
    'template' => 'notifications',
    'path'     => $args,
  ));

  return $this->renderer->render($response, "default.php", $args);

});

?>