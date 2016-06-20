<?php

$TABLE="repo_e";

include "contentsEditorTemplate.php";

if($q->get_dir()===0){
	if($q->get_file()===0){

		include "formback.php";
		$TYPES=(isset($_GET["types"]))?$_GET["types"]:$p["types"];
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include "lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		
		if(count($sn)>0){
			
			if($_POST["POSITION"]!=1){
				$sql=sprintf("update %s set n=(n+1) where nid=%s",$TABLE,$g->f("nid"));
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql=sprintf("select count(*)+1 as n from %s where nid=%s",$TABLE,$g->f("nid"));
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
			
			$sv[$sn[]="u_time"]='now()';
			$sv[$sn[]="m_time"]='now()';
			
			$sv[$sn[]="nid"]=$g->f("nid");
			$sv[$sn[]="flag"]=1;
			
			$o=new dbutl($TABLE,$sn,$sv);
			$e=$o->insert();

			if($e){
				$sql=sprintf("update repo_n set bodyflag=170 where id=%s and bodyflag!=170;\n",$g->f("nid"));
				$sql.=sprintf("insert into repo_body select currval('repo_body_id_seq'),%s,null where not exists select * from repo_e where pid=%s;",$g->f("nid"),$g->f("nid"));
				$o->query($sql);
				make_contents($g->f("nid"),1);
			}
			
		}
		

	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("eid"));
		$o->query($sql);
		$p=$o->fetch_array();
		
		include "formback.php";
		
		$TYPES=(isset($_GET["types"]))?$_GET["types"]:$p["types"];
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include "lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		
		$sv[$sn[]="u_time"]='now()';
		
		$o=new dbutl($TABLE,$sn,$sv);
		$e=$o->update($g->f("eid"));
		
		if(strlen($_POST["POSITION"])>0){
			
			$sql=sprintf("update %s set n=n-1 where nid=%s and n>(select n from %s where id=%s)",$TABLE,$g->f("nid"),$TABLE,$g->f("eid"));
			$o->query($sql);
			$sql=sprintf("update %s set n=n+1 where nid=%s and n>(select n from %s where id=%s)",$TABLE,$g->f("nid"),$TABLE,$_POST["POSITION"]);
			$o->query($sql);
			$sql=sprintf("update %s set n=(select n+1 from %s where id=%s) where id=%s",$TABLE,$TABLE,$_POST["POSITION"],$g->f("eid"));
			$o->query($sql);
		}
		if($e){
			$s=make_contents($g->f("nid"),1);
		}
		
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql=sprintf("select * from repo_e where id=%s",$g->f("eid"));
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include "lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql=sprintf("select n from %s where id=%s",$TABLE,$g->f("eid"));
		$o->query($sql);
		$n=$o->fetch_array();
		
		$sql=sprintf("update %s set n=n-1 where n>=%s and nid=%s",$TABLE,$n["n"],$g->f("nid"));
		$o->query($sql);
		$o=new dbutl($TABLE);
		$e=$o->remove($g->f("eid"));

		if($e){
			$s=make_contents($g->f("nid"),1);
		}

	}

}elseif($q->get_dir()===3){

	if(isset($_GET["template"])){
		include "copy_blocktemplate.php";
	}

	$FIELD="*";
	$WHERE=" where nid=".$g->f("nid");

}

$EDITDELETEINITIAL="e";

?>