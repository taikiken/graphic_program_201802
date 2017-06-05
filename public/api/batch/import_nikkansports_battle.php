<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=2;
$MEDIANAME="日刊スポーツ：格闘技";
$rssfile="http://delivery.nikkansports.com/sb/battle/bt.xml";

$o=new db;
$o->connect();

$xml=get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
}

function checkcategories($keyword,$title,$caption,$body){
	
	global $o,$excategory;
	
	$sql=sprintf("select id,name,name_e,yobi from u_categories where flag=1 and id not in(%s) order by id desc",implode(",",$excategory));
	$o->query($sql);
	while($f=$o->fetch_array()){
		$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
		$sw[]=$f["name"];
		$r[]=array($f["id"],$sw,$f["name"]);
		$exword[]=$f["name"];
		$exword[]=$f["name_e"];
	}
	
	$checkbody=explode("</p><p>",preg_replace("(\n|\r|\r\n)","",$body));
	return category_mapping($r,array($keyword,$title,$caption,$checkbody[0],$checkbody[1]));
}

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$body=$data["channel"]["item"][$i]["description"];
	$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$data["channel"]["item"][$i]["description"]));
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=str_replace("http://","https://",$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"]);
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}

	$keyword=key_merge($data["channel"]["item"][$i]["keyword"]);
	$s["keyword"]=$keyword;
	
	$tag=categorymatching($exword,$keyword);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t9='%s'",$MEDIAID,$data["channel"]["item"][$i]["link"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
		
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if(strtotime($s["a_time"])>strtotime($f["a_time"])){
				if(strlen($s["t30"])>0){
					if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"]))$s["img1"]=outimg($s["t30"]);
				}else{
					$s["img1"]="";
					$s["t1"]="";
				}
				splittime($s["m_time"],$s["a_time"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
				$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$TITLE[]=pg_escape_string($s["title"]);
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["m1"]=118;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"]);
		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}

}

include $INCLUDEPATH."public/display.php";

?>