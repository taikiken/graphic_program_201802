<?php

if($q->get_file()==2){

	if($CURRENTDIRECTORY!="repo_e"){
		$RIREKITITLE=$_POST["p_".$TITLEFIELDNAME];
	}else{
		$RIREKITITLE=echoBlockContents($_POST,25,"p_");
	}

	$RIREKITITLE=addslashes($RIREKITITLE);
	$InsertID=($q->get_dir()!=0)?$g->f($EDITDELETEINITIAL."id"):$sv["n"];
	
	if($CURRENTDIRECTORY!="confs"&&$CURRENTDIRECTORY!="css_editor"&&$CURRENTDIRECTORY!="holiday_editor"&&$CURRENTDIRECTORY!="step_editor"&&$CURRENTDIRECTORY!="seminar_editor"){
		logIns($PARENT." ".$THIS." [ID : ".$InsertID." ]".$RIREKITITLE."を".$q->exe_fl()."しました。",getSorC("usr"),$e,$o->outputSQL());
	}else{
		logIns($PARENT." ".$THIS.$RIREKITITLE."を".$q->exe_fl()."しました。",getSorC("usr"),"");
	}

	if($CURRENTDIRECTORY=="mail"&&$q->get_dir()==2){
		$sql=sprintf("delete from mail_ where cid=%s",$g->f("id"));
		$o->query($sql);
		$e=$o->affected_rows();
		logIns($PARENT." ".$THIS." [ID : ".$InsertID." ]".$RIREKITITLE."のブロックを".$q->exe_fl()."しました。",getSorC("usr"),$e,$sql);

	}elseif($CURRENTDIRECTORY=="mailtemplate"&&$q->get_dir()==2){
		$sql=sprintf("delete from mail_template where cid=%s",$g->f("id"));
		$o->query($sql);
		$e=$o->affected_rows();
		logIns($PARENT." ".$THIS." [ID : ".$InsertID." ]".$RIREKITITLE."のブロックを".$q->exe_fl()."しました。",getSorC("usr"),$e,$sql);
	}
	if($CURRENTDIRECTORY=="repo_e")include $INCLUDEPATH."updateFulltext.php";

}elseif($q->get_file()==1&&$q->get_dir()==2){

	if($CURRENTDIRECTORY=="repo_e"){
		if(strlen($_POST["title"])>0){
			printf("<input type=\"hidden\" name=\"p_title\" value=\"%s\" >",mod_HTML($_POST["title"]));
		}elseif(strlen($_POST["body1"])>0){
			printf("<input type=\"hidden\" name=\"p_body1\" value=\"%s\" >",mod_HTML(mb_substr($_POST["body1"],0,25)));
		}elseif(strlen($_POST["body2"])>0){
			printf("<input type=\"hidden\" name=\"p_body2\" value=\"%s\" >",mod_HTML(mb_substr($_POST["body2"],0,25)));
		}
	}else{
		printf("<input type=\"hidden\" name=\"p_%s\" value=\"%s\" >",$TITLEFIELDNAME,$_POST[$TITLEFIELDNAME]);
	}
}

?>