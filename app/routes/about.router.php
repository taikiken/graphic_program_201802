<?php

$app->get('/about[/]', function ($request, $response, $args) use ($app) {

    $args['partners'] = $app->model->get_partners();

    return $this->renderer->render($response, "/about/index.php", $args);

});
