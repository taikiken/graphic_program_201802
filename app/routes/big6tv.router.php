<?php

// big6tv
// ==============================
$app->group('/{slug:big6tv}', function () use ($app) {


  // /big6tv/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('/category/big6tv/', 301);
  });

  // game
  // ==============================
  $this->get('/{season:20[0-9]{2}[as]}/game/{gameid:[A-Z][A-Z][0-9][0-9]}[/]', function ($request, $response, $args) use ($app) {

    $current_year = date("Y");
    $season_year = substr($args['season'], 0, 4);
    // データの無いシーズンを指定した場合404
    if($season_year < "2016" || $current_year < $season_year )
    {
        // 404
        // ------------------------------
        $args['page'] = $app->model->set([
            'title'    => '404 Not Found',
            'og_title' => '404 Not Found',
            'template' => 404,
        ]);

        $args['request']  = $request;
        $args['response'] = $response;

        if($app->model->property('ua') === 'desktop')
        {
            return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
        }
        else
        {
            return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
        }
    }
      
    $url = explode('/', $_SERVER['REQUEST_URI']);
    $league = $url[1];
    $season = $url[2];
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

    $request_uri = $_SERVER['REQUEST_URI'];
    $season_name = $year . $season_jp;
    $short_season_name = substr($season_name, 2);

    $league_name = '東京六大学野球';
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
      'league' => $league,
      'league_name' => $league_name,
      'gameid' => $gameid,
      'season' => $season,
      'season_name' => $season_name,
      'short_season' => $short_season_name,
      'team_and_date' => $team_and_date,
    ));

    return $this->renderer->render($response, 'big6tv/game.php', $args);
  });


  // WebView
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title' => 'BIG6TV',
      'og_title' => 'BIG6TV | ' . $app->model->property('title'),
      'og_url' => $app->model->property('site_url') . 'big6tv/',
      'path' => $args,
      'template' => 'webview',
      'template_classname' => '',
    ));
    

    // debug用に不要なmodel削除
    // unset($args['page']['site_categories']);
    // unset($args['page']['ad']);
    // unset($args['page']['category']);
    // unset($args['page']['post']);

    //include/conf/config.php
    global $BIG6TV_SEASON;
    // 直近のスケジュール表を取得する
    $big6tvSchedule = @file_get_contents($app->model->property('file_get_url') . '/api/big6tv/schedule'.$BIG6TV_SEASON);
    


    // ゲームを日付でフラットに
    // ------------------------------
    $schedule = json_decode($big6tvSchedule, true)['response'];
    foreach ($schedule['gameinfo'] as $i => $week) :
      foreach ($week['gamedate'] as $j => $day) :
        // 比較用に日付をintに
        $day['int'] = intval(date('Ymd', strtotime($day['date'])));
        // 日付単位のデータに週渡しておく
        $day['week'] = $week['week'];
        $gameDataArray[] = $day;
      endforeach;
    endforeach;

    $current = intval(date('Ymd'));
    // $current = 20160410;
    $length = count($gameDataArray);

    // 開催前
    if ($current < $gameDataArray[0]['int']) :
      $gameData = array_slice($gameDataArray, 0, 4);

    // 開催終了
    elseif ($current > $gameDataArray[$length - 1]['int']) :
      $gameData = array_slice($gameDataArray, $length - 4);

    // 開催期間中
    else :
      foreach ($gameDataArray as $key => $value) :

        // 当日
        if ($current == $value['int']) :

          // 当日 - 初日以降
          if (isset($gameDataArray[$key - 1])) :
            $currentKey = $key;
          // 当日 - 初日
          else :
            $currentKey = 1;
          endif;

          break;

        // 開催中
        elseif ($current > $value['int']) :
          $currentKey = $key + 1;
        endif;

      endforeach;

      $gameData = array_slice($gameDataArray, $currentKey - 2, 4);

    endif;

    $args['page']['big6tv']['scheduleLatest'] = $gameData;

    // ランキングデータを取得する
    $big6tvRanking = @file_get_contents($app->model->property('file_get_url') . '/api/big6tv/ranking'.$BIG6TV_SEASON);
    $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];

    return $this->renderer->render($response, 'big6tv/webview.php', $args);

  });

});

?>