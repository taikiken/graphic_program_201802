<?php

/*

/signup/
/signup/account/
/signup/interest/

*/


$app->group('/signup', function () {

  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'signup',
      'template' => 'signup.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  $this->get('/{slug:account|interest}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'signup / '.$args['slug'],
      'template' => 'signup.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


});


?>