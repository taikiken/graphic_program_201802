<?php

// bulls-station
// ==============================
$app->group('/{slug:bulls-station}',  function () use($app) {

  $page = array(
    'title'              => '番組紹介 - BULL\'S STATION',
    'site_name'          => $app->model->property('title'),
    'og_type'            => 'article',
    'og_title'           => '番組紹介 - BULL\'S STATION | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'bulls-station/',
    'og_image'           => $app->model->property('site_url').'assets/images/bulls-station/og_image.png',
    'og_description'     => '毎週平日 月-金 12:30~ 配信！スポーツニュース番組 BULL\'S STATION。BULL’S STATIONは最新ニュースを個性あふれるキャスターが真心込めてお届けするスポーツニュース番組です。毎日のランチのお供にぜひ御覧ください！',
    'keywords'           => 'BULL\'S STATION,ブルズ ステーション,エイミー,サヤカ,エレナ,イチカ,ライカ,動画特集,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'template'           => 'index',
    'template_classname' => 'bulls-station',
    'dir_name'           => 'bulls-station',
    'ua'                 => $app->model->property('ua'),
  );

  // index
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'bulls-station/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'bulls-station/mobile/index.php', $args);
    endif;

  });

  // off-shot-movie
  // ==============================
  $this->get('/off-shot-movie[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'OFF SHOT MOVIE - BULL\'S STATION',
      'og_title'           => 'OFF SHOT MOVIE - BULL\'S STATION - オフショットムービー |'.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'bulls-station/off-shot-movie/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'bulls-station/off-shot-movie.php', $args);

  });

});

?>