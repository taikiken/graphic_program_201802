<?php

$domain="http://www.undotsushin.com";
$H=getallheaders();

$yh=explode("=",$H["Authorization"]);
$H["Authorization"]=$yh[2];

$SIZE=300;

$articletable="select 
	* 
from 
	(select 
		id,
		title,
		body,
		b1,
		img1,
		(select name from repo where id=d1) as type,
		d2,
		t1,
		swf as video,
		t6 as videocaption,
		img6 as videoimg,
		(select name from pm_ where id=m1) as category,
		(select name_e from pm_ where id=m1) as slug,
		extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,
		a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,
		a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,
		extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday 
	from repo_n where cid=1 and flag=1) as t1,
	(select 
		id as uid,
		cid as typeid,
		title as name,
		t2 as profile,
		img1 as icon 
	from repo_n where qid=2 and flag=1) as t2
	where 
		t1.d2=t2.uid";

function get_weekday($a){
	$w=array("日","月","火","水","木","金","土");
	return $w[$a];
}
function get_relativetime($a,$b,$c){
	$rt="";
	if($a<60){
		$rt=sprintf("%s分前",floor($a));
	}elseif($a<60*24){
		$rt=sprintf("%s時間前",floor($a/(60)));
	}else{
		$rt=str_replace(" ",sprintf("(%s) ",get_weekday($c)),$b);
	}
	return $rt;
}

function get_action($a){
	$s=array("comment","good","bad","bookmark");
	return $s[$a-1];
}

function checkstr($s,$f=0){
	$r=strlen($s)>0?$s:"";
	return $f==0?$s:mod_HTML($s);
}

function tmod($s){
	$s=explode("<br />",$s);
	for($i=0;$i<count($s);$i++){
		$s[$i]=sprintf("<p>%s</p>",trim($s[$i]));
	}
	return implode("",$s);
}

function auth($c){
	global $o;
	if(strlen($c)>0){
		$sql=sprintf("select id from repo_n where a15='%s'",trim($c));
		$o->query($sql);
		$f=$o->fetch_array();
	}
	return isset($f["id"])?$f["id"]:"";
}

function esc($v){
	$v=stripslashes($v);
	$v=str_replace(array("\r\n","\r"),"\n",$v);
	$v=str_replace("―","-",$v);
	$v=str_replace("'","''",$v);
	$v=strip_tags($v);
	return $v;
}

function get_summary($description,$body){
	$s="";
	if(strlen($description)>0){
		$s=$description;
	}else{
		$s=strip_tags($body);
		$s=preg_replace("/\n/","",$s);
		$s=preg_replace("/(^　)/","",$s);
		$s=mb_substr($s,0,100);
	}
	return mod_HTML($s);
}

?>