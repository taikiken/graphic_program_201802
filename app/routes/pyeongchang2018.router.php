<?php

$app->group('/pyeongchang2018', function () use ($app) {


  // /pyeongchang2018/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['partners'] = $app->model->get_partners();

    return 'pyeongchang2018';
  });

  // フォト一覧
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, '/pyeongchang2018/photo.php', $args);

  });
  // ハイライト一覧
  // ==============================
  $this->get('/movie[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, '/pyeongchang2018/movie.php', $args);

  });
  // WebView
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, '/pyeongchang2018/webview.php', $args);

  });

});

?>