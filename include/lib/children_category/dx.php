<?php
$sql = "SELECT name FROM bottom_tab_categories WHERE id = ".$_GET['parent_tab_id'];
$o->query($sql);
$parent_name=$o->fetch_array();

$TITLE=$PARENT='競技タブ設定';
$THIS='「'.$parent_name['name'].'」の子タブ';

$l[]=sprintf("<li class=\"root\"><a href=\"%s\">%s</a></li>",$ADPATH,"メインメニュー");
$l[]=sprintf("<li class=\"root\"><a href=\"%s\">%s</a></li>",$ADPATH."bottom_tabs_category",$PARENT);
?>