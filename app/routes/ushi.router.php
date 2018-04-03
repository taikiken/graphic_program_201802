<?php

// red-bull-holy-ride
// ==============================
$app->group('/{slug:ushi}',  function () use($app) {

  $page = array(
    'title'              => '最大5,000円分の高級ブランド牛がもらえる！牛キャンペーン',
    'site_name'          => 'スポーツブル (スポブル)',
    'og_type'            => 'article',
    'og_title'           => '最大5,000円分の高級ブランド牛がもらえる！牛キャンペーン | '.$app->model->property('title'),
    'og_url'             => $app->model->property('site_url').'ushi/',
    'og_image'           => $app->model->property('site_url').'assets/images/ushi/ogp.png',
    'og_description'     => '無料スポーツニュースアプリのスポーツブル（スポブル）を3日連続見て、最大5,000円分の高級ブランド牛がもらえる！',
    'keywords'           => '牛キャン,Wowma,プレゼント,キャンペーン,スポーツ,メディア,アスリート,ニュース,動画,sports,media',
    'template'           => 'index',
    'template_classname' => 'ushi',
    'dir_name'           => 'ushi',
    'ua'                 => $app->model->property('ua'),
  );

  // index
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app, $page) {

    $app->model->property('path', $args);
    $args['page'] = $app->model->set($page);

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, 'ushi/desktop/index.php', $args);
    else :
      return $this->renderer->render($response, 'ushi/mobile/index.php', $args);
    endif;

  });

});

?>