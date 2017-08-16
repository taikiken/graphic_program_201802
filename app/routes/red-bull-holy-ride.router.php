<?php

// red-bull-holy-ride
// ==============================
$app->group('/{slug:red-bull-holy-ride}',  function () use($app) {

  $page = array(
    'title'              => 'RED BULL HOLY RIDE 2017',
    'og_title'           => 'RED BULL HOLY RIDE 2017 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'red-bull-holy-ride/',
    'og_image'           => $app->model->property('site_url').'assets/images/red-bull-holy-ride/ogp.png',
    'og_description'     => '[TBD]',
    'template'           => 'index',
    'template_classname' => 'theme_red-bull-holy-ride',
    // add ua - 2017-08-16 by @taikiken - live.php l.16 判定に使用する
    'ua'                 => $app->model->property('ua'),
  );

  // index
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $args['path'] = $args;
    $args['page'] = $page;

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'red-bull-holy-ride/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'red-bull-holy-ride/mobile/index.php', $args);
    endif;

  });

});

?>