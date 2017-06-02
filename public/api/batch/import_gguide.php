<?php

include "local.php";
include "public/import.php";

$o=new db;
$o->connect();

$MEDIAID=43;
$CATEGORYID=152;
$FPATH="../ver1/static/gguide";

function get_genres($genre,$ch){
	global $s;
	array_unshift($genre,array("g1"=>"スポーツ","g2"=>$ch));
	$genres=array();
	if(count($genre)>0){
		for($i=0;$i<count($genre);$i++){
			if($genre[$i]["g1"]=="スポーツ"&&$genre[$i]["g2"]!="その他"){
				$s["t1".$i]=esc($genre[$i]["g2"]);
				$genres[]=esc($genre[$i]["g2"]);
			}
		}
		$s["keyword"]=implode(", ",$genres);
	}
}

function get_imgurl($img){
	if(count($img)==0){
		return "";
	}elseif(count($img)==1){
		return $img[0]["url"];
	}else{
		for($i=0;$i<count($img);$i++){
			$imgs[strtolower($img[$i]["cid"])]=$img[$i]["url"];
		}
		if($imgs["main"])return $imgs["main"];
		elseif($imgs["maincut"])return $imgs["maincut"];
		elseif($imgs["thumb"])return $imgs["thumb"];
		elseif($imgs["logo"])return $imgs["logo"];
		else "";
	}
}

$sql="select pid from u_epg where flag=0";
$o->query($sql);
while($f=$o->fetch_array()){
	$ex[]=$f["pid"];
}

for($I=0;$I<7;$I++){
	for($J=0;$J<2;$J++){	

		$f=sprintf("%s/%s_%s.json",$FPATH,$J===0?"dg":"bs",date("Y-m-d",strtotime(sprintf('+ %s day',$I))));
		$v=get_contents($f);
		$v=json_decode($v,TRUE);
		$program=$v["programs"];
		
		for($i=0;$i<count($program);$i++){

			unset($s);
			if($program[$i]["title"][0]["string"]=="休止"||$program[$i]["title"][0]["string"]=="インフォメーション")continue;
			if(in_array($program[$i]["pid"],$ex)){
				var_dump($program[$i]);
				continue;
			}

			$s["t16"]=$program[$i]["dt"];
			$s["t7"]=sprintf("%s-%s",$program[$i]["pid"],$program[$i]["eid"]);
			$s["t9"]=sprintf("http://api-stg.bangumi.org/event?siType=%s&networkId=%s&serviceId=%s&eventId=%s&eventDate=%s&token=8fe4514acf2e725af6117a675ea55239debb26f1",$J==0?3:1,$program[$i]["nid"],$program[$i]["sid"],$program[$i]["eid"],$program[$i]["edt"]);
			$s["u_time"]=date("Y-m-d H:i:s",strtotime($program[$i]["udt"]));
			$s["m_time"]=date("Y-m-d H:i:s",strtotime($program[$i]["s"]));
			$s["a_time"]=date("Y-m-d H:i:s",strtotime($program[$i]["e"]));
			splittime(date("Y-m-d H:i:s",strtotime($program[$i]["s"])),date("Y-m-d H:i:s",strtotime($program[$i]["udt"])));
			get_genres($program[$i]["genres"],$program[$i]["ch"]);
			$tv[]=$s;
		}
	}
}

unset($s);

for($i=0;$i<count($tv);$i++){
	
	unset($sqla);
	$s=$tv[$i];
	
	if(strtotime("now")>strtotime($s["a_time"]))continue;
	
	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$s["t7"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$ID=$f["id"];
	
	$importflag=0;
	if(strlen($f["id"])>0){
		if(strtotime($f["u_time"])<strtotime($s["u_time"])){
			$importflag=1;
		}
	}else{
		$importflag=1;
	}
	
	if($importflag===1){
		
		$file=$s["t9"];
		$v=get_contents($file);
		$v=json_decode($v,TRUE);
		
		$s["title"]=$v["title"][0]["string"];
		$body=sprintf("<p><strong>%s</strong> %s～%s</p>",$tv[$i]["t10"],date("Y年n月j日 G時i分",strtotime($v["s"])),date("G時i分",strtotime($v["e"])));
		$body.=sprintf("<p>%s</p>",preg_replace("/\n/i","",nl2br($v["dt"])));
		
		for($j=0;$j<count($v["descriptions"]);$j++){
			if($v["descriptions"][$j]["title"]=="正式タイトル"||$v["descriptions"][$j]["title"]=="番組名"){
				$s["title"]=preg_replace("/\n/i","",$v["descriptions"][$j]["note"]);
			}else{
				if(!preg_match("/番組内容[0-9]+/",$v["descriptions"][$j]["title"])){
					$body.=sprintf("<p><strong>%s</strong><br>%s</p>",$v["descriptions"][$j]["title"],preg_replace("/\n/i","",nl2br($v["descriptions"][$j]["note"])));
				}else{
					$body.=sprintf("<p>%s</p>",preg_replace("/\n/i","",nl2br($v["descriptions"][$j]["note"])));
				}
			}
		}
		
		$body=stripslashes($body);
		
		$img=get_imgurl($v["pictures"]);
		if(strlen($img)>0){
			$s["t30"]=$img;
			$s["img1"]=outimg($s["t30"]);
		}
		
		if(strlen($ID)>0){
			unset($s["m_time"]);
			$sqla[]=makesql($s,$ID);
			$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$body,$ID);
		}else{
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=$CATEGORYID;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";

			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$body);
		}
		
		if($sqla){
			$sqla=implode("\n",$sqla);
			$o->query($sqla);
		}
	}	
}

//未定だった番組が正式に決まった場合に未定登録されていた番組を削除する
unset($s);
$sql="select id,t9 from repo_n where d2=43 and flag=1 and a_time::date>=current_date";
$o->query($sql);
while($f=$o->fetch_array()){
	$file=$f["t9"];
	$v=get_contents($file);
	$v=json_decode($v,TRUE);
	if(count($v)==0){
		$s[]=sprintf("update repo_n set flag=0 where id=%s and flag=1;",$f["id"]);
	}
}
if(count($s)){
	$s=implode("\n",$s);
	$o->query($s);
}

?>