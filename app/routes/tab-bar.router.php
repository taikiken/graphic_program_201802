<?php
/**
 * Date: 2018/04/12
 * Time: 15:12
 */
$app->group('/tab-bar', function () use($app) {
  // 速報 - `livescore`
  // ==============================
  $this->get('/livescore[/]', function ($request, $response, $args) use ($app) {


    if($app->model->property('ua') === 'desktop')
    {
      return $this->renderer->render($response, 'tab-bar/desktop/livescore.php', $args);
    }
    else
    {
      return $this->renderer->render($response, 'tab-bar/mobile/livescore.php', $args);
    }
  });
});
