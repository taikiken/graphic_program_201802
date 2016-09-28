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
      'og_title' => '検索 | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'search/',
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
      'title'    => "「<span>".$searchWords.'</span>」の検索結果',
      'search'   => $searchWords,
      'og_title' => "「".$searchWords.'」の検索結果 | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'search/'.$searchWords,
      'template' => 'search',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>