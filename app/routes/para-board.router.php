<?php
$app->group('/para-board', function () use($app) {

  // 日程一覧
  // ==============================
  $app->get('[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(

    ));


    if($app->model->property('ua') === 'desktop')
    {
      return $tis->renderer->render($response, 'para-board/desktop/index.php', $args);
    }
    else
    {
      return $this->renderer->render($response, 'para-board/mobile/index.php', $args);
    }

  });

  // 日程一覧 抽出時
  // ==============================
  $app->get('/{sports_id:all|[0-9]+}/{year:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(

    ));


    if($app->model->property('ua') === 'desktop')
    {
      return $this->renderer->render($response, 'para-board/desktop/index.php', $args);
    }
    else
    {
      return $this->renderer->render($response, 'para-board/mobile/index.php', $args);
    }

  });

  // 試合詳細
  // ==============================
  $app->get('/{competition_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(

    ));


    if($app->model->property('ua') === 'desktop')
    {
      return $this->renderer->render($response, 'para-board/desktop/detail.php', $args);
    }
    else
    {
      return $this->renderer->render($response, 'para-board/mobile/detail.php', $args);
    }

  });

  // webview
  // ==============================
  $app->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(

    ));


    return $this->renderer->render($response, 'para-board/webview.php', $args);


  });
});

?>