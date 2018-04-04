<?php

// Now Do
// ==============================
$app->group('/nowdo',  function () use($app) {

  $category = $app->model->get_category_by_slug('extremesports');
  $page = array(
    'title'              => 'Now Do',
    'og_title'           => 'Now Do | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'nowdo/',
    'og_image'           => $app->model->property('site_url').'assets/images/nowdo/ogp.jpg',
    'og_description'     => '2018年春「Now Do supported by SPORTS BULL」リリース予定。Now Doは今すぐ、どこでもあなたを目標に近づけるパーソナルトレーニングサービスです。あなたのために一流プロアスリートが考案したトレーニングメニューを厳選されたトレーナーが提供します。サッカースクールなどでは実現できない個人技術の向上にコミットします。',
    'keywords'           => 'Now Do,ナウドゥ,本田圭佑,サッカー,スポブル,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'category'           => $category,
    'template'           => 'category',
    'dir_name'           => 'nowdo',
    'template_classname' => 'nowdo_all_wrap',
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

  $app->model->property('path', $args);
  $args['page'] = $app->model->set($page);

    return $this->renderer->render($response, 'nowdo/desktop/index.php', $args);

  });

  $this->post('/submit[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, 'nowdo/submit.php', $args);

  });

});

?>