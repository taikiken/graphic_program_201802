<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";
include "inc.php";

$MEDIAID=61;
$MEDIANAME="nordot";
$bullid="262792796378236410";

$o=new db;
$o->connect();

for($j=0;$j<9;$j++){
	
	$ID=$j;
	$d=get_contents(sprintf("%s/%s.json",$bucket2,$ID));
	$d=json_decode($d,TRUE);
	
	for($i=0;$i<count($d);$i++){
		
		$strtotime=strtotime($d[$i]["pubDate"]);
		unset($s);
			
		$s["title"]=$d[$i]["title"];
		$s["t9"]=sprintf("%s?c=%s",$d[$i]["link"],$bullid);
		$s["t7"]=$d[$i]["guid"];
		
		$modbody=preg_replace("/(\r|\n|\t)/","",$d[$i]["description"]);
		
		$s["m_time"]=date("Y-m-d H:i:s",$strtotime);
		$s["u_time"]=date("Y-m-d H:i:s",$strtotime);
		$s["a_time"]=date("Y-m-d H:i:s",$strtotime);
		
		if($d[$i]["img"]){
			$s["t30"]=$d[$i]["img"]["@attributes"]["url"];
		}
		$pref=$area[$ID]!="北海道"?get_pref($d[$i]["creator"]):"北海道";
		$s["t10"]=$d[$i]["creator"];
		$s["t11"]=$area[$ID];
		if($pref!="北海道"&&strlen($pref)>0)$s["t12"]=$pref;
		
		$sql=sprintf("select id,title,(select body from repo_body where pid=repo_n.id) as body from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$s["t7"]);
		$o->query($sql);
		$f=$o->fetch_array();
		
		unset($sqla);
		
		if(strlen($f["id"])>0){
			if(!preg_match(sprintf("#%s#",$d[$i]["description"]),$f["body"])||$f["title"]!=$s["title"]){		
				if(strtotime($s["a_time"])>strtotime($f["a_time"])){
					if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"]))$s["img1"]=outimg($s["t30"]);
				}else{
					$s["img1"]="";
				}
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",pg_escape_string($modbody),$f["id"]);
			}
		}else{
			
			$TITLE[]=$s["title"];
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=161;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",pg_escape_string($modbody));
			$sqla[]=sprintf("insert into u_area(pageid,region,pref) values(currval('repo_n_id_seq'),'%s','%s');",$area[$ID],$pref);	
			
		}
		
		if($sqla){
			$sqla=implode("\n",$sqla);
			$o->query($sqla);
		}
	}

}

include $INCLUDEPATH."public/display.php";

?>