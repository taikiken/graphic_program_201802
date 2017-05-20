<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=47;

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




function get_index()
{
	$dailyKey = [
		113, 113, 113, 113, 114, 129, 116, 129, 129, 129
	];
	$dailyVal = [
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_bas.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_tig.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_car.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_mlb.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_soc.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_gen.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_gol.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_rin.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_rac.rss",
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_oly.rss"
	];
	$u = [];

	foreach ($dailyVal as $i => $xml){
		$x=simplexml_load_file(trim($xml), 'SimpleXMLElement', LIBXML_NOCDATA);

		if ($x === false) continue;

		$nameSpaces=$x->getNamespaces(true);
		$item=$x->channel->item;

		foreach($x->channel->item as $t){

			$row = json_decode(json_encode((array) $t), 1);
			$row["rssCategory"] = $dailyKey[$i];

			$u[] = $row;
		}
	}
	return $u;
}

$data=get_index();

for($i=0;$i<count($data);$i++){

	unset($s);
	unset($k);

	$s["title"]=$data[$i]["title"];
	$s["t9"]=$data[$i]["link"];
	$s["t7"]=$data[$i]["guid"];

	if(strlen($data[$i]["title"])>0)$k[]=$data[$i]["title"];
	$keyword=implode(",",$k);
	$s["keyword"]=$keyword;

	$body=sprintf("<p>%s</p>",count($data[$i]["content"]["p"])>1?implode("</p><p>",$data[$i]["content"]["p"]):$data[$i]["content"]["p"]);



	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["pubDate"]));

	if(strlen($data[$i]["lastUpdate"])>0){
		$s["u_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["lastUpdate"]));
		$s["a_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["lastUpdate"]));
	}else{
		$s["u_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["pubDate"]));
	}

	if(strlen($data[$i]["enclosure"]["@attributes"]["url"]) > 0)
	{
		$s["t30"]=$data[$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data[$i]["title"];
	}

	$body=$data[$i]["description"];
	$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body));

	$s["m1"]=category_mapping($r,array($keyword,$s["title"],$s["t1"],$body[0],$body[1]));

	$tag=categorymatching($exword,$keyword);

	if ($s["m1"] == 129)
	{
		//もし「その他競技」にマッピングされてしまうならば、RSSカテゴリに設定
		$s["m1"] = $data[$i]["rssCategory"];
	}

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

	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t9='%s'",$MEDIAID,$data[$i]["guid"]);
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


			if ($data[$i]["status"] == 0){
				//削除フラグがあればフラグを
				$s["flag"]=0;
			}

			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,$f["id"]);
			$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
		}

	}else{

		if ($data[$i]["status"] == 0){
			continue;
			//削除フラグがあればスキップ
		}


		$s["d1"]=3;
		$s["d2"]=$MEDIAID;
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