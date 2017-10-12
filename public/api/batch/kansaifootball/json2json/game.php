<?php

include "local.php";
include "../inc.php";

function hms($sec){
	$ss=$sec%60;
	$mm=(int)($sec/60)%60;
	$hh=(int)($sec/(60*60));
	return $hh>0?sprintf("%d:%02d:%02d",$hh,$mm,$ss):sprintf("%02d:%02d",$mm,$ss);
}

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
	
	$jsonfile1=sprintf("%s/%s.json",$ka_path,$gameid[$i]);
	$data1=get_contents($jsonfile1);
	if($data1===NULL||preg_match("/Not Found/",$data1))continue;
	$data1=str_replace("studium","stadium",$data1);
	$data1=json_decode($data1,true);
	if(!$data1["response"])continue;
	
	$score[$gameid[$i]]=array($data1["response"]["team"][0]["score"]["total"],$data1["response"]["team"][1]["score"]["total"]);	
	$jsonfile2=sprintf("%s/%s.json",$bucket,$gameid[$i]);
	if(file_exists($jsonfile2)){
		$data2=get_contents($jsonfile2);
		$data2=str_replace("studium","stadium",$data2);
		$data2=json_decode($data2,true);
	}
	
	$flag=0;
	if(!file_exists($jsonfile2)){
		$flag=1;
		$lastupdate=$data1["response"]["lastupdate"];
	}elseif(strtotime($data1["response"]["lastupdate"])>strtotime($data2["response"]["lastupdate"])){
		$flag=1;
		$lastupdate=$data1["response"]["lastupdate"];
	}else{
		if($movie["movie"][$gameid[$i]]&&$data2["response"]["highlightmovieurl"]==""){
			$flag=1;
			$lastupdate=$movie["movie"][$gameid[$i]]["lastupdate"];
		}
	}
	
	if($flag==1){
		$data1["response"]["lastupdate"]=$lastupdate;
		$data1["response"]["gameinfo"]["weekday"]=get_weekday(date("w",strtotime($data1["response"]["gameinfo"]["date"])));
		$data1["response"]["highlightmovieurl"]=$movie["movie"][$gameid[$i]];
		$data1["response"]["movieurl"]=$data1["response"]["gameinfo"]["status"]=="試合終了"?$fullmovieurl[$gameid[$i]]:"";
		
		$data1["response"]["team"][0]["stats"]["possession"]=hms($data1["response"]["team"][0]["stats"]["possession"]);
		$data1["response"]["team"][1]["stats"]["possession"]=hms($data1["response"]["team"][1]["stats"]["possession"]);
		
		$data1["response"]["team"][0]["id"]=$urev[$data1["response"]["team"][0]["name"]]["id"];
		$data1["response"]["team"][1]["id"]=$urev[$data1["response"]["team"][1]["name"]]["id"];
		put_json($jsonfile2,$data1);
	}
}

?>