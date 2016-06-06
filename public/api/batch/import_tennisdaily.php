<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

function modhtmltag($s){
	$s=str_replace(array("</br>","<br/>","<br />"),"<br>",$s);
	$s=strip_tags($s,"<br>");
	$s=sprintf("<p>%s</p>",str_replace("<br>","</p><p>",$s));
	return $s;
}

$rssfile="http://www.thetennisdaily.jp/rss/rss_undo.asp";
$mtype=131;

$o=new db;
$o->connect();

$sql=sprintf("select id,name,name_e,yobi from u_categories where flag=1 and id not in(%s) order by id desc",implode(",",$excategory));
$o->query($sql);
while($f=$o->fetch_array()){
	$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$sw[]=$f["name"];
	$r[]=array($f["id"],$sw);
	$exword[]=$f["name"];
	$exword[]=$f["name_e"];
}

$xml=file_get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$body=modhtmltag($data["channel"]["item"][$i]["description"]);
	$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body));
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=str_replace("]>","]",$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"]);
	}

	$keyword=key_merge($data["channel"]["item"][$i]["category"]);
	$s["keyword"]=$keyword;
	
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	unset($sqla);
	
	$sql=sprintf("select * from repo_n where cid=1 and t7='%s'",$data["channel"]["item"][$i]["guid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
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
				$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=8; // Tennis Daily
			$s["m1"]=117; // テニス
			$s["m4"]=$mtype;
			$s["flag"]=1;
			$s["cid"]=1;
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


?>