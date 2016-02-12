<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("select id,comment,(select title from repo_n where id=userid) as user from u_comment where pageid=%s and commentid=0 and flag=1",$_POST["id"]);
$o->query($sql);
while($f=$o->fetch_array()){
	$p[]=$f;
}

for($i=0;$i<count($p);$i++){
	$s[]=sprintf("<option value=\"%s\">%s：%s</option>",$p[$i]["id"],$p[$i]["user"],mb_substr($p[$i]["comment"],0,25));
	
	$sql=sprintf("select id,(select title from repo_n where id=userid) as username,comment,regitime from u_comment where commentid=%s and flag=1 order by regitime desc",$p[$i]["id"]);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s[]=sprintf("<option value=\"%s\">　%s：%s</option>",$f["id"],$f["username"],mb_substr($f["comment"],0,25));
	}
	
}

echo implode("",$s);

?>