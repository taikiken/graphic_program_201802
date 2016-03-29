<?php

// お知らせ - /notifications
// ==============================
$app->get('/notifications[/]', function ($request, $response, $args) use ($app) {

  $app->user_helper->check_logged_in();

  $args['page'] = $app->model->set(array(
    'title'    => 'お知らせ',
    'og_title' => 'お知らせ | '.$app->model->property('title'),
    'og_url'   => $app->model->property('site_url').'notifications/',
    'template' => 'notifications',
    'path'     => $args,
  ));

  return $this->renderer->render($response, "default.php", $args);

});

?>