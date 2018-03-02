<?php

// Now Do
// ==============================
$app->group('/nowdo',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'Now Do',
    'site_name'          => 'スポーツブル (スポブル)',
    'version'            => '201802062230',
    'og_type'            => 'article',
    'og_title'           => 'Now Do | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'nowdo/',
    'og_image'           => $app->model->property('site_url').'assets/images/nowdo/ogp.png',
    'og_description'     => 'Freeride World Tour 2018をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'Freeride World Tour 2018,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'dir_name'           => 'nowdo',
    'template_classname' => 'nowdo_all_wrap',
    'ua'                 => $app->model->property('ua'),
    'app_id'             => '842032129256034',
    'sns'                => array(
      'twitter'  => 'sportsbull_jp',
      'facebook' => 'sportsbull',
      'youtube'  => 'UCKwqba9IWuSKIk3DIpryOHw',
    ),
  );


  // /fwt/live/ -> /fwt/
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  //   return $response->withRedirect('/fwt/', 301);
  // });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    return $this->renderer->render($response, 'nowdo/desktop/index.php', $args);

  });


  $this->get('/submit[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, 'nowdo/submit.php', $args);

  });

});

?>