<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql=sprintf("select id,name,name_e,yobi from u_categories where flag=1 and id not in(%s) order by id desc",implode(",",$excategory));
$o->query($sql);
while($f=$o->fetch_array()){
	$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$sw[]=$f["name"];
	$r[]=array($f["id"],$sw,$f["name"]);
	$exword[]=$f["name"];
	$exword[]=$f["name_e"];
}

$xml="http://www.jsports.co.jp/press/column/category/07/rss2.xml 118
http://www.jsports.co.jp/press/column/category/01/rss2.xml 113
http://www.jsports.co.jp/press/column/category/02/rss2.xml 114
http://www.jsports.co.jp/press/column/category/03/rss2.xml 120
http://www.jsports.co.jp/press/column/category/05/rss2.xml 125
http://www.jsports.co.jp/press/column/category/06/rss2.xml 127
http://www.jsports.co.jp/press/column/category/09/rss2.xml 115
http://www.jsports.co.jp/press/column/category/10/rss2.xml 124
http://www.jsports.co.jp/press/column/category/12/rss2.xml 129
http://www.jsports.co.jp/press/column/category/19/rss2.xml 129
http://www.jsports.co.jp/press/column/category/90/rss2.xml 129";

function get_index(){
	
	global $xml;
	$file=explode("\n",$xml);
	for($i=0;$i<count($file);$i++){
		$x=explode(" ",trim($file[$i]));
		$data=simplexml_load_string(file_get_contents($x[0]),'SimpleXMLElement',LIBXML_NOCDATA);
		$data=json_decode(json_encode($data),TRUE);
		$u[$x[1]]=$data;
	}
	return $u;
}

$data=get_index();

while(list($k,$v)=each($data)){
	
	unset($s);
	$d=$v["channel"]["item"];
	
	for($i=0;$i<count($d);$i++){
		
		$s["m1"]=$k;
		$s["titile"]=$d[$i]["title"];
		$s["t9"]=$d[$i]["link"];
		$s["t7"]=$d[$i]["link"];
		$s["body"]=sprintf("<p>%s</p>",str_replace("\n","<br>",str_replace("\n\n","</p><p>",$d[$i]["description"])));
		$modbody=pg_escape_string($s["body"]);
		$datetime=date("Y-m-d H:i:s",strtotime($d[$i]["pubDate"]));
		$s["m_time"]=$datetime;
		$s["u_time"]=$datetime;
		$s["a_time"]=$datetime;
		if($d[$i]["enclosure"]){
			$s["t30"]=$d[$i]["enclosure"]["@attributes"]["url"];
		}

		$sql=sprintf("select * from repo_n where t7='%s'",$s["t7"]);
		$o->query($sql);
		$f=$o->fetch_array();
		
		unset($sqla);
		
		if(strlen($f["id"])>0){
			if($s["a_time"]!=$f["a_time"]){
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
		}else{	
			$s["d1"]=3;
			$s["d2"]=2;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["m_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
		}
		if($sqla){
			$sqla=implode("\n",$sqla);
			$o->query($sqla);
		}
	}
	
	
}


/*
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
	$body=sprintf("<p>%s</p>",implode("</p><p>",$data[$i]["content"]["p"]));
	
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
	
	$body=explode("</p>",str_replace("<p>","",str_replace("<p></p>","",$body)));
	$s["m1"]=category_mapping($r,array($keyword,$s["title"],$s["t1"],$body[0],$body[1]));
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
	
	unset($sqla);
	
	if(strlen($f["id"])>0){

		if($s["a_time"]!=$f["a_time"]){
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

	}else{
			
		$s["d1"]=3;
		$s["d2"]=2;
		$s["m4"]=$data[$i]["media"]=="flash"?131:132;
		$s["flag"]=1;
		$s["cid"]=1;
		$s["n"]="(select max(n)+1 from repo_n where cid=1)";
		//$s["id"]="(select max(id)+1 from repo_n)";
		if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
		splittime($s["m_time"],$s["m_time"]);
		$sqla[]=makesql($s,0);
		$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
		
	}	
	
	if($sqla){
		$sqla=implode("\n",$sqla);
		var_dump($sqla);
		//$o->query($sqla);
	}
}
*/


?>