<?php

include "local.php";
include "inc.php";

$csv =sprintf("%s/csv/schedule.csv",$bucket);
$data=get_contents($csv);
$data=mb_convert_encoding($data,"UTF-8","SJIS");
$data=explode("\n",$data);
for($i=0;$i<count($data);$i++){
	if(preg_match("/\#/",$data[$i])||strlen($data[$i])==0)continue;
	$d=explode(",",$data[$i]);
	if(strtotime($d[1])<=strtotime(date("Y-m-d")))$games[]=$d[5];
}

for($j=0;$j<count($games);$j++){
	
	$gameid=$games[$j];
	$csv =sprintf("%s/csv/%s.csv",$bucket,$gameid);
	$json=sprintf("%s/%s.json",$bucket,$gameid);
	
	if(!file_exists($csv))continue;
	$lastupdate=filemtime($csv);
	
	if(!file_exists($json)||$lastupdate>filemtime($json)){
	
		$data=get_contents($csv);
		$data=mb_convert_encoding($data,"UTF-8","SJIS");
		$data=preg_replace("/\r\n|\r|\n/","\n",$data);
		$tmpfile=sprintf("%s/tmp/%s.csv",$bucket,$gameid);
		file_put_contents($tmpfile,$data);
		
		$f=0;
		$fp=fopen($tmpfile,"r");
		while($l=fgetcsv($fp,1024)){
			
			if($l[0]=="##試合情報")$f=1;
			elseif($l[0]=="##チーム情報 Play First")$f=2;
			elseif($l[0]=="##Play First個人情報 ラン")$f=3;
			elseif($l[0]=="##Play First個人情報 パス")$f=4;
			elseif($l[0]=="##Play First個人情報 レシーブ")$f=5;
			elseif($l[0]=="##チーム情報 Draw First")$f=6;
			elseif($l[0]=="##Draw First個人情報 ラン")$f=7;
			elseif($l[0]=="##Draw First個人情報 パス")$f=8;
			elseif($l[0]=="##Draw First個人情報 レシーブ")$f=9;
			elseif(preg_match("/^##試合経過/",$l[0]))$f=10;
			
			if($f==1&&!preg_match("/^##/",$l[0])){
				$y["response"]["gameinfo"][$map[$l[0]]]=$l[1];
			}elseif($f==10&&!preg_match("/^##/",$l[0])&&!preg_match("/^■/",$l[0])){
				$y["response"]["events"][]=array(
					"team"=>$l[0],
					"time"=>sprintf("%s-%s",$l[1],$l[2]),
					"play"=>$l[3]
				);
			}elseif(($f==2||$f==6)&&!preg_match("/^##/",$l[0])){
				setarray($map[$l[0]],$l[1],$f==2?0:1);
			}elseif(($f==3||$f==7||$f==5||$f==9)&&!preg_match("/^##/",$l[0])&&!preg_match("/^■/",$l[0])){
				if(preg_match("/^#/",$l[0])){
					$y["response"]["team"][$f==3||$f==5?0:1]["playersdata"][$f==3||$f==7?"run":"receive"]["total"]=$l[1];
				}else{
					$y["response"]["team"][$f==3||$f==5?0:1]["playersdata"][$f==3||$f==7?"run":"receive"]["player"][]=array(
						"name"=>$l[0],
						"no"=>$l[1],
						"data"=>array(
							"att"=>$l[2],
							"yds"=>$l[3],
							"td"=>$l[4],
							"lg"=>$l[5]
						)
					);
				}
			}elseif(($f==4||$f==6)&&!preg_match("/^##/",$l[0])&&!preg_match("/^■/",$l[0])){
				if(preg_match("/^#/",$l[0])){
					$y["response"]["team"][$f==4?0:1]["playersdata"]["pass"]["total"]=$l[1];
				}else{
					$y["response"]["team"][$f==4?0:1]["playersdata"]["pass"]["player"][]=array(
						"name"=>$l[0],
						"no"=>$l[1],
						"data"=>array(
							"cpat"=>$l[2],
							"yds"=>$l[3],
							"td"=>$l[4],
							"int"=>$l[5]
						)
					);
				}
			}
			
		}
		
		$y["response"]["lastupdate"]=date("Y-m-d H:i:s",$lastupdate);
		put_json($json,$y);
		unlink($tmpfile);
	}
}

?>