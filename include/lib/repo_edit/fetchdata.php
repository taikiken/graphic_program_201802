<?php

unset($QS);
if(isint($p[$i]["d_name"])){
	$sql="select name from pm where id=".$p[$i]["d_name"];
	$o->query($sql);
	$QS=$o->fetch_array();
}

?>
<dl class="ml"><dt><?=(strlen($QS["name"])>0)?$QS["name"]:mod_HTML($p[$i]["d_name"])?></dt><dd><?=(strlen($p[$i]["f_name"])>0)?mod_HTML($p[$i]["f_name"]):"---"?></dd></dl>
