<?php

$app->get('/', function ($request, $response, $args) use ($app) {

  $args['page'] = array(
    'title'    => '',
    'template' => 'index.php',
    'path'     => $args,
    'og_type'  => 'website',
  );

  return $this->renderer->render($response, "_default.php", $args);

});

?>