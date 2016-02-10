<?php

/*

/p/:article_id/
/p/:article_id/comment/:comment_id
/p/:article_id/comment/:comment_id/:reply_commend_id

*/

$app->group('/p/{article_id:[0-9]+}', function () {

  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'article - '.$args['article_id'],
      'template' => 'p.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  $this->get('/comment/{commend_id:[0-9]+}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'article - '.$args['article_id'].' / commment - '.$args['commend_id'],
      'template' => 'p.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });


  $this->get('/comment/{commend_id:[0-9]+}/{reply_id:[0-9]+}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'article - '.$args['article_id'].' / commment - '.$args['commend_id'].' / reply - '.$args['reply_id'],
      'template' => 'p.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });



});


?>