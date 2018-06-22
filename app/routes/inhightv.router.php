<?php

// #2185 inhigh
// ==============================
$app->group('/{slug:inhightv}',  function () use($app) {

  $common = array(
    'title'       => '東海総体2018 インターハイ応援サイト インハイ.tv(全国高体連公式)',
    'description' => '東海総体2018 インターハイ応援サイト インハイ.tv(全国高体連公式) | スポーツブル (スポブル)。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
  );

  // /inhigh/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $common) {
    return $response->withRedirect('/category/inhightv/', 301);
  });


  // 2017-highlight-movie
  // ==============================
  $this->get('/2017-highlight-movie[/]', function ($request, $response, $args) use ($app, $common) {

    $title       = '南東北総体2017 ハイライト動画';
    $description = '南東北総体2017の各競技のハイライト動画まとめ。';

    $args['page'] = $app->model->set(array(
      'title'              => $title,
      'og_title'           => $title . ' - '. $common['title'].' | '.$app->model->property('title'),
      'og_description'     => $description.$common['description'],
      'og_url'             => $app->model->property('site_url').'inhightv/2017-highlight-movie/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/2017-highlight-movie.php', $args);

  });


  // 2017-digest-movie
  // ==============================
  $this->get('/2017-digest-movie[/]', function ($request, $response, $args) use ($app, $common) {

    $title       = '南東北総体2017 ダイジェスト一覧';
    $description = '南東北総体2017の各競技のダイジェスト動画まとめ。';

    $args['page'] = $app->model->set(array(
      'title'              => $title,
      'og_title'           => $title . ' - '. $common['title'].' | '.$app->model->property('title'),
      'og_description'     => $description.$common['description'],
      'og_url'             => $app->model->property('site_url').'inhightv/2017-digest-movie/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/2017-digest-movie.php', $args);

  });



  // highlight
  // ==============================
  $this->get('/highlight[/]', function ($request, $response, $args) use ($app, $common) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv - ハイライト',
      'og_title'           => 'インハイ.tv - ハイライト| '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhightv/highlight/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/highlight.php', $args);

  });


  // photo
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app, $common) {

    $args['page'] = $app->model->set(array(
      'title'              => 'インハイ.tv - フォト',
      'og_title'           => 'インハイ.tv - フォト |'.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'inhightv/photo/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/photo.php', $args);

  });



  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app, $common) {

    $args['page'] = $app->model->set(array(
      'title'              => $common['title'],
      'og_title'           => $common['title'].' | '.$app->model->property('title'),
      'path'               => $args,
      'template'           => 'webview',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'inhightv/webview.php', $args);

  });

});

?>