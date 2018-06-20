<?php

// red-bull
// ==============================
$app->group('/live/crankworx-world-tour-2018',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'CRANKWORX SLOPESTYLE 2018 ライブ配信',
    'og_title'           => 'CRANKWORX SLOPESTYLE 2018 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'crankworx-world-tour-2018/',
    'og_image'           => $app->model->property('site_url').'assets/images/live/crankworx-world-tour-2018/180624_ogp.png',
    'og_description'     => 'CRANKWORX SLOPESTYLE 2018 ライブ配信をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'Red Bull,レッドブル,MTB,UCI,CRANKWORX,SLOPESTYLE,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'template_classname' => 'crankworx-world-tour-2018',
    'dir_name'           => 'crankworx-world-tour-2018',
    'path'               => $args
  );


  // /crankworx-world-tour-2018/ -> /crankworx-world-tour-2018/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/live/crankworx-world-tour-2018/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    return $this->renderer->render($response, 'live/crankworx-world-tour-2018/index.php', $args);

  });

});

?>