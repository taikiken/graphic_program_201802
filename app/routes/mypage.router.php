<?php

$app->group('/mypage', function () use ($app) {

  // マイページ - /mypage/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ( $app ) {
    return $response->withRedirect('/settings/', 301);

  });


  // マイページ/アクティビティ - /mypage/activities/
  // ==============================
  $this->get('/{slug:activities}[/]', function ($request, $response, $args) use ( $app ) {
    return $response->withRedirect('/settings/', 301);

  });

});

?>