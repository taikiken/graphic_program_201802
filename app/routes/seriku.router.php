<?php

// #inhigh.router.php seriku
// ==============================
// $app->group('/{slug:seriku}',  function () use($app) {


//   // /seriku/
//   // ==============================
//   $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
//     $args['page'] = $app->model->set(array(
//       'title'              => '世界陸上',
//       'og_title'           => '世界陸上 | '.$app->model->property('title'),
//       'og_url'             => $app->model->property('site_url').'seriku/',
//       'path'               => $args,
//       'template'           => 'category',
//       'template_classname' => '',
//     ));

//     return $this->renderer->render($response, 'seriku/index.php', $args);

//   });


//   // beijing
//   // ==============================
//   $this->get('/beijing[/]', function ($request, $response, $args) use ($app) {

//     $args['page'] = $app->model->set(array(
//       'title'              => '世界陸上 - 北京大会ハイライト',
//       'og_title'           => '世界陸上 - 北京大会ハイライト |'.$app->model->property('title'),
//       'og_url'             => $app->model->property('site_url').'seriku/beijing/',
//       'path'               => $args,
//       'template'           => 'category',
//       'template_classname' => '',
//     ));

//     return $this->renderer->render($response, 'seriku/beijing.php', $args);

//   });


//   // world-record
//   // ==============================
//   $this->get('/world-record[/]', function ($request, $response, $args) use ($app) {

//     $args['page'] = $app->model->set(array(
//       'title'              => '世界陸上 - 世界陸上で生まれた世界記録',
//       'og_title'           => '世界陸上 - 世界陸上で生まれた世界記録 | '.$app->model->property('title'),
//       'og_url'             => $app->model->property('site_url').'seriku/world-record/',
//       'path'               => $args,
//       'template'           => 'category',
//       'template_classname' => '',
//     ));

//     return $this->renderer->render($response, 'seriku/world-record.php', $args);

//   });


//   // webview
//   // ==============================
//   $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

//     $args['page'] = $app->model->set(array(
//       'title'              => '世界陸上',
//       'og_title'           => '世界陸上 | '.$app->model->property('title'),
//       'path'               => $args,
//       'template'           => 'webview',
//       'template_classname' => '',
//     ));

//     return $this->renderer->render($response, 'seriku/webview.php', $args);

//   });

// });

?>