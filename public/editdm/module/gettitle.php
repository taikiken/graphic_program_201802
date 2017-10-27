<?php

header("Content-Type:text/html; charset=UTF-8");

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

if ($_POST["cid"] == 18)
{
    // 注目の選手
    $sql = sprintf("select id, name as title from tbl_player where id = %s", $_POST["id"]);
}
else
{
    $sql=sprintf("select id,'['||a1||'-'||a2||'-'||a3||' '||a4||':'||a5||'] ' ||title||'('||(select title from u_media as e where e.id=repo_n.d2)||')' as title from repo_n where id=%s",$_POST["id"]);
}
$o->query($sql);

$f=$o->fetch_array();

echo sprintf("%s:%s",$f["id"],$f["title"]);

?>
