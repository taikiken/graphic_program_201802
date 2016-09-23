<?php

$app->group('/p/{article_id:[0-9]+}', function () use ($app) {



  // 記事詳細 - /p/:article_id/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    if ( $post ) :

      // 記事のプライマリーカテゴリーを取得
      $category = array();
      if ( $post['categories'] ) :
        $category_primary = $post['categories'][0];
        if ( isset($category_primary['slug']) ) :
          $category = $app->model->get_category_by_slug($category_primary['slug']);
        endif;
      endif;

      // 続きを読む設定フラグの判定を行っておく
      if ( isset($post['readmore']) && $post['readmore']['is_readmore'] && $post['readmore']['url'] ) :
        $post['is_readmore'] = true;
      else :
        $post['is_readmore'] = false;
      endif;

      // #782 カノニカル判定
      if ( isset($post['canonical']) && $post['canonical']['is_canonical'] && $post['canonical']['url'] ) :
        $canonical = $post['canonical']['url'];
      else :
        $canonical = '';
      endif;

      // #1021 Syn.extension 判定
      // ------------------------------
      $is_syn_extension = false;

      // check.1 カテゴリーがcrazy
      if ( $post['categories'] ) :
        foreach( $post['categories'] as $key => $value ) :
          if ( $value['slug'] === 'crazy' ) :
            $is_syn_extension = true;
            break;
          endif;
        endforeach;
      endif;

      // check.2 投稿者がSPOZIUM
      if ( $is_syn_extension === false ) :
        if ( $post['user']['name'] === 'SPOZIUM' ) :
          $is_syn_extension = true;
        endif;
      endif;

      // syn.extension クロール対象かどうか
      // - index    : 自社枠・他社枠ともに掲載可能
      // - selfonly : 他社枠への掲載が不可
      // - noindex  : 自社枠・他社枠ともに掲載不可
      if ( $is_syn_extension ) :
        $syn_extension = 'index';
      else :
        $syn_extension = 'selfonly';
      endif;


      $args['page'] = $app->model->set(array(
        'title'          => $post['title'],
        'og_title'       => $post['title'].' | '.$app->model->property('title'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $post['description'],
        'canonical'      => $canonical,

        'syn_extension'  => $syn_extension,
        'image_src'      => $post['media']['images']['thumbnail'],

        'ad'             => $post['ad'],
        'theme'          => $post['theme'],

        'template'       => 'p',
        'path'           => $args,

        'category'       => $category,
        'post'           => $post,
      ));


      // アプリからの記事詳細アクセスならWebView向けページを表示
      if ( $app->model->property('ua_app') ) :

        // #1014 $_GET['get']を取得する
        $webview_type = ( isset($_GET['get']) && $_GET['get'] ) ? $_GET['get'] : '';

        if ( $post['is_readmore'] ) :
          return $this->renderer->render($response, "app.p.redirect.php", $args);
        else :

          if ( $webview_type === 'body' ) :
            return $this->renderer->render($response, "app.p.body.php", $args);
          else :
            return $this->renderer->render($response, "app.p.php", $args);
          endif;

        endif;

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

        'image_src'      => $post['media']['images']['thumbnail'],

        'ad'             => $post['ad'],
        'theme'          => $post['theme'],

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

      $comment_user = $comment['comments'][0]['user']['name'];
      $comment_body = str_replace(array("\r\n","\n","\r"), '', $comment['comments'][0]['body_escape']);
      $comment_body_escaped = mb_substr($comment_body, 0, 60, 'UTF-8');

      if ( mb_strlen( $comment_body, 'UTF-8') > 60 ) :
        $comment_body_escaped .= '…';
      endif;

      $args['page'] = $app->model->set(array(
        'title'          => $post['title'],
        'og_title'       => '『'.$post['title'].'』への '.$comment_user.' さんの返信 | '.$app->model->property('title'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/comment/'.$args['commend_id'].'/'.$args['reply_id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $comment_body_escaped,

        'image_src'      => $post['media']['images']['thumbnail'],

        'ad'             => $post['ad'],
        'theme'          => $post['theme'],

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