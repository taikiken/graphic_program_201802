<?php

// stats
// ==============================
$app->group('/stats', function () use($app) {


  // スタットトップ
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $title = '速報 &amp; データ';

    $args['page'] = $app->model->set(array(
      'title'    => $title,
      'og_title' => $title.' | '.$app->model->property('title_short'),
      'og_url'   => $app->model->property('site_url').'stats/',
      'path'     => $args,
    ));

    return $this->renderer->render($response, 'stats/banners/stats.php', $args);

  });


  $this->get('/{category:webview|tennis}[/]', function ($request, $response, $args) use ( $app ) {

    if ( $args['category'] === 'webview' ) :

      $title = '速報 &amp; データ';

      $args['page'] = $app->model->set(array(
        'title'              => $title,
        'og_title'           => $title.' | '.$app->model->property('title_short'),
        'og_url'             => $app->model->property('site_url').'stats/',
        'path'               => $args,
      ));

      return $this->renderer->render($response, 'stats/banners/top/webview.php', $args);

    else :

      if ( $args['category'] === 'tennis' ) :
        $category = array(
          'title' => 'テニス | 速報 &amp; データ',
        );
      endif;

      if ( $args['category'] === 'golf' ) :
        $category = array(
          'title' => 'ゴルフ | 速報 &amp; データ',
        );
      endif;

      $args['page'] = $app->model->set(array(
        'title'              => $category['title'],
        'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
        'og_url'             => $app->model->property('site_url').'stats/'.$args['category'].'/',
        'template'           => $args['category'].'/index.php',
        'path'               => $args,
      ));


      return $this->renderer->render($response, 'stats/default.php', $args);

    endif;

  });

});

?>