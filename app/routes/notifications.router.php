<?php

// お知らせ - /notifications
// ==============================
$app->get('/notifications[/]', function ($request, $response, $args) {

  $args['page'] = array(
    'title'    => 'notifications',
    'template' => 'notifications.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "_default.php", $args);

});

?>