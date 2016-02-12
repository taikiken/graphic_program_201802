<?php

include $INCLUDEPATH."local.php";

$S=$_POST["s"];
$T=$_POST["t"];
$TITLEFIELDNAME=$_POST["fieldname"];
$TABLE=$_POST["table"];
if($TABLE=="repo_edit")$TABLE="editor";
else if($TABLE=="repo_s")$TABLE="repo";
$WHERE=$_POST["where"];

$sql=sprintf("select id,%s from %s%sn in(%s,%s) order by n",$TITLEFIELDNAME,$TABLE,(strlen($WHERE)>0)?$WHERE." and ":" where ",$S,($T==0)?$S+1:$S-1);
$o->query($sql);
while($f=$o->fetch_array()){
	$IDSN[]=$f;
}
if($T==1){
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S-1),$IDSN[1]["id"]);
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S),$IDSN[0]["id"]);
}else{
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S+1),$IDSN[0]["id"]);
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S),$IDSN[1]["id"]);
}
$sqls=implode("\n",$sqls);
$o->query($sqls);

$e=$o->affected_rows2();
echo $e;

/*
$III=0;
include $INCLUDEPATH."__debug_title.php";
$sql=sprintf("select id,%s from %s%sn in(%s,%s) order by n",$TITLEFIELDNAME,$TABLE,(strlen($WHERE)>0)?$WHERE." and ":" where ",$S,($T==0)?$S+1:$S-1);

echo $sql;

$o->query($sql);
while($f=$o->fetch_array($III)){
	$IDSN[]=$f;
	if($T==0){
		if($III==0){
			$RIREKITITLE=$f[$TITLEFIELDNAME];
			$RIREKITITLEID=$f["id"];
		}
	}else{
		if($III==1){
			$RIREKITITLE=$f[$TITLEFIELDNAME];
			$RIREKITITLEID=$f["id"];
		}
	}
	$III++;
}
if($T==1){
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S-1),$IDSN[1]["id"]);
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S),$IDSN[0]["id"]);
}else{
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S+1),$IDSN[0]["id"]);
	$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S),$IDSN[1]["id"]);
}

$sqls=implode("\n",$sqls);
@$o->query($sqls);

$e=$o->affected_rows();

if($CURRENTDIRECTORY=="repo_e"&&strlen($RIREKITITLE)==0){
	$sql=sprintf("select body from repo_e where id=%s",$RIREKITITLEID);
	$o->query($sql);
	$f=$o->fetch_array();
	if(strlen($f["body"])>0){
		$RIREKITITLE=mb_substr($f["body"],0,25);
	}
}
logIns(sprintf("%s %s [ID : %s ] %s を一つ%s(%s番)に並べ替えました。",$PARENT,$THIS,$RIREKITITLEID,$RIREKITITLE,($T==1)?"上":"下",($T==1)?($S-1):($S+1)),getSorC("usr"),$e,$sqls);

echo $o->affected_rows2();
*/

?>