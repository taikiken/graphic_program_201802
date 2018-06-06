<?php

// red-bull-400-2018
// ==============================
$app->group('/live/red-bull-neymar-jrs-five-2018',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'NEYMAR JR&apos;S FIVE ジャパンファイナル ライブ配信',
    'og_title'           => 'NEYMAR JR&apos;S FIVE ジャパンファイナル ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'red-bull-neymar-jrs-five-2018/',
    'og_image'           => $app->model->property('site_url').'assets/images/red-bull-neymar-jrs-five-2018/ogp.png',
    'og_description'     => 'NEYMAR JR&apos;S FIVE ジャパンファイナル ライブ配信をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'Red Bull,レッドブル,400,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'template_classname' => 'red-bull-neymar-jrs-five-2018',
    'dir_name'           => 'red-bull-neymar-jrs-five-2018',
    'path'               => $args
  );


  // /red-bull-neymar-jrs-five-2018/ -> /red-bull-neymar-jrs-five-2018/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/live/red-bull-neymar-jrs-five-2018/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    return $this->renderer->render($response, 'live/red-bull-neymar-jrs-five-2018/index.php', $args);

  });

});

?>