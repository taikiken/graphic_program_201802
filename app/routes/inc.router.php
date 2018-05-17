<?php
/*

# パーツ出力用

- view.model で定義した$conditionalを上書きすることでリクエスト毎に出力する要素を分ける

*/
$app->group('/inc', function () use ($app) {

  // head
  // ==============================
  $this->get('/{parts:all|head|header|footer|vk}/{cateogry:top|inhigh|vk}/{device:responsive|desktop|mobile}[/]',  function ($request, $response, $args) use ($app) {

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
          'head_icon'        => false,
          'head_env'         => false,
          'head_bottom'      => false,
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
          'head_env'         => false,
          'head_bottom'      => false,
          'head_video'       => false,
          'body_start'       => false,
          'whole'            => false,
          'header'           => true,
          'header_appbnr'    => false,
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
          'head_env'         => false,
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
          'footer_modal'     => false,
          'footer_script'    => false,
          'html_end'         => false,
        );
        break;

      default:
        $conditional = array(
          'header_appbnr' => false,
          'whole'         => false,
          'announce'      => false,
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
        $conditional['head_sagen']    = false;
        $conditional['head_icon']     = false;
        $conditional['head_seo']      = false;
        $conditional['head_ogp']      = false;
        $conditional['head_env']      = false;
        $conditional['head_bottom']   = false;
        $conditional['footer_script'] = false;
        $conditional['footer_modal']  = false;
        break;
      default:
    endswitch;

    $category = ( $args['category'] ) ? $app->model->get_category_by_slug($args['category'], "", false) : '';


    // device
    // ------------------------------
    switch ($args['device']) :
      case 'responsive':
        $ua = 'desktop';
        break;
      case 'desktop':
        $ua = 'desktop';
        break;
      case 'mobile':
        $ua = 'mobile';
        break;
      default:
        $ua = 'desktop';
    endswitch;


    // query
    // ------------------------------
    $query = $request->getQueryParams();

    $args['page'] = $app->model->set(array(
      'template'    => 'inc',
      'html_prefix' => 'SPBL_',
      'ua'          => $ua,
      'category'    => $category,
      'conditional' => $conditional,
      'directory'   => $args['cateogry'],
      'query'       => $query,
      'path'        => $args,
      'parts'       => $args['parts'],
    ));

    return $this->renderer->render($response, 'inc.php', $args);
  });


  // file
  // ==============================
  $this->get('/assets/{cateogry:top|inhigh|vk}/{device:responsive|desktop|mobile}/{file:inc.css|inc.js}[/]',  function ($request, $response, $args) use ($app) {

    $path = '';
    if ( $args['device'] === 'mobile' ) :
      $path = 'sp/';
    endif;

    // css
    if ( $args['file'] === 'inc.css' ) :
      $file = @file_get_contents($app->model->property('site_url').'assets/'.$path.'css/inc.css');

      if ( $file ) :
        $replace_pairs = array(
          'url(/'        => 'url('.$app->model->property('site_url_uts').'/',
          'url("/'       => 'url("'.$app->model->property('site_url_uts').'/',
          '#head'        => '#SPBL_head',
          '#side'        => '#SPBL_side',
          '#skiplinkSec' => '#SPBL_skiplinkSec',
          '#endMainAnc'  => '#SPBL_endMainAnc',
          '#mainAnc'     => '#SPBL_mainAnc',
          '#naviAnc'     => '#SPBL_naviAnc',
          '#user'        => '#SPBL_user',
          '#adg'         => '#SPBL_adg',
          '#synapse'     => '#SPBL_synapse',
        );

        $file = strtr($file, $replace_pairs);

        return $response->withStatus(200)
                ->withHeader('Content-Type', 'text/css')
                ->write($file);
      endif;

    endif;


    // js
    if ( $args['file'] === 'inc.js' ) :
      $file = @file_get_contents($app->model->property('site_url').'assets/js/vk_spbl_header.bundle.js');

      if ( $file ) :
        return $response->withStatus(200)
                ->withHeader('Content-Type', 'application/javascript')
                ->write($file);
      endif;

    endif;

  });


});

?>