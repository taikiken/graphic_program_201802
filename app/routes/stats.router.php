<?php

// stats
// ==============================
$app->group('/stats/{category:tennis}', function () use($app) {

  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    if ( $args['category'] === 'tennis' ) :
      $category = array(
        'title' => 'テニス | 速報 & データ',
      );
    endif;

    if ( $args['category'] === 'golf' ) :
      $category = array(
        'title' => 'ゴルフ | 速報 & データ',
      );
    endif;

    $args['page'] = $app->model->set(array(
      'title'              => $category['title'],
      'og_title'           => $category['title'].' | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'stats/'.$args['category'].'/',
      'template'           => $args['category'].'/index.php',
      'path'               => $args,
    ));

    return $this->renderer->render($response, 'stats/default.php', $args);

  });

});

?>