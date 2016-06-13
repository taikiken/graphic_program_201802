<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$genreid=[129,127];
$genreword[]=array(
	array("ハンドボール","/ハンド/"),
	array("体操","/体操/"),
	array("バドミントン","/バド/"),
	array("自転車","/自転車/"),
	array("ソフトボール","/ソフトボール/"),
	array("馬術","/馬術/"),
	array("競馬","/(競馬|騎手)/"),
	array("フェンシング","/フェンシング/")
);
$genreword[]=array(
	array("アイスホッケー","/ホッケー"),
	array("スキー・ジャンプ","/ジャンプ"),
	array("フィギュアスケート","/フィギュア"),
	array("カーリング","/カーリング"),
	array("スピードスケート","/スケート"),
	array("モーグル","/モーグル"),
	array("大回転","/大回転"),
	array("スノーボード","/スノボ|ボード")
);

function genre_search($r,$genre){
	for($i=0;$i<count($r);$i++){
		for($j=0;$j<count($genre);$j++){
			if(preg_match($genre[$j][1],$r[$i])){
				return $genre[$j][0];
			}
		}
	}
	return;
}
function add_search($f){
	for($i=0;$i<count($f);$i++){
		if(strlen($f[$i])==0)return $i;
	}
}

for($i=0;$i<count($genreid);$i++){

	$sql=sprintf("select id,title,body,keyword,t1,t10,t11,t12,t13,t14,t15,t16,t17 from repo_n where cid=1 and m1=%s order by id desc",$genreid[$i]);
	$o->query($sql);

	while($f=$o->fetch_array()){

		$body=explode("</p>",str_replace("<p>","",str_replace("<p></p>","",$f["body"])));
		$e=genre_search(array($f["keyword"],$f["title"],$f["t1"],$body[0],$body[1]),$genreword[$i]);
		$n=add_search(array($f["t10"],$f["t11"],$f["t12"],$f["t13"],$f["t14"],$f["t15"],$f["t16"],$f["t17"]));
		if(strlen($e)>0){
			if(!in_array($e,array($f["t10"],$f["t11"],$f["t12"],$f["t13"],$f["t14"],$f["t15"],$f["t16"],$f["t17"]))){
				$s[]=sprintf("update repo_n set t1%s='%s' where id=%s;",$n,$e,$f["id"]);
			}
		}
	}
}

var_dump($s);

//$o->query(implode("\n",$s));

?>