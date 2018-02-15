<?php

$TABLE="u_headline";


if($q->get_dir()===0){ // 新規
	if($q->get_file()===0){

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

		data_sql();


		if(count($sn)>0){

			if ($TABLE != "tbl_player")
			{
				// 選手の登録ではない場合
				if(isset($_GET["qid"]))$sv[$sn[]="rid"]=$g->f("qid");
				if(isset($_GET["rid"]))$sv[$sn[]="qid"]=$g->f("rid");
				$sv[$sn[]="cid"]=$g->f("cid");
			}

			$sv[$sn[]="u_time"]="now()";

			if($MULTILANG==0){
				$sv[$sn[]="flag"]=0;
			}else{
				for($i=0;$i<count($LANG);$i++)$sv[$sn[]="flag".$LANG[$i]]=0;
			}

			$o=new dbutl($TABLE,$sn,$sv);
			$e=$o->insert();

			/* 運動通信会員カテゴリー */
			if($TABLE=="u_member"){
				$id=$e;
				$category=@explode(",",str_replace("'","",$sv["t20"]));
				if(count($category)>0){
					for($i=0;$i<count($category);$i++){
						$s[]=sprintf("insert into u_category(userId,categoryId,flag,regitime) values(%s,%s,1,now());",$id,$category[$i]);
					}
					$s=implode("\n",$s);
					$o->query($s);
				}
			}elseif($TABLE=="u_categories"){
				$sql=sprintf("insert into u_latestpost(m1,pageid) select currval('%s_id_seq'),0;",$TABLE);
				$o->query($sql);
			}
		}

	}
}elseif($q->get_dir()===1){  // 編集
	if($q->get_file()===0){

		if ($g->f("rid") == 95) { // 注目の選手
      $sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("nid"));

    } else {
      $sql=sprintf("select *,(select body from repo_body where pid=%s.id) as body from %s where id=%s",$TABLE,$TABLE,$g->f("nid"));
    }

		$o->query($sql);
		$p=$o->fetch_array();

		//カテゴリー
		if($g->f("cid") == 10){
			//webviewをjson_decode & 整形
			$webview_keys = [
				'webview-pc',
				'webview-sp',
				'webview-ios',
				'webview-android'
			];
			$webview = json_decode($p['webview'], true);
			foreach($webview_keys as $key){
				$json_key = str_replace('webview-', '', $key);
				if($p['webview'] !== null){
					$p[] = empty($webview[$json_key]) ? null : implode(',', $webview[$json_key]);
					$p[$key] = empty($webview[$json_key]) ? null : implode(',', $webview[$json_key]);
				}
			}
		}

		if($TABLE=="repo_n"){
			$sql=sprintf("select title,link,(n+1) as n from u_link where pid=%s order by n",$g->f("nid"));
			$o->query($sql);
			while($f=$o->fetch_array()){
				$p["t".$f["n"]]=$f["link"];
				$p["b".$f["n"]]=$f["title"];
			}
		}elseif($TABLE=="u_media"){
			$sql=sprintf("select * from u_banner where cid=%s and type=1",$g->f("nid"));
			$o->query($sql);
			$f=$o->fetch_array();

			$p["alt"]=$f["alt"];
			$p["pcimg"]=$f["pcimg"];
			$p["pclink"]=$f["pclink"];
			$p["spimg"]=$f["spimg"];
			$p["splink"]=$f["splink"];
		}
		if($_POST["search"]==1){
			data_conf();
			$SEARCH=$sv;
		}

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

		data_sql();

		$sv[$sn[]="u_time"]="now()";

		//カテゴリー データ整形
		if($g->f("cid") == 10){
			//webviewを１つにまとめてjsonencodeする
			$webview_keys = [
				'webview-pc',
				'webview-sp',
				'webview-ios',
				'webview-android'
			];
			$webview = [];
			$sn_temp = $sn;
			foreach($sn_temp as $sn_index => $sn_value){
				if(in_array($sn_value, $webview_keys)){
					//"webview-"を取り除いてセット 値はすでにencodeされているので一度decodeする
					$webview[str_replace('webview-', '', $sn_value)] = json_decode($sv[$sn_value]);
					unset($sn[$sn_index]);
					unset($sv[$sn_value]);
				}
			}
			//連番振り直し
			$sn = array_merge($sn);
			$sv[$sn[]='webview'] = "'".json_encode($webview)."'";
		}

		$o=new dbutl($TABLE,$sn,$sv);
		$e=$o->update($g->f("nid"));

		// 選手情報更新の場合は実施しない
		if ($g->f("cid") != 94)
		{
			create_article_json($g->f("nid"), true);

			if($g->f("cid")!=1||$g->f("cid")!=6){
				if(strlen($_POST["POSITION"])>0){
					$sql=sprintf("update %s set n=n-1 where cid=%s and n>(select n from %s where id=%s)",$TABLE,$TABLE,$g->f("cid"),$g->f("nid"));
					$o->query($sql);
					$sql=sprintf("update %s set n=n+1 where cid=%s and n>(select n from %s where id=%s)",$TABLE,$TABLE,$g->f("cid"),$_POST["POSITION"]);
					$o->query($sql);
					$sql=sprintf("update %s set n=(select n+1 from %s where id=%s) where id=%s",$TABLE,$TABLE,$_POST["POSITION"],$g->f("nid"));
					$o->query($sql);
				}
			}
		}

		/* 運動通信会員カテゴリー */
		if($TABLE=="u_member"){

			$id=$g->f("nid");

			$category=str_replace("'","",$sv["t20"]);
			$sql=sprintf("update u_category set flag=0,regitime=now() where userId=%s and categoryid not in(%s)",$id,$category);
			$o->query($sql);
			$sql=sprintf("update u_category set flag=1,regitime=now() where userId=%s and categoryid in(%s)",$id,$category);
			$o->query($sql);

			$category=@explode(",",$category);
			if(count($category)>0&&$category!=$p){
				for($i=0;$i<count($category);$i++){
					$s[]=sprintf("insert into u_category(userId,categoryId,flag,regitime) select %s,%s,1,now() where not exists (select 1 from u_category where userid=%s and categoryid=%s);",$id,$category[$i],$id,$category[$i]);
				}
				$sql=implode("\n",$s);
				$o->query($sql);
			}
		}

	}
}elseif($q->get_dir()===2){ // 削除
	if($q->get_file()===0){

		$sql=sprintf("select *,(select body from repo_body where pid=%s.id) as body from %s where id=%s",$TABLE,$TABLE,$g->f("nid"));
		$o->query($sql);
		$p=$o->fetch_array();

		if($TABLE=="repo_n"){
			$sql=sprintf("select title,link,n from u_link where pid=%s order by n",$g->f("nid"));
			$o->query($sql);
			while($f=$o->fetch_array()){
				$p["t".$f["n"]]=$f["link"];
				$p["b".$f["n"]]=$f["title"];
			}
		}elseif($TABLE=="u_media"){
			$sql=sprintf("select * from u_banner where cid=%s and type=1",$g->f("nid"));
			$o->query($sql);
			$f=$o->fetch_array();

			$p["alt"]=$f["alt"];
			$p["pcimg"]=$f["pcimg"];
			$p["pclink"]=$f["pclink"];
			$p["spimg"]=$f["spimg"];
			$p["splink"]=$f["splink"];
		}

	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";

		if($g->f("cid")!=1||$g->f("qid")!=2){
			$sql=sprintf("select n from %s where id=%s",$TABLE,$g->f("nid"));
			$o->query($sql);
			$n=$o->fetch_array();
			$sql=sprintf("update %s set n=n-1 where n>=%s and cid=%s",$TABLE,$n["n"],$g->f("cid"));
			$o->query($sql);
		}
		$o=new dbutl($TABLE);
		$e=$o->remove($g->f("nid"));

	}
}elseif($q->get_dir()===4){
	if($q->get_file()===0){
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){
		include $INCLUDEPATH."search.php";
	}
}elseif($q->get_dir()===3){ // 一覧画面
  $o = new dbutl($TABLE);

  $sql = <<<SQL
SELECT ply.*, sort_no
FROM pickup_athletes_big4 big4 INNER JOIN u_headline uh ON big4.category_id = uh.d1
  INNER JOIN tbl_player ply ON big4.player_id = ply.id
WHERE uh.cid = 96 AND uh.qid = {$g->f("rid")}
GROUP BY ply.id, ply.name, ply.name_kana, ply.competition, ply.description, ply.n, ply.flag, ply.img1, ply.link_word,
  ply.category, ply.og_img, ply.seo_description, ply.seo_keyword, ply.m_time, ply.u_time, big4.sort_no
ORDER BY sort_no
SQL;

  $o->query($sql);
  $III=0;

  while($f=$o->fetch_array($III)){
    $p[]=$f;
    $III++;
  }
}

