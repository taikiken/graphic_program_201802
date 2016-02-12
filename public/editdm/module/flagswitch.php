<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

if($_POST["table"]=="repo_edit")$_POST["table"]="editor";

$sql=sprintf("update %s set flag%s=%s where id=%s",$_POST["table"],$_POST["lang"],$_POST["flag"],$_POST["id"]);

$o->query($sql);

if(strlen($_POST["lang"])>0&&$_POST["table"]=="repo_n"&&$_POST["flag"]==1){
	$sql=sprintf("update repo_n set p_time%s=now() where id=%s",$_POST["lang"],$_POST["id"]);
	$o->query($sql);	
}

echo $o->affected_rows2();

?>