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
        'prop_identity'      => 'game',
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

});

?>