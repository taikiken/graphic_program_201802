<?php

// big6tv
// ==============================
$app->get('/{slug:big6|big6tv}[/]', function ($request, $response, $args) use ($app) {


  $args['page'] = $app->model->set(array(
    'title'              => '六大学野球のタイトルです(仮)',
    'og_title'           => '大学野球のタイトルです(仮) | '.$app->model->property('title'),
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


  // スケジュール表を取得する
  $big6tvSchedule = @file_get_contents($app->model->property('site_url').'/api/big6tv/schedule');
  $args['page']['big6tv']['scheduleData'] = json_decode($big6tvSchedule, true)['response'];

  // ランキングデータを取得する
  $big6tvRanking = @file_get_contents($app->model->property('site_url').'/api/big6tv/ranking');
  $args['page']['big6tv']['rankingData'] = json_decode($big6tvRanking, true)['response'];


  if ( $app->model->property('ua') === 'desktop' ) :
    return $this->renderer->render($response, 'big6tv/desktop/index.php', $args);
  else :
    return $this->renderer->render($response, 'big6tv/mobile/index.php', $args);
  endif;

});

?>