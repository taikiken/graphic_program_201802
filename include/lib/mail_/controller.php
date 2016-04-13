<?php

if($q->get_dir()===0){
	if($q->get_file()===0){
		
		if(isset($_GET["c"])){
			$p["lib"]=$g->f("c");
			$c=$g->f("c");
		}
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){
		
		$c=$g->f("c");
		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		if($_POST["POSITION"]==0){
			$sql="update mail_ set n=(n+1) where cid=".$g->f("cid");
			$o->query($sql);
			$sv[$sn[]="n"]=1;
		}else{
			$sql="select count(*)+1 as n from mail_ where cid=".$g->f("cid");
			$o->query($sql);
			$n=$o->fetch_array();
			$sv[$sn[]="n"]=$n["n"];
		}
		
		$sv[$sn[]="flag"]=2;
		$sv[$sn[]="cid"]=$g->f("cid");
		$sv[$sn[]="m_time"]="now()";
		$sv[$sn[]="u_time"]="now()";
		
		$o=new dbutl("mail_",$sn,$sv);
		$e=$o->insert();
	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from mail_ where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();

		include $INCLUDEPATH."formback.php";
		if(isset($_GET["c"])){
			$c=$g->f("c");
			$p["lib"]=$g->f("c");
		}else{
			$c=$p["lib"];
		}
	}elseif($q->get_file()===1){
		
		data_conf();
		$c=$sv["p_lib"];
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		$sv[$sn[]="u_time"]="now()";
		
		$o=new dbutl("mail_",$sn,$sv);
		$e=$o->update($g->f("id"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from mail_ where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
		$c=$p["lib"];

	}elseif($q->get_file()===1){
		$c=$_POST["lib"];
		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from mail_ where id=".$g->f("id");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update mail_ set n=n-1 where n>=".$n["n"]." and cid=".$g->f("cid");
		$o->query($sql);
		$o=new dbutl("mail_");
		$e=$o->remove($g->f("id"));
	}
}elseif($q->get_dir()===3){

	$FIELD="id,fname,lib,fvalue,flag,n";
	$WHERE=" where cid=".$g->f("cid");

}

$EDITDELETEINITIAL="";

?>