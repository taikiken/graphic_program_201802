<?php

$app->group('/p/{article_id:[0-9]+}', function () use ($app) {



  // 記事詳細 - /p/:article_id/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    $args['page'] = $app->model->set(array(
      'title'     => $post['title'],
      'template'  => 'p',
      'path'      => $args,
      'post'      => $post,
      'canonical' => "p/{$post['id']}/",
    ));


    // for Releae : AppからのWebViewアクセスなら本文部分のみのテンプレートを利用
    // ------------------------------
    // $ua = $_SERVER['HTTP_USER_AGENT'];
    // if ( $ua == 'undotsushin-ios' || $ua == 'undotsushin-android' ) :
    //   return $this->renderer->render($response, "app.p.php", $args);
    // else :
    //   return $this->renderer->render($response, "default.php", $args);
    // endif;

    return $this->renderer->render($response, "default.php", $args);

  });


  // 記事詳細/コメントパーマリンク - /p/:article_id/comment/:comment_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    $args['page'] = $app->model->set(array(
      'title'     => $post['title'],
      'template'  => 'comment',
      'path'      => $args,
      'post'      => $post,
      'canonical' => "p/{$post['id']}/",
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // 記事詳細/返信パーマリンク - /p/:article_id/comment/:comment_id/:reply_commend_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}/{reply_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    $args['page'] = $app->model->set(array(
      'title'     => $post['title'],
      'template'  => 'comment',
      'path'      => $args,
      'post'      => $post,
      'canonical' => "p/{$post['id']}/",
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>