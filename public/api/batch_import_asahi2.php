<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql="select id,name,yobi from pm_ where cid=20 and flag=1 and id<130 order by id desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$sw[]=$f["name"];
	$r[]=array($f["id"],$sw,$f["name"]);
	$R[]=$f["name"];
}

function categorymatching($r,$k){
	
	$exword=$r;
	$exword[]="スポーツ";
	$exword[]="一般スポーツ";
	$exword[]="その他";
	$exword[]="ニュース";
	$exword[]="国内・海外・その他";
	$exword[]="格闘技";
	$exword[]="陸上";
	$exword[]="ウインタースポーツ";
	
	$k=explode(",",$k);
	$w=array();
	
	for($i=0;$i<count($k);$i++){
		$d=trim($k[$i]);
		if(strlen($d)>0){
			$w[]=$d;
			for($j=0;$j<count($exword);$j++){
				if($d==$exword[$j]){
					array_pop($w);
					break;
				}
			}
		}
	}
	
	return $w;
	
}

$xml=file_get_contents('http://www3.asahi.com/rss/Asahi-Undou/chokan.xml');
//$xml=file_get_contents('a.xml');

$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$s["keyword"]=$data["channel"]["item"][$i]["keyword"];
	$s["m1"]=categorysearch($r,$data["channel"]["item"][$i]["keyword"]);
	$s["body"]=preg_replace("/(\r|\n)/","",nl2br($data["channel"]["item"][$i]["description"]));
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["modified"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}
	
	$tag=categorymatching($R,$data["channel"]["item"][$i]["keyword"]);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	$sql=sprintf("select * from repo_n where t7='%s'",$data["channel"]["item"][$i]["guid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if($s["u_time"]!=$f["u_time"]){
				if(strlen($s["t30"])>0){
					$s["img1"]=outimg($s["t30"]);
				}else{
					$s["img1"]="";
					$s["t1"]="";
				}
				splittime($s["m_time"],$s["u_time"]);
				$sqla[]=makesql($s,$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==9){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=4; /* 朝日新聞 */
			$s["m4"]=132; /* 速報 */
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			//$s["id"]="(select max(id)+1 from repo_n)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["u_time"]);
			$sqla[]=makesql($s,0);
		}
	}
}

//$sqla[]="select setval('repo_n_id_seq',(select max(id) from repo_n));";

$sqla=implode("\n",$sqla);
$o->query($sqla);


?>