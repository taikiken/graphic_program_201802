<?php

if($_GET["rid"]==2&&$_GET["cid"]){
	$TABLE="u_member";
}elseif($_GET["rid"]==7&&$_GET["cid"]){
	$TABLE="u_headline";
}else{
	$TABLE="repo_n";
}

if($q->get_dir()===0){
	if($q->get_file()===0){

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		
		if(count($sn)>0){
						
			if($g->f("cid")!=1&&$g->f("rid")!=2&&$_POST["POSITION"]!=1){
				$sql="update ".$TABLE." set n=(n+1) where cid=".$g->f("cid");
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sv[$sn[]="n"]=sprintf("(select max(id)+1 as n from %s where cid=%s)",$TABLE,$g->f("cid"));
			}
			
			if(isset($_GET["qid"]))$sv[$sn[]="rid"]=$g->f("qid");
			if(isset($_GET["rid"]))$sv[$sn[]="qid"]=$g->f("rid");
			$sv[$sn[]="cid"]=$g->f("cid");
			$sv[$sn[]="m_time"]="now()";
			$sv[$sn[]="u_time"]="now()";
			
			
			if($MULTILANG==0){
				$sv[$sn[]="flag"]=2;
			}else{
				for($i=0;$i<count($LANG);$i++)$sv[$sn[]="flag".$LANG[$i]]=0;
			}
			
			$o=new dbutl($TABLE,$sn,$sv);
			$e=$o->insert();
			
			/* 運動通信会員カテゴリー */
			if($g->f("rid")==2){
				$id=$e;
				$category=@explode(",",str_replace("'","",$sv["t20"]));			
				if(count($category)>0){
					for($i=0;$i<count($category);$i++){
						$s[]=sprintf("insert into u_category(userId,categoryId,flag,regitime) values(%s,%s,1,now());",$id,$category[$i]);
					}
					$s=implode("\n",$s);
					$o->query($s);
				}
			}
		}
		
	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql=sprintf("select *,(select body from repo_body where pid=%s.id) as body from %s where id=%s",$TABLE,$TABLE,$g->f("nid"));
		$o->query($sql);
		$p=$o->fetch_array();

		if($g->f("cid")==1){
			$sql=sprintf("select title,link,n from u_link where pid=%s order by n",$g->f("nid"));
			$o->query($sql);
			while($f=$o->fetch_array()){
				$p["t".$f["n"]]=$f["link"];
				$p["b".$f["n"]]=$f["title"];
			}
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
		
		$o=new dbutl($TABLE,$sn,$sv);
		$e=$o->update($g->f("nid"));
		
		if($g->f("cid")!=1||$g->f("rid")!=2){
			if(strlen($_POST["POSITION"])>0){
				$sql=sprintf("update %s set n=n-1 where cid=%s and n>(select n from %s where id=%s)",$TABLE,$TABLE,$g->f("cid"),$g->f("nid"));
				$o->query($sql);
				$sql=sprintf("update %s set n=n+1 where cid=%s and n>(select n from %s where id=%s)",$TABLE,$TABLE,$g->f("cid"),$_POST["POSITION"]);
				$o->query($sql);
				$sql=sprintf("update %s set n=(select n+1 from %s where id=%s) where id=%s",$TABLE,$TABLE,$_POST["POSITION"],$g->f("nid"));
				$o->query($sql);
			}
		}
		
		/* 運動通信会員カテゴリー */
		if($g->f("rid")==2){
			
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
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql=sprintf("select *,(select body from repo_body where pid=%s.id) as body from %s where id=%s",$TABLE,$TABLE,$g->f("nid"));
		$o->query($sql);
		$p=$o->fetch_array();
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
}elseif($q->get_dir()===3){
	$gBILL=getBill();
	$FIELD="*";
	$WHERE=" where cid=".$g->f("cid");
}

$EDITDELETEINITIAL="n";

?>