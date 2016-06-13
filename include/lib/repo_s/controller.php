<?php

if($q->get_dir()===0){
	if($q->get_file()===0){

		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		$sql="select c_edit from repo where id=".$g->f("rid");
		$o->query($sql);
		$f=$o->fetch_array();
		$CEDIT=$f["c_edit"];
		
		if($_POST["POSITION"]==0){
			$sql="update repo set n=(n+1) where rid=".$g->f("rid");
			$o->query($sql);
			$sv[$sn[]="n"]=1;
		}else{
			$sql="select count(*)+1 as n from repo where rid=".$g->f("rid");
			$o->query($sql);
			$n=$o->fetch_array();
			$sv[$sn[]="n"]=$n["n"];
		}
		
		if(!isset($sv["c_flag"])){
			$sql=sprintf("select c_flag from repo where pid=0 and rid=%s and n=1",$g->f("rid"));
			$o->query($sql);
			$f=$o->fetch_array();
			if($f["c_flag"]){
				$sv[$sn[]="c_flag"]=1;
			}else{
				$sv[$sn[]="c_flag"]=0;
			}
		}
		
		$sv[$sn[]="rid"]=$g->f("rid");
		$sv[$sn[]="pid"]=(isset($_GET["cid"]))?$g->f("cid"):0;
		$sv[$sn[]="flag"]=2;
		$sv[$sn[]="c_edit"]=$CEDIT;
		$sv[$sn[]="m_time"]="now()";
		$sv[$sn[]="u_time"]="now()";
		
		$o=new dbutl("repo",$sn,$sv);
		$e=$o->insert();
	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from repo where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
		
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		$sv[$sn[]="u_time"]="now()";
		
		$o=new dbutl("repo",$sn,$sv);
		$e=$o->update($g->f("id"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from repo where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		$sql="select n from repo where id=".$g->f("id");
		$o->query($sql);
		$n=$o->fetch_array();
		
		$sql="update repo set n=n-1 where n>=".$n["n"]." and rid=".$g->f("rid");
		$o->query($sql);
		$o=new dbutl("repo");
		
		$e=$o->remove($g->f("id"));
	}

}elseif($q->get_dir()===3){

	$CT=(isset($_GET["SUB"]))?$g->c(1):$g->c();
	if(isset($_GET["no"]))$CT--;
	
	if($CT==1){
		$SC=1;
		$PARAM["rid"]=$g->f("rid");
	}elseif($CT==2){
		$SC=2;
		$PARAM["rid"]=$g->f("rid");
		$PARAM["cid"]=$g->f("cid");
	}
	
	$TABLE="repo";
	$FIELD="*";
	$WHERE=" where rid=".$PARAM["rid"];

}

$EDITDELETEINITIAL="";

?>