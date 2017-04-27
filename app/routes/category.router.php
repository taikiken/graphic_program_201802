<?php


$categories = $app->model->property('site_categories');

if ( $categories ) :

  // ルーティングのためのスラッグを設定する - 存在しないカテゴリーは404を返す
  $category_slug = array_keys( $categories );


endif;


$app->group('/category/{category_slug:all|'.join('|',$category_slug).'}', function () use($app) {


  // 各カテゴリートップ - /category/:category_slug/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    $category           = $app->model->get_category_by_slug($args['category_slug']);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    if ( $args['category_slug'] === 'big6tv' ) :
      $template_classname = $template_classname . ' theme_big6';
    endif;

    $args['page'] = $app->model->set(array(
      'title'              => $category['label'],
      'og_title'           => $category['label'].' | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
    ));


	// OFG:ImageとNoImageの実装を追加 @axesor
	if (strlen($category["og_image"]) > 0) {
		$args['page']['og_image'] = $category["og_image"];
	}
	if (strlen($category["no_image"]) > 0) {
		$args['page']['no_image'] = $category["no_image"];
	}

	//カテゴリ毎のキーワードとdescriptionを取得
	if (strlen($category["seo_desc"]) > 0) {
		$args['page']['og_description'] = $category["seo_desc"];
	}
	if (strlen($category["seo_key"]) > 0) {
		$args['page']['keywords'] = $category["seo_key"];
	}




    // クライミングタブのog:image対応
    if ( $args['category_slug'] === 'climbing' ) :
      $args['page']['og_image'] = 'https://sportsbull.jp/_/climbing/og_image/og_image.jpg';
    endif;

    // big6tv対応
    // ==============================
    if ( $args['category_slug'] === 'big6tv' ) :
      $args['page']['og_image'] = 'https://sportsbull.jp/_/big6tv/og_image/og_image.png';

      // 直近のスケジュール表を取得する
      $big6tvSchedule = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/schedule');

      /*
      六大学野球開始前
      - 1日目と2日目を表示
      開始以降試合当日
      - 前日(終了)と当日
      試合がない日
      - 前回と次回
      */

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
      // $current = 20170530;
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
            $currentKey = $key + 1;
          endif;

        endforeach;

        $gameData = array_slice($gameDataArray, $currentKey - 1, 2);

      endif;

      $args['page']['big6tv']['scheduleLatest'] = $gameData;


      // ランキングデータを取得する
      $big6tvRanking = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/ranking');
      $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];

      // LIVEデータを取得する
      $big6tvLive = @file_get_contents($app->model->property('file_get_url').'/api/big6tv/live');
      $args['page']['big6tv']['liveData'] = json_decode($big6tvLive, true)['response'];

    endif;


    return $this->renderer->render($response, "default.php", $args);

  });


  // カテゴリー/ランキング - /category/:category_slug/ranking/
  // ==============================
  $this->get('/{type:ranking}[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug($args['category_slug']);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    $args['page'] = $app->model->set(array(
      'title'              => $category['label'].'のランキング',
      'og_title'           => $category['label'].'のランキング | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/ranking/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'type'               => 'ranking',
      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


  // カテゴリー/動画 - /category/:category_slug/video/
  // ==============================
  $this->get('/{type:video}[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug($args['category_slug']);
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';

    $args['page'] = $app->model->set(array(
      'title'              => $category['label'].'の動画',
      'og_title'           => $category['label'].'の動画 | '.$app->model->property('title'),
      'og_url'             => $app->model->property('site_url').'category/'.$category['slug'].'/video/',

      'category'           => $category,
      'ad'                 => $category['ad'],
      'theme'              => $category['theme'],

      'type'               => 'video',
      'template'           => 'category',
      'template_classname' => $template_classname,
      'path'               => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  });


});


?>