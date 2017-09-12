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
        // 'template'           => 'mlb/'.$args['category'].'.php',
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
        // 'template'           => 'mlb/schedule.php',
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
        // 'template'           => 'mlb/'.$args['category'].'.php',
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

  // 海外サッカー #2275
  // ==============================
  $this->group('/worldsoccer', function ($request, $response, $args) use ( $app ) {

    $page = array(
      'title' => '海外サッカー | 速報 &amp; データ',
      'category' => array(
        'schedule' => '日程・結果',
        'standing' => '順位',
        'playlist' => '選手成績',
        'team'     => 'チーム一覧',
      ),
      'league' => array(
        'premier-league' => array(
          'title' => 'プレミアリーグ',
        ),
        'bundesliga' => array(
          'title' => 'ブンデスリーガ',
        ),
        'champions-league' => array(
          'title' => 'UEFAチャンピオンズリーグ',
        ),
        'la-liga' => array(
          'title' => 'リーガ・エスパニョーラ',
        ),
        'serie-a' => array(
          'title' => 'セリエA',
        ),
      ),
    );

    // トップ -> `premier-league` のスケジュールに転送
    $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {
      return $response->withRedirect('/stats/worldsoccer/schedule/premier-league/', 301);
    });

    // 各カテゴリー
    foreach( array_keys($page['category']) as $key => $category ) :

      $this->group('/'.$category, function ($request, $response, $args) use ($app, $page, $category) {

        // 各トップ
        $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page, $category) {
          // 各カテゴリの premier-league に転送する
          return $response->withRedirect('/stats/worldsoccer/'.$category.'/premier-league/', 301);
        });

        // 各リーグ
        $this->get('/{league:'.join('|',array_keys($page['league'])).'}[/]', function ($request, $response, $args) use ($app, $page, $category) {

          $args['page'] = $app->model->set(array(
            'title'    => $page[$category].' | '.$page['league'][$league].' | '.$page['title'],
            'og_title' => $page[$category].' | '.$page['league'][$league].' | '.$page['title'].' | '.$app->model->property('title'),
            'path'     => $args,
          ));

          return $this->renderer->render($response, 'stats/worldsoccer/'.$category.'/'.$args['league'].'.php', $args);
        });
      });

    endforeach;

  });


  // 大学野球
  // ==============================
  // ヒットする文字列だけ
  $this->group('/{league:ub_kansai|ub_kansaibig6|ub_tohto}', function ($request, $response, $args) use ($app) {

    $this->get('/2017a/game/{gameid:[A-Z][A-Z][0-9][0-9]}[/]', function ($request, $response, $args) use ($app) {

      $request_uri = $_SERVER['REQUEST_URI'];
      $url = explode('/', $request_uri);
      $league = $url[2];
      $season = $url[3];
      $gameid = $args['gameid'];
      $arr = [
        'json',
        $league,
        $season,
        'game_info_' . $gameid . '.json',
      ];
      $s3key = implode('/', $arr);

      $S3Module = new S3Module;
      $json = $S3Module->getUrl($s3key);

      // jsonからタイトルつくる
      // フロントはいつでも本番のバケットのjson取得してる
      // ルーティングではUT_ENVみてバケット分けている
      $team_names = [];
      $visitor = '';
      $home = '';
      $dateY = '';
      $dateM = '';
      $dateD = '';
      $weekday = '';
      if (!empty(file_get_contents($json, false, null, 0, 1))){
        $json = json_decode(file_get_contents($json));
        foreach ($json->team as $team) {
          $team_names[] = $team->teaminfo->name;
        }
        $visitor = $team_names[0];
        $home = $team_names[1];
        $dateY = $json->gameinfo->dateY;
        $dateM = $json->gameinfo->dateM;
        $dateD = $json->gameinfo->dateD;
        $weekday = $json->gameinfo->weekday;
      }
      // シーズン日本語化
      $season_array = str_split($season, 4);
      $year = $season_array[0];
      $season_jp = $season_array[1] == 's' ? '春' : '秋';

      switch ($league) {
        case 'ub_tohto':
          $season_name = $year . $season_jp;
          $short_season_name = substr($season_name, 2);

          $league_name = '東都大学野球';
          $team_and_date = implode('', [
            $visitor,
            ' vs ',
            $home,
            ' - ',
            $dateY,
            '年',
            $dateM,
            '月',
            $dateD,
            '日（',
            $weekday,
            '）',
          ]);

          $title = implode('', [
            $team_and_date,
            '- ',
            $league_name,
            ' ',
            $season_name
          ]);

          $args['page'] = $app->model->set(array(
            'request_uri' => $request_uri,
            'title' => $title,
            'og_image' => 'OG_univ_tohto',
            'stats_top_image' => 'tohto',
            'league' => $league,
            'league_name' => $league_name,
            'game_id' => $gameid,
            'season' => $season,
            'season_name' => $season_name,
            'short_season' => $short_season_name,
            'team_and_date' => $team_and_date,
          ));
          return $this->renderer->render($response, 'stats/baseball_univ/game.php', $args);

        case 'ub_kansaibig6':
          $season_name = $year . $season_jp;
          $short_season_name = substr($season_name, 2);

          $league_name = '関西六大学野球';
          $team_and_date = implode('', [
            $visitor,
            ' vs ',
            $home,
            ' - ',
            $dateY,
            '年',
            $dateM,
            '月',
            $dateD,
            '日（',
            $weekday,
            '）',
          ]);

          $title = implode('', [
            $team_and_date,
            '- ',
            $league_name,
            ' ',
            $season_name
          ]);

          $args['page'] = $app->model->set(array(
            'request_uri' => $request_uri,
            'title' => $title,
            'og_image' => 'OG_univ_6',
            'stats_top_image' => 'kansai6',
            'league' => $league,
            'league_name' => $league_name,
            'game_id' => $gameid,
            'season' => $season,
            'season_name' => $season_name,
            'short_season' => $short_season_name,
            'team_and_date' => $team_and_date,
          ));
          return $this->renderer->render($response, 'stats/baseball_univ/game.php', $args);

        case 'ub_kansai':
          $season_name = $year . $season_jp;
          $short_season_name = substr($season_name, 2);

          $league_name = '関西大学野球';
          $team_and_date = implode('', [
            $visitor,
            ' vs ',
            $home,
            ' - ',
            $dateY,
            '年',
            $dateM,
            '月',
            $dateD,
            '日（',
            $weekday,
            '）',
          ]);

          $title = implode('', [
            $team_and_date,
            '- ',
            $league_name,
            ' ',
            $season_name
          ]);

          $args['page'] = $app->model->set(array(
            'request_uri' => $request_uri,
            'title' => $title,
            'og_image' => 'OG_univ_kansai',
            'stats_top_image' => 'kansai',
            'league' => $league,
            'league_name' => $league_name,
            'game_id' => $gameid,
            'season' => $season,
            'season_name' => $season_name,
            'short_season' => $short_season_name,
            'team_and_date' => $team_and_date,
          ));
          return $this->renderer->render($response, 'stats/baseball_univ/game.php', $args);
      }
    });
  });

});

?>