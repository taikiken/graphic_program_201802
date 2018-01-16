<?php

include "local.php";
include "public/check.php";

$id = bind($_REQUEST["id"]);

$y = [];
$response = [];
$week_list = array('日', '月', '火', '水', '木', '金', '土');

$o = new db;
$o->connect();

$sql = <<<SQL
SELECT 
    cmp.* ,
    sports.name as sport_name
FROM
    competitions cmp
INNER JOIN
    u_categories uc ON cmp.category_id = uc.id
LEFT JOIN
    sports ON cmp.sport_id = sports.id
WHERE
    cmp.id = {$id}
AND
    cmp.is_public IS TRUE 
ORDER BY
    start_date_time DESC;
SQL;

$o->query($sql);
$f = $o->fetch_array();
$f['sport_name'] = !empty($f['sport_name']) ? $f['sport_name'] : '';
$f['sport_id'] = !empty($f['sport_id']) ? $f['sport_id'] . '.png' : '';

$DateTime = new DateTime($f['start_date_time']);
$start_date = $DateTime->format('Y年m月d日');
$week_list = array('日', '月', '火', '水', '木', '金', '土');
$day_of_week = $week_list[(int)$DateTime->format('w')];
$start_date = $start_date . '（' . $day_of_week . '）';

$DateTime = new DateTime($f['end_date_time']);
$end_date = $DateTime->format('d日');
$week_list = array('日', '月', '火', '水', '木', '金', '土');
$day_of_week = $week_list[(int)$DateTime->format('w')];
$end_date = $end_date . '（' . $day_of_week . '）';

$articles = [];
$article_id_list = [
  284543,
  284559,
  284088,
];
$article_ids_sql = implode(' OR id = ', $article_id_list);
$sql = sprintf("select * from %s", sprintf($articletable, set_isbookmark($uid), sprintf(" and (id = %s)", $article_ids_sql)));
$o->query($sql);

while ($f = $o->fetch_array()){
  $articles[] = $f;
}

$response = [
  'competition_name'  => $f['name'],
  'sport_name'        => $f['sport_name'],
  'icon'              => $f['sport_id'],
  'period'            => $start_date . ' 〜 ' . $end_date,
  'organizer'         => $f['organizer'],
  'collaborator'      => $f['collaborator'],
  'sponser'           => $f['sponser'],
  'venue'             => $f['venue'],
  'qualification'     => $f['qualification'],
  'regulation'        => $f['regulation'],
  'file'              => $f['file'],
  'highlight_movie'   =>[
    'foo' => 'foo',
    'bar' => 'bar',
  ],
  'news'              =>[
    'foo' => 'foo',
    'bar' => 'bar',
  ],
  'column'            =>[
    'foo' => 'foo',
    'bar' => 'bar',
  ],
  'photo_gallery'      =>[
    'foo' => 'foo',
    'bar' => 'bar',
  ],
];
if (true) {

  $y["status"]["code"] = 200;
  $y["status"]["user_message"] = "";
  $y["status"]["developer_message"] = "";
  $y["response"] = $response;
} else {

  $y["status"]["code"] = 404;
  $y["status"]["user_message"] = "指定された大会は存在しません。";
  $y["status"]["developer_message"] = "指定された大会は存在しません。";
}

print_json($y, $_SERVER['HTTP_REFERER']);

?>
