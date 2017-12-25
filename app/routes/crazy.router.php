<?php

// stats
// ==============================
$app->group('/crazy', function () use($app, $ImgPath) {
   // webview
    // ==============================
    $this->get('/webview[/]', function () {
      header("Location: /pickup_athletes/crazy/list",TRUE,301);
      exit;
    });

    $this->get('/list[/]', function () {
        // 選手詳細ルーティング
      header("Location: /pickup_athletes/crazy/webview",TRUE,301);
      exit;
    });
});

$app->group('/athlete', function () use($app, $ImgPath) {
    // CRAZY ATHLETE v2.0
    $this->get('/{id:[0-9]+}[/]', function ($request, $response, $args) use ($app) {

        $id   = $args['id'];
        $player_info = $app->model->get_pickup_athlete($id);

        if(empty($player_info))
        {
            // 404
            // ------------------------------
            $args['page'] = $app->model->set([
                'title'    => '404 Not Found',
                'og_title' => '404 Not Found',
                'template' => 404,
            ]);

            $args['request']  = $request;
            $args['response'] = $response;

            if($app->model->property('ua') === 'desktop')
            {
                return $this->renderer->render($response, 'desktop/404.php', $args)->withStatus(404);
            }
            else
            {
                return $this->renderer->render($response, 'mobile/404.php', $args)->withStatus(404);
            }
        }

        $banner = $app->model->get_category_by_slug($args['category_slug'], $args['id']);

        $args['page'] = $app->model->set(array(
            'title'              => 'CRAZY ATHLETES',
            'og_title'           => 'CRAZY ATHLETES | '.$app->model->property('title'),
            'path'               => $args,
            'template'           => 'crazy',
            'template_classname' => '',
            'player'             => $player_info,
            'ua'                 => $app->model->property('ua'),
            'banner'             => $banner,
        ));

        if ( $app->model->property('ua') === 'desktop' ) :
            return $this->renderer->render($response, 'crazy/detail.php', $args);
        else :
            return $this->renderer->render($response, 'crazy/detail.sp.php', $args);
        endif;

    });
});