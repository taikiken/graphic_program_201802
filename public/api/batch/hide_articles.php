<?php

if (empty($_GET['search']) || empty($_GET['slug']))
{
  echo 'パラメータ不正';
}

include $INCLUDEPATH . "local.php";

$is_force = $_GET['force'] == 1 ? true : false;
$search_word = $_GET['search'];
$slug_list = explode(',', $_GET['slug']);

// 100件ずつ
$length = 100;
// 2時間以内の記事を対象にする
$base_datetime = strtotime('-2 hour');


// まず件数知りたい
$domain = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
$domain .= $_SERVER['SERVER_NAME'];
$search_word = urlencode($search_word);
$url = generate_search_url($domain, $search_word, 0, $length);

$search_result = file_get_contents($url);
$search_result = json_decode($search_result, true);
$count = $search_result['response']['count'];

// 初回
$res = hide_articles($search_result['response']['articles'], $is_force, $base_datetime, $slug_list);
$is_still_remain = $res['still_remain'];
unset($res['still_remain']);
$hide_result[] = $res;

// 全件実行フラグのみ実行
if ($is_force) {
  for ($offset = $length; $offset <= $count; $offset = $offset + $length)
  {

    $url = generate_search_url($domain, $search_word, $offset, $length);

    $search_result = file_get_contents($url);
    $search_result = json_decode($search_result, true);
    $res = hide_articles($search_result['response']['articles'], $is_force, $base_datetime, $slug_list);

    $is_still_remain = $res['still_remain'];
    unset($res['still_remain']);
    $hide_result[] = $res;

    if ($is_still_remain == false) break;
  }
}

print_json($hide_result, $_SERVER['HTTP_REFERER']);



function generate_search_url($domain, $search_word, $offset = 0, $length = 100)
{
  return implode('', [
    $domain,
    '/api/v1/articles/search/',
    $search_word,
    '?offset=',
    $offset,
    '&length=',
    $length,
  ]);

}


function hide_articles($article_list, $force_reload_flag = false, $base_datetime, $slug_list)
{
  $id_list = [];
  $status = 'SQL未実行';
  $updated_row_count = 0;
  $is_still_remain = !empty($article_list) ? true : false;

  foreach ($article_list as $article)
  {
    foreach ($slug_list as $slug)
    {
      if ($article['category']['slug'] == $slug || $article['category2']['slug'] == $slug)
      {
        if ($force_reload_flag)
        {
          $id_list[] = $article['id'];
        }
        else // 2時間以内の記事のみ
        {
          date_default_timezone_set('Asia/Tokyo');
          if (strtotime($article['date']) > $base_datetime)
          {
            $id_list[] = $article['id'];
          }
        }
      }
    }
  }

  if (!empty($id_list))
  {
    $sql_id_list = implode(' OR repo_n.id = ', $id_list);
    // DBオブジェクト作成
    $dbo = new db;
    $dbo->connect();

    $sql = <<<SQL_EOL
UPDATE
  repo_n
SET
  direct_link_url = '平昌記事の一時退避flag1', flag = 2
FROM
  u_categories
WHERE 
  repo_n.id = {$sql_id_list}
  
SQL_EOL;


    $dbo->query($sql);
    $updated_row_count = $dbo->affected_rows2();
    $status = 'SQL実行';
  }
  return [
    'article_id_list' => $id_list,
    'status'          => $status,
    'count'           => $updated_row_count,
    'still_remain'    => $is_still_remain,
  ];
}
