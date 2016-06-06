<?php

$app->group('/p/{article_id:[0-9]+}', function () use ($app) {



  // 記事詳細 - /p/:article_id/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    if ( $post ) :

      $args['page'] = $app->model->set(array(
        'title'              => $post['title'],
        'og_title'           => $post['title'].' | '.$app->model->property('title'),
        'og_url'             => $app->model->property('site_url').'p/'.$post['id'].'/',
        'og_image'           => $post['media']['images']['original'],
        'og_description'     => $post['description'],
        'template'           => 'p',
        'path'               => $args,
        'post'               => $post,
      ));


      // アプリからの記事詳細アクセスならWebView向けページを表示
      if ( $app->model->property('ua_app') ) :

        return $this->renderer->render($response, "app.p.php", $args);

      // アプリ以外のデスクトップ/スマホなら通常
      else :

        return $this->renderer->render($response, "default.php", $args);

      endif;

    else :

      // 404
      // ------------------------------
      $args['page'] = $app->model->set(array(
        'title'    => '404 Not Found',
        'template' => 404,
      ));

      $args['request']  = $request;
      $args['response'] = $response;

      if ( $app->model->property('ua') === 'desktop' ) :
          return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
      else :
          return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
      endif;


    endif;

  });


  // 記事詳細/コメントパーマリンク - /p/:article_id/comment/:comment_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $post    = $app->model->get_post($args['article_id']);
    // ex. http://dev2.undotsushin.com/api/v1/comments/article/6984/626
    $comment = $app->model->get_comment($args['article_id'], $args['commend_id'] );

    if ( $comment['comments'] ) :

      $comment_user = $comment['comments'][0]['user']['name'];
      $comment_body = str_replace(array("\r\n","\n","\r"), '', $comment['comments'][0]['body_escape']);
      $comment_body_escaped = mb_substr($comment_body, 0, 60, 'UTF-8');

      if ( mb_strlen( $comment_body, 'UTF-8') > 60 ) :
        $comment_body_escaped .= '…';
      endif;

      $args['page'] = $app->model->set(array(
        'title'          => $post['title'],
        'og_title'       => '『'.$post['title'].'』への '.$comment_user.' さんのコメント | '.$app->model->property('title'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/comment/'.$args['commend_id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $comment_body_escaped,
        'template'       => 'comment',
        'path'           => $args,
        'post'           => $post,
      ));

      return $this->renderer->render($response, "default.php", $args);

    else :

      // 404
      // ------------------------------
      $args['page'] = $app->model->set(array(
        'title'    => '404 Not Found',
        'template' => 404,
      ));

      $args['request']  = $request;
      $args['response'] = $response;

      if ( $app->model->property('ua') === 'desktop' ) :
          return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
      else :
          return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
      endif;


    endif;

  });


  // 記事詳細/返信パーマリンク - /p/:article_id/comment/:comment_id/:reply_commend_id
  // ==============================
  $this->get('/comment/{commend_id:[0-9]+}/{reply_id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    // ex. http://dev2.undotsushin.com/api/v1/comments/article/6984/626
    $comment = $app->model->get_comment($args['article_id'], $args['reply_id'] );

    if ( $comment['comments'] ) :

      print_r($comment['comments']);

      $comment_user = $comment['comments'][0]['user']['name'];
      $comment_body = str_replace(array("\r\n","\n","\r"), '', $comment['comments'][0]['body_escape']);
      $comment_body_escaped = mb_substr($comment_body, 0, 60, 'UTF-8');

      if ( mb_strlen( $comment_body, 'UTF-8') > 60 ) :
        $comment_body_escaped .= '…';
      endif;

      $args['page'] = $app->model->set(array(
        'title'          => $post['title'],
        'title'          => $post['title'],
        'og_title'       => '『'.$post['title'].'』への '.$comment_user.' さんの返信 | '.$app->model->property('title'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/comment/'.$args['commend_id'].'/'.$args['reply_id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $comment_body_escaped,
        'template'       => 'comment',
        'path'           => $args,
        'post'           => $post,
      ));

      return $this->renderer->render($response, "default.php", $args);

    else :

      // 404
      // ------------------------------
      $args['page'] = $app->model->set(array(
        'title'    => '404 Not Found',
        'template' => 404,
      ));

      $args['request']  = $request;
      $args['response'] = $response;

      if ( $app->model->property('ua') === 'desktop' ) :
          return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
      else :
          return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
      endif;


    endif;

  });


});

?>