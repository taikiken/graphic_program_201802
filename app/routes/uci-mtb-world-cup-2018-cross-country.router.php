<?php

// uci-mtb-world-cup-2018-cross-country
// ==============================
$app->group('/live/uci-mtb-world-cup-2018-cross-country',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'UCI MOUNTAIN BIKE WORLD CUP 2018（クロスカントリー） ライブ配信',
    'og_title'           => 'UCI MOUNTAIN BIKE WORLD CUP 2018（クロスカントリー） ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'uci-mtb-world-cup-2018-cross-country/',
    'og_image'           => $app->model->property('site_url').'assets/images/live/uci-mtb-world-cup-2018-cross-country/180715_ogp.png',
    'og_description'     => 'UCI MOUNTAIN BIKE WORLD CUP 2018（クロスカントリー）をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'Red Bull,レッドブル,MTB,UCI,ダウンヒル,クロスカントリー,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'template_classname' => 'uci-mtb-world-cup-2018-cross-country',
    'dir_name'           => 'uci-mtb-world-cup-2018-cross-country',
  );


  // /uci-mtb-world-cup-2018-cross-country/live/ -> /uci-mtb-world-cup-2018-cross-country/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/live/uci-mtb-world-cup-2018-cross-country/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    return $this->renderer->render($response, 'live/uci-mtb-world-cup-2018-cross-country/index.php', $args);

  });

});

?>