<?php
$app->group('/para-board', function () use($app) {

  // 日程一覧
  // ==============================
  $app->get('[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('parasposts');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' parasposts';

    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'       => $category,
      'template'       => 'category',
      'title'          => 'XXXXX',
      'keywords'       => 'XXXXX',
      'og_description' => 'XXXXX',
      'og_title'       => 'XXXXX',
      'og_url'         => $app->model->property('site_url') . 'para-board/',
      'og_image'       => 'XXXXX',
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

  // 日程一覧 抽出時
  // ==============================
  $app->get('/{sports_id:all|[0-9]+}/{year:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('parasposts');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' parasposts';

    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'       => $category,
      'template'       => 'category',
      'title'          => 'XXXXX',
      'keywords'       => 'XXXXX',
      'og_description' => 'XXXXX',
      'og_title'       => 'XXXXX',
      'og_url'         => $app->model->property('site_url') . 'para-board/',
      'og_image'       => 'XXXXX',
      'sports_id'      => $args['sports_id'],
      'year'           => $args['year'],
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


    $category = $app->model->get_category_by_slug('parasposts');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' parasposts';

    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'       => $category,
      'template'       => 'category',
      'title'          => 'XXXXX',
      'keywords'       => 'XXXXX',
      'og_description' => 'XXXXX',
      'og_title'       => 'XXXXX',
      'og_url'         => $app->model->property('site_url') . 'para-board/',
      'og_image'       => 'XXXXX',
      'competition_id' => $args['competition_id'],
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

//    $args['page'] = $app->model->set(array(
//
//    ));


    return $this->renderer->render($response, 'para-board/webview.php', $args);


  });
});

?>