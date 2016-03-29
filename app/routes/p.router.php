<?php

$app->group('/p/{article_id:[0-9]+}', function () use ($app) {



  // 記事詳細 - /p/:article_id/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);


    $args['page'] = $app->model->set(array(
      'title'          => $post['title'],
      'og_title'       => $post['title'].' | '.$app->model->property('title'),
      'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/',
      'og_image'       => $post['media']['images']['original'],
      'og_description' => $post['description'],
      'template'       => 'p',
      'path'           => $args,
      'post'           => $post,
    ));


    // アプリからの記事詳細アクセスならWebView向けページを表示
    if ( $app->model->property('is_app') ) :

      return $this->renderer->render($response, "app.p.php", $args);

    // アプリ以外のデスクトップ/スマホなら通常
    else :

      return $this->renderer->render($response, "default.php", $args);

    endif;

  });


  // 記事詳細/コメントパーマリンク - /p/:article_id/comment/:comment_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    $args['page'] = $app->model->set(array(
      'title'          => $post['title'],
      'og_title'       => $post['title'].' | '.$app->model->property('title'),
      'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/',
      'og_image'       => $post['media']['images']['original'],
      'og_description' => $post['description'],
      'template'       => 'comment',
      'path'           => $args,
      'post'           => $post,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // 記事詳細/返信パーマリンク - /p/:article_id/comment/:comment_id/:reply_commend_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}/{reply_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    $args['page'] = $app->model->set(array(
      'title'          => $post['title'],
      'og_title'       => $post['title'].' | '.$app->model->property('title'),
      'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/',
      'og_image'       => $post['media']['images']['original'],
      'og_description' => $post['description'],
      'template'       => 'comment',
      'path'           => $args,
      'post'           => $post,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

});

?>