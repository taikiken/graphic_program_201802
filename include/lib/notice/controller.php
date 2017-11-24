<?php

	$TABLE="notices";
	$NUMBERINGOFF=1;

if($q->get_dir()===0){ // 新規
	if($q->get_file()===0){
    include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){
		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

    $sv[$sn[]="created_at"]="now()";
    $o=new dbutl($TABLE,$sn,$sv);
    $e=$o->insert();

	}
}elseif($q->get_dir()===1){ // 編集
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("id"));
		$o->query($sql);
		$p=$o->fetch_array();
		include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){
		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		data_sql();

    $sv[$sn[]="id"]=$g->f("id");
		$o=new dbutl($TABLE,$sn,$sv);
		$e=$o->update($g->f("id"));

	}
}elseif($q->get_dir()===2){ // 削除
	if($q->get_file()===0){

		$sql=sprintf("select * from %s where id=%s",$TABLE,$g->f("id"));
		$o->query($sql);
    $p=$o->fetch_array();
    include $INCLUDEPATH."formback.php";

	}elseif($q->get_file()===1){
		data_conf();

	}elseif($q->get_file()===2){

		include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php";
		$o=new dbutl($TABLE);
		$e=$o->remove($g->f("id"));

	}
}elseif($q->get_dir()===3){ // 一覧画面
  $FIELD="*";
}
