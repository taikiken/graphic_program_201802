<?php

/*

/login/

*/

$app->get('/login[/]', function ($request, $response, $args) {

  $args['page'] = array(
    'title'    => 'login',
    'template' => 'login.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "_default.php", $args);

});


?>