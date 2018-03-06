<?php

// red-bull-holy-ride
// ==============================
$app->group('/red-bull-crashed-ice-2018',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'RED BULL CRASHED ICE EDMONTON ライブ配信',
    'site_name'          => 'スポーツブル (スポブル)',
    'version'            => '201803050827',
    'og_type'            => 'article',
    'og_title'           => 'RED BULL CRASHED ICE EDMONTON ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'red-bull-crashed-ice-2018/',
    'og_image'           => $app->model->property('site_url').'assets/images/red-bull-crashed-ice-2018/ogp.png',
    'og_description'     => 'RED BULL CRASHED ICE EDMONTONをスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'RED BULL,レッドブル,CRASHED ICE,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'template'           => 'index',
    'template_classname' => 'red-bull-crashed-ice-2018',
    'ua'                 => $app->model->property('ua'),
    'app_id'             => '842032129256034',
    'category'           => $category,
    'sns'                => array(
      'twitter'  => 'sportsbull_jp',
      'facebook' => 'sportsbull',
      'youtube'  => 'UCKwqba9IWuSKIk3DIpryOHw',
    ),
  );


  // /red-bull-crashed-ice-2018/live/ -> /red-bull-crashed-ice-2018/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/red-bull-crashed-ice-2018/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'red-bull-crashed-ice-2018/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'red-bull-crashed-ice-2018/mobile/index.php', $args);
    endif;

  });

});

?>