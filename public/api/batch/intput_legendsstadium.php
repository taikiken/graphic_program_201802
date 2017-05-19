<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$s=get_contents("http://input.sportsbull.jp/api_legendstadium/out_legendsstadium.php");
$s=unserialize($s);

$sql="select id,d2,u_time,n,title from u_headline where cid=12 order by n";
$o->query($sql);
while($f=$o->fetch_array()){
	$p[]=$f;
}

for($i=0;$i<count($s);$i++){
	if($s[$i]["d1"]!=$p[$i]["d2"]||$s[$i]["u_time"]!=$p[$i]["u_time"]||$s[$i]["d1"]!=$p[$i]["d2"]||$s[$i]["title"]!=$p[$i]["title"]){
		$u[]=sprintf("update u_headline set d2=%s,u_time='%s',title='%s' where id=%s and u_time!='%s';",$s[$i]["d1"],$s[$i]["u_time"],pg_escape_string($s[$i]["title"]),$p[$i]["id"],$s[$i]["u_time"]);
	}
}

$u=implode("\n",$u);
$o->query($u);

header("Location:http://input.sportsbull.jp/legendsstadium/repo_n/?cid=13");

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>LEGEND STADIUMピックアップ記事を更新しました。</title>
<style type="text/css">
p{
	font-family:"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
	width:100%;
	text-align:center;
	padding:50px 0 0 0;
}
</style>
</head>
<body>
<p>LEGEND STADIUMピックアップ記事を更新しました。</p>
</body>
</html>