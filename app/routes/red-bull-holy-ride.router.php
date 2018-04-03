<?php

// red-bull-holy-ride
// ==============================
$app->group('/{slug:red-bull-holy-ride}',  function () use($app) {

  $page = array(
    'title'              => 'RED BULL HOLY RIDE 2017 ライブ配信',
    'site_name'          => 'スポーツブル / SPORTS BULL',
    'og_type'            => 'article',
    'og_title'           => 'RED BULL HOLY RIDE 2017 ライブ配信 | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'red-bull-holy-ride/',
    'og_image'           => $app->model->property('site_url').'assets/images/red-bull-holy-ride/ogp.png',
    'og_description'     => 'RED BULL HOLY RIDE 2017 ライブ配信 見るならスポーツブルで。一般公道を疾走する、型破りなMTBダウンヒル・レースが今年も尾道で開催！高低差100メートル、約300段の階段を含む、過去最長約1,400メートルのコースを走り抜ける。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
    'keywords'           => 'RED BULL,レッドブル,HOLY RIDE 2017,ライブ配信,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
    'template'           => 'index',
    'template_classname' => 'red-bull-holy-ride',
    // add ua - 2017-08-16 by @taikiken - live.php l.16 判定に使用する
    'ua'                 => $app->model->property('ua'),
  );

  // index
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'red-bull-holy-ride/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'red-bull-holy-ride/mobile/index.php', $args);
    endif;

  });

});

?>