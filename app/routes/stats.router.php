<?php

// stats
// ==============================
$app->group('/stats', function () use($app) {


  // スタッツトップ
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $title = '速報 &amp; データ';

    $args['page'] = $app->model->set(array(
      'title'    => $title,
      'og_title' => $title.' | '.$app->model->property('title_short'),
      'og_url'   => $app->model->property('site_url').'stats/',
      'path'     => $args,
    ));

    return $this->renderer->render($response, 'stats/banners/stats.php', $args);

  });

  // テニス & ゴルフ
  // ==============================
  $this->get('/{category:webview|tennis|golf}[/]', function ($request, $response, $args) use ( $app ) {

    if ( $args['category'] === 'webview' ) :

      $title = '速報 &amp; データ';

      $args['page'] = $app->model->set(array(
        'title'              => $title,
        'og_title'           => $title.' | '.$app->model->property('title_short'),
        'og_url'             => $app->model->property('site_url').'stats/',
        'path'               => $args,
      ));

      return $this->renderer->render($response, 'stats/banners/top/webview.php', $args);

    else :

      if ( $args['category'] === 'tennis' ) :
        $category = array(
          'title' => 'テニス | 速報 &amp; データ',
        );
      endif;

      if ( $args['category'] === 'golf' ) :
        $category = array(
          'title' => 'ゴルフ | 速報 &amp; データ',
        );
      endif;

      $args['page'] = $app->model->set(array(
        'title'              => $category['title'],
        'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
        'og_url'             => $app->model->property('site_url').'stats/'.$args['category'].'/',
        'template'           => $args['category'].'/index.php',
        'path'               => $args,
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    endif;

  });

  // MLB
  // ==============================
  $this->group('/mlb', function ($request, $response, $args) use ( $app ) {

    // トップ
    $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

      $title = 'MLB | 速報 &amp; データ';

      $args['page'] = $app->model->set(array(
        'title'              => $title,
        'og_title'           => $title.' | '.$app->model->property('title_short'),
        'og_description'     => 'MLB 速報 &amp; データ見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
        'og_url'             => $app->model->property('site_url').'stats/mlb/',
        'og_image'           => $app->model->property('site_url').'assets/images/stats/mlb/og_image.jpg',
        'template'           => 'mlb/schedule.php',
        'path'               => $args,
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    });

    // ヒットする文字列だけ
    $this->get('/{category:schedule|standing|leaders|playerlist}[/]', function ($request, $response, $args) use ($app) {

      $category = array(
        'title' => 'MLB | 速報 &amp; データ',
      );

      $args['page'] = $app->model->set(array(
        'title'              => $category['title'],
        'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
        'og_description'     => 'MLB 速報 &amp; データ見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
        'og_url'             => $app->model->property('site_url').'stats/mlb/',
        'og_image'           => $app->model->property('site_url').'assets/images/stats/mlb/og_image.jpg',
        'template'           => 'mlb/'.$args['category'].'.php',
        'path'               => $args,
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    });
  });



  // 海外サッカー #2275
  // ==============================
  $this->group('/worldsoccer', function ($request, $response, $args) use ( $app ) {

    $title        = '海外サッカー | 速報 &amp; データ';
    $page = $app->model->set(array(
      'title'              => $title,
      'og_title'           => $title.' | '.$app->model->property('title_short'),
      'og_description'     => '海外サッカー 速報 &amp; データ見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
      'og_url'             => $app->model->property('site_url').'stats/worldsoccer/',
      'og_image'           => $app->model->property('site_url').'assets/images/stats/worldsoccer/og_image.jpg',
    ));


    // トップ
    $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {
      $args['page']             = $page;
      $args['page']['template'] = 'worldsoccer/index.php';
      return $this->renderer->render($response, 'stats/default.php', $args);
    });

    // ヒットする文字列だけ
    $this->get('/{category:schedule|playerlist}[/]', function ($request, $response, $args) use ($app, $page) {

      if ( $args['category'] === 'schedule' ) :
        $category = array(
          'title' => '試合日程',
        );
      endif;

      if ( $args['category'] === 'playerlist' ) :
        $category = array(
          'title' => '選手情報',
        );
      endif;

      $args['page']             = $page;
      $args['page']['template'] = 'worldsoccer/'.$args['category'].'.php';
      $args['page']['title']    = $category['title'].' | '.$page['title'];
      $args['page']['og_title'] = $category['title'].' | '.$page['og_title'];
      $args['page']['og_url']   = $page['og_url'].$args['category'].'/';

      return $this->renderer->render($response, 'stats/default.php', $args);
    });
  });


});

?>