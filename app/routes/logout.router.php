<?php

/*

/logout/

*/

$app->get('/logout[/]', function ($request, $response, $args) {

  $args['page'] = array(
    'title'    => 'logout',
    'template' => 'logout.php',
    'path'     => $args,
  );

  return $this->renderer->render($response, "_default.php", $args);

});


?>