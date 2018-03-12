<?php

include $INCLUDEPATH . "local.php";

// DBオブジェクト作成
$dbo = new db;
$dbo->connect();

//カテゴリが平昌の記事で表示設定になっている記事を、非表示にするsql文
$sql = <<<SQL_EOL
UPDATE
  repo_n
SET
  direct_link_url = '平昌記事の一時退避flag1',
  flag = 2
WHERE (m1=165 OR m2=165)
AND
  flag=1;
SQL_EOL;
$dbo->query($sql);
$updated_row_count_pyeongchang_flag1 = $dbo->affected_rows2();

$sql = <<<SQL_EOL
UPDATE
  repo_n
SET
  direct_link_url = '平昌記事の一時退避flag3',
  flag = 2
WHERE
  (m1=165 OR m2=165)
AND
  flag=3;
SQL_EOL;
$dbo->query($sql);
$updated_row_count_pyeongchang_flag3 = $dbo->affected_rows2();

echo "flagが1のレコードを" . $updated_row_count_pyeongchang_flag1 . "件更新しました。";
echo "<br>";
echo "flagが3のレコードを" . $updated_row_count_pyeongchang_flag3 . "件更新しました。";
echo "<br>";
foreach(hide() as $row)
{
  foreach ($row as $key => $value)
  {
    echo $key . ': ' . $value;
    echo "<br>";
  }
}


function hide()
{
  ////// 検索対象 //////
  $search_word_list =
    [
      '平昌',
      '五輪',
      'メダル',
      'オリンピック',
    ];
  $force_reload_flag = $_GET['force_reload'] == 1 ? true : false;

// 100件ずつ
  $length = 100;
// 2時間以内の記事を対象にする
  $base_datetime = strtotime( '-2 hour');

// DBオブジェクト作成
  $dbo = new db;
  $dbo->connect();


  foreach ($search_word_list as $search_word)
  {
    // まず件数知りたい
    $domain = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
    $domain .= $_SERVER['SERVER_NAME'];
    $search_word = urlencode($search_word);
    $url = generate_search_url($domain, $search_word, 0, $length);

    $res = get_contents($url);
    $res = json_decode($res, true);
    $count = $res['response']['count'];

    // 初回
    $res = hide_articles($res['response']['articles'], $force_reload_flag, $base_datetime);


    $is_still_remain = $res['still_remain'];
    unset($res['still_remain']);
    $hide_result[] = $res;

    // まだ残ってるときのみ実行
    // 1分タイムアウト
    if ($is_still_remain)
    {
      $i = 0;

      for ($offset=$length; $offset<=$count; $offset=$offset + $length)
      {
        if ($i > 4) break;

        $url = generate_search_url($domain, $search_word, $offset, $length);

        echo $url . '<br>';
        $res = get_contents($url);
        $res = json_decode($res, true);
        $res = hide_articles($res['response']['articles'], $force_reload_flag, $base_datetime);

        $is_still_remain = $res['still_remain'];
        unset($res['still_remain']);
        $hide_result[] = $res;

        if ($is_still_remain == false) break;
        $i++;
      }
    }
  }
  return $hide_result;

}



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

function hide_articles($article_list, $force_reload_flag=false, $base_datetime)
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
    'status'        => $status,
    'count'         => $updated_row_count,
    'still_remain'  => $is_still_remain,
  ];
}
