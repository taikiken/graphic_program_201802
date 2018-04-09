<?php


$categories = $app->model->property('site_categories');

if ( $categories ) :

  // ルーティングのためのスラッグを設定する - 存在しないカテゴリーは404を返す
  $category_slug = array_keys( $categories );


endif;

$app->group('/pickup_athletes/{category_slug:all|'.join('|',$category_slug).'}', function () use($app, $ImgPath) {




  $this->get('/list[/]', function ($request, $response, $args) use ($app) {
    // 選手一覧
    $category = $app->model->get_category_by_slug($args['category_slug'],null, true);
    $pickup_players = $app->model->get_pickup_players($category['id']);
    $data = [];
    foreach ($pickup_players as $index => $row) {
      $data[] = [
          'body' => [
              'no' => $row['id'],
              'name' => $row['name'],
              'name_kana' => $row['name_kana'],
              'competition' => $row['competition'],
              'description' => $row['description'],
              'img' => $row['img1'],
          ],
      ];
    }
    //オブジェクト化する
    $data = json_decode(json_encode($data));

    // jsonの中身が空の場合404
    if (empty($data)) {
      // 404
      // ------------------------------
      $args['page'] = $app->model->set([
          'title' => '404 Not Found',
          'og_title' => '404 Not Found',
          'template' => 404,
      ]);
      $args['request'] = $request;
      $args['response'] = $response;
      if ($app->model->property('ua') === 'desktop') {
        return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
      } else {
        return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
      }
    }

    $args['page'] = $app->model->set(array(
        'title' => $category['label'],
        'og_title' => $category['label'] . ' | ' . $app->model->property('title'),
        'path' => $args,
        'template' => 'category_list',
        'template_classname' => '',
        'list' => $data,
        'category' => $category,
    ));
    return $this->renderer->render($response, 'athletes/list.php', $args);
  });

  // webviews - /category/:category_slug/pickup_athletes/webview/
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app, $ImgPath) {
    $category = $app->model->get_category_by_slug($args['category_slug'], null, true);

    /**
     * /category/crazy/ で表示する4件固定対応
     */
    $pickup_players = $app->model->get_pickup_players($category['id'], null, 4, true);

    $data = [];
    foreach ($pickup_players as $index => $row) {
      $data[] = [
        'body' => [
          'no' => $row['id'],
          'name' => $row['name'],
          'name_kana' => $row['name_kana'],
          'competition' => $row['competition'],
          'description' => $row['description'],
          'img' => $row['img1'],
        ],
      ];
    }
    //オブジェクト化する
    $data = json_decode(json_encode($data));


    $args['page'] = $app->model->set(array(
      'title'              => $category['label'],
      'og_title'           => $category['label'],
      'path'               => $args,
      'template'           => 'webview',
      'template_classname' => '',
      'list'               => $data,
      'category'           => $category,

    ));

    return $this->renderer->render($response, 'pickup_athlete/webview.php', $args);

  });
});

$app->group('/athlete', function () use($app, $ImgPath) {
  // CRAZY ATHLETE v2.0
  $this->get('/{id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $id   = $args['id'];
    $player_info = $app->model->get_pickup_athlete($id);

    if(empty($player_info))
    {
      // 404
      // ------------------------------
      $args['page'] = $app->model->set([
        'title'    => '404 Not Found',
        'og_title' => '404 Not Found',
        'template' => 404,
      ]);

      $args['request']  = $request;
      $args['response'] = $response;

      if($app->model->property('ua') === 'desktop')
      {
        return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
      }
      else
      {
        return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
      }
    }
    $category_slug = get_category_slug_by_playerid($id);
    $category = $app->model->get_category_by_slug($category_slug, $id, false);

    $args['page'] = $app->model->set(array(
      'title'              => 'CRAZY ATHLETES',
      'og_title'           => 'CRAZY ATHLETES | '.$app->model->property('title'),
      'path'               => $args,
      'template'           => 'crazy',
      'template_classname' => '',
      'player'             => $player_info,
      'ua'                 => $app->model->property('ua'),
      'category'           => $category,
    ));

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'crazy/detail.php', $args);
    else :
      return $this->renderer->render($response, 'crazy/detail.sp.php', $args);
    endif;

  });
});

?>