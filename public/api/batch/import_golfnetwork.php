<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=18;

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
	
	$xml="http://www.golfnetwork.co.jp/rss/column2.xml 135";

	$file=explode("\n",$xml);
	for($i=0;$i<count($file);$i++){
		$x=explode(" ",trim($file[$i]));
		$data=simplexml_load_string(get_contents($x[0]),'SimpleXMLElement',LIBXML_NOCDATA);
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
		$s["m2"]=116;
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

		$sql=sprintf("select * from repo_n where d2=%s and t7='%s'",$MEDIAID,$s["t7"]);
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
			$s["d2"]=$MEDIAID;
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
    		if($vs=get_contents($file)){
				$vs=unserialize($vs);
			}
			$vs["readmore"]=1;
			file_put_contents($file,serialize($vs));
			s3upload($file,sprintf("static/ad/1-%s.dat",$id));
		}
	}
}


?>