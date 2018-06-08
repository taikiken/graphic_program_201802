<?php


$categories = $app->model->property('site_categories');

if ( $categories ) :

  // ルーティングのためのスラッグを設定する - 存在しないカテゴリーは404を返す
  $category_slug = array_keys( $categories );


endif;

$app->group('/category/{category_slug:all|'.join('|',$category_slug).'}', function () use($app, $ImgPath) {


  // 各カテゴリートップ - /category/:category_slug/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $ImgPath) {

    // /catergory/vk/ を vk.sportsbull.jp にリダイレクト
    if ( $args['category_slug'] === 'vk' && !$app->model->property('ua_app') ) :
      return $response->withRedirect('https://vk.sportsbull.jp/koshien/', 301);
    endif;

    $category           = $app->model->get_category_by_slug($args['category_slug'], "", false);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    if ( $args['category_slug'] === 'big6tv' ) :
      $template_classname = $template_classname . ' theme_big6';
    endif;

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
      'og_title'           => $category['label'].' | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
      'list'               => $data
    ));


    // OFG:ImageとNoImageの実装を追加 @axesor
    if (strlen($category["og_image"]) > 0) {
      $args['page']['og_image'] = $category["og_image"];
    }
    if (strlen($category["no_image"]) > 0) {
      $args['page']['no_image'] = $category["no_image"];
    }

    //カテゴリ毎のキーワードとdescriptionを取得
    if (strlen($category["seo_desc"]) > 0) {
      $args['page']['og_description'] = $category["seo_desc"];
    }
    if (strlen($category["seo_key"]) > 0) {
      $args['page']['keywords'] = $category["seo_key"];
    }


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

  // webviews - /category/:category_slug/webviews/:slug  ref. #1918
  // ==============================
  $this->get('/webviews/{filename}[/]', function ($request, $response, $args) use ($app) {

    # `templates/` 内の表示するテンプレート
    $template_path = $args['category_slug'].'/'.$args['filename'].'.php';

    # ファイルがあるなら表示
    if ( file_exists( __DIR__.'/../templates/'.$template_path) ) :

      $category = $app->model->get_category_by_slug($args['category_slug']);
      $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

      $args['page'] = $app->model->set(array(
        'title'              => $category['label'],
        'og_title'           => $category['label'],
        'og_url'             => $app->model->property('site_url').'category/'.$category['slug'],

        'category'           => $category,
        'ad'                 => $category['ad'],
        'theme'              => $category['theme'],
        'template'           => 'webview',
        'template_classname' => $template_classname,
        'path'               => $args,
      ));

      return $this->renderer->render($response, $template_path, $args);

    else :
      # ないなら404ステータスのみ返す
      return $response->withStatus(404);

    endif;

  });
});


?>