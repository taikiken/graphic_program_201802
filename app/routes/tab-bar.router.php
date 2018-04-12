<?php
/**
 * Date: 2018/04/12
 * Time: 15:12
 */
$app->group('/tab-bar', function () use($app) {

  // 速報 - `livescore`
  // ==============================
  $this->get('/livescore[/]', function ($request, $response, $args) use ($app) {
    // /api/v1/bottomtab
    $tab_data = @file_get_contents($app->model->property('file_get_url') . '/api/v1/bottomtab/');
    $tab_response = json_decode($tab_data, true)['response'];

    // class name
    $template_classname = 'menu';

    // args
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'template'       => 'category',
      'title'          => 'XXX',
      'keywords'       => 'XXX',
      'og_description' => 'XXX',
      'og_title'       => 'XXX',
      'og_url'         => 'XXX',
      'og_image'       => 'XXX',
      'tab_response'   => $tab_response,
    ));

    if($app->model->property('ua') === 'mobile')
    {
      return $this->renderer->render($response, 'tab-bar/mobile/livescore.php', $args);
    }
    // desktop 無い
  });

  // 競技・種目 ページ - `category`
  // ==============================
  $this->get('/category[/]', function ($request, $response, $args) use ($app) {
    // /api/v1/bottomtab
    $tab_data = @file_get_contents($app->model->property('file_get_url') . '/api/v1/bottomtab/');
    $tab_response = json_decode($tab_data, true)['response'];

    // class name
    $template_classname = 'menu';

    // args
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'template'       => 'category',
      'title'          => 'XXX',
      'keywords'       => 'XXX',
      'og_description' => 'XXX',
      'og_title'       => 'XXX',
      'og_url'         => 'XXX',
      'og_image'       => 'XXX',
      'tab_response'   => $tab_response,
    ));

    if($app->model->property('ua') === 'mobile')
    {
      return $this->renderer->render($response, 'tab-bar/mobile/category.php', $args);
    }
    // desktop 無い
  });

  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, 'tab-bar/webview.php', $args);
    // desktop 無い
  });
});
