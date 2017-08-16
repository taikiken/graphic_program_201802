<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=1;
$MEDIANAME="朝日新聞";

/* 131:速報, 132:朝刊 */

if($_GET["p"]==1){
	$rssfile="http://www3.asahi.com/rss/Asahi-Undou/chokan.xml";
	$mtype=132;	
}else{
	$rssfile="http://www3.asahi.com/rss/Asahi-Undou/sokuhou.xml";
	$mtype=131;
}

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

$xml=get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
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
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["modified"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}

	$keyword=key_merge($data["channel"]["item"][$i]["keyword"]);
	$s["keyword"]=$keyword;

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
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	//リオ五輪期間のみ
	if(preg_match("/リオ五輪/",$data["channel"]["item"][$i]["keyword"])){
		//if($s["m1"]!=141)$s["m2"]=141;
	}

	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$data["channel"]["item"][$i]["guid"]);
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
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==9){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$TITLE[]=pg_escape_string($s["title"]);
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			if(!preg_match("/高校野球/",$data["channel"]["item"][$i]["keyword"]))$s["m1"]=136;
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

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}

}

include $INCLUDEPATH."public/display.php";

?>