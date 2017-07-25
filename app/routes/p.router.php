<?php

$app->group('/p/{article_id:[0-9]+}', function () use ($app) {



  // 記事詳細 - /p/:article_id/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    if ( $post && !empty($post['id']) ) :

      // 記事のプライマリーカテゴリーを取得
      $category = array();
      $category2 = array();
      if ( $post['categories'] ) :
        $category_primary = $post['categories'][0];
        if ( isset($category_primary['slug']) ) :
          $category = $app->model->get_category_by_slug($category_primary['slug']);
        endif;
      endif;

      // #782 カノニカル判定
      if ( $post['canonical'] ) :
        $canonical = $post['canonical'];
      else :
        $canonical = '';
      endif;
      $photo = [];
      $photo = $app->model->get_photo($post['id']);
      if(count($photo) > 0):
          header('Location: ' . $app->model->property('site_url').'a/'.$post['id'].'/');
        exit();
      endif;

      // #1179 Syn.extension 判定
      // ------------------------------
      $is_syn_extension = false;

      if ( $post['user']['name'] === 'スポーツブル編集部' || $post['user']['name'] === 'SPOZIUM' ) :
        $is_syn_extension = true;
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
        'title'          => $post['title'].' | '.$category['label'],
        'og_title'       => $post['title'].' | '.$app->model->property('title_short'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $post['description'],
        'canonical'      => $canonical,

        'syn_extension'  => $syn_extension,
        'syn_thumbnail'  => $post['media']['images']['thumbnail'],

        'ad'             => $post['ad'],
        'theme'          => $post['theme'],

        'template'       => 'p',
        'path'           => $args,

        'category'       => $category,
        'post'           => $post,
        'photo'          => $photo
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
        'og_title' => '404 Not Found',
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


  // 記事詳細 - 本文のみiframe - /p/:article_id/content/
  // ==============================
  $this->get('/content[/]', function ($request, $response, $args) use ($app) {

    $post = $app->model->get_post($args['article_id']);

    if ( $post && !empty($post['id']) ) :

      $args['page'] = $app->model->set(array(
        'title'          => $post['title'].' | '.$category['label'],
        'og_title'       => $post['title'].' | '.$app->model->property('title_short'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $post['description'],
        'theme'          => $post['theme'],
        'template'       => 'p',
        'path'           => $args,
        'post'           => $post,
      ));

      return $this->renderer->render($response, "content_iframe.php", $args);

    else :

      return $response->withStatus(404);

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
        'title'          => '『'.$post['title'].'』への '.$comment_user.' さんのコメント',
        'og_title'       => '『'.$post['title'].'』への '.$comment_user.' さんのコメント | '.$app->model->property('title_short'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/comment/'.$args['commend_id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $comment_body_escaped,

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
        'title'          => '『'.$post['title'].'』への '.$comment_user.' さんの返信',
        'og_title'       => '『'.$post['title'].'』への '.$comment_user.' さんの返信 | '.$app->model->property('title_short'),
        'og_url'         => $app->model->property('site_url').'p/'.$post['id'].'/comment/'.$args['commend_id'].'/'.$args['reply_id'].'/',
        'og_image'       => $post['media']['images']['original'],
        'og_description' => $comment_body_escaped,

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