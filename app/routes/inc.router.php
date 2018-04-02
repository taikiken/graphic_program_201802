<?php

$app->group('/inc', function () use ($app) {


  // head
  // ==============================
  $this->get('/demo[/]', function ($request, $response, $args) use ($app) {
    $app->model->property('query', $request->getQueryParams());

    $args['page'] = $app->model->set(array(
    ));

    return $this->renderer->render($response, 'inc.php', $args);
  });

  // head
  // ==============================
  $this->get('/{parts:all|head|header|footer}/{type:common|vk}/{device:responsive|desktop|mobile}[/]',  function ($request, $response, $args) use ($app) {

    // parts
    // ------------------------------
    switch ($args['parts']) :
      case 'head':

        $conditional = array(
          'html_start'    => false,
          'head'          => true,
          'head_assets'   => true, // css & js
          'head_viewport' => true, // viewport
          'head_seo'      => true, // keyword & description
          'head_ogp'      => true, // fb:ogp, twitter:card
          'head_icon'     => true, // apple-touch-icon
          'head_video'    => false,
          'header'        => false,
          'gnav'          => false,
          'footer'        => false,
          'html_end'      => false,
        );

        break;
      case 'header':
        break;
      case 'footer':
        break;
      default:
    endswitch;

    // type
    // ------------------------------
    switch ($args['type']) :
      case 'common':
        break;
      case 'vk':
        break;
      default:
    endswitch;

    // device
    // ------------------------------
    switch ($args['device']) :
      case 'responsive':
        break;
      case 'desktop':
        break;
      case 'mobile':
        break;
      default:
    endswitch;


    // query
    // ------------------------------
    $query = $request->getQueryParams();

    if ( $query['category'] ) :
      $category = $app->model->get_category_by_slug($query['category'], "", false);
    endif;

    $conditional = array(
      'head_start'    => true, // <!DOCTYPE〜
      'head_assets'   => true, // css & js
      'head_viewport' => true, // viewport
      'head_seo'      => true, // keyword & description
      'head_ogp'      => true, // fb:ogp, twitter:card
      'head_icon'     => true, // apple-touch-icon
      'head_video'    => true, // streampack video code
      'header_dom'    => true, // <header>
      'gnav_dom'      => true, // <nav>
    );

    $args['page'] = $app->model->set(array(
      'category' => $category,
      'query'    => $query,
    ));



    return $this->renderer->render($response, 'inc.php', $args);
  });

  // header
});

?>