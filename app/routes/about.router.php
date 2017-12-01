<?php

$app->group('/about', function () use ($app) {


  // /about/
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {
    $args['partners'] = $app->model->get_partners();

    return $this->renderer->render($response, "/about/index.php", $args);
  });

  // 会社概要 プレスリリース
  // ==============================
  $this->get('/company[/]', function ($request, $response, $args) use ($app) {

    $args['news'] = $app->model->get_company_news_items();
    return $this->renderer->render($response, 'about/company.php', $args);

  });

});

?>