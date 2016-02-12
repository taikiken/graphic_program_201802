<?php

if(isint($g->f("template"))){
	
	$sql=sprintf("select title from repo_n where id=%s",$g->f("template"));
	$o->query($sql);
	$f=$o->fetch_array();
	$ORGREPONTITLE=$f["title"];
	//echo $COPYREPONTITLE;

	$sql=sprintf("select title from repo_n where id=%s",$g->f("nid"));
	$o->query($sql);
	$f=$o->fetch_array();
	$COPYREPONTITLE=$f["title"];
	//echo $COPYREPONTITLE;
	
	$sql="select max(id) as n from repo_e";
	$o->query($sql);
	$f=$o->fetch_array();
	$STARTN=$f["n"];
	
	$farray=array("types","title","title_e","body","body_e","bodytag","pos","imgopos","img0","alt0","alt0_e","img0copy","pos0","pos1","pos2","pos3","img1","alt1","alt1_e","img1copy","n","flag");
	$sql=sprintf("select %s from repo_e where nid=%s order by n",implode(",",$farray),$g->f("template"));
	$o->query($sql);
	
	while($f=$o->fetch_array()){

		unset($QSTV);
		unset($QSTN);

		for($INC=0;$INC<count($farray);$INC++){
			if(strlen($f[$farray[$INC]])>0)$QSTV[$QSTN[]=$farray[$INC]]="'".mod_HTML($f[$farray[$INC]])."'";
		}
		
		if(strlen($QSTV["img"])>0){
			$OLDIMG=str_replace("'","",$QSTV["img"]);
			$NEWIMG=ereg_replace("'img([0-9]*).([a-z]{3})'","img$STARTN.\\2",$QSTV["img"]);
			$imgr=array($RAWIMG,$IMG[0],$IMG[1],$IMG[2],$IMG[3],$IMG[4],$IMG[5]);
			for($j=0;$j<count($imgr);$j++){
				$imgr[$j]=str_replace("../../../","../../",$imgr[$j]);
				$oldimg=sprintf("%s%s",$imgr[$j],$OLDIMG);
				if(file_exists($oldimg))copy($oldimg,sprintf("%s%s",$imgr[$j],$NEWIMG));
			}
			$QSTV["img"]=sprintf("'%s'",$NEWIMG);
		}
		
		$QSTV[$QSTN[]="id"]=++$STARTN;
		$QSTV[$QSTN[]="nid"]=$g->f("nid");
		$SQLSI[]=sprintf("insert into repo_e(%s) values(%s);",implode(",",$QSTN),implode(",",$QSTV));
		$i++;
	}
	
	$kq=implode("\n",$SQLSI);
	$o->query("begin");
	$e=$o->query($kq);
	$e=$o->affected_rows();
	$o->query(($e)?"abort":"commit");
	
	logIns(sprintf("%sをテンプレートとして%sのページブロックを作成するのに%sしました。",$ORGREPONTITLE,$COPYREPONTITLE,(!$e)?"成功":"失敗"),getSorC("usr"),$e,$kq);
	
	include $INCLUDEPATH."updateFulltext.php";

	header(sprintf("Location:%srepo_e/?%s",$ADPATH,$g->g_url("template")));
}

?>