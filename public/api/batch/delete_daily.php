<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

call_user_func(function(){

	global $o;

	$dailyVal = [
		"http://www2.kobe-np.co.jp/sportsbull/for_sportsbull_del.rss"
	];
	foreach ($dailyVal as $i => $xml)
	{
		$x = simplexml_load_file(
			trim($xml), 'SimpleXMLElement', LIBXML_NOCDATA
		);
		if ($x === false) continue;

		$x->getNamespaces(true);

		foreach($x->channel->item as $t){

			//配列へ変換
			$row = json_decode(json_encode((array) $t), 1);

			$sql=sprintf("select * from repo_n where cid=1 and t9='%s'", $row["guid"]);
			$o->query($sql);

			$f=$o->fetch_array();

			if(strlen($f["id"])>0 && $row["status"] == 0)
			{
				//もしIDが見つかれば掲載停止処理
				$o->query("update repo_n set flag=0 where id='{$f["id"]}';");
			}

		}
	}




});