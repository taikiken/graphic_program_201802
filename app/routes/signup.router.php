<?php

$app->group('/signup', function () {

  // 新規登録 - /signup/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'signup',
      'template' => 'signup.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

  // 新規登録/基本情報入力|興味のある競技を選択 - /signup/account|interest/
  // ==============================
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