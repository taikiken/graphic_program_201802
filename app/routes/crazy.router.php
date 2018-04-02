<?php

// stats
// ==============================
$app->group('/crazy', function () use($app, $ImgPath) {
   // webview
    // ==============================
    $this->get('/webview[/]', function () {
      header("Location: /pickup_athletes/crazy/webview",TRUE,301);
      exit;
    });

    $this->get('/list[/]', function () {
        // 選手一覧ルーティング
      header("Location: /pickup_athletes/crazy/list",TRUE,301);
      exit;
    });
});
