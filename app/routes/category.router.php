<?php


$categories = $app->model->property('site_categories');

if ( $categories ) :

  // ルーティングのためのスラッグを設定する - 存在しないカテゴリーは404を返す
  $category_slug = array_keys( $categories );

else :

  // TODO : ダミーカテゴリ、APIから取得できなかった時用
  $category_slug = array('baseball','mlb','soccer','worldsoccer','golf','sumo','battle','athletics','swimming','judo','tennis','volleyball','rugby','figureskate','basketball','extremesports','motorsports','business','etc');

endif;



$app->group('/category/{category_slug:all|'.join('|',$category_slug).'}', function () use($app) {


  // 各カテゴリートップ - /category/:category_slug/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    if ( $args['category_slug'] === 'all' ) :
      $category = array(
        'label' => 'すべて',
        'slug'  => $args['category_slug'],
        'url'   => $app->model->property('site_url').'category/all/',
      );
    else :
      $category = $app->model->get_category_by_slug($args['category_slug']);
    endif;

    $args['page'] = $app->model->set(array(
      'title'      => $category['label'],
      'category'   => $category,
      'template'   => 'category',
      'path'       => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // カテゴリー/ランキング - /category/:category_slug/ranking/
  // ==============================
  $this->get('/{type:ranking}[/]', function ($request, $response, $args) use ($app) {

    $category     = $app->model->get_category_by_slug( $args['category_slug'] );

    $args['page'] = $app->model->set(array(
      'title'    => $category['label'].'のランキング',
      'category' => $category,
      'type'     => 'ranking',
      'template' => 'category',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // カテゴリー/動画 - /category/:category_slug/video/
  // ==============================
  $this->get('/{type:video}[/]', function ($request, $response, $args) use ($app) {

    $category     = $app->model->get_category_by_slug($args['category_slug']);

    $args['page'] = $app->model->set(array(
      'title'    => $category['label'].'の動画',
      'category' => $category,
      'type'     => 'video',
      'template' => 'category',
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


});


?>