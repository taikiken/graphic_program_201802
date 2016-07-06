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
	$xml="http://delivery.nikkansports.com/xml/flash/baseball/bb.rdf
	http://delivery.nikkansports.com/xml/flash/soccer/sc.rdf
	http://delivery.nikkansports.com/xml/flash/sports/sp.rdf
	http://delivery.nikkansports.com/xml/flash/battle/bt.rdf
	http://delivery.nikkansports.com/xml/paper/baseball/bb.rdf
	http://delivery.nikkansports.com/xml/paper/soccer/sc.rdf
	http://delivery.nikkansports.com/xml/paper/sports/sp.rdf
	http://delivery.nikkansports.com/xml/paper/battle/bt.rdf";
	$xml=explode("\n",$xml);
	for($i=0;$i<count($xml);$i++){
		$x=simplexml_load_file(trim($xml[$i]));
		$nameSpaces=$x->getNamespaces(true);
		$item=$x->channel->items;
		$gNode=$item->children($nameSpaces['rdf'])->Seq->li;
		foreach($gNode as $t){
			$u[]=(string)$t["resource"];
		}
	}
	return $u;
}

function get_data($xml){
	for($i=0;$i<count($xml);$i++){
		$p=simplexml_load_file($xml[$i]);
		$p=json_decode(json_encode($p),TRUE);
		$data[]=$p;
	}
	return $data;
}

$xml=get_index();
$data=get_data($xml);

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
	$body=sprintf("<p>%s</p>",count($data[$i]["content"]["p"])>1?implode("</p><p>",$data[$i]["content"]["p"]):$data[$i]["content"]["p"]);
	
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
			if($cnt==6)break;
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

	}else{
			
		$s["d1"]=3;
		$s["d2"]=2; /* 日刊スポーツ */
		$s["m4"]=$data[$i]["media"]=="flash"?131:132; /* 速報 */
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
		$o->query($sqla);
	}
}



?>