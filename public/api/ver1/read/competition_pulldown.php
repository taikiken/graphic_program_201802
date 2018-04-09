<?php

include "local.php";
include "public/check.php";

$response = null;
$response_flag = false;

$o = new db;
$o->connect();

//大会内容取得処理------------------------------
$sql=sprintf("select start_date_time from competitions");
$o->query($sql);
while($f=$o->fetch_array()){
    if($response_flag === false) {$response_flag = true ;}

    $DateTime = new DateTime($f['start_date_time']);
    $year_list[] = $DateTime->format('Y');
}
if($response_flag){

    $sports_list[] = array('id'=>'0', 'name'=>'すべて');
    $sql=sprintf("select id, name from sports");
    $o->query($sql);
    while($f=$o->fetch_array()){$sports_list[]=array('id'=>$f['id'], 'name'=>$f['name']);}

    $response['year'] = array_values(array_unique($year_list));
    $response['sports'] = $sports_list;

}

$y["response"] = $response;

print_json($y, $_SERVER['HTTP_REFERER']);

?>
