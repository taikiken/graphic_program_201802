<?php

$app->get('/', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => '',
    'template' => 'index.php',
    'path'     => $args,
    'og_type'  => 'website',
  ));

  return $this->renderer->render($response, "_default.php", $args);

});

?>