<?php


$categories = $app->model->property('site_categories');

if ( $categories ) :

  // ルーティングのためのスラッグを設定する - 存在しないカテゴリーは404を返す
  $category_slug = array_keys( $categories );


endif;


$app->group('/category/{category_slug:all|'.join('|',$category_slug).'}', function () use($app) {


  // 各カテゴリートップ - /category/:category_slug/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $category           = $app->model->get_category_by_slug($args['category_slug']);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    if ( $args['category_slug'] === 'big6' ) :
      $template_classname = $template_classname . ' theme_big6';
    endif;

    $args['page'] = $app->model->set(array(
      'title'              => $category['label'],
      'og_title'           => $category['label'].' | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
    ));

    if ( $args['category_slug'] === 'big6' ) :

      // スケジュール表を取得する
      $big6Schedule = @file_get_contents($app->model->property('site_url').'/api/big6/schedule');
      $args['page']['big6']['scheduleData'] = json_decode($big6Schedule, true)['response'];

      // ランキングデータを取得する
      $big6Ranking = @file_get_contents($app->model->property('site_url').'/api/big6/ranking');
      $args['page']['big6']['rankingData'] = json_decode($big6Ranking, true)['response'];

    endif;



    return $this->renderer->render($response, "default.php", $args);

  });


  // カテゴリー/ランキング - /category/:category_slug/ranking/
  // ==============================
  $this->get('/{type:ranking}[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug($args['category_slug']);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    $args['page'] = $app->model->set(array(
      'title'              => $category['label'].'のランキング',
      'og_title'           => $category['label'].'のランキング | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/ranking/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'type'               => 'ranking',
      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // カテゴリー/動画 - /category/:category_slug/video/
  // ==============================
  $this->get('/{type:video}[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug($args['category_slug']);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    $args['page'] = $app->model->set(array(
      'title'              => $category['label'].'の動画',
      'og_title'           => $category['label'].'の動画 | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/video/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'type'               => 'video',
      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


});


?>