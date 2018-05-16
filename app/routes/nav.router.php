<?php
/**
 * Date: 2018/04/12
 * Time: 15:12
 */
$app->group('/nav', function () use($app) {

  // 速報 - `livescore`
  // ==============================
  $this->get('/stats[/]', function ($request, $response, $args) use ($app) {
    // /api/v1/bottomtab
    $tab_data = @file_get_contents($app->model->property('file_get_url') . '/api/v1/bottomtab/');
    $tab_response = json_decode($tab_data, true)['response'];

    // class name
    $template_classname = 'menu';

    // args
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'template'       => 'category',
      'title'          => '速報・データ',
      'keywords'       => $app->model->property('keywords'),
      'og_description' => $app->model->property('og_description'),
      'og_title'       => '速報・データ | '.$app->model->property('title_short'),
      'og_url'         => $app->model->property('site_url').'nav/stats/',
      'og_image'       => $app->model->property('og_image'),
      'tab_response'   => $tab_response,
    ));

    if($app->model->property('ua') === 'mobile')
    {
      return $this->renderer->render($response, 'nav/mobile/stats.php', $args);
    }
    else{
        header('Location: /');
        exit;
    }
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
      'title'          => '競技・種目 | '.$app->model->property('title'),
      'keywords'       => $app->model->property('keywords'),
      'og_description' => $app->model->property('og_description'),
      'og_title'       => '競技・種目 | '.$app->model->property('title_short'),
      'og_url'         => $app->model->property('site_url').'nav/category/',
      'og_image'       => $app->model->property('og_image'),
      'tab_response'   => $tab_response,
    ));

    if($app->model->property('ua') === 'mobile')
    {
      return $this->renderer->render($response, 'nav/mobile/category.php', $args);
    }
    else{
        header('Location: /');
        exit;
    }
    // desktop 無い
  });

//  // webview
//  // ==============================
//  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {
//
//    return $this->renderer->render($response, 'tab-bar/webview.php', $args);
//  });
});
