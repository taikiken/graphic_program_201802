<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=27;
$MEDIANAME="gorin.jp";
$rssfile="https://www.gorin.jp/staticapi/sportsbull/mrss.xml";

$o=new db;
$o->connect();

/**/
// $sql = "delete from repo_body where pid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from u_link where pid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from u_area where pageid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from repo_e where nid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from repo_n where d2={$MEDIAID};";
// $o->query($sql);

function textset($movieflag,$movieurl,$img,$txt,$caption){
	global $ImgPath,$s;
	if($movieflag=="1"&&strlen($img)>0&&strlen($movieurl)>0){
    $external_link =<<<END_DOC
    <p style="text-align: center; font-weight: bold;">
    <a id="readMore-external" class="post-content-btn-readMore" href="{$movieurl}" onclick="ga('send', 'event', 'external_link', 'click', '{$movieurl}', 0, {nonInteraction: true});">
      続きを読む(外部サイトへ)
    </a>
  </p>
END_DOC;

    $gorin_image =<<<END_DOC
    <p class="powered-by pyeongchang2018-powered-by"><img src="/assets/images/pyeongchang2018/icon-powerdby_gorinjp.png" alt="" style="width:130px;height:23px;"></p>
END_DOC;

		$e=sprintf("<br><div style=\"position:relative;\"><a href=\"%s\" target=\"_blank\"><img src=\"/prg_img/raw/%s\" style=\"width:100%s; height:auto;\"/><i style=\"display:block;position:absolute;top:0; left:0; right:0;bottom:0; z-index:1; width:100%s; height:100%s; background:url(/assets/images/common/thumb-16x9-play.png) center center no-repeat; background-size:cover;\"></i></a></div>{$gorin_image}{$external_link}<div style=\"font-size:12px;padding-top:5px;\"><span>%s</span></div>%s",
		$movieurl, $img,"%","%","%",$caption,$txt);
		$s["imgflag"]=168;
		$s["title"]="【動画】".$s["title"];
	}else{
		$s["imgflag"]=167;
		$e=$txt;
	}
	return pg_escape_string($e);
}

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
  if(empty($modbody)) {
    $modbody = '';
  }

	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}

	$keyword=key_merge($data["channel"]["item"][$i]["keyword"]);
	$s["keyword"]=$keyword;

  $tag=categorymatching($exword,$keyword);
  $s["t10"]='平昌五輪2018ハイライト';
	if(count($tag)>0){
		for($cnt=1;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}

	$sql=sprintf("select * from repo_n where d2=%s and t7='%s';",$MEDIAID,$data["channel"]["item"][$i]["guid"]);

	$o->query($sql);
	$f=$o->fetch_array();

	unset($sqla);

	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if(strtotime($s["a_time"])>strtotime($f["a_time"])){
				if(strlen($s["t30"])>0){
					if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"])){
						unlink(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]));
						$s["img1"]=outimg($s["t30"]);
					}
				}else{
					unlink(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]));
					$s["img1"]="";
					$s["t1"]="";
				}
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);

				$body=textset($data["channel"]["item"][$i]["movieflag"],$data["channel"]["item"][$i]["movie"],strlen($s["img1"])>0?$s["img1"]:$f["img1"],$modbody,$s["t1"]);
				$sqla[]=makesql($s,$f["id"]);

				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$body,$f["id"]);
				$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"],$f["id"]);

				$sqla[]=sprintf("delete from repo_e where nid=%s;",$f["id"]);
				$sqla[]=sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(%s,5,'%s',1,1,now(),now());",$f["id"],$body);

			}

		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$TITLE[]=pg_escape_string($s["title"]);

			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=165;
			$s["m2"]=category_mapping($r,array($keyword,$s["title"],$s["t1"]));
			$s["bodyflag"]=170;

			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);

			$body=textset($data["channel"]["item"][$i]["movieflag"],$data["channel"]["item"][$i]["movie"],$s["img1"],$modbody,$s["t1"]);
			$sqla[]=makesql($s,0);

			//var_dump(array($s,$body));
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$body);
			$sqla[]=sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(currval('repo_n_id_seq'),5,'%s',1,1,now(),now());",$body);
			$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"]);

			//var_dump($sqla);

		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}

}

include $INCLUDEPATH."public/display.php";

?>