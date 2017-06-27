<?php

// stats
// ==============================
$app->group('/stats/{category:tennis|golf}', function () use($app) {

  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    if ( $args['category'] === 'tennis' ) :
      $category = array(
        'title' => 'テニス | 速報 &amp; データ',
      );
      $og_image = 'https://sportsbull.jp/_/stats/tennis/ogp_tennis.jpg';
    endif;

    if ( $args['category'] === 'golf' ) :
      $category = array(
        'title' => 'ゴルフ | 速報 &amp; データ',
      );
      $og_image = 'https://sportsbull.jp/_/stats/golf/ogp_golf.jpg';
    endif;

    $args['page'] = $app->model->set(array(
      'title'              => $category['title'],
      'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
      'og_url'             => $app->model->property('site_url').'stats/'.$args['category'].'/',
      'og_image'           => $og_image,
      'template'           => $args['category'].'/index.php',
      'path'               => $args,
    ));

    return $this->renderer->render($response, 'stats/default.php', $args);

  });

});




// stats
// ==============================
$app->group('/stats/mlb', function () use($app) {

  // トップ
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'template' => 'mlb/schedule.php',
      'path'     => $args,
    ));

    return $this->renderer->render($response, 'stats/default.php', $args);

  });

  // ヒットする文字列だけ
  $this->get('/{category:schedule|standing|leaders|playerlist}[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'template' => 'mlb/'.$args['category'].'.php',
      'path'     => $args,
    ));

    return $this->renderer->render($response, 'stats/default.php', $args);

  });


});


?>