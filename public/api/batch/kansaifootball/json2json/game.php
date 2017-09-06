<?php

include "local.php";
include "../inc.php";

//関西アメリカンフットボールJSONパス
$path="https://dev-img.sportsbull.jp/static/americanfootball/2017/autumn/json";

$moviefile="https://img.sportsbull.jp/static/americanfootball/2017/autumn/highlight.json";
$movie=get_contents($moviefile);
$movie=json_decode($movie,TRUE);

$schedulefile="https://img.sportsbull.jp/static/americanfootball/2017/autumn/schedule.json";
$schedule=get_contents($schedulefile);
$schedule=json_decode($schedule,TRUE);

for($i=0;$i<count($schedule["response"]["schedule"]);$i++){
	foreach($schedule["response"]["schedule"] as $k=>$v){
		for($j=0;$j<count($v["league"]);$j++){
			$dd=$v["league"][$j]["games"];
			for($jj=0;$jj<count($dd);$jj++){
				$gameid[]=$dd[$jj]["gameid"];
				$fullmovieurl[$dd[$jj]["gameid"]]=$dd[$jj]["fullmovieurl"];
			}
		}
	}
}

for($i=0;$i<count($gameid);$i++){
	
	$jsonfile1=sprintf("%s/%s.json",$path,$gameid[$i]);
	$data1=get_contents($jsonfile1);
	if(!$data1||preg_match("/Access Denied/",$data1))continue;
	$data1=str_replace(array('"stat"','"event"'),array('"stats"','"events"'),$data1);
	$data1=json_decode($data1,true);
	
	$jsonfile2=sprintf("%s/%s.json",$bucket,$gameid[$i]);
	$data2=get_contents($jsonfile2);
	$data2=json_decode($data2,true);
	
	$flag=0;
	if(!file_exists($jsonfile2)){
		$flag=1;
		$lastupdate=$data1["response"]["lastupdate"];
	}elseif(strtotime($data1["response"]["lastupdate"])>strtotime($data1["response"]["lastupdate"])){
		$flag=1;
		$lastupdate=$data1["response"]["lastupdate"];
	}else{
		if($movie["movie"][$gameid[$i]]&&$data2["response"]["highlightmovieurl"]==""){
			$flag=1;
			$lastupdate=$movie["movie"][$gameid[$i]]["lastupdate"];
		}
	}
	
	if($flag==1){
		$data1["response"]["gameinfo"]["weekday"]=get_weekday(date("w",$data1["response"]["gameinfo"]["date"]));
		$data1["response"]["highlightmovieurl"]=$movie["movie"][$gameid[$i]];
		$data1["response"]["movieurl"]=$fullmovieurl[$gameid[$i]];
		$data1["response"]["team"][0]["id"]=$urev[$data1["response"]["team"][0]["name"]]["id"];
		$data1["response"]["team"][1]["id"]=$urev[$data1["response"]["team"][1]["name"]]["id"];
		put_json($jsonfile2,$data1);
	}
}

?>