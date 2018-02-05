<?php

$app->group('/pyeongchang2018', function () use ($app) {


  // /pyeongchang2018/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['partners'] = $app->model->get_partners();

    return;
  });

  // フォト一覧
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, '/pyeongchang2018/desktop/photo.php', $args);
    else :
      return $this->renderer->render($response, '/pyeongchang2018/mobile/photo.php', $args);
    endif;
  });
  // ハイライト一覧
  // ==============================
  $this->get('/movie[/]', function ($request, $response, $args) use ($app) {

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, '/pyeongchang2018/desktop/movie.php', $args);
    else :
      return $this->renderer->render($response, '/pyeongchang2018/mobile/movie.php', $args);
    endif;
  });
  // WebView
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, '/pyeongchang2018/webview.php', $args);

  });

});

?>