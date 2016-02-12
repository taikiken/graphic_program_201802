<?php

include $INCLUDEPATH."local.php";

$DBNAME="gp";
$DBUSR="gp";
$DBPWD="gp";

$o=new db;
$o->connect();

$sql=sprintf("select id,fid,name0,name1,kana0,kana1,email,tel0,tel1,tel2,m_time,handle from form where fid=14 or fid=22 or fid=24 order by id desc limit 100 offset %s",$_POST["n"]*100);
$o->query($sql);

while($f=$o->fetch_array()){
	preg_match("/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2})/",$f["m_time"],$m);
	switch($f["fid"]){
		case 14:$n="ベ";break;
		case 22:$n="相";break;
		case 24:$n="売";break;
	}
	$s[]=sprintf("<tr><td colspan=\"7\" class=\"separator\"><img src=\"/shared/cms/img/spacer.gif\" height=\"1\" width=\"1\" ></td></tr><tr><td class=\"numbering\">%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s %s</td><td>%s</td><td>%s-%s-%s</td></tr>",
	$f["id"],$m[1],$n,$f["handle"],$f["name0"],$f["name1"],$f["email"],$f["tel0"],$f["tel1"],$f["tel2"]);
}

echo implode("\n",$s);

?>