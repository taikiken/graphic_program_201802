<?php

// stats
// ==============================
$app->group('/crazy', function () use($app, $ImgPath) {

    $s3key = 'json/ca_list.json';

    $json = $ImgPath . '/' . $s3key;
    $data = @file_get_contents($json);

    // webview
    // ==============================
    $this->get('/webview[/]', function ($request, $response, $args) use ($app, $ImgPath) {
        $s3key = 'json/ca_picup_list.json';

        $json = $ImgPath . '/' . $s3key;
        $data = @file_get_contents($json);

        $data = json_decode($data);
        $args['page'] = $app->model->set(array(
            'title'              => 'CRAZY ATHLETES',
            'og_title'           => 'CRAZY ATHLETES | '.$app->model->property('title'),
            'path'               => $args,
            'template'           => 'webview',
            'template_classname' => '',
            'list'               => $data
        ));

        return $this->renderer->render($response, 'crazy/webview.php', $args);

    });

    $this->get('/list[/]', function ($request, $response, $args) use ($app, $data) {
        // 選手詳細ルーティング

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
        $args['page'] = $app->model->set(array(
            'title'              => 'CRAZY ATHLETES',
            'og_title'           => 'CRAZY ATHLETES | '.$app->model->property('title'),
            'path'               => $args,
            'template'           => 'category_list',
            'template_classname' => '',
            'list'               => $data
        ));

        return $this->renderer->render($response, 'crazy/list.php', $args);
    });
});

$app->group('/athlete', function () use($app, $ImgPath) {

    $s3key = 'json/ca_list.json';

    $json = $ImgPath . '/' . $s3key;
    $data = @file_get_contents($json);

  $categories = $app->model->property('site_categories');

  if ( $categories ) :

    // ルーティングのためのスラッグを設定する - 存在しないカテゴリーは404を返す
    $category_slug = array_keys( $categories );


  endif;

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

        $sponsor_link = $app->model->get_category_by_slug($args['category_slug'], $args['id']);
        var_dump($sponsor_link);
        var_dump('ooo');

        $args['page'] = $app->model->set(array(
            'title'              => 'CRAZY ATHLETES',
            'og_title'           => 'CRAZY ATHLETES | '.$app->model->property('title'),
            'path'               => $args,
            'template'           => 'crazy',
            'template_classname' => '',
            'player'             => $player_info,
            'ua'                 => $app->model->property('ua'),
            'sponsor_link'       => $sponsor_link,
        ));

        if ( $app->model->property('ua') === 'desktop' ) :
            return $this->renderer->render($response, 'crazy/detail.php', $args);
        else :
            return $this->renderer->render($response, 'crazy/detail.sp.php', $args);
        endif;

    });
});