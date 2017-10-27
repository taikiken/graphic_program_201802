<?php

// red-bull-holy-ride
// ==============================
$app->group('/red-bull-box-cart-2017',  function () use($app) {

  $page = array(
    'title'              => 'RED BULL BOX CART RACE 2017 ライブ配信',
    'site_name'          => 'スポーツブル (スポブル)',
    'og_type'            => 'article',
    'og_title'           => 'RED BULL BOX CART RACE 2017 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'red-bull-box-cart-2017/',
    'og_image'           => $app->model->property('site_url').'assets/images/red-bull-box-cart-2017/ogp.png',
    'og_description'     => 'RED BULL BOX CART RACE 2017 ライブ配信 見るならスポーツブル(スポブル)で！おバカなレースに大まじめ! 重力だけを頼りに手作りカートが赤坂の坂を駆け降りる、クリエイティビティ溢れるイベントが日本で3回目の開催! 一体何チームがゴールまでたどり着けるのか?!笑いあり、ドラマありのお祭り騒ぎを見逃すな!スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'RED BULL,レッドブル,BOX CART RACE 2017,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'template'           => 'index',
    'template_classname' => 'red-bull-box-cart-2017',
    'ua'                 => $app->model->property('ua'),
  );


  // /red-bull-box-cart-2017/live/ -> /red-bull-box-cart-2017/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/red-bull-box-cart-2017/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'red-bull-box-cart-2017/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'red-bull-box-cart-2017/mobile/index.php', $args);
    endif;

  });

});

?>