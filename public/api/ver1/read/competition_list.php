<?php

include "local.php";
include "public/check.php";

$sport_id = bind($_REQUEST["sport_id"]);
$year = bind($_REQUEST["year"]);

$y = [];
$response = [];
$response_flag = false;
$week_list = array('日', '月', '火', '水', '木', '金', '土');
$max_type = 3;

$now_date_time = new DateTime($year.'-01-01');
$old_date_time = $now_date_time->format('Y-m-d');
$new_date_time = $now_date_time->modify('+1 year')->format('Y-m-d');

$o = new db;
$o->connect();

//大会内容取得処理------------------------------
$sql = <<<SQL
SELECT 
    cmp.* ,
    sports.name as sport_name
FROM
    competitions cmp
LEFT JOIN
    sports ON cmp.sport_id = sports.id
WHERE
    cmp.is_public IS TRUE
AND
    cmp.is_delete IS FALSE
AND
    start_date_time >= '{$old_date_time}'
AND
    start_date_time <  '{$new_date_time}'
SQL;
if($sport_id !== '0'){
    $sql .='
AND
    cmp.sport_id = '.$sport_id;
}
$sql .='
ORDER BY
    start_date_time ASC;';

$o->query($sql);
foreach ($o->fetch_all() as $f) {
    if($response_flag == false) {$response_flag = true ;}

    $active_list = [];
    $type_list = [];
    $f['sport_name'] = !empty($f['sport_name']) ? $f['sport_name'] : '';
    $f['sport_id'] = !empty($f['sport_id']) ? $f['sport_id'] . '.png' : '';

    //開始日
    $DateTime = new DateTime($f['start_date_time']);
    $start_date = $DateTime->format('m月d日');
    $day_of_week = $week_list[(int)$DateTime->format('w')];
    $start_date = $start_date . '（' . $day_of_week . '）';

    //終了日
    if(!is_null($f['end_date_time'])){
        $DateTime = new DateTime($f['end_date_time']);
        $end_date = $DateTime->format('m月d日');
        $day_of_week = $week_list[(int)$DateTime->format('w')];
        $end_date = $end_date . '（' . $day_of_week . '）';
        $key_date = $start_date . ' 〜 ' . $end_date;
    } else {
        $end_date = null;
        $key_date = $start_date;
    }

    //結果のactive確認
    $active_list[] = (strpos(get_headers($ImgPath . $f['file'])[0],'OK')) ? true : false;

    //概要はactiveにする
    $active_list[] = true;

    //各記事のactive確認
    $sql = sprintf('select distinct type from articles_competitions where competition_id = %s order by type asc;',$f['id']);
    $o->query($sql);
    while ($fetch = $o->fetch_array()){
        $type_list[] = $fetch['type'];
    }
    for($i=0;$i<$max_type;$i++){
        $active_list[] = (in_array($i+1,$type_list)) ? true : false;
    }

    $response['list'][$key_date][] = [
        'id'                => $f['id'],
        'competition_name'  => $f['name'],
        'sport_name'        => $f['sport_name'],
        'icon'              => $f['sport_id'],
        'start_date_time'   => $start_date,
        'end_date_time'     => $end_date,
        'file'              => $f['file'],
        'active_flag'       => $active_list,
    ];

}

    if($response_flag){
            //開始日
        $sql=sprintf("select start_date_time from competitions");
        $o->query($sql);
        while($f=$o->fetch_array()){
            $DateTime = new DateTime($f['start_date_time']);
            $year_list[] = $DateTime->format('Y');
        }

        $sql=sprintf("select name from sports");
        $o->query($sql);
        while($f=$o->fetch_array()){$sports_list[]=$f['name'];}
        
        $response['year'] = array_values(array_unique($year_list));
        $response['sports'] = $sports_list;

        $y["status"]["code"] = 200;
        $y["status"]["user_message"] = "";
        $y["status"]["developer_message"] = "";
        $y["response"] = $response;
    }else{
        $y["status"]["code"] = 404;
        $y["status"]["user_message"] = "指定された大会は存在しません。";
        $y["status"]["developer_message"] = "指定された大会は存在しません。";
    }
print_json($y, $_SERVER['HTTP_REFERER']);

?>
