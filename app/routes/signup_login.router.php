<?php

// 新規会員登録・ログイン - /signup_login/
// ==============================
$app->get('/signup_login[/]', function ($request, $response, $args) use ($app) {

  if ( $app->model->property('ua') === 'mobile' ) :

    $args['page'] = $app->model->set(array(
      'title'    => '新規会員登録 / ログイン',
      'template' => 'signup_login',
      'ua'       => 'mobile', # スマホ版のみなのでPCでもスマホ版みせちゃうことにする
      'path'     => $args,
    ));

    return $this->renderer->render($response, "default.php", $args);

  else :

    header('location: /signup/');
    exit();

  endif;

});

?>