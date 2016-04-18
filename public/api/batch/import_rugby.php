<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

function modhtmltag($s){
	
	$caption="";
	$body="";
	$s=explode("</div>",$s);
	
	for($i=0;$i<count($s);$i++){
		$s[$i]=$s[$i]."</div>";
		if(preg_match("/text-align: center;/",$s[$i])){
			if($i<=1){
				$caption.=strip_tags($s[$i]);
			}
		}else{
			$body.=$s[$i];
		}
	}
	
	$body=explode("<div><br></div>",$body);
	$body=str_replace("</div><div>","<br>",$body);
	$body=str_replace("<div><div>","<div>",$body);
	$body=str_replace("</div></div>","</div>",$body);
	
	$mbody="";
	for($i=0;$i<count($body);$i++){
		if(strlen($body[$i])>8)$mbody.=sprintf("<p>%s</p>",strip_tags($body[$i],"<br>"));
	}
	
	$mbody=str_replace("&nbsp;","",$mbody);
	$mbody=str_replace("\t","",$mbody);
	
	return array($caption,$mbody);
}

$rssfile="http://rugby-rp.com/rss/rss_undo.asp";
$mtype=131;

$o=new db;
$o->connect();

$sql=sprintf("select id,name,name_e,yobi from pm_ where cid=20 and flag=1 and id not in(%s) order by id desc",implode(",",$excategory));
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
	
	$text=modhtmltag($data["channel"]["item"][$i]["description"]);
	$modbody=str_replace("\'","''",$text[1]);
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$text[0];
	}

	$keyword=key_merge($data["channel"]["item"][$i]["category"]);
	$s["keyword"]=$keyword;
	
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}

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
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=9; // ラグビー共和国
			$s["m1"]=120; // ラグビー
			$s["m4"]=$mtype;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
		}
	}
}

$sqla=implode("\n",$sqla);
$o->query($sqla);


?>