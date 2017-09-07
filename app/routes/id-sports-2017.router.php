<?php

// bulls-station
// ==============================
$app->group('/{slug:id-sports-2017}',  function () use($app) {

  $page = array(
    'title'              => '第1回知的障がい者スポーツ交流プログラム',
    'site_name'          => $app->model->property('title'),
    'og_type'            => 'article',
    'og_title'           => '第1回知的障がい者スポーツ交流プログラム | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'id-sports-2017/',
    'og_image'           => $app->model->property('site_url').'assets/images/id-sports-2017/og_image.png',
    'og_description'     => '「第1回知的障がい者スポーツ交流プログラム」は、エクアドル 2015 グローバルゲームスに参加した有志により構成され、アジア地域における知的障がい者スポーツの発展に日韓が協力して推進し、スポーツを通じた国際協力及び交流を目的に行われるものである。',
    'keywords'           => '第1回知的障がい者スポーツ交流プログラム,JAPAN-KOREA ID SPORTS Exchange Program 2017,スポーツ,メディア,アスリート,ニュース,動画,sports,media',
    'template'           => 'index',
    'template_classname' => 'id-sports-2017',
    'dir_name'           => 'id-sports-2017',
    'ua'                 => $app->model->property('ua'),
  );

  // index
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'id-sports-2017/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'id-sports-2017/mobile/index.php', $args);
    endif;

  });

  // off-shot-movie
  // ==============================
  $this->get('/off-shot-movie[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'OFF SHOT MOVIE - 第1回知的障がい者スポーツ交流プログラム',
      'og_title'           => 'OFF SHOT MOVIE - 第1回知的障がい者スポーツ交流プログラム - オフショットムービー |'.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'id-sports-2017/off-shot-movie/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
      'dir_name'           => 'id-sports-2017',
    ));

    return $this->renderer->render($response, 'id-sports-2017/off-shot-movie.php', $args);

  });

});

?>