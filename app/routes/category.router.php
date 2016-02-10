<?php

$app->group('/category/{slug}', function () {


  // TODO - これDBからひっぱる必要あり
  $category = array('baseball','mlb','soccer','worldsoccer','golf','sumo','battle','athletics','swimming','judo','tennis','volleyball','rugby','figureskate','basketball','extremesports','motorsports','business','etc');


  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($category) {

    if ( in_array( $args['slug'], $category, true ) ) :

      $args['page'] = array(
        'title'    => $args['slug'],
        'template' => 'category.php',
      );

      return $this->renderer->render($response, "default.php", $args);

    else :

      return $response->withStatus(404);

    endif;

  });


  $this->get('/{type}[/]', function ($request, $response, $args) {

    if ( in_array( $args['type'], array('ranking', 'video') ) ) :

      $args['page'] = array(
        'title'    => $args['slug'].' - '.$args['type'],
        'type'     => $args['type'],
        'template' => 'category.php',
      );

      return $this->renderer->render($response, "default.php", $args);

    else :

      return $response->withStatus(404);

    endif;

  });


});


?>