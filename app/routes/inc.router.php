<?php
/*

# パーツ出力用

- view.model で定義した$conditionalを上書きすることでリクエスト毎に出力する要素を分ける

*/
$app->group('/inc', function () use ($app) {

  // head
  // ==============================
  $this->get('/{parts:all|head|header|footer}/{cateogry:top|inhigh|vk}/{device:responsive|desktop|mobile}[/]',  function ($request, $response, $args) use ($app) {

    $conditional = $app->model->property('conditional');

    // parts
    // ------------------------------
    switch ($args['parts']) :
      case 'head':

        $conditional = array(
          'html_start'       => false, // <!DOCTYPE〜
          'head'             => true,
          'head_title'       => false, // <title>
          'head_sagen'       => false, // sagen.js
          'head_assets'      => true, // css & js
          'head_viewport'    => true, // viewport
          'head_seo'         => false, // keyword & description
          'head_ogp'         => false, // fb:ogp, twitter:card
          'head_canonical'   => false, // canonical
          'head_syn'         => false, // synextbot
          'head_icon'        => true, // apple-touch-icon
          'head_bottom'      => true,
          'head_video'       => false, // streampack video code
          'body_start'       => false, // </head><body>
          'whole'            => false, // <div class="whole">
          'header'           => false, // <header>
          'gnav'             => false, // <nav>
          'announce'         => false, // <announce>
          'footer'           => false,
          'footer_copyright' => false, // <footer>
          'footer_modal'     => false,
          'footer_script'    => false,
          'html_end'         => false,
        );

        break;
      case 'header':
        $conditional = array(
          'html_start'       => false, // <!DOCTYPE〜
          'head'             => false,
          'head_title'       => false, // <title>
          'head_sagen'       => false, // sagen.js
          'head_assets'      => false, // css & js
          'head_viewport'    => false, // viewport
          'head_seo'         => false, // keyword & description
          'head_ogp'         => false, // fb:ogp, twitter:card
          'head_canonical'   => false, // canonical
          'head_syn'         => false, // synextbot
          'head_icon'        => false, // apple-touch-icon
          'head_bottom'      => false,
          'head_video'       => false, // streampack video code
          'body_start'       => false, // </head><body>
          'whole'            => false, // <div class="whole">
          'header'           => true, // <header>
          'gnav'             => true, // <nav>
          'announce'         => true, // <announce>
          'footer'           => false,
          'footer_copyright' => false, // <footer>
          'footer_modal'     => false,
          'footer_script'    => false,
          'html_end'         => false,
        );

        break;
      case 'footer':
        $conditional = array(
          'html_start'       => false, // <!DOCTYPE〜
          'head'             => false,
          'head_title'       => false, // <title>
          'head_sagen'       => false, // sagen.js
          'head_assets'      => false, // css & js
          'head_viewport'    => false, // viewport
          'head_seo'         => false, // keyword & description
          'head_ogp'         => false, // fb:ogp, twitter:card
          'head_canonical'   => false, // canonical
          'head_syn'         => false, // synextbot
          'head_icon'        => false, // apple-touch-icon
          'head_bottom'      => false,
          'head_video'       => false, // streampack video code
          'body_start'       => false, // </head><body>
          'whole'            => false, // <div class="whole">
          'header'           => false, // <header>
          'gnav'             => false, // <nav>
          'announce'         => false, // <announce>
          'footer'           => true, // <footer>
          'footer_copyright' => false,
          'footer_modal'     => true,
          'footer_script'    => true,
          'html_end'         => false,
        );
        break;
      default:
      $conditional = array(
        'whole'            => false, // <div class="whole">
      );
    endswitch;

    // category
    // ------------------------------
    switch ($args['cateogry']) :
      case 'top':
        break;
      case 'inhigh':
        break;
      case 'vk':
        break;
      default:
    endswitch;

    $category = ( $args['category'] ) ? $app->model->get_category_by_slug($args['category'], "", false) : '';


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

    $args['page'] = $app->model->set(array(
      'template'    => 'inc',
      'category'    => $category,
      'conditional' => $conditional,
      'query'       => $query,
      'path'        => $args,
    ));

    return $this->renderer->render($response, 'inc.php', $args);
  });

});

?>