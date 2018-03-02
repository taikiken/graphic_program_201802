<?php

if ( isset($_GET['id']) && $_GET['id'] ) :
  $adjust_code = htmlspecialchars($_GET['id'], ENT_QUOTES, 'UTF-8');
else :
  $adjust_code = 'g2rvir';
endif;

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <title>SPORTS BULL - アプリダウンロード</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.js"></script>
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-74679267-1', 'auto');
  ga('require', 'GTM-KJ33JM9');
  ga('require', 'linkid');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');

  // config
  var adjust_code = '<?php echo $adjust_code; ?>';

  if ( !(/dev|stg/i.test(window.location.host)) ) {
    var protocol = 'sportsbull';
  } else {
    var protocol = 'sportsbull-dev';
  }

  // var
  var url = {
    'base'           : 'https://app.adjust.com/' + adjust_code + '?deep_link=' + protocol + '://action?url=',
    'redirect'       : '',
    'referrer'       : '',
    'referrerEncode' : '',
    'ga'             : window.location.href
  }

  url.redirect = url.base;

  // referrer
  if ( document.referrer ) {
    url.referrer = document.referrer;

  } else if ( Cookies.get('__app_banner_visited__') ) {
    url.referrer = decodeURIComponent(Cookies.get('__app_banner_visited__'));
  }


  // arrange
  if ( url.referrer ) {
    url.referrerEncode = encodeURIComponent(url.referrer)
    url.redirect       = url.base + url.referrerEncode;
    url.ga             = url.base + url.referrer;
  }

  // ga
  ga('send', {
    hitType: 'event',
    eventCategory: 'redirect',
    eventAction: 'deeplink',
    eventLabel: url.ga
  });

  // redirect
  // alert(url.redirect);

  window.location.replace(url.redirect);

  </script>
</head>
<style>
  body {
    font-size: 12px;
  }
</style>
<body>
<p>アプリダウンロードページに遷移します。自動的に切り替わらない場合は、下記のURLをクリックしてください。</p>
<script>
document.open();
document.write("<a href=" + url.redirect + " target='_blank'>" + url.redirect + "</a>");
document.close();
</script>
</body>
</html>