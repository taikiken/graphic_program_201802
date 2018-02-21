<?php

$l[] = sprintf("<li class=\"root\"><a href=\"%s\">%s</a></li>", $ADPATH, "メインメニュー");

$CT = ($q->get_dir() == 1 || $q->get_dir() == 2) ? $g->c(1) : $g->c();
if (isset($_GET["no"])) $CT = $CT - 1;


$QS = $g->f("rid");
$R = 1;

$sql = "select name from repo where id=" . $g->f("cid");

$o->query($sql);
$f = $o->fetch_array();

$REPONNAME = mod_HTML($f["name"]);

$sql = sprintf("select * from repo where id=%s", $QS);

$o->query($sql);
$f = $o->fetch_array();

$PARENT = $REPONNAME;
$THIS = 'カテゴリTOPに表示する選手';
