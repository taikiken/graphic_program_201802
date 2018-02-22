<?php

// お知らせ - /notifications
// ==============================
$app->get('/notifications[/]', function ($request, $response, $args) use ($app) {
    return $response->withRedirect('/settings/', 301);

});

?>