<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$minute=60*24*30;

$sql=sprintf("select id,title,(select name from pm_ where id=m1) as category,body,t1,t10,t11,t12,t13,t14,t15,keyword from repo_n where cid=1 and flag=1 order by n desc",$minute);
$o->query($sql);

$s[]="drop table u_index;";
$s[]="create table u_index(id int not null primary key,txt text);";

while($f=$o->fetch_array()){
	$s[]=sprintf("insert into u_index(id,txt) values(%s,'%s');",
		$f["id"],
		esc($f["title"].strip_tags($f["body"]).$f["category"].$f["t1"].$f["t10"].$f["t11"].$f["t12"].$f["t13"].$f["t14"].$f["t15"].$f["keyword"])
	);
}

$o->query(implode("\n",$s));


?>