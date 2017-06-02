<?php

include "local.php";

//連盟のJSON
$remote_csv="http://big6.gr.jp/game_file/2017s_standings.csv";
$local_csv ="../big6tv/ranking.csv";

$c=get_headers($remote_csv);
for($i=0;$i<count($c);$i++){
	if(preg_match("/Last-Modified: /",$c[$i])){
		$lastupdate=strtotime(str_replace("Last-Modified: ","",$c[$i]));
		break;
	}
}


if($lastupdate>filemtime($local_csv)){

	$data=get_contents($remote_csv);
	$data=mb_convert_encoding($data,"UTF-8","SJIS");
	$data=str_replace(array("R","W","K","M","H","T"),array("立大","早大","慶大","明大","法大","東大"),$data);
	$data=trim($data);
	$data=mb_convert_encoding($data,"SJIS","UTF-8");
	
	file_put_contents($local_csv,$data);
}

?>