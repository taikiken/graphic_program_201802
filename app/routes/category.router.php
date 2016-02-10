<?php


// TODO - これDBからひっぱる必要あり
$categorySlug = array('baseball','mlb','soccer','worldsoccer','golf','sumo','battle','athletics','swimming','judo','tennis','volleyball','rugby','figureskate','basketball','extremesports','motorsports','business','etc');


$app->group('/category/{category_slug:'.join('|',$categorySlug).'}', function () {


  // カテゴリー - /category/:category_slug/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'category / '.$args['category_slug'],
      'template' => 'category.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

  // カテゴリー/ランキング|動画 - /category/:category_slug/:type
  // ==============================
  $this->get('/{type:ranking|video}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'category / '.$args['category_slug'].' - '.$args['type'],
      'type'     => $args['type'],
      'template' => 'category.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

});

?>