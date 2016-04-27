<?php

header("Content-Type:text/html; charset=UTF-8");

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("select id,'['||a1||'-'||a2||'-'||a3||' '||a4||':'||a5||'] ' ||title||'('||(select title from u_member as e where e.id=repo_n.d2)||')' as title from repo_n where id=%s",$_POST["id"]);
$o->query($sql);

$f=$o->fetch_array();

echo sprintf("%s:%s",$f["id"],$f["title"]);

?>