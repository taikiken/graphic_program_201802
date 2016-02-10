<?php

/*

/login/

*/

$app->get('/login[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = array(
    'title'    => 'login',
    'template' => 'login.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "default.php", $args);

});


?>