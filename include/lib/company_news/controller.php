<?php

	$TABLE="company_news";
	$NUMBERINGOFF=1;

if($q->get_dir()===0){
//	if($q->get_file()===0){
//
//		include $INCLUDEPATH."formback.php";
//	}elseif($q->get_file()===1){
//
//		data_conf();
//	}elseif($q->get_file()===2){
//
//		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
//
//		data_sql();
//
//		if(count($sn)>0){
//
//			if($TABLE!="repo_n"&&$TABLE!="u_member"&&$_POST["POSITION"]!=1){
//				$sql="update ".$TABLE." set n=(n+1) where cid=".$g->f("cid");
//				$o->query($sql);
//				$sv[$sn[]="n"]=1;
//			}else{
//				$sv[$sn[]="n"]=sprintf("(select max(n)+1 as n from %s where cid=%s)",$TABLE,$g->f("cid"));
//			}
//
//			if(isset($_GET["qid"]))$sv[$sn[]="rid"]=$g->f("qid");
//			if(isset($_GET["rid"]))$sv[$sn[]="qid"]=$g->f("rid");
//			$sv[$sn[]="cid"]=$g->f("cid");
//
//			if($TABLE=="repo_n"){
//				if(!preg_match("/[0-9]{4}[0-9]{2}[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/",$sv["m_time"]))$sv["m_time"]="now()";
//			}else{
//				$sv[$sn[]="m_time"]="now()";
//			}
//			$sv[$sn[]="u_time"]="now()";
//
//			if($MULTILANG==0){
//				$sv[$sn[]="flag"]=0;
//			}else{
//				for($i=0;$i<count($LANG);$i++)$sv[$sn[]="flag".$LANG[$i]]=0;
//			}
//
//			$o=new dbutl($TABLE,$sn,$sv);
//			$e=$o->insert();
//
//			/* 運動通信会員カテゴリー */
//			if($TABLE=="u_member"){
//				$id=$e;
//				$category=@explode(",",str_replace("'","",$sv["t20"]));
//				if(count($category)>0){
//					for($i=0;$i<count($category);$i++){
//						$s[]=sprintf("insert into u_category(userId,categoryId,flag,regitime) values(%s,%s,1,now());",$id,$category[$i]);
//					}
//					$s=implode("\n",$s);
//					$o->query($s);
//				}
//			}elseif($TABLE=="u_categories"){
//				$sql=sprintf("insert into u_latestpost(m1,pageid) select currval('%s_id_seq'),0;",$TABLE);
//				$o->query($sql);
//			}
//		}
//
//	}
}elseif($q->get_dir()===1){
//	if($q->get_file()===0){
//
//		$sql=sprintf("select *,(select body from repo_body where pid=%s.id) as body from %s where id=%s",$TABLE,$TABLE,$g->f("nid"));
//
//		$o->query($sql);
//		$p=$o->fetch_array();
//
//		if($TABLE=="repo_n"){
//			$sql=sprintf("select title,link,(n+1) as n from u_link where pid=%s order by n",$g->f("nid"));
//			$o->query($sql);
//			while($f=$o->fetch_array()){
//				$p["t".$f["n"]]=$f["link"];
//				$p["b".$f["n"]]=$f["title"];
//			}
//		}elseif($TABLE=="u_media"){
//			$sql=sprintf("select * from u_banner where cid=%s and type=1",$g->f("nid"));
//			$o->query($sql);
//			$f=$o->fetch_array();
//
//			$p["alt"]=$f["alt"];
//			$p["pcimg"]=$f["pcimg"];
//			$p["pclink"]=$f["pclink"];
//			$p["spimg"]=$f["spimg"];
//			$p["splink"]=$f["splink"];
//		}
//		if($_POST["search"]==1){
//			data_conf();
//			$SEARCH=$sv;
//		}
//
//		include $INCLUDEPATH."formback.php";
//	}elseif($q->get_file()===1){
//
//		data_conf();
//	}elseif($q->get_file()===2){
//
//		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
//
//		data_sql();
//
//		$sv[$sn[]="u_time"]="now()";
//
//		$o=new dbutl($TABLE,$sn,$sv);
//		$e=$o->update($g->f("nid"));
//		create_article_json($g->f("nid"), true);
//
//		if($g->f("cid")!=1||$g->f("cid")!=6){
//			if(strlen($_POST["POSITION"])>0){
//				$sql=sprintf("update %s set n=n-1 where cid=%s and n>(select n from %s where id=%s)",$TABLE,$TABLE,$g->f("cid"),$g->f("nid"));
//				$o->query($sql);
//				$sql=sprintf("update %s set n=n+1 where cid=%s and n>(select n from %s where id=%s)",$TABLE,$TABLE,$g->f("cid"),$_POST["POSITION"]);
//				$o->query($sql);
//				$sql=sprintf("update %s set n=(select n+1 from %s where id=%s) where id=%s",$TABLE,$TABLE,$_POST["POSITION"],$g->f("nid"));
//				$o->query($sql);
//			}
//		}
//
//	}
}elseif($q->get_dir()===2){
//	if($q->get_file()===0){
//
//		$sql=sprintf("select *,(select body from repo_body where pid=%s.id) as body from %s where id=%s",$TABLE,$TABLE,$g->f("nid"));
//		$o->query($sql);
//		$p=$o->fetch_array();
//
//		if($TABLE=="repo_n"){
//			$sql=sprintf("select title,link,n from u_link where pid=%s order by n",$g->f("nid"));
//			$o->query($sql);
//			while($f=$o->fetch_array()){
//				$p["t".$f["n"]]=$f["link"];
//				$p["b".$f["n"]]=$f["title"];
//			}
//		}elseif($TABLE=="u_media"){
//			$sql=sprintf("select * from u_banner where cid=%s and type=1",$g->f("nid"));
//			$o->query($sql);
//			$f=$o->fetch_array();
//
//			$p["alt"]=$f["alt"];
//			$p["pcimg"]=$f["pcimg"];
//			$p["pclink"]=$f["pclink"];
//			$p["spimg"]=$f["spimg"];
//			$p["splink"]=$f["splink"];
//		}
//
//	}elseif($q->get_file()===1){
//
//		data_conf();
//	}elseif($q->get_file()===2){
//
//		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
//
//		if($g->f("cid")!=1||$g->f("qid")!=2){
//			$sql=sprintf("select n from %s where id=%s",$TABLE,$g->f("nid"));
//			$o->query($sql);
//			$n=$o->fetch_array();
//			$sql=sprintf("update %s set n=n-1 where n>=%s and cid=%s",$TABLE,$n["n"],$g->f("cid"));
//			$o->query($sql);
//		}
//		$o=new dbutl($TABLE);
//		$e=$o->remove($g->f("nid"));
//
//	}
}elseif($q->get_dir()===4){
//	if($q->get_file()===0){
//		include $INCLUDEPATH."formback.php";
//	}elseif($q->get_file()===1){
//		include $INCLUDEPATH."search.php";
//	}
}elseif($q->get_dir()===3){
  $TABLE="company_news";
  $FIELD="*";
}

$EDITDELETEINITIAL="";

?>