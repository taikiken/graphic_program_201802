<?php
/**
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 *
 * `/area/地域名/` - router 作成
 *
 * - 地域
 * ```
 * /category/area/
 * ```
 * - 地域記事
 * ```
 * /area/地域名/
 * ```
 * 【地域】
 * 北海道｜東北｜関東｜北陸・甲信越｜東海｜関西｜中国｜四国｜九州・沖縄
 * 【都道府県】
 * 北海道|青森|岩手|宮城|秋田|山形|福島|茨城|栃木|群馬|埼玉|千葉|東京|神奈川|新潟|富山|石川|福井|山梨|長野|岐阜|静岡|愛知|三重|滋賀|京都|大阪|兵庫|奈良|和歌山|鳥取|島根|岡山|広島|山口|徳島|香川|愛媛|高知|福岡|佐賀|長崎|熊本|大分|宮崎|鹿児島|沖縄
 * User: @taikiken
 * Date: 2017/08/29
 * Time: 19:13
 */

// area
// ==============================
$app->group('/area', function () use($app) {

  $areas = array(
    // 地域
    '北海道',
    '東北',
    '関東',
    '北陸・甲信越',
//    '中部',
    '東海',
    '関西',
    '中国',
    '四国',
    '九州・沖縄',
    // 都道府県 - phase 1 使用しない
//    '北海道',
//    '青森',
//    '岩手',
//    '宮城',
//    '秋田',
//    '山形',
//    '福島',
//    '茨城',
//    '栃木',
//    '群馬',
//    '埼玉',
//    '千葉',
//    '東京',
//    '神奈川',
//    '富山',
//    '石川',
//    '福井',
//    '山梨',
//    '長野',
//    '岐阜',
//    '静岡',
//    '愛知',
//    '三重',
//    '滋賀',
//    '京都',
//    '大阪',
//    '兵庫',
//    '奈良',
//    '和歌山',
//    '鳥取',
//    '島根',
//    '岡山',
//    '広島',
//    '山口',
//    '徳島',
//    '香川',
//    '愛媛',
//    '高知',
//    '福岡',
//    '佐賀',
//    '長崎',
//    '熊本',
//    '大分',
//    '宮崎',
//    '鹿児島',
//    '沖縄',
  );

  $encoded_areas = array();
  $encoded_key_areas = array();

  foreach ($areas as $area) {
    $encoded = urlencode($area);
    $encoded_areas[] = $encoded;
    $encoded_key_areas[$encoded] = $area;
  }

  // area トップ
  // ==============================
  $this->map(['GET'], '[/]', function ($request, $response, $args) use ($app) {

    // `/category/area/` redirect する
    header("Location: /category/area/",TRUE,301);
    exit;

  });

  // 地域別記事
  // /area/地域/
  // ==============================
  $this->get('/{category:' . join('|', $encoded_areas) . '}[/]', function ($request, $response, $args) use ($app) {

    $category = $app->model->get_category_by_slug('area');
    $template_classname = ( isset($category['theme']['base']) ) ? $category['theme']['base'] : '';
    $template_classname .= ' area';
    $category = array(
      'label' => '地域',
      'label_area' => ' | ' . $args['category'] . 'の記事',
      'title' => $args['category'] . 'の記事',
    );

    $args['page'] = $app->model->set(array(
      'title'              => $category['title'],
      'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
      'og_url'             => $app->model->property('site_url').'area/'.$args['category'].'/',
      'template'           => 'category',
      'path'               => $args,
      'template_classname' => $template_classname,
      'category' => $category,
    ));

    return $this->renderer->render($response, "area/default.php", $args);

  });

  // WebView
  // ==============================
  $this->get('/webview[/]', function ($request, $response, $args) use ($app) {

    $category = array(
      'label' => '地域',
      'label_area' => ' | ' . $args['category'] . 'の記事',
      'title' => $args['category'] . 'の記事',
    );

    $args['page'] = $app->model->set(array(
      'title'              => $category['title'],
      'og_title'           => $category['title'].' | '.$app->model->property('title_short'),
      'og_url'             => $app->model->property('site_url').'area/'.$args['category'].'/',
      'template'           => 'webview',
      'path'               => $args,
      'template_classname' => '',
      'category' => $category,
    ));

    return $this->renderer->render($response, "area/webview.php", $args);

  });
});