<?php

$app->group('/pyeongchang2018', function () use ($app) {


  // /pyeongchang2018/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['partners'] = $app->model->get_partners();

    return;
  });

  // フォト一覧
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('pyeongchang2018');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' pyeongchang2018 pyeongchang2018-photo';
//    $category = array(
//      'label' => '平昌五輪',
//      'slug'  => 'pyeongchang2018',
//    );
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category'    => $category,
      'template'    => 'category',
      'title'       => '平昌五輪 フォトギャラリー',
      'keywords'    => '平昌五輪,フォトギャラリー,スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy',
      'og_description' => '平昌五輪 フォトギャラリー見るならスポーツブル(スポブル)で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。',
      'og_title'    => '平昌五輪 フォトギャラリー'.' | '.$app->model->property('title_short'),
      'og_url'         => $app->model->property('site_url').'pyeongchang2018/photo/',
    ));

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, '/pyeongchang2018/desktop/photo.php', $args);
    else :
      return $this->renderer->render($response, '/pyeongchang2018/mobile/photo.php', $args);
    endif;
  });
  // ハイライト一覧
  // ==============================
  $this->get('/movie[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('pyeongchang2018');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' pyeongchang2018 pyeongchang2018-movie';
    $args['page'] = $app->model->set(array(
      'template_classname' => $template_classname,
      'category' => $category,
      'template' => 'category',
    ));

    if ( $app->model->property('ua') === 'desktop' ) :
      return $this->renderer->render($response, '/pyeongchang2018/desktop/movie.php', $args);
    else :
      return $this->renderer->render($response, '/pyeongchang2018/mobile/movie.php', $args);
    endif;
  });
  // WebView
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    return $this->renderer->render($response, '/pyeongchang2018/webview.php', $args);

  });

});

?>