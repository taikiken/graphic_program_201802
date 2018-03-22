<?php

$app->group('/buttomtab', function () use ($app) {

  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $args['buttomtabs'] = $app->model->get_bottomtabs();
    return $this->renderer->render($response, 'buttomtab/webview.php', $args);

  });

});

?>