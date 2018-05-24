<?php

include "local.php";
include "../inc.php";

//$csv =sprintf("%s/csv/schedule.csv",$bucket);

/*
http://www.kansai-football.jp/sportsbull/schedule_2018s.csv
*/

$csv =sprintf("http://www.kansai-football.jp/sportsbull/schedule_%s.csv",$season);

/*
if($path=="dev-img"){
	//$csv =sprintf("http://ut/api/ver1/static/americanfootball/2018/spring/csv/schedule_%s.csv",$season);
	$csv =sprintf("%s/csv/schedule_%s.csv",$bucket,$season);	
}
*/

$json=sprintf("%s/schedule.json",$bucket);
$moviefile=sprintf("https://%s.sportsbull.jp/static/%s/highlight.json",$path,$dir);

$lastupdate1=get_lastmod($csv);
$lastupdate2=get_lastmod($moviefile);
$lastupdate=$lastupdate1>$lastupdate2?$lastupdate1:$lastupdate2;

if(!file_exists($json)||$lastupdate>filemtime($json)){
	
	$movie=get_contents($moviefile);
	$movie=json_decode($movie,TRUE);
	
	$data=get_contents($csv);	
	$data=mb_convert_encoding($data,"UTF-8","SJIS");
	$data=preg_replace("/\r\n|\r|\n/","\n",$data);
	$tmpfile=sprintf("%s/tmp/schedule_%s.csv",$bucket,$season);
	file_put_contents($tmpfile,$data);
	
	$fp=fopen($tmpfile,"r");
	while($l=fgetcsv($fp,1024)){
		if(!preg_match("/^#/",$l[0])){
			$sc[$l[0]][$l[1]][]=$l;
		}
	}
		
	foreach($sc as $kk=>$vv){
		$schedules=array();
		foreach($vv as $k=>$v){
			
			$league["date"]=$k;
			$league["weekday"]=$v[0][2];
			$game=array();
			
			for($i=0;$i<count($v);$i++){
				
				$jsonpath="";
				$endpointfile=sprintf("%s/%s.json",$bucket,$v[$i][5]);
				if(file_exists($endpointfile)){
					$jsonpath=str_replace(array("s3://","img-sportsbull-jp"),array("https://","img.sportsbull.jp"),$endpointfile);
					$d2=get_contents($endpointfile);
					$d2=json_decode($d2,TRUE);
					if($d2["response"]["gameinfo"]["status"]!="試合終了"){
						$v[$i][7]=$d2["response"]["team"][0]["score"]["total"];
						$v[$i][9]=$d2["response"]["team"][1]["score"]["total"];
					}
				}
				var_dump($v);
				$game[]=array(
					"gameid"=>$v[$i][5],
					"time"=>$v[$i][3],
					"highlightmovieurl"=>$movie["movie"][$v[$i][5]]["movie"]?$movie["movie"][$v[$i][5]]["movie"]:"",
					"fullmovieurl"=>$v[$i][10]?$v[$i][10]:"",
					"team"=>array(
						array(
							"id"=>$univ[$v[$i][6]]["id"]?$univ[$v[$i][6]]["id"]:"",
							"name"=>$univ[$v[$i][6]]["name"]?$univ[$v[$i][6]]["name"]:$v[$i][6],
							"score"=>$v[$i][7]
						),
						array(
							"id"=>$univ[$v[$i][8]]["id"]?$univ[$v[$i][8]]["id"]:"",
							"name"=>$univ[$v[$i][8]]["name"]?$univ[$v[$i][8]]["name"]:$v[$i][8],
							"score"=>$v[$i][9]
						)
					),
					"json"=>$jsonpath
				);
				$league["games"]=$game;
			}
			$schedules[]=$league;
		}
		$schedule[]=array(
			"leaguetype"=>$kk,
			"league"=>$schedules,
		);
	}
	
	$y["response"]["lastupdate"]=date("Y-m-d H:i:s",$lastupdate);
	$y["response"]["schedule"]=$schedule;
	
	put_json($json,$y);
	unlink($tmpfile);	
}

?>