<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$s=array();

$sql="select * from (select pid from repo_body where body='<p></p>') as t1,(select id,m1,m4,t7 from repo_n where d2=2) as t2 where t1.pid=t2.id;";
$o->query($sql);
while($f=$o->fetch_array()){
	$s[]=$f;
}

$xml["113"]["131"]="http://delivery.nikkansports.com/xml/flash/baseball/";
$xml["114"]["131"]="http://delivery.nikkansports.com/xml/flash/soccer/";
$xml["118"]["131"]="http://delivery.nikkansports.com/xml/flash/battle/";
$xml["000"]["131"]="http://delivery.nikkansports.com/xml/flash/sports/";
$xml["113"]["132"]="http://delivery.nikkansports.com/xml/paper/baseball/";
$xml["114"]["132"]="http://delivery.nikkansports.com/xml/paper/soccer/";
$xml["118"]["132"]="http://delivery.nikkansports.com/xml/paper/battle/";
$xml["000"]["132"]="http://delivery.nikkansports.com/xml/paper/sports/";

/*

速報（flash）:131
紙面（paper）:133

$s="7744,7744,113,131,f-bb-tp0-160329-0112
581,581,113,131,f-bb-tp0-160226-0064
6945,6945,113,131,f-bb-tp0-160327-0079
6154,6154,113,131,f-bb-tp2-160325-0063
2073,2073,118,132,p-bt-tp0-160310-0002
7710,7710,113,131,f-bb-tp0-160329-0094
2234,2234,113,131,f-bb-tp0-160311-0094
1355,1355,113,131,f-bb-tp0-160304-0052
670,670,116,131,f-sp-tp2-160227-0031
8280,8280,113,131,f-bb-tp0-160331-0081";

$s=explode("\n",$s);

*/

if(count($s)>0){

	for($i=0;$i<count($s);$i++){
				
		if(!in_array($s[$i][2],array("113","114","118")))$s[$i][2]="000";
		$x=$xml[$s[$i][2]][$s[$i][3]].trim($s[$i][4]).".xml";
		
		$p=simplexml_load_file($x);
		$p=json_decode(json_encode($p),TRUE);
		
		$data[]=$p;
	}

var_dump($data);

	for($i=0;$i<count($data);$i++){
		
		unset($s);
		unset($k);
		
		$s["title"]=$data[$i]["headline"];
		$s["t9"]=$data[$i]["url"];
		$s["t7"]=$data[$i]["id"];
		
		if(strlen($data[$i]["genre"])>0)$k[]=$data[$i]["genre"];
		if(strlen($data[$i]["theme"])>0)$k[]=$data[$i]["theme"];
		if(strlen($data[$i]["topic"])>0)$k[]=$data[$i]["topic"];
		$keyword=implode(",",$k);
		$s["keyword"]=$keyword;
		$body=implode("",$data[$i]["content"]["p"]);
		
		$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body));
		
		$s["m_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["date"]));
		if(strlen($data[$i]["update"])>0){
			$s["u_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["update"]));
			$s["a_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["update"]));
		}else{
			$s["u_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["date"]));
		}
		
		if($data[$i]["photo"]!="none"){
			$s["t30"]=str_replace(sprintf("%s.xml",$data[$i]["id"]),"",$xml[$i]).$data[$i]["photo"];
			$s["t1"]=$data[$i]["caption"];
		}
		
		$s["m1"]=category_mapping($r,array($keyword,$s["title"],$s["t1"],$data[$i]["content"]["p"][0],$data[$i]["content"]["p"][1]));
		$tag=categorymatching($exword,$keyword);
		if($s["m1"]==113&&!is_tag($tag,$baseball)){
			$e=baseball_mapping(array($keyword,$s["title"],$s["t1"],$body[0],$body[1]));
			for($j=0;$j<count($e);$j++){
				$tag[]=$e[$j];
			}
			if(count($e)>0&&$tag[0]!="プロ野球")array_unshift($tag,"プロ野球");
		}
		if(count($tag)>0){
			for($cnt=0;$cnt<count($tag);$cnt++){
				$s["t1".$cnt]=esc($tag[$cnt]);
			}
		}
			
		$sql=sprintf("select * from repo_n where cid=1 and t7='%s'",$data[$i]["id"]);
		$o->query($sql);
		$f=$o->fetch_array();
		
		if(strlen($f["id"])>0){

		  if(strlen($s["t30"])>0){
			  $s["img1"]=outimg($s["t30"]);
		  }else{
			  $s["img1"]="";
			  $s["t1"]="";
		  }
		  splittime($s["m_time"],$s["a_time"]);
		  $sqla[]=makesql($s,$f["id"]);
		  $sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
			
		}		
	}

	$sqla=implode("\n",$sqla);
	var_dump($sqla);
	$o->query($sqla);
}

?>