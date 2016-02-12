<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("select id,comment,(select title from repo_n where id=userid) as user from u_comment where pageid=%s and commentid=0 and flag=1",$_POST["id"]);
$o->query($sql);

$s[]="<option value=\"\">記事へコメント</option>";

while($f=$o->fetch_array()){
	$s[]=sprintf("<option value=\"%s\">%s：%s</option>",$f["id"],$f["user"],mb_substr($f["comment"],0,25));
}

echo implode("",$s);

?>