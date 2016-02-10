<?php

$app->get('/', function ($request, $response, $args) {

  $args['page'] = array(
    'title'    => '運動通信',
    'template' => 'index.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "_default.php", $args);

});

?>