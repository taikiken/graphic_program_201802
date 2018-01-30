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
      'league' => array(
        'premier-league'   => 'プレミアリーグ',
        'bundesliga'       => 'ブンデスリーガ',
        'champions-league' => 'チャンピオンズリーグ',
        'la-liga'          => 'リーガ・エスパニョーラ',
        'serie-a'          => 'セリエA',
      ),
      'category' => array(
        'schedule' => array(
          'title' => '日程・結果',
        ),
        'standing' => array(
          'title' => '順位',
        ),
        'playlist' => array(
          'title' => '選手成績',
        ),
        'team' => array(
          'title' => 'チーム一覧',
        ),
      ),
    );

    // トップ -> 'premier-league/schedule' のスケジュールに転送
    $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {
      return $response->withRedirect('/stats/worldsoccer/premier-league/schedule/', 301);
    });
    // 各リーグ
    foreach( array_keys($page['league']) as $key => $league ) :

      $this->group('/'.$league, function ($request, $response, $args) use ($app, $page, $league) {

        // 各トップ
        $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page, $league) {
          // 各カテゴリの schedule に転送する
          return $response->withRedirect('/stats/worldsoccer/'.$league.'/schedule/', 301);
        });

        // 各カテゴリー
        $this->get('/{category:'.join('|',array_keys($page['category'])).'}[/]', function ($request, $response, $args) use ($app, $page, $league) {

          // ルータではUT_ENVみてバケット分けている
          $edition_list_s3key = 'worldsoccer/json/edition_list.json';
          $S3Module = new S3Module;
          $edition_list_json = $S3Module->getUrl($edition_list_s3key);

          $season = '';
          $edition_id = '';

          // $breadarray = [
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/">',
          //   '<span itemprop="name">',
          //   $page['league'][$league],
          //   '</span>',
          //   '<meta itemprop="position" content="3"> </a>',
          //   '</li>',
          //
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/',
          //   $args['category'],
          //   '">',
          //   '<span itemprop="name">',
          //   $page['category'][$args['category']]['title'],
          //   '</span>',
          //   '<meta itemprop="position" content="4"> </a>',
          //   '</li>',
          // ];

          $breadarray = array(
            array(
              'label' => $page['league'][$league],
              'path'  => '/stats/worldsoccer/'.$league.'/',
            ),
            array(
              'label' => $page['category'][$args['category']]['title'],
              'path'  => '/stats/worldsoccer/'.$league.'/'.$args['category'],
            ),
          );

          $breadcrumb = $breadarray;

          if (!empty(file_get_contents($edition_list_json, false, null, 0, 1))){
            $edition_list_json = json_decode(file_get_contents($edition_list_json));
            foreach ($edition_list_json as $value) {
              if ($value->league == $league) {
                $season = $value->season;
                $edition_id = $value->editionId;
              }
            }
          }
          $args['page'] = $app->model->set(array(
            'title'              => $page['league'][$league].' - '.$page['category'][$args['category']]['title'].' | '.$page['title'],
            'og_type'            => 'article',
            'og_title'           => $page['league'][$league].' - '.$page['category'][$args['category']]['title'].' | '.$page['title'].' | '.$app->model->property('title'),
            'og_url'             => $app->model->property('site_url').'stats/worldsoccer/'.$league.'/'.$args['category'],
            'og_image'           => $app->model->property('site_url').'assets/images/stats/worldsoccer/ogp.jpg',
            'og_description'     => $page['league'][$league] . "の" .$page['category'][$args['category']]['title']."見るならスポーツブル(スポブル)で！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。",
            'keywords'           => $page['league'][$league].',海外サッカー,欧州サッカー,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
            'path'               => $args,
            'league'             => $league,
            'season'             => $season,
            'edition_id'         => $edition_id,
            'breadcrumb'         => $breadcrumb,
          ));

          if ($args['category'] == 'schedule' || $args['category'] == 'team') {
            return $this->renderer->render($response, 'stats/worldsoccer/'.$args['category'].'.php', $args);
          }

          return $this->renderer->render($response, 'stats/worldsoccer/'.$league.'/'.$args['category'].'.php', $args);
        });

        // schedule
        $this->get('/schedule/{editionid:[0-9]+}-{matchid:[0-9]+}[/]', function ($request, $response, $args) use ($app, $page, $league) {

          $edition_id = $args['editionid'];
          $match_id = $args['matchid'];
          // matchidから日付を特定する。
          $edition_list_s3key = 'worldsoccer/json/edition_list.json';
          $match_week_s3key = 'worldsoccer/json/{league}/{season}/match_week_map.json';

          // ルータではUT_ENVみてバケット分けている
          $S3Module = new S3Module;
          $edition_list_json = $S3Module->getUrl($edition_list_s3key);

          $season = '';
          $home_team = '';
          $away_team = '';
          $match_date = '';

          if (!empty(file_get_contents($edition_list_json, false, null, 0, 1))){
            $edition_list_json = json_decode(file_get_contents($edition_list_json));
            $season = $edition_list_json->$edition_id->season;

            $search = [
              '{league}',
              '{season}',
            ];
            $replace = [
              $league,
              $season,
            ];
            $match_week_s3key = str_replace($search, $replace, $match_week_s3key);
            $match_week_json = $S3Module->getUrl($match_week_s3key);

            if (!empty(file_get_contents($match_week_json, false, null, 0, 1))){
              $match_week_json = json_decode(file_get_contents($match_week_json));
              $week_id = $match_week_json->$match_id->weekId;
            }
          }

          // week_id から 試合情報とる
          if (!empty($week_id)) {
            $week_id_s3key = 'worldsoccer/json/{league}/{season}/{weekid}.json';
            $search = [
              '{league}',
              '{season}',
              '{weekid}',
            ];
            $replace = [
              $league,
              $season,
              $week_id,
            ];
            $week_id_s3key = str_replace($search, $replace, $week_id_s3key);
            $week_id_json = $S3Module->getUrl($week_id_s3key);

            if (!empty(file_get_contents($week_id_json, false, null, 0, 1))) {
              $week_id_json = json_decode(file_get_contents($week_id_json));
              foreach ($week_id_json as $match) {
                if ($match->n_MatchID == $match_id) {
                  $home_team = $match->c_HomeTeam;
                  $away_team = $match->c_AwayTeam;
                  $utc_timestamp = substr($match->d_DateUTC, 6, 10);
                  $DateTime = new DateTime();
                  $DateTime->setTimestamp($utc_timestamp)->setTimezone(new DateTimeZone('Asia/Tokyo'));
                  $match_date = $DateTime->format('Y年m月d日');
                  $week_list = array( '日', '月', '火', '水', '木', '金', '土');
                  $week = $week_list[(int)$DateTime->format('w')];
                  $match_date = $match_date . '（' . $week .'）';
                }
              }
            }
          }
          if (empty($home_team) && empty($away_team)) {
            $title = '未定'.' - '.$match_date;
          } else {
            $home_team = @$home_team ?: '未定';
            $away_team = @$away_team ?: '未定';
            $title = $home_team.' vs '.$away_team.' - '.$match_date;
          }
          // $breadarray = [
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/">',
          //   '<span itemprop="name">',
          //   $page['league'][$league],
          //   '</span>',
          //   '<meta itemprop="position" content="3"> </a>',
          //   '</li>',
          //
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/schedule">',
          //   '<span itemprop="name">',
          //   '日程・結果',
          //   '</span>',
          //   '<meta itemprop="position" content="4"> </a>',
          //   '</li>',
          //
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/schedule/',
          //   $edition_id,
          //   '-',
          //   $match_id,
          //   '/">',
          //   '<span itemprop="name">',
          //   $title,
          //   '</span>',
          //   '<meta itemprop="position" content="5"> </a>',
          //   '</li>',
          // ];
          // $breadcrumb = implode('', $breadarray);

          $breadarray = array(
            array(
              'label' => $page['league'][$league],
              'path'  => '/stats/worldsoccer/'.$league.'/',
            ),
            array(
              'label' => '日程・結果',
              'path'  => '/stats/worldsoccer/'.$league.'/schedule/',
            ),
            array(
              'label' => $title,
              'path'  => '/stats/worldsoccer/'.$league.'/schedule/'.$edition_id.'-'.$match_id.'/',
            ),
          );
          $breadcrumb = $breadarray;

          $args['page'] = $app->model->set(array(
            'title'              => $title.' - '.$page['league'][$league] . $page['category'][$args['category']]['title'].' | '.$page['title'],
            'og_type'            => 'article',
            'og_title'           => $page['league'][$league].' - '.$page['category'][$args['category']]['title'].' | '.$page['title'].' | '.$app->model->property('title'),
            'og_url'             => $app->model->property('site_url').'stats/worldsoccer/'.$league.'/'.$args['category'],
            'og_image'           => $app->model->property('site_url').'assets/images/stats/worldsoccer/ogp.jpg',
            'og_description'     => $title.' - '.$page['league'][$league] . "の結果を見るならスポーツブル(スポブル)で！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。",
            'keywords'           => $page['league'][$league].',海外サッカー,欧州サッカー,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
            'league'             => $league,
            'path'               => $args,
            'match_id'           => $match_id,
            'breadcrumb'         => $breadcrumb,
          ));
          return $this->renderer->render($response, 'stats/worldsoccer/schedule_detail.php', $args);
        });
        // チーム一覧
        $this->get('/team/{editionid:[0-9]+}-{teamid:[0-9]+}[/]', function ($request, $response, $args) use ($app, $page, $league) {

          $edition_id = $args['editionid'];
          $team_id = $args['teamid'];
          $edition_list_s3key = 'worldsoccer/json/edition_list.json';

          // ルータではUT_ENVみてバケット分けている
          $S3Module = new S3Module;
          $edition_list_json = $S3Module->getUrl($edition_list_s3key);

          $team = '';
          $season = '';

          if (!empty(file_get_contents($edition_list_json, false, null, 0, 1))){
            $edition_list_json = json_decode(file_get_contents($edition_list_json));
            $season = $edition_list_json->$edition_id->season;

          }
          if (!empty($season)) {
            $team_list_s3key = 'worldsoccer/json/{league}/{season}/team_list.json';

            $search = [
              '{league}',
              '{season}',
            ];
            $replace = [
              $league,
              $season,
            ];
            $team_list_s3key = str_replace($search, $replace , $team_list_s3key);
            $team_list_json = $S3Module->getUrl($team_list_s3key);

            if (!empty(file_get_contents($team_list_json, false, null, 0, 1))){
              $res = json_decode(file_get_contents($team_list_json));
              foreach ($res as $row) {
                if ($row->n_TeamID == $team_id) {
                  $team = $row->c_Team;
                }
              }
            }
          }


          $widget_id_map = array(
            'premier-league'   => '1eng',
            'bundesliga'       => '1ger',
            'champions-league' => 'cl',
            'la-liga'          => '1esp',
            'serie-a'          => '1ita',
          );
          $widget_id = $widget_id_map[$league];

          // $breadarray = [
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/">',
          //   '<span itemprop="name">',
          //   $page['league'][$league],
          //   '</span>',
          //   '<meta itemprop="position" content="3"> </a>',
          //   '</li>',
          //
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/team">',
          //   '<span itemprop="name">',
          //   'チーム一覧',
          //   '</span>',
          //   '<meta itemprop="position" content="4"> </a>',
          //   '</li>',
          //
          //   '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">',
          //   '<a itemprop="item" href="/stats/worldsoccer/',
          //   $league,
          //   '/team/',
          //   $edition_id,
          //   '-',
          //   $team_id,
          //   '/">',
          //   '<span itemprop="name">',
          //   $team,
          //   '</span>',
          //   '<meta itemprop="position" content="5"> </a>',
          //   '</li>',
          // ];
          // $breadcrumb = implode('', $breadarray);

          $breadarray = array(
            array(
              'label' => $page['league'][$league],
              'path'  => '/stats/worldsoccer/'.$league.'/',
            ),
            array(
              'label' => 'チーム一覧',
              'path'  => '/stats/worldsoccer/'.$league.'/team/',
            ),
            array(
              'label' => $team,
              'path'  => '/stats/worldsoccer/'.$league.'/team/'.$edition_id.'-'.$team_id.'/',
            ),
          );
          $breadcrumb = $breadarray;


          $args['page'] = $app->model->set(array(
            'title'              => $team.' - '.$page['league'][$league].' - '.$page['category'][$args['category']]['title'].' | '.$page['title'],
            'og_type'            => 'article',
            'og_title'           => $page['league'][$league].' - '.$page['category'][$args['category']]['title'].' | '.$page['title'].' | '.$app->model->property('title'),
            'og_url'             => $app->model->property('site_url').'stats/worldsoccer/'.$league.'/'.$args['category'],
            'og_image'           => $app->model->property('site_url').'assets/images/stats/worldsoccer/ogp.jpg',
            'og_description'     => $page['league'][$league] . "の" .$team."見るならスポーツブル(スポブル)で！スポーツブル(スポブル)は、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。",
            'keywords'           => $page['league'][$league].',海外サッカー,欧州サッカー,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
            'path'               => $args,
            'league'             => $league,
            'widget_id'          => $widget_id,
            'team_id'            => $team_id,
            'breadcrumb'         => $breadcrumb,
          ));
          return $this->renderer->render($response, 'stats/worldsoccer/team_detail.php', $args);
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

          $league_name = '関西学生野球';
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

  // draft
  // ==============================
  /**
   * BGATE-449 ドラフト会議2017 / データの用意
   * https://aws-plus.backlog.jp/view/BGATE-449
   * BGATE-459 ドラフト会議2017 - スポブル展開
   * https://aws-plus.backlog.jp/view/BGATE-459
   * ```
   * URL :
   * ドラフト候補選手 : `/stats/npb-draft2017/`
   * ドラフト速報 : `/stats/npb-draft2017/result/`
   * ```
   * User: @taikiken
   * Date: 2017/10/20
   * Time: 21:23
   */
  $this->group('/npb-draft2017', function ($request, $response, $args) use ( $app ) {

    // ドラフト候補選手
    $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
      $args['page'] = $app->model->set(array(
        'title'              => 'プロ野球2017 ドラフト候補選手',
        'og_title'           => 'プロ野球2017 ドラフト候補選手 | スポーツブル(スポブル)',
        'og_url'             => $app->model->property('site_url') . 'stats/npb-draft2017/',
        'og_description'     => 'ドラフト候補選手見るならスポーツブル（スポブル）で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
        'og_image'           => 'https://sportsbull.jp/assets/images/stats/npb-draft2017/og_image.png',
        'template'           => 'draft',
        'template_classname' => 'dark',
        'path'               => $args,
        'ua'                 => $app->model->property('ua')
      ));

      if ( $app->model->property('ua') === 'desktop' ) :
        return $this->renderer->render($response, 'stats/npb-draft2017/players.php', $args);
      else :
        return $this->renderer->render($response, 'stats/npb-draft2017/players.sp.php', $args);
      endif;
    });

    // ドラフト速報
    $this->get('/{category:result}[/]', function ($request, $response, $args) use ($app) {
      $args['page'] = $app->model->set(array(
        'title'              => 'プロ野球2017 ドラフトリアル生速報',
        'og_title'           => 'プロ野球2017 ドラフトリアル生速報 | スポーツブル(スポブル)',
        'og_url'             => $app->model->property('site_url') . 'stats/npb-draft2017/result/',
        'og_description'     => 'ドラフト候補選手見るならスポーツブル（スポブル）で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
        'og_image'           => 'https://sportsbull.jp/assets/images/stats/npb-draft2017/og_image.png',
        'template'           => 'draft',
        'template_classname' => 'dark',
        'path'               => $args,
        'ua'                 => $app->model->property('ua')
      ));

      if ( $app->model->property('ua') === 'desktop' ) :
        return $this->renderer->render($response, 'stats/npb-draft2017/result.php', $args);
      else :
        return $this->renderer->render($response, 'stats/npb-draft2017/result.sp.php', $args);
      endif;
    });
  });
});

?>
