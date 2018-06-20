<?php

// live
// ==============================
$app->group('/live',  function () use($app) {

  $category = $app->model->get_category_by_slug('top');
  $page = array(
    'title'              => 'LIVE GALLERY(ライブギャラリー)',
    'og_title'           => 'LIVE GALLERY(ライブギャラリー) | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'live-gallery/',
    'og_image'           => $app->model->property('site_url').'assets/images/live/live-gallery/ogp.png',
    'og_description'     => '「一瞬の輝きに全てをかける生き様を見逃すな！」スポーツブル(スポブル) - ライブギャラリー。スポーツブル全てのライブ配信の予定、アーカイブのまとめです。 ライブ配信をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'template_classname' => 'live-gallery',
    'dir_name'           => 'live-gallery',
    'path'               => $args
  );


  // /live-gallery/ -> /live-gallery/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/live/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    return $this->renderer->render($response, 'live/index.php', $args);

  });

});

?>