<?php

if($q->get_dir()===0){
	if($q->get_file()===0){

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		
		if(count($sn)>0){
			
			if($_POST["POSITION"]!=1){
				$sql="update repo_n set n=(n+1) where cid=".$g->f("cid");
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql="select count(*)+1 as n from repo_n where cid=".$g->f("cid");
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
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
			
			$o=new dbutl("repo_n",$sn,$sv);
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

		$sql="select * from repo_n where id=".$g->f("nid");
		$o->query($sql);
		$p=$o->fetch_array();
		
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
		
		$o=new dbutl("repo_n",$sn,$sv);
		$e=$o->update($g->f("nid"));

		if(strlen($_POST["POSITION"])>0){
			$sql=sprintf("update repo_n set n=n-1 where cid=%s and n>(select n from repo_n where id=%s)",$g->f("cid"),$g->f("nid"));
			$o->query($sql);
			$sql=sprintf("update repo_n set n=n+1 where cid=%s and n>(select n from repo_n where id=%s)",$g->f("cid"),$_POST["POSITION"]);
			$o->query($sql);
			$sql=sprintf("update repo_n set n=(select n+1 from repo_n where id=%s) where id=%s",$_POST["POSITION"],$g->f("nid"));
			$o->query($sql);
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

		$sql="select * from repo_n where id=".$g->f("nid");
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from repo_n where id=".$g->f("nid");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update repo_n set n=n-1 where n>=".$n["n"]." and cid=".$g->f("cid");
		$o->query($sql);
		$o=new dbutl("repo_n");
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