<?php

$app->group('/p/{article_id:[0-9]+}', function () {

  // 記事詳細 - /p/:article_id/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'article - '.$args['article_id'],
      'template' => 'p.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

  // 記事詳細/コメントパーマリンク - /p/:article_id/comment/:comment_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}[/]', function ($request, $response, $args) {

    $args['page'] = array(
      'title'    => 'article - '.$args['article_id'].' / commment - '.$args['commend_id'],
      'template' => 'p.php',
      'path'     => $args,
    );

    return $this->renderer->render($response, "_default.php", $args);

  });

  // 記事詳細/返信パーマリンク - /p/:article_id/comment/:comment_id/:reply_commend_id
  // ==============================
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