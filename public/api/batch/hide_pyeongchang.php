<?php
include $INCLUDEPATH."local.php";

////// 検索対象 //////
$search_word_category_list =
  [
    '平昌五輪'                => 'pyeongchang2018', // 平昌五輪
  ];


$conditions = [
  1 => '平昌記事の一時退避flag1',
  3 => '平昌記事の一時退避flag3',
];

$force_reload_flag = $_GET['force_reload'] == 1 ? true : false;


// 2時間以内の記事を対象にする
$base_datetime = strtotime( '-2 hour');


// DBオブジェクト作成
$dbo = new db;
$dbo->connect();

foreach ($search_word_category_list as $search_word => $category_name)
{


$res = [];

}
function add_category($article_list, $category_name, $force_reload_flag=false, $base_datetime, $exclude_category_id_list)
{
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
    $status = 'SQL実行';

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
    $updated_row_count_pyeongchang_flag1 = $dbo->affected_rows2();
    $status = 'SQL実行';
}
print_json($res, $_SERVER['HTTP_REFERER']);


