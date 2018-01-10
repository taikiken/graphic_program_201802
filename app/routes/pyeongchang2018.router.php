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

    $category = $app->model->get_category_by_slug('pyeongchang2018');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' pyeongchang2018 pyeongchang2018-photo';
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category' => $category,
      'template' => 'category',
    ));

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, '/pyeongchang2018/desktop/photo.php', $args);
    else :
      return $this->renderer->render($response, '/pyeongchang2018/mobile/photo.php', $args);
    endif;
  });
  // ハイライト一覧
  // ==============================
  $this->get('/movie[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('pyeongchang2018');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' pyeongchang2018 pyeongchang2018-movie';
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category' => $category,
      'template' => 'category',
    ));

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