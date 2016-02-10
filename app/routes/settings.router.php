<?php

/*

/settings/
/settings/interest/
/settings/social/
/settings/deactivate/

*/


$app->group('/settings', function () {

  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'settings',
      'template' => 'settings.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  $this->get('/{slug:interest|social|deactivate}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'settings / '.$args['slug'],
      'template' => 'settings.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


});


?>