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
print_json($res, $_SERVER['HTTP_REFERER']);


