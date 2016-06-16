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

function get_index(){
	
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
		
		$s["m1"]=136;
		$s["m2"]=$k;
		$s["title"]=$d[$i]["title"];
		$s["t9"]=$d[$i]["link"];
		$s["t7"]=$d[$i]["link"];
		
		$body=sprintf("<p>%s</p>",str_replace("\n","<br>",str_replace("\n\n","</p><p>",$d[$i]["description"])));
		$modbody=pg_escape_string($body);
		
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
			$s["d2"]=17;
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
		    
			if(!isset($f["id"])){
				$sql="select currval('repo_n_id_seq') as id";
				$o->query($sql);
				$f=$o->fetch_array();
				$id=$f["id"];
			}else{
				$id=$f["id"];
			}			
			
			$file=sprintf("%s/api/ver1/static/ad/1-%s.dat",$SERVERPATH,$id);
    		if(file_exists($file)){
				$vs=unserialize(file_get_contents($file));
			}
			$vs["readmore"]=1;
			file_put_contents($file,serialize($vs));
		}
	}
	
	
}


?>