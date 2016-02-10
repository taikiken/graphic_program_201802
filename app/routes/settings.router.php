<?php

$app->group('/settings', function () {

  // プロフィール設定 - /settings/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'settings',
      'template' => 'settings.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

  // プロフィール設定/好きな競技を設定|ソーシャル設定|退会 - /settings/interest|social|deactivate/
  // ==============================
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