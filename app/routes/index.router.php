<?php

$app->get('/', function ($request, $response, $args) {

  $args['page'] = array(
    'template' => 'index.php'
  );

  return $this->renderer->render($response, "default.php", $args);

});


?>