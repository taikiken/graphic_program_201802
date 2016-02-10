<?php


// TODO - これDBからひっぱる必要あり
$categorySlug = array('baseball','mlb','soccer','worldsoccer','golf','sumo','battle','athletics','swimming','judo','tennis','volleyball','rugby','figureskate','basketball','extremesports','motorsports','business','etc');


$app->group('/category/{slug:'.join('|',$categorySlug).'}', function () {


  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => $args['slug'],
      'template' => 'category.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  $this->get('/{type:ranking|video}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => $args['slug'].' - '.$args['type'],
      'type'     => $args['type'],
      'template' => 'category.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


});


?>