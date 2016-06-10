<?php

if($q->get_dir()===0){
	if($q->get_file()===0){

		include "formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include "lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		if(count($sn)>0){
			if($_POST["POSITION"]==0){
				$sql="update tool set n=(n+1) where cid=".$g->f("cid");
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql="select max(n)+1 as n from tool where cid=".$g->f("cid");
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
			
			$sv[$sn[]="cid"]=$g->f("cid");
			$sv[$sn[]="flag"]=1;
			$sv[$sn[]="m_time"]='now()';
			$sv[$sn[]="u_time"]='now()';
						
			$o=new dbutl("tool",$sn,$sv);
			$e=$o->insert();
		}

	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from tool where id=".$g->f("nid");
		$o->query($sql);
		$p=$o->fetch_array();
		
		include "formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include "lib/".$CURRENTDIRECTORY."/ex.php";
		
		data_sql();
		$sv[$sn[]="u_time"]="now()";
		
		$o=new dbutl("tool",$sn,$sv);
		$e=$o->update($g->f("nid"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from tool where id=".$g->f("nid");
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include "lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from tool where id=".$g->f("nid");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update tool set n=n-1 where n>=".$n["n"]." and cid=".$g->f("cid");
		$o->query($sql);
		$o=new dbutl("tool");
		$e=$o->remove($g->f("nid"));
		
	}
}elseif($q->get_dir()===3){

	$FIELD="*";
	$WHERE=" where cid=".$g->f("cid");

}

$EDITDELETEINITIAL="n";

?>