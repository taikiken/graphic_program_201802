<?php

use Aws\S3\S3Client;

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
    $big6tvLive = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/live');
    $args['page']['big6tv']['liveData'] = json_decode($big6tvLive, true)['response'];

    // スケジュール表を取得する
    $big6tvSchedule = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/schedule');
    $args['page']['big6tv']['scheduleData'] = json_decode($big6tvSchedule, true)['response'];

    // ランキングデータを取得する
    $big6tvRanking = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/ranking');
    $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];



    // #1546 /big6tv/ の PC版右上レクタングルのID固定
    $args['page']['ad']['pc']['sidebar_top'] = 'big6-pc-rectangle';



    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'big6tv/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'big6tv/mobile/index.php', $args);
    endif;

  });


  // game
  // ==============================
  $this->get('/game/{gameid:[A-Z][A-Z][0-9][0-9]}[/]', function ($request, $response, $args) use ($app) {

      // パスからjson決めるソン
      $url = explode('/', $_SERVER['REQUEST_URI']);
      $league = $url[1];
      $gameid = $args['gameid'];
      $arr = [
          'json',
          $league,
          '2017s', // 今はシーズン固定にしちゃってる
          'game_info_' . $gameid . '.json',
      ];
      $s3key = implode('/', $arr);

      // AWSのキー名
      $keyId = 'AKIAJ7OMTZRU6PGV6GZA';
      // シークレットキー
      $secretKey = 'T5fLQ2MKuHLaC+5FSK2iCQWB7MDHqthnBlOMs6U5';
      // region 東京region指定
      $region = 'ap-northeast-1';
      $version = 'latest';
      $bucket = 'dev-ublive.sportsbull.jp';
//
      $s3Setting = [
          'credentials' => [
              's3key' => $keyId,
              'secret' => $secretKey,
          ],
          'region' => $region,
          'version' => $version,
      ];

      $s3Object = S3Client::factory($s3Setting);
      $json = $s3Object->getObjectUrl($bucket, $s3key);

      // こっち使えないかなー
//      $S3Module = new S3Module;
//      $json = $S3Module->getUrl($bucket, $s3key);

      if (!@file_get_contents($json, NULL, NULL, 0, 1)) :
          // 404飛ばしたい
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

//      $json = json_decode(file_get_contents($json));

      $args['page'] = $app->model->set(array(
          'title'              => '東京六大学野球 BIG6.TV',
          'og_title'           => '東京六大学野球 BIG6.TV | '.$app->model->property('title'),
          'og_url'             => $app->model->property('site_url').'big6tv/',
          'path'               => $args,
          'template'           => 'category',
          'template_classname' => '',
          'metatag'            => $json,
      ));

      if ( $app->model->property('ua') === 'desktop' ) :
          return $this->renderer->render($response, 'big6tv/desktop/game.php', $args);
      else :
          return $this->renderer->render($response, 'big6tv/mobile/game.php', $args);
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
      'template'           => 'webview',
      'template_classname' => '',
    ));


    // debug用に不要なmodel削除
    // unset($args['page']['site_categories']);
    // unset($args['page']['ad']);
    // unset($args['page']['category']);
    // unset($args['page']['post']);


    // 直近のスケジュール表を取得する
    $big6tvSchedule = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/schedule');


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
      $gameData = array_slice($gameDataArray, 0, 4);

    // 開催終了
    elseif ( $current > $gameDataArray[$length - 1]['int'] ) :
      $gameData = array_slice($gameDataArray, $length - 4);

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
          $currentKey = $key + 1;
        endif;

      endforeach;

      $gameData = array_slice($gameDataArray, $currentKey - 2, 4);

    endif;

    $args['page']['big6tv']['scheduleLatest'] = $gameData;

    // ランキングデータを取得する
    $big6tvRanking = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/ranking');
    $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];

    return $this->renderer->render($response, 'big6tv/webview.php', $args);

  });

});

?>