<?php
include $INCLUDEPATH."local.php";

////// 検索対象 //////
$search_word_category_list =
  [
//    '平昌五輪'                => 'pyeongchang2018', // 平昌五輪
    'アジアプロ野球チャンピオン' => 'wbc', // WBC
  ];

////// このカテゴリだったらタブ追加しない //////
$exclude_category_list = [
  'tvguide',
];



$exclude_category_list = implode("' OR name_e = '", $exclude_category_list);
$exclude_category_id_list = [];
// DBオブジェクト作成
$dbo = new db;
$dbo->connect();
$sql = <<<SQL_EOL
SELECT
  id
FROM
  u_categories
WHERE
  name_e = '{$exclude_category_list}'
SQL_EOL;

$dbo->query($sql);
foreach ($dbo->fetch_all() as $row)
{
  $exclude_category_id_list[] = $row['id'];
}
$force_reload_flag = $_GET['force_reload'] == 1 ? true : false;


// 100件ずつ
$length = 100;
// 2時間以内の記事を対象にする
$base_datetime = strtotime( '-2 hour');

$search_api = $domain . '/api/v1/articles/search/';

foreach ($search_word_category_list as $search_word => $category_name)
{
  // まず件数知りたい
  $url = $search_word = urlencode($search_word);
  $url = generate_search_url($domain, $search_word, 0, $length);

  $res = get_contents($url);
  $res = json_decode($res, true);
  $count = $res['response']['count'];

  $res = add_category($res['response']['articles'], $category_name, $force_reload_flag, $base_datetime, $exclude_category_id_list);
  $is_still_remain = $res['still_remain'];
  unset($res['still_remain']);
  $tab_additional_result[] = $res;

  // まだ残ってるときのみ実行
  if ($is_still_remain)
  {
    for ($offset=$length; $offset<=$count; $offset=$offset + $length)
    {
      $url = generate_search_url($domain, $search_word, $offset, $length);

      $res = get_contents($url);
      $res = json_decode($res, true);
      $res = add_category($res['response']['articles'], $category_name, $force_reload_flag, $base_datetime, $exclude_category_id_list);

      $is_still_remain = $res['still_remain'];
      unset($res['still_remain']);
      $tab_additional_result[] = $res;

      if ($is_still_remain == false) break;
    }
  }


}
print_json($tab_additional_result, $_SERVER['HTTP_REFERER']);






function generate_search_url($domain, $search_word, $offset=0, $length=100)
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

function add_category($article_list, $category_name, $force_reload_flag=false, $base_datetime, $exclude_category_id_list)
{
  $id_list = [];
  $status = 'SQL未実行';
  $updated_row_count = 0;
  foreach ($article_list as $article)
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
  $is_still_remain = !empty($id_list) ? true : false;

  if ($is_still_remain)
  {
    $sql_id_list = implode(' OR repo_n.id = ', $id_list);
    $exclude_category_id_list = implode(' OR repo_n.m1 <> ', $exclude_category_id_list);
    // DBオブジェクト作成
    $dbo = new db;
    $dbo->connect();

    $sql = <<<SQL_EOL
UPDATE
  repo_n
SET
  m2 = u_categories.id
FROM
  u_categories
WHERE
  u_categories.name_e = '{$category_name}'
AND
  repo_n.m1 <> {$exclude_category_id_list}
AND
  repo_n.m2 IS NULL
AND
  (
  repo_n.id = {$sql_id_list}
  )
SQL_EOL;


    $dbo->query($sql);
    $updated_row_count = $dbo->affected_rows2();
    $status = 'SQL実行';
  }

  return [
    'category_name' => $category_name,
    'status'        => $status,
    'count'         => $updated_row_count,
    'still_remain'  => $is_still_remain,
  ];
}