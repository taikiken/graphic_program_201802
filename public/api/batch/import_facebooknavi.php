<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$m="link
timestamp
description
img
video
videoid
like
comment
facebookpage
facebookid
facebookicon";
$m=explode("\n",$m);

function modptag($s){
	$s=str_replace("\r\n","\n",$s);
	$s=str_replace("\n\n","</p><p>",$s);
	$s=str_replace("\n","<br>",$s);
	$s=sprintf("<p>%s</p>",$s);
	$s=pg_escape_string($s);
	return $s;
}

$registerd=array();
$sql="select t7 from repo_n where (now() - interval '1 day')::date=date(m_time) and d2=4;";
$o->query($sql);
while($f=$o->fetch_array()){
	$registerd[]=$f["t7"];
}

$s=array();
$csv=sprintf("http://pro-trend-sports.s3.amazonaws.com/csvfiles/fnavi_%s.csv",date("Ymd"));
$fp=fopen($csv,"r");

while($f=fgetcsv($fp,1024)){

	unset($s);
	unset($w);
	
	for($i=0;$i<count($m);$i++){
		$w[trim($m[$i])]=$f[$i];
	}
	
	if(strlen($w["description"])>0){
		
		$s["id"]="nextval('repo_n_id_seq')";
		$s["m1"]=130;
		$s["d1"]=3;
		$s["d2"]=4;
		$s["m4"]=131;
		$s["flag"]=1;
		$s["cid"]=1;
		$s["n"]="(select max(n)+1 from repo_n where cid=1)";
		
		$s["title"]=bind($w["facebookpage"]);
		$s["t9"]=bind($w["link"]);
		$s["t7"]=bind($w["link"]);
		
		$body=modptag($w["description"]);
		
		$s["m_time"]=bind($w["timestamp"]);
		$s["u_time"]=bind($w["timestamp"]);
		$s["a_time"]=bind($w["timestamp"]);
		$x=explode(" ",str_replace(array(" ","-",":")," ",$w["timestamp"]));
		for($j=1;$j<=6;$j++){
			$s["a".$j]=$s["a".(6+$j)]=$x[($j-1)];
		}
		$s["a13"]=$w["comment"];
		$s["a14"]=$w["like"];
		
		$s["a15"]=$w["facebookid"];
		$s["t30"]=$w["facebookicon"];
		
		if(strlen($w["img"])>0){
			$s["img1"]=$w["img"];
		}
		if(preg_match("/facebook/",$w["video"])){
			$s["facebook"]=$w["video"];
		}
		if(strlen($w["videoid"])>0){
			$s["youtube"]=$w["videoid"];
		}
		
		if(!in_array($s["t7"],$registerd)){
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(id,pid,body) values(nextval('repo_body_id_seq'),currval('repo_n_id_seq'),'%s');",$body);
		}
	}	
}

$sqla=implode("\n",$sqla);
$o->query($sqla);




?>