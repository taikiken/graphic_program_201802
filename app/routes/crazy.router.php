<?php

// stats
// ==============================
$app->group('/crazy', function () use($app, $ImgPath) {
   // webview
    // ==============================
    $this->get('/webview[/]', function () {
      header("Location: /category/crazy/pickup_athletes/webview",TRUE,301);
      exit;

    });

    $this->get('/list[/]', function () {
        // 選手詳細ルーティング
      header("Location: /category/crazy/athletes",TRUE,301);
      exit;
    });
});

$app->group('/athlete', function () use($app, $ImgPath) {

    $s3key = 'json/ca_list.json';

    $json = $ImgPath . '/' . $s3key;
    $data = @file_get_contents($json);

    // CRAZY ATHLETE v2.0
    $this->get('/{id:[0-9]+}[/]', function ($request, $response, $args) use ($app, $data) {
        // jsonの中身が空の場合404
        if(empty($data))
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

        $data = json_decode($data);
        $id   = $args['id'];
        $player_info = '';
        foreach($data as $row)
        {
            if($row->body->no === $id)
            {
                $player_info = $row;
                break;
            }
        }
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