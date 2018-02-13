<?php
$app->group('/para-board', function () use($app) {

  // 日程一覧
  // ==============================
  $app->get('[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('parasports');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' parasposts';

    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'       => $category,
      'template'       => 'category',
      'title'          => '日程一覧 - PARA BOARD',
      'keywords'       => 'PARA BOARD,パラスポーツ,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
      'og_description' => 'PARA BOARD パラスポーツ大会の日程の情報見るならスポブルで！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
      'og_title'       => '日程一覧 - PARA BOARD' . ' | ' .$app->model->property('title_short'),
      'og_url'         => $app->model->property('site_url') . 'para-board/',
      'og_image'       => 'XXXXX',
      'para_breadcrumbs' => array(
        array(
          'label' => 'パラボード',
          'path'  => '/para-board/',
        ),
      ),
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

    $category = $app->model->get_category_by_slug('parasports');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' parasposts';

    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'       => $category,
      'template'       => 'category',
      'title'          => '日程一覧 - PARA BOARD',
      'keywords'       => 'PARA BOARD,パラスポーツ,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
      'og_description' => 'PARA BOARD パラスポーツ大会の日程の情報見るならスポブルで！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
      'og_title'       => '日程一覧 - PARA BOARD' . ' | ' .$app->model->property('title_short'),
      'og_url'         => $app->model->property('site_url') . 'para-board/',
      'og_image'       => 'XXXXX',
      'para_sports_id' => $args['sports_id'],
      'para_year'      => $args['year'],
      'para_breadcrumbs' => array(
        array(
          'label' => 'パラボード',
          'path'  => '/para-board/',
        ),
      ),
    ));


    if($app->model->property('ua') === 'desktop')
    {
      return $this->renderer->render($response, 'para-board/desktop/index_select.php', $args);
    }
    else
    {
      return $this->renderer->render($response, 'para-board/mobile/index_select.php', $args);
    }

  });

  // 試合詳細
  // ==============================
  $app->get('/{competition_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    // パラボード 大会概要ページの情報を取得する
    $competition_data = @file_get_contents($app->model->property('file_get_url') . '/api/v1/competition/' . $args['competition_id']);
    $competition_response = json_decode($competition_data, true)['response'];

    $category = $app->model->get_category_by_slug('parasports');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' parasposts';

    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'       => $category,
      'template'       => 'category',
      'title'          => $competition_response['competition_name'] . ' - PARA BOARD',
      'keywords'       => 'PARA BOARD,パラスポーツ,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
      'og_description' => $competition_response['competition_name'] . ' - PARA BOARD。' . $competition_response['competition_name'] . 'の情報見るならスポブルで！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
      'og_title'       => $competition_response['competition_name'] . ' - PARA BOARD' . ' | ' .$app->model->property('title_short'),
      'og_url'         => $app->model->property('site_url') . 'para-board/',
      'og_image'       => 'XXXXX',
      'competition_id' => $args['competition_id'],
      'competition_response' => $competition_response,
      'para_breadcrumbs' => array(
        array(
          'label' => 'パラボード',
          'path'  => '/para-board/',
        ),
        array(
          'label' => $competition_response['competition_name'],
          'path'  => '/para-board/' . $args['competition_id'] . '/',
        ),
      ),
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