<?php

$app->get('/', function ($request, $response, $args) use ($app) {

  $args['page'] = $app->model->set(array(
    'og_title' => $app->model->property('site_name'),
    'template' => 'index',
    'og_type'  => 'website',
    'category' => $app->model->get_category_by_slug('top'),
    'path'     => $args,
  ));



  return $this->renderer->render($response, "default.php", $args);

});

?>