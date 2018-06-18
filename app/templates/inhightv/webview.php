<?php

// endpoint
// ------------------------------
$is_develop = array('LOCAL', 'LOCAL_DB', 'DEVELOP', 'STAGING');

$endpoint = 'https://inhightv.sportsbull.jp';
if ( in_array(UT_ENV, $is_develop) ) :
  $endpoint = 'https://inhightv-dev.sportsbull.jp';
endif;

$get_options = [
  'http' => [
      'method'  => 'GET',
      'timeout' => 2,
  ]
];

$includes             = array();
$includes['part-01']  = @file_get_contents($endpoint.'/part/mobile/part-01', false, stream_context_create($get_options));
$includes['adslider'] = @file_get_contents($endpoint.'/part/mobile/adslider', false, stream_context_create($get_options));
$includes['part-02']  = @file_get_contents($endpoint.'/part/mobile/part-02', false, stream_context_create($get_options));
$includes['part-03']  = @file_get_contents($endpoint.'/part/mobile/part-03', false, stream_context_create($get_options));
$includes['part-04']  = @file_get_contents($endpoint.'/part/mobile/part-04', false, stream_context_create($get_options));

$replace_pairs = array(
  'src="/'  => 'src="'.$endpoint.'/',
  'href="/' => 'href="'.$endpoint.'/',
);

foreach( $includes as $key => $value ) :
  if ( $value ) :
    $includes[$key] = strtr($value, $replace_pairs);
  endif;
endforeach;


?>

<!-- assets -->
<?php
/*

- DS指定のassets読み込み
- 広告用のGTM読み込み
- 一部スタイル調整

*/
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja" style="height: auto;">
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
        <meta charset="UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
        <title>インターハイ WebView | SPORTS BULL</title>

        <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
        <link rel="stylesheet" href="/assets/css/inhigh/parts_sp.css" />
        <link rel="stylesheet" href="<?php echo $endpoint; ?>/sp/renew_css/part-spbl.css" />
        <script>window.jQuery || document.write('<script src="<?php echo $endpoint; ?>/renew_js/jquery.min.js"><\/script>');</script>
        <script src="<?php echo $endpoint; ?>/sp/renew_js/slick.min.js"></script>
        <script src="<?php echo $endpoint; ?>/sp/renew_js/slickSetting.js"></script>
        <!-- Ad / DFP - GTM -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N7WLDK9');</script>
        <!-- // Ad / DFP - GTM -->

    </head>
    <body style="height: auto;">

    <!-- part-01 -->
    <div class="inhightv__index__part-01">
      <?php echo $includes['part-01']; ?>
    </div>
    <!-- //part-01 -->

    <!-- adslider -->
    <div class="inhightv__index__adslider">
      <?php echo $includes['adslider']; ?>
    </div>
    <!-- //adslider -->

    <!-- part-02 -->
    <div class="inhightv__index__part-02">
      <?php echo $includes['part-02']; ?>
    </div>
    <!-- //part-02 -->

    <!-- part-03 -->
    <div class="inhightv__index__part-03">
      <?php echo $includes['part-03']; ?>
    </div>
    <!-- //part-03 -->

    <!-- part-04 -->
    <div class="inhightv__index__part-04">
      <?php echo $includes['part-04']; ?>
    </div>
    <!-- //part-04 -->


    </body>
</html>