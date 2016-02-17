<?php

$app->get('/', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => '',
    'template' => 'index',
    'path'     => $args,
    'og_type'  => 'website',
  ));

  return $this->renderer->render($response, "default.php", $args);

});

?>