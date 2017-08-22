<?php

// bulls-station
// ==============================
$app->group('/{slug:bulls-station}',  function () use($app) {

  $page = array(
    'title'              => 'BULL\'S STATION スポーツニュース番組',
    'site_name'          => $app->model->property('title'),
    'og_type'            => 'article',
    'og_title'           => 'BULL\'S STATION スポーツニュース番組 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'bulls-station/',
    'og_image'           => $app->model->property('site_url').'assets/images/bulls-station/og_image.png',
    'og_description'     => 'TBD',
    'keywords'           => 'TBD',
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

});

?>