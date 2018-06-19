<?php

// live
// ==============================
$app->group('/live/minato-rugby-fes-2018',  function () use($app) {

  $category = $app->model->get_category_by_slug('rugby');
  $page = array(
    'title'              => '秩父宮みなとラグビーまつり2018 ライブ配信',
    'og_title'           => '秩父宮みなとラグビーまつり2018 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'minato-rugby-fes-2018/',
    'og_image'           => $app->model->property('site_url').'assets/images/live/minato-rugby-fes-2018/ogp.png',
    'og_description'     => '秩父宮みなとラグビーまつり2018 ライブ配信をスポーツブルで無料ライブ配信。スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'ラグビー,秩父宮,NEC グリーンロケッツ,ワラターズ,サントリーサンゴリアス,ブランビーズ,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'template_classname' => 'minato-rugby-fes-2018',
    'dir_name'           => 'minato-rugby-fes-2018',
    'path'               => $args
  );


  // /minato-rugby-fes-2018/ -> /minato-rugby-fes-2018/
  // ==============================
  $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
    return $response->withRedirect('/live/minato-rugby-fes-2018/', 301);
  });

  // live
  // ==============================
  // $this->get('/live[/]', function ($request, $response, $args) use ($app, $page) {
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    return $this->renderer->render($response, 'live/minato-rugby-fes-2018/index.php', $args);

  });

});

?>