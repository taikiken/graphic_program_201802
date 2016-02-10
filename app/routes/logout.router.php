<?php

/*

/logout/

*/

$app->get('/logout[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = array(
    'title'    => 'logout',
    'template' => 'logout.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "default.php", $args);

});


?>