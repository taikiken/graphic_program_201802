<?php

// #2185 inhigh
// ==============================
$app->group('/{slug:inhigh}',  function () use($app) {


  // /inhigh/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('https://inhightv.sportsbull.jp/', 301);
  });

  // photo
  // ==============================
  $this->get('/photo[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('/category/inhightv/', 301);
  });

  // highlight
  // ==============================
  $this->get('/highlight[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('/inhightv/2017-digest-movie/', 301);
  });

  // webview
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('/inhightv/webview/', 301);
  });

});

?>