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
        // @since 2017-07016 - .whole へ className 追加するために追加する
        'prop_category'      => $args['category'],
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    endif;

  });

  // MLB/game
  // ==============================
  $this->group('/mlb/game', function ($request, $response, $args) use ( $app ) {
    $this->get('/{category:\d{4}/\d{9}}[/]', function ($request, $response, $args) use ($app) {
      
      $category = array(
        'title' => 'MLB | 速報 &amp; データ',
      );

      $args['page'] = $app->model->set(array(
        'title'              => $category['title'],
        'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
        'og_description'     => 'MLB 速報 &amp; データ見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
        'og_url'             => $app->model->property('site_url').'stats/mlb/',
        'og_image'           => $app->model->property('site_url').'assets/images/stats/mlb/og_image.jpg',
//        'template'           => 'mlb/'.$args['category'].'.php',
        'template'           => 'mlb/game.php',
        'path'               => $args,
        // @since 2017-07016 - .whole へ className 追加するために追加する
        'prop_identity'      => 'game dark',
        'prop_category'      => 'mlb',
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    });
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
//        'template'           => 'mlb/schedule.php',
        // @since 2017-07016 - /stats/mlb/ 表示ファイルをindex.phpへ変更する
        'template'           => 'mlb/index.php',
        'path'               => $args,
        // @since 2017-07016 - .whole へ className 追加するために追加する
        'prop_identity'      => 'index',
        'prop_category'      => 'mlb',
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    });

    // ヒットする文字列だけ
    $this->get('/{category:schedule|standing|leaders|playerlist|\d{8}}[/]', function ($request, $response, $args) use ($app) {
      
      $category = array(
        'title' => 'MLB | 速報 &amp; データ',
      );

      // 追加 - on 20170721
      // /stats/mlb/20170715/
      // 日付文字の時に index へアクセスする
      $template = $args['category'];
      $prop_identity =  $args['category'];
      if (preg_match('/\d{8}/', $template)) {
        $prop_identity = 'index index-' . $args['category'];
        $template = 'index';
      }
      // --------

      $args['page'] = $app->model->set(array(
        'title'              => $category['title'],
        'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
        'og_description'     => 'MLB 速報 &amp; データ見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
        'og_url'             => $app->model->property('site_url').'stats/mlb/',
        'og_image'           => $app->model->property('site_url').'assets/images/stats/mlb/og_image.jpg',
//        'template'           => 'mlb/'.$args['category'].'.php',
        'template'           => 'mlb/'.$template.'.php',
        'path'               => $args,
        // @since 2017-07016 - .whole へ className 追加するために追加する
        'prop_identity'      => $prop_identity,
        'prop_category'      => 'mlb',
      ));

      return $this->renderer->render($response, 'stats/default.php', $args);

    });
  });


// 関西アメフト
// ==============================
$app->group('/{slug:ua_kansai}',  function () use($app) {


  // /ua_kansai/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['page'] = $app->model->set(array(
      'title'              => '関西学生アメリカンフットボールリーグ',
      'og_title'           => '関西学生アメリカンフットボールリーグ | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'ua_kansai/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'stats/ua_kansai/index.php', $args);

  });

  // match
  // ==============================
  $this->get('/match[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => '試合詳細 関西学生アメリカンフットボールリーグ',
      'og_title'           => '試合詳細 関西学生アメリカンフットボールリーグ | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'ua_kansai/match/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'stats/ua_kansai/match.php', $args);

  });

  // photo
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'フォトギャラリー 関西学生アメリカンフットボールリーグ',
      'og_title'           => 'フォトギャラリー 関西学生アメリカンフットボールリーグ | '.$app->model->property('title'),
      'path'               => $args,
      'template'           => 'photo',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'stats/ua_kansai/photo.php', $args);

  });

  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'WebView 関西学生アメリカンフットボールリーグ',
      'og_title'           => 'WebView 関西学生アメリカンフットボールリーグ | '.$app->model->property('title'),
      'path'               => $args,
      'template'           => 'webview',
      'template_classname' => '',
    ));

    return $this->renderer->render($response, 'stats/ua_kansai/webview.php', $args);

  });

});

  // // 海外サッカー #2275
  // // ==============================
  // $this->group('/worldsoccer', function ($request, $response, $args) use ( $app ) {

  //   $title        = '海外サッカー | 速報 &amp; データ';
  //   $page = $app->model->set(array(
  //     'title'              => $title,
  //     'og_title'           => $title.' | '.$app->model->property('title_short'),
  //     'og_description'     => '海外サッカー 速報 &amp; データ見るならスポーツブルで。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
  //     'og_url'             => $app->model->property('site_url').'stats/worldsoccer/',
  //     'og_image'           => $app->model->property('site_url').'assets/images/stats/worldsoccer/og_image.jpg',
  //   ));


  //   // トップ
  //   $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {
  //     $args['page']             = $page;
  //     $args['page']['template'] = 'worldsoccer/index.php';
  //     return $this->renderer->render($response, 'stats/default.php', $args);
  //   });

  //   // ヒットする文字列だけ
  //   $this->get('/{category:schedule|playerlist}[/]', function ($request, $response, $args) use ($app, $page) {

  //     if ( $args['category'] === 'schedule' ) :
  //       $category = array(
  //         'title' => '試合日程',
  //       );
  //     endif;

  //     if ( $args['category'] === 'playerlist' ) :
  //       $category = array(
  //         'title' => '選手情報',
  //       );
  //     endif;

  //     $args['page']             = $page;
  //     $args['page']['template'] = 'worldsoccer/'.$args['category'].'.php';
  //     $args['page']['title']    = $category['title'].' | '.$page['title'];
  //     $args['page']['og_title'] = $category['title'].' | '.$page['og_title'];
  //     $args['page']['og_url']   = $page['og_url'].$args['category'].'/';

  //     return $this->renderer->render($response, 'stats/default.php', $args);
  //   });
  // });


});

?>