<?php

// red-bull-holy-ride
// ==============================
$app->group('/fwt',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'Freeride World Tour 2018 ライブ配信',
    'site_name'          => 'スポーツブル (スポブル)',
    'version'            => '201801230923',
    'og_type'            => 'article',
    'og_title'           => 'Freeride World Tour 2018 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'fwt/',
    'og_image'           => $app->model->property('site_url').'assets/images/fwt/ogp.png',
    'og_description'     => 'Freeride World Tour 2018をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'Freeride World Tour 2018,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'template'           => 'index',
    'template_classname' => 'fwt',
    'ua'                 => $app->model->property('ua'),
    'category'           => $category,
  );


  // /fwt/live/ -> /fwt/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/fwt/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'fwt/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'fwt/mobile/index.php', $args);
    endif;

  });

});

?>