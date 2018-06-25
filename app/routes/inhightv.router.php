<?php

// #2185 inhigh
// ==============================
$app->group('/{slug:inhightv}',  function () use($app) {

  $common = array(
    'title'       => '東海総体2018 インターハイ応援サイト インハイ.tv(全国高体連公式)',
    'description' => '東海総体2018 インターハイ応援サイト インハイ.tv(全国高体連公式) | スポーツブル (スポブル)。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',

    'category' => $app->model->get_category_by_slug('inhightv', "", false),

    'conditional' => array(
      'head_assets'     => true,
      'head_sidemenu'   => false,
      'head_viewport'   => true,
      'head_syn'        => false,
      'head_video'      => false,
      'body_start'      => true,
      'whole'           => true,
      'header'          => true,
      'header_appbnr'   => false,
      'header_search'   => false,
      'header_user'     => false,
      'header_sidemenu' => false,
      'gnav'            => false,
      'announce'        => false,
      'sidemenu'        => false,
      'footer'          => true,
      'footer_modal'    => false,
      'footer_script'   => false,
    ),
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
      'category'           => $common['category'],
      'template'           => 'category',
      'template_classname' => '',
      'conditional'        => $common['conditional'],
      'breadcrumb'         => array(
        array(
          'label' => 'インハイ.tv',
          'path' => '/category/inhightv/',
        ),
        array(
          'label' => $title,
          'path' => '',
        ),
      ),
    ));

    return $this->renderer->render($response, 'inhightv/'.$args['page']['ua'].'/2017-highlight-movie.php', $args);

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
      'category'           => $common['category'],
      'template'           => 'category',
      'template_classname' => '',
      'conditional'        => $common['conditional'],
      'breadcrumb'         => array(
        array(
          'label' => 'インハイ.tv',
          'path' => '/category/inhightv/',
        ),
        array(
          'label' => $title,
          'path' => '',
        ),
      ),
    ));

    return $this->renderer->render($response, 'inhightv/'.$args['page']['ua'].'/2017-digest-movie.php', $args);

  });


  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app, $common) {

    $args['page'] = $app->model->set(array(
      'title'              => $common['title'],
      'og_title'           => $common['title'].' | '.$app->model->property('title'),
      'path'               => $args,
      'category'           => $common['category'],
      'template'           => 'webview',
      'template_classname' => '',
    ));


    if ( UT_ENV === 'STAGING' ) :
      return $this->renderer->render($response, 'inhightv/webview.php', $args);
    else :
      return $this->renderer->render($response, 'inhightv/webview-preopen.php', $args);
    endif;

  });

});

?>