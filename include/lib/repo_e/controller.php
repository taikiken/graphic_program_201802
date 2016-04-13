<?php

include $INCLUDEPATH."contentsEditorTemplate.php";

if($q->get_dir()===0){
	if($q->get_file()===0){

		include $INCLUDEPATH."formback.php";
		$TYPES=(isset($_GET["types"]))?$_GET["types"]:$p["types"];
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		if(count($sn)>0){
			if($_POST["POSITION"]!=1){
				$sql="update repo_e set n=(n+1) where nid=".$g->f("nid");
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql="select count(*)+1 as n from repo_e where nid=".$g->f("nid");
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
			
			$sv[$sn[]="u_time"]='now()';
			$sv[$sn[]="m_time"]='now()';
			
			$sv[$sn[]="nid"]=$g->f("nid");
			$sv[$sn[]="flag"]=2;
			
	
			
			$o=new dbutl("repo_e",$sn,$sv);
			$e=$o->insert();
		}

	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from repo_e where id=".$g->f("eid");
		$o->query($sql);
		$p=$o->fetch_array();
		
		include $INCLUDEPATH."formback.php";
		
		$TYPES=(isset($_GET["types"]))?$_GET["types"]:$p["types"];
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		$sv[$sn[]="u_time"]='now()';
		
		$o=new dbutl("repo_e",$sn,$sv);
		$e=$o->update($g->f("eid"));
		
		if(strlen($_POST["POSITION"])>0){
			
			$sql=sprintf("update repo_e set n=n-1 where nid=%s and n>(select n from repo_e where id=%s)",$g->f("nid"),$g->f("eid"));
			$o->query($sql);
			$sql=sprintf("update repo_e set n=n+1 where nid=%s and n>(select n from repo_e where id=%s)",$g->f("nid"),$_POST["POSITION"]);
			$o->query($sql);
			$sql=sprintf("update repo_e set n=(select n+1 from repo_e where id=%s) where id=%s",$_POST["POSITION"],$g->f("eid"));
			$o->query($sql);
		}
		
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from repo_e where id=".$g->f("eid");
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from repo_e where id=".$g->f("eid");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update repo_e set n=n-1 where n>=".$n["n"]." and nid=".$g->f("nid");
		$o->query($sql);
		$o=new dbutl("repo_e");
		$e=$o->remove($g->f("eid"));
	}

}elseif($q->get_dir()===3){

	if(isset($_GET["template"])){
		include $INCLUDEPATH."copy_blocktemplate.php";
	}

	$FIELD="*";
	$WHERE=" where nid=".$g->f("nid");

}

$EDITDELETEINITIAL="e";

?>