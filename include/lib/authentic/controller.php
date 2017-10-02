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
				$sql="update authentic set n=(n+1)";
				$o->query($sql);
				$sv[$sn[]="n"]=1;
			}else{
				$sql="select count(*)+1 as n from authentic";
				$o->query($sql);
				$n=$o->fetch_array();
				$sv[$sn[]="n"]=$n["n"];
			}
			
			$sv[$sn[]="flag"]=1;
			$sv[$sn[]="m_time"]="now()";
			$sv[$sn[]="u_time"]="now()";

			$o=new dbutl("authentic",$sn,$sv);
			$e=$o->insert();

		}
	}
}elseif($q->get_dir()===1){
	if($q->get_file()===0){

		$sql="select * from authentic where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();

		if($p['is_external'] === 1) {
		    $p[] = 174;
            $p['external'] = 174;
        }
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();
		
		$sv[$sn[]="u_time"]='now()';
		
		$o=new dbutl("authentic",$sn,$sv);
		$e=$o->update($g->f("id"));
	}
}elseif($q->get_dir()===2){
	if($q->get_file()===0){

		$sql="select * from authentic where id=".$g->f("id");
		$o->query($sql);
		$p=$o->fetch_array();
	}elseif($q->get_file()===1){

		data_conf();
	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		
		$sql="select n from authentic where id=".$g->f("id");
		$o->query($sql);
		$n=$o->fetch_array();
		$sql="update authentic set n=n-1 where n>=".$n["n"];
		$o->query($sql);
		$o=new dbutl("authentic");
		$e=$o->remove($g->f("id"));
		
	}
}elseif($q->get_dir()===3){

	$TABLE="authentic";
	$FIELD="id,usr,m,n,flag";
	$WHERE=" where id!=1";

}

$EDITDELETEINITIAL="";

?>