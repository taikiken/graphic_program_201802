<?php

include "local.php";
include "inc.php";

$csv =sprintf("%s/csv/standing.csv",$bucket);
$json=sprintf("%s/standing.json",$bucket);

$lastupdate=filemtime($csv);

if(!file_exists($json)||$lastupdate>filemtime($json)){
	
	$data=get_contents($csv);
	$data=mb_convert_encoding($data,"UTF-8","SJIS");
	$data=preg_replace("/\r\n|\r|\n/","\n",$data);
	$tmpfile=sprintf("%s/tmp/standing.csv",$bucket);
	file_put_contents($tmpfile,$data);
	
	$fp=fopen($tmpfile,"r");
	while($l=fgetcsv($fp,1024)){
		if(!preg_match("/^#/",$l[0])){
			$team[]=array(
				"name"=>$univ[$l[0]]["name"],
				"shortname"=>$l[0],
				"rank"=>$l[4],
				"result"=>array("win"=>$l[1],"lose"=>$l[2],"draw"=>$l[3])
			);
			$result=array();
			for($i=0;$i<count($univ);$i++){
				$result[]=array(
					"result"=>check_result($l[5+$i]),
					"score"=>$l[5+$i]
				);
			}
			$tournament[]=$result;
		}
	}
	
	$y["response"]["lastupdate"]=date("Y-m-d H:i:s",$lastupdate);
	$y["response"]["team"]=$team;
	$y["response"]["tournament"]=$tournament;
	put_json($json,$y);
	unlink($tmpfile);
}

?>