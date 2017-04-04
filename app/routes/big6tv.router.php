<?php

// big6tv
// ==============================
$app->group('/{slug:big6tv}',  function () use($app) {


  // /big6tv/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['page'] = $app->model->set(array(
      'title'              => '東京六大学野球 BIG6.TV',
      'og_title'           => '東京六大学野球 BIG6.TV | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'big6tv/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));



    // LIVEデータを取得する
    $big6tvLive = @file_get_contents($app->model->property('site_url').'/api/big6tv/live');
    if ( !$big6tvLive ) :
      $big6tvLive = @file_get_contents('https://dev.sportsbull.jp/api/big6tv/live');
    endif;
    $args['page']['big6tv']['liveData'] = json_decode($big6tvLive, true)['response'];

    // スケジュール表を取得する
    $big6tvSchedule = @file_get_contents($app->model->property('site_url').'/api/big6tv/schedule');
    if ( !$big6tvSchedule ) :
      $big6tvSchedule = @file_get_contents('https://dev.sportsbull.jp/api/big6tv/schedule');
    endif;
    $args['page']['big6tv']['scheduleData'] = json_decode($big6tvSchedule, true)['response'];

    // ランキングデータを取得する
    $big6tvRanking = @file_get_contents($app->model->property('site_url').'/api/big6tv/ranking');
    $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];



    // #1546 /big6tv/ の PC版右上レクタングルのID固定
    $args['page']['ad']['pc']['sidebar_top'] = 'big6-pc-rectangle';



    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'big6tv/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'big6tv/mobile/index.php', $args);
    endif;

  });


  // WebView
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'              => 'BIG6TV',
      'og_title'           => 'BIG6TV | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'big6tv/',
      'path'               => $args,
      'template'           => 'category',
      'template_classname' => '',
    ));


    // debug用に不要なmodel削除
    // unset($args['page']['site_categories']);
    // unset($args['page']['ad']);
    // unset($args['page']['category']);
    // unset($args['page']['post']);


    // [TODO] category.router.php と処理重複
    // 直近のスケジュール表を取得する
    $big6tvSchedule = @file_get_contents($app->model->property('site_url').'/api/big6tv/schedule');
    //$args['page']['big6tv']['scheduleData'] = json_decode($big6tvSchedule, true)['response'];


    // ゲームを日付でフラットに
    // ------------------------------
    $schedule = json_decode($big6tvSchedule, true)['response'];
    foreach( $schedule['gameinfo'] as $i => $week ) :
      foreach( $week['gamedate'] as $j => $day ) :
        // 比較用に日付をintに
        $day['int']      = intval( date( 'Ymd', strtotime($day['date']) ) );
        // 日付単位のデータに週渡しておく
        $day['week']     = $week['week'];
        $gameDataArray[] = $day;
      endforeach;
    endforeach;

    $current = intval(date('Ymd'));
    // $current = 20160410;
    $length  = count($gameDataArray);

    // 開催前
    if ( $current < $gameDataArray[0]['int'] ) :
      $gameData = array_slice($gameDataArray, 0, 2);

    // 開催終了
    elseif ( $current > $gameDataArray[$length - 1]['int'] ) :
      $gameData = array_slice($gameDataArray, $length - 2);

    // 開催期間中
    else :
      foreach( $gameDataArray as $key => $value ) :

        // 当日
        if ( $current == $value['int'] ) :

          // 当日 - 初日以降
          if ( isset($gameDataArray[$key-1] ) ) :
            $currentKey = $key;
          // 当日 - 初日
          else :
            $currentKey = 1;
          endif;

          break;

        // 開催中
        elseif ( $current > $value['int'] ) :
          $currentKey = $key;
        endif;

      endforeach;

      $gameData = array_slice($gameDataArray, $currentKey - 1, 2);

    endif;

    $args['page']['big6tv']['scheduleLatest'] = $gameData;

    // ランキングデータを取得する
    $big6tvRanking = @file_get_contents($app->model->property('site_url').'/api/big6tv/ranking');
    $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];

    return $this->renderer->render($response, 'big6tv/webview.php', $args);

  });

});

?>