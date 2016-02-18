<?php

// 検索 - /search/
// ==============================
$app->group('/search', function () use($app) {


  // 検索トップ
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => '検索',
      'search'   => '',
      'template' => 'search',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // 検索結果
  // ==============================
  $this->get('/{search:.*}', function ($request, $response, $args) use ($app) {

    $searchWords = htmlspecialchars($args['search'], ENT_QUOTES, 'UTF-8');

    $args['page'] = $app->model->set(array(
      'title'    => "「".$searchWords.'」の検索結果',
      'search'   => $searchWords,
      'template' => 'search',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>