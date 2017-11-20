<?php


$app->get('/signup[/]', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'title'    => '新規会員登録',
    'og_title' => '新規会員登録 | '.$app->model->property('title'),
    'og_url'   => $app->model->property('site_url').'signup/',
    'template' => 'signup',
    'path'     => $args,
    'template_classname' => 'signup',
  ));

  return $this->renderer->render($response, "default.php", $args);

});

$app->get('/signup-wow[/]', function ($request, $response, $args) use ($app) {

    $args['page'] = $app->model->set(array(
      'title'    => '新規会員登録',
      'og_title' => '新規会員登録 | '.$app->model->property('title'),
      'og_url'   => $app->model->property('site_url').'signup-wow/',
      'template' => 'signup',
      'path'     => $args,
      'template_classname' => 'signup',
    ));

    return $this->renderer->render($response, "default.php", $args);

  });

// # サインアップ登録トップで非同期で完結のためルーティング廃止

// $app->group('/signup', function () use ($app) {


//   // 新規登録 - /signup/
//   // ==============================
//   $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

//     $args['page'] = $app->model->set(array(
//       'title'    => '新規会員登録',
//       'template' => 'signup',
//       'path'     => $args,
//       'template_classname' => 'signup',
//     ));

//     return $this->renderer->render($response, "default.php", $args);

//   });


//   // 新規登録/基本情報入力 - /signup/account/
//   // ==============================
//   $this->get('/{slug:account}[/]', function ($request, $response, $args) use ($app) {

//     $args['page'] = $app->model->set(array(
//       'title'    => '基本情報入力 | 新規会員登録',
//       'template' => 'signup.'.$args['slug'],
//       'path'     => $args,
//       'template_classname' => 'signup',
//     ));

//     return $this->renderer->render($response, "default.php", $args);

//   });


//   // 新規登録/興味のある競技を選択 - /signup/interest/
//   // ==============================
//   $this->get('/{slug:interest}[/]', function ($request, $response, $args) use ($app) {

//     $args['page'] = $app->model->set(array(
//       'title'    => '興味のある競技を選択 | 新規会員登録',
//       'template' => 'signup.'.$args['slug'],
//       'path'     => $args,
//       'template_classname' => 'signup',
//     ));

//     return $this->renderer->render($response, "default.php", $args);

//   });

// });


?>