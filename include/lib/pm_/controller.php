<?php

if($_GET["cid"]==20){
	$TABLE="u_categories";
}else{
	$TABLE="pm_";	
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
			if($_POST["POSITION"]==0){
				$sql=sprintf("update %s set n=(n+1) where cid=%s",$TABLE,$g->f("cid"));
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql=sprintf("select count(*)+1 as n from %s where cid=%s",$TABLE,$g->f("cid"));
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
			
			$sv[$sn[]="cid"]=$g->f("cid");
			$sv[$sn[]="flag"]=1;
			$sv[$sn[]="m_time"]='now()';
			$sv[$sn[]="u_time"]='now()';

			$o=new dbutl($TABLE,$sn,$sv);
			$e=$o->insert();

			if($g->f("cid")==20){
				$sql=sprintf("insert into u_latestpost(m1,pageid) select currval('%s_id_seq'),0;",$TABLE);
				$o->query($sql);
			}
		}

	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("nid"));
		$o->query($sql);
		$p=$o->fetch_array();
		
		include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){

		data_conf();

	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		$sv[$sn[]="u_time"]="now()";
		
		$o=new dbutl($TABLE,$sn,$sv);
		$e=$o->update($g->f("nid"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("nid"));
		$o->query($sql);
		$p=$o->fetch_array();

	}elseif($q->get_file()===1){

		data_conf();

	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql=sprintf("select n from %s where id=%s",$TABLE,$g->f("nid"));
		$o->query($sql);
		$n=$o->fetch_array();
		$sql=sprintf("update %s set n=n-1 where n>=%s and cid=",$TABLE,$n["n"],$g->f("cid"));
		$o->query($sql);
		$o=new dbutl($TABLE);
		$e=$o->remove($g->f("nid"));
		
	}
}elseif($q->get_dir()===5){
	if($q->get_file()===0){
		
		include $INCLUDEPATH."formback.php";

	}else{

		$sql=sprintf("select max(n) as n from %s where cid=%s",$TABLE,$g->f("cid"));
		$o->query($sql);
		$f=$o->fetch_array(0);
		$T=($f["n"])?$f["n"]+1:1;

		$INSERTID=QJ_insert_id($TABLE);

		$p=mod_HTML($_POST["p_text"]);
		$p=stripslashes($p);
		$p=trim($p);
		$p=str_replace("\r\n","\n",$p);
		$p=str_replace("\r","\n",$p);
		$p=split("\n",$p);

		for($i=0;$i<count($p);$i++){
			$s[]=sprintf("insert into %s(id,cid,name,n,flag,u_time,m_time) values(%s,%s,'%s',%s,1,now(),now());",$TABLE,$INSERTID++,$g->f("cid"),addslashes($p[$i]),$T++);
		}
		$sqls=implode("\n",$s);
		$o->query($sqls);

		header(sprintf("Location:../index.php?cid=%s",$g->f("cid")));
	}
}elseif($q->get_dir()===3){

	$FIELD="*";
	$WHERE=" where cid=".$g->f("cid");

}

$EDITDELETEINITIAL="n";

?>