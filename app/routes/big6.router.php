<?php

// big6tv
// ==============================
$app->get('/big6[/]', function ($request, $response, $args) use ($app) {


  $args['page'] = $app->model->set(array(
    'title'              => '六大学野球のタイトルです(仮)',
    'og_title'           => '大学野球のタイトルです(仮) | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'big6/',
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
  $big6Schedule = @file_get_contents($app->model->property('site_url').'/api/big6/schedule');
  $args['page']['big6']['scheduleData'] = json_decode($big6Schedule, true)['response'];


  // ランキングデータを取得する
  $big6Ranking = @file_get_contents($app->model->property('site_url').'/api/big6/ranking');
  $args['page']['big6']['rankingData'] = json_decode($big6Ranking, true)['response'];

  if ( $app->model->property('ua') === 'desktop' ) :
    return $this->renderer->render($response, 'big6/desktop/index.php', $args);
  else :
    return $this->renderer->render($response, 'big6/mobile/index.php', $args);
  endif;

});

?>