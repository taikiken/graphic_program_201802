<dl class="ml"><dt><?=mod_HTML($p[$i]["usr"])?></dt><dd><?php $sql=sprintf("select name from pm_ where id=%s",$p[$i]["m"]);$o->query($sql);$f=$o->fetch_array();echo $f["name"]; ?></dd></dl>
