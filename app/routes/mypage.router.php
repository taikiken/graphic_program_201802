<?php

$app->group('/mypage', function () {

  // マイページ - /mypage/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'mypage',
      'template' => 'mypage.php',
      'path'     => $args,
   );

    return $this->renderer->render($response, "_default.php", $args);

  });


  // マイページ/アクティビティ - /mypage/activities/
  // ==============================
  $this->get('/{slug:activities}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'mypage / '.$args['slug'],
      'template' => 'mypage.'.$args['slug'].'.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

});

?>