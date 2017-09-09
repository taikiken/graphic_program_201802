<?php

include "local.php";
include "inc.php";

//連盟のJSON
$remote_csv=sprintf("http://big6.gr.jp/game_file/%s_standings.csv",$target);
$local_csv =sprintf("%s/ranking.csv",$bucket);

$c=get_headers($remote_csv);
for($i=0;$i<count($c);$i++){
	if(preg_match("/Last-Modified: /",$c[$i])){
		$lastupdate=strtotime(str_replace("Last-Modified: ","",$c[$i]));
		break;
	}
}

if(!file_exists($local_csv)||$lastupdate>filemtime($local_csv)){
		
	$data=get_contents($remote_csv);
	$data=mb_convert_encoding($data,"UTF-8","SJIS");
	
	$data=str_replace(array("R","W","K","M","H","T"),array("立大","早大","慶大","明大","法大","東大"),$data);
	$data=trim($data);
	$data=mb_convert_encoding($data,"SJIS","UTF-8");
	
	file_put_contents($local_csv,$data);
}

?>