<?php

include $INCLUDEPATH."local.php";

$DBNAME="gp";
$DBUSR="gp";
$DBPWD="gp";

$o=new db;
$o->connect();

if($_POST){
	$o->query("select max(id) as n from form");
	$f=$o->fetch_array();
	$sql=sprintf("insert into form(id,fid,name0,name1,email,tel0,tel1,tel2,m_time,u_time,flag,handle) values(%s,%s,'%s','%s','%s','%s','%s','%s',now(),now(),1,'%s');",
	$f["n"]+1,$_POST["fid"],addslashes(mod_HTML($_POST["name0"])),addslashes(mod_HTML($_POST["name1"])),trim(mb_convert_kana($_POST["email"],"a")),trim(mb_convert_kana($_POST["tel0"],"a")),trim(mb_convert_kana($_POST["tel1"],"a")),trim(mb_convert_kana($_POST["tel2"],"a")),md5($f["n"]+1));
	$o->query($sql);
	

	$sql=sprintf("select id,fid,name0,name1,kana0,kana1,email,tel0,tel1,tel2,m_time,handle from form where id=%s",$f["n"]+1);
	$o->query($sql);
	
	$f=$o->fetch_array();
	preg_match("/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2})/",$f["m_time"],$m);
	switch($f["fid"]){
		case 14:$n="ベ";break;
		case 22:$n="相";break;
		case 24:$n="売";break;
	}
	$s=sprintf("<tr><td colspan=\"7\" class=\"separator\"><img src=\"/shared/cms/img/spacer.gif\" height=\"1\" width=\"1\" ></td></tr><tr><td class=\"numbering\">%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s %s</td><td>%s</td><td>%s-%s-%s</td></tr>",
	$f["id"],$m[1],$n,$f["handle"],$f["name0"],$f["name1"],$f["email"],$f["tel0"],$f["tel1"],$f["tel2"]);

	echo $s;

}

?>