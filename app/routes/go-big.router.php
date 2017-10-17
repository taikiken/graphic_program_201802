<?php

// red-bull-holy-ride
// ==============================
$app->group('/go-big',  function () use($app) {

  $page = array(
    'title'              => 'GO BIG 2017 - All JAPAN FMX CHAMPIONSHIP 2017 ライブ配信',
    'site_name'          => 'スポーツブル (スポブル)',
    'og_type'            => 'article',
    'og_title'           => 'GO BIG 2017 - All JAPAN FMX CHAMPIONSHIP 2017 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'go-big/',
    'og_image'           => $app->model->property('site_url').'assets/images/go-big/ogp.png',
    'og_description'     => 'GO BIG 2017 - All JAPAN FMX CHAMPIONSHIP 2017 ライブ配信 見るならスポーツブル(スポブル)で！10周年を迎えるGO BIG 世界レベルのFMXライダー日本一決定戦を無料ライブ配信！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'GO BIG 2017,FMX,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'template'           => 'index',
    'template_classname' => 'go-big',
    'ua'                 => $app->model->property('ua'),
  );


  // /red-bull-box-cart-2017/live/ -> /red-bull-box-cart-2017/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/go-big/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'go-big/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'go-big/mobile/index.php', $args);
    endif;

  });

});

?>