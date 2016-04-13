<?php

if($q->get_dir()===0){
	if($q->get_file()===0){

		include $INCLUDEPATH."formback.php";
		$C=(!isset($_GET["c"]))?"textfield":$g->f("c");
	}elseif($q->get_file()===1){

		data_conf();
		$C=$sv["p_f_type"];
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

		if(count($sn)>0){
			if($_POST["POSITION"]!=1){
				$sql="update editor set n=(n+1) where cid=".$g->f("cid")." and directory='".$g->f("directory")."'";
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql="select count(*)+1 as n from editor where cid=".$g->f("cid")." and directory='".$g->f("directory")."'";
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
	
			$sv[$sn[]="u_time"]='now()';
			$sv[$sn[]="m_time"]='now()';
			$sv[$sn[]="flag"]=1;
			$sv[$sn[]="directory"]=sprintf("'%s'",$g->f("directory"));
			$sv[$sn[]="cid"]=$g->f("cid");
			
			$o=new dbutl("editor",$sn,$sv);
			$e=$o->insert();
		}
	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from editor where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
		
		include $INCLUDEPATH."formback.php";
		$C=(isset($_GET["c"]))?$g->f("c"):$p["f_type"];

	}elseif($q->get_file()===1){
		
		data_conf();
		$C=$sv["p_f_type"];
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

		$sv[$sn[]="u_time"]='now()';
		
		$o=new dbutl("editor",$sn,$sv);
		$e=$o->update($g->f("id"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from editor where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
		
		$C=$p["f_type"];
	}elseif($q->get_file()===1){

		data_conf();
		$C=$_POST["f_type"];
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from editor where id=".$g->f("id");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update editor set n=n-1 where cid=".$g->f("cid")." and  n>=".$n["n"]." and directory='".$g->f("directory")."'";
		$o->query($sql);
		$o=new dbutl("editor");
		$e=$o->remove($g->f("id"));
	}
}elseif($q->get_dir()===3){

	$TABLE="editor";
	$FIELD="id,flag,n,d_name,f_name";
	$WHERE=" where cid=".$g->f("cid");
	$WHERE.=" and directory='".$g->f("directory")."'";

}

$EDITDELETEINITIAL="";

?>