<?php

include "local.php";
include "public/import.php";

$FPATH="../ver1/static/gguide";

function makesql2($a,$f){
	if($f==0){
		while(list($k,$v)=each($a)){
			if(strlen($v)>0){
				$v=stripslashes($v);
				$v=addslashes($v);
				$v=str_replace(array("\r\n","\r"),"\n",$v);
				$v=str_replace("―","-",$v);
				$v=str_replace("\'","''",$v);
				$v=sprintf("'%s'",$v);
				if(preg_match("/(select )/",$v))$v=str_replace("'","",$v);
				if(preg_match("/(nextval)/",$v))$v="nextval('repo_n_id_seq')";
			}else{
				$v="null";
			}
			$sv[$sn[]=$k]=$v;
		}
		return sprintf("insert into u_epg(%s) select %s where not exists (select * from u_epg where pid=%s);",implode(",",$sn),implode(",",$sv),$sv["pid"]);
	}else{
		while(list($k,$v)=each($a)){
			$v=stripslashes($v);
			$v=addslashes($v);
			$v=str_replace(array("\r\n","\r"),"\n",$v);
			$v=str_replace("―","-",$v);
			$v=str_replace("\'","''",$v);
			$sv[]=sprintf("%s=%s",$k,strlen($v)>0?sprintf("'%s'",$v):"null");
		}
		return sprintf("update u_epg set %s where id=%s;",implode(",",$sv),$f);
	}
}

$o=new db;
$o->connect();

for($I=0;$I<7;$I++){
	for($J=0;$J<2;$J++){
		$f=sprintf("%s/%s_%s.json",$FPATH,$J===0?"dg":"bs",date("Y-m-d",strtotime(sprintf('+ %s day',$I))));
		$v=get_contents($f);
		$v=json_decode($v,TRUE);
		$program=$v["programs"];
		if(!$program)continue;
		for($i=0;$i<count($program);$i++){
			$a=$program[$i];			
			$channel[$a["sid"]]=$a["ch"];
		}
	}
}
foreach($channel as $k=>$v){
	$sql=sprintf("insert into repo(rid,pid,t1,name,m_time,u_time,flag,n) select 48,0,'%s','%s',now(),now(),1,(select case when max(n) is null then 1 else max(n)+1 end from repo where rid=48) where not exists (select * from repo where rid=48 and t1='%s');",pg_escape_string($k),pg_escape_string(trim($v)),pg_escape_string($k));
	$o->query($sql);
}

$sql="select id,t1 from repo where rid=48";
$o->query($sql);
while($f=$o->fetch_array()){
	$c[$f["t1"]]=$f["id"];
}

$tmp=array();

for($I=0;$I<7;$I++){
	for($J=0;$J<2;$J++){	

		$f=sprintf("%s/%s_%s.json",$FPATH,$J===0?"dg":"bs",date("Y-m-d",strtotime(sprintf('+ %s day',$I))));
		$v=get_contents($f);
		$v=json_decode($v,TRUE);
		$program=$v["programs"];
		
		if(!$program)continue;
		
		for($i=0;$i<count($program);$i++){
			$a=$program[$i];			
			if(in_array($a["pid"],$tmp))continue;
			$tmp[]=$a["pid"];
			$p[]=array(
				"sitype"=>$J===0?3:1,
				"nid"=>$a["nid"],
				"sid"=>$a["sid"],
				"cid"=>$c[$a["sid"]],
				"qid"=>48,
				"pid"=>$a["pid"],
				"ch"=>$a["ch"],
				"n"=>sprintf("(select case when max(n) is null then 1 else max(n)+1 end from u_epg where cid=%s)",$c[$a["sid"]])
			);
		}
	}
}

for($i=0;$i<count($p);$i++){
	
	if($p[$i]["pid"]=="-1")continue;
	$sqla="";
	
	$file=sprintf("http://api-stg.bangumi.org/master?siType=%s&programId=%s&serviceId=%s&networkId=%s&token=8fe4514acf2e725af6117a675ea55239debb26f1",$p[$i]["sitype"],$p[$i]["pid"],$p[$i]["sid"],$p[$i]["nid"]);
	$v=get_contents($file);
	$v=json_decode($v,TRUE);
	$master=$v;
	
	if(!$master["title"])continue;
	
	$update=date("Y-m-d H:i:s",strtotime($master["udt"]));
	$title=$master["title"][0]["string"];
		
	$sql=sprintf("select*from u_epg where pid='%s'",$p[$i]["pid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		
		$p[$i]["u_time"]=$update;
		$p[$i]["title"]=$title;
		if(strtotime($f["u_time"])<strtotime($update)){
			$sqla=makesql2($p[$i],$f["id"]);
		}
		
	}else{
		
		$p[$i]["m_time"]=$update;
		$p[$i]["u_time"]=$update;
		$p[$i]["title"]=$title;
		$p[$i]["flag"]=1;
		$sqla=makesql2($p[$i],0);
		
	}
	
	if(strlen($sqla)>0){
		$o->query($sqla);
	}
}

?>