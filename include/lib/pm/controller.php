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
				$sql="update pm set n=(n+1)";
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql="select count(*)+1 as n from pm";
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
			
			$sv[$sn[]="flag"]=1;
			$sv[$sn[]="u_time"]='now()';
			$sv[$sn[]="m_time"]='now()';
			
			$o=new dbutl("pm",$sn,$sv);
			$e=$o->insert();
		}
	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from pm where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
		
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		$sv[$sn[]="u_time"]='now()';
		
		$o=new dbutl("pm",$sn,$sv);
		$e=$o->update($g->f("id"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from pm where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from pm where id=".$g->f("id");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update pm set n=n-1 where n>=".$n["n"];
		$o->query($sql);
		$o=new dbutl("pm");
		$e=$o->remove($g->f("id"));
		
		if(!$e){
			$sql="delete from pm_ where cid=".$g->f("id");
			$o->query($sql);
		}
	}
}elseif($q->get_dir()===3){

	$FIELD="*";

}

$EDITDELETEINITIAL="";

?>