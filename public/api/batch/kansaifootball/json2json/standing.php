<?php

include "local.php";
include "../inc.php";

$jsonfile1=sprintf("%s/standing.json",$ka_path);
$data1=get_contents($jsonfile1);
$data1=json_decode($data1,true);

$jsonfile2=sprintf("%s/standing.json",$bucket);
if(file_exists($jsonfile2)){
	$data2=get_contents($jsonfile2);
	$data2=json_decode($data2,true);
}

$flag=0;
if(!file_exists($jsonfile2)){
	$flag=1;
	$lastupdate=$data1["response"]["lastupdate"];
}elseif(strtotime($data1["response"]["lastupdate"])>strtotime($data2["response"]["lastupdate"])){
	$flag=1;
	$lastupdate=$data1["response"]["lastupdate"];
}

if($flag==1){
	
	$data1["response"]["lastupdate"]=$lastupdate;
	for($i=0;$i<count($data1["response"]["team"]);$i++){
		$data1["response"]["team"][$i]["shortname"]=$urev[$data1["response"]["team"][$i]["name"]]["name"];
		$resultlabel=array("win","lose","draw");
		for($j=0;$j<count($resultlabel);$j++){
			if(!$data1["response"]["team"][$i]["result"][$resultlabel[$j]]){
				$data1["response"]["team"][$i]["result"][$resultlabel[$j]]=0;
			}
		}
	}
	$n=0;
	for($i=0;$i<count($data1["response"]["tounament"]);$i++){
		$tournament[floor($n/8)][]=$data1["response"]["tounament"][$i];
		$n++;
	}
	
	//tournamentタイポなので削除する
	unset($data1["response"]["tounament"]);
	
	for($i=0;$i<count($tournament);$i++){
		for($j=0;$j<count($tournament[$i]);$j++){			
			if($i==$j)$result=array("result"=>"-","score"=>"-");
			elseif($tournament[$i][$j]["result"]==NULL)$result=array("result"=>"","score"=>"");
			else $result=$tournament[$i][$j];
			$data1["response"]["tournament"][$i][$j]=$result;
		}
	}
	put_json($jsonfile2,$data1);
}

?>