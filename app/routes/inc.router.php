<?php
/*

# パーツ出力用

- view.model で定義した$conditionalを上書きすることでリクエスト毎に出力する要素を分ける

*/
$app->group('/inc', function () use ($app) {

  // head
  // ==============================
  $this->get('/{parts:all|head|header|footer}/{cateogry:top|inhigh|vk}/{device:responsive|desktop|mobile}[/]',  function ($request, $response, $args) use ($app) {

    // ref. app/models/view.model.php
    $conditional = $app->model->property('conditional');

    // parts
    // ------------------------------
    switch ($args['parts']) :
      case 'head':

        $conditional = array(
          'html_start'       => false,
          'head'             => true,
          'head_title'       => false,
          'head_sagen'       => false,
          'head_assets'      => true,
          'head_viewport'    => true,
          'head_seo'         => false,
          'head_ogp'         => false,
          'head_canonical'   => false,
          'head_syn'         => false,
          'head_icon'        => true,
          'head_bottom'      => true,
          'head_video'       => false,
          'body_start'       => false,
          'whole'            => false,
          'header'           => false,
          'gnav'             => false,
          'announce'         => false,
          'sidemenu'         => true,
          'footer'           => false,
          'footer_copyright' => false,
          'footer_modal'     => false,
          'footer_script'    => false,
          'html_end'         => false,
        );

        break;
      case 'header':
        $conditional = array(
          'html_start'       => false,
          'head'             => false,
          'head_title'       => false,
          'head_sagen'       => false,
          'head_assets'      => false,
          'head_viewport'    => false,
          'head_seo'         => false,
          'head_ogp'         => false,
          'head_canonical'   => false,
          'head_syn'         => false,
          'head_icon'        => false,
          'head_bottom'      => false,
          'head_video'       => false,
          'body_start'       => false,
          'whole'            => false,
          'header'           => true,
          'gnav'             => true,
          'announce'         => false,
          'sidemenu'         => false,
          'footer'           => false,
          'footer_copyright' => false,
          'footer_modal'     => false,
          'footer_script'    => false,
          'html_end'         => false,
        );

        break;
      case 'footer':
        $conditional = array(
          'html_start'       => false,
          'head'             => false,
          'head_title'       => false,
          'head_sagen'       => false,
          'head_assets'      => false,
          'head_viewport'    => false,
          'head_seo'         => false,
          'head_ogp'         => false,
          'head_canonical'   => false,
          'head_syn'         => false,
          'head_icon'        => false,
          'head_bottom'      => false,
          'head_video'       => false,
          'body_start'       => false,
          'whole'            => false,
          'header'           => false,
          'gnav'             => false,
          'announce'         => false,
          'sidemenu'         => true,
          'footer'           => true,
          'footer_copyright' => false,
          'footer_modal'     => true,
          'footer_script'    => true,
          'html_end'         => false,
        );
        break;
      default:
      $conditional = array(
        'whole'    => false,
        'announce' => false,
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
      'html_prefix' => 'SPBL_',
    ));

    return $this->renderer->render($response, 'inc.php', $args);
  });

});

?>