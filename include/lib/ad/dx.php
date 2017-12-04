<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");

if($_GET["cid"]==1){
	$sql=sprintf("select title from repo_n where id=%s",$_GET["nid"]);
	$o->query($sql);
	$f=$o->fetch_array();

	$TITLE="記事";
	$QST="?cid=1";

	$THIS=$f["title"]."広告";
	$PARENT="広告設定";

}elseif($_GET["rid"]==2){
	$sql=sprintf("select name as title from repo where id=%s",$_GET["cid"]);
	$o->query($sql);
	$f=$o->fetch_array();

	$TITLE=$f["title"];
	$QST=sprintf("?cid=%s&rid=2",$_GET["cid"]);

	$sql=sprintf("select title from u_media where id=%s",$_GET["nid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$THIS=$f["title"]."広告・テーマ";

	$PARENT="メディア";

}elseif($_GET["cid"]==10){

	$TITLE="カテゴリー";
	$QST=sprintf("?cid=%s",$_GET["cid"]);

	$sql=sprintf("select name as title from u_categories where id=%s",$_GET["nid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$THIS=$f["title"]."広告・テーマ";

	$PARENT="カテゴリー";
}elseif($_GET["cid"]==0){

	$TITLE="デフォルトセッティング";
	$QST="?cid=0";


	$THIS="広告・テーマ";

	$PARENT="デフォルト";
}
if ($_GET["cid"] == 94)
{
	//
	// 選手
	//
	$sql = sprintf("select name from tbl_player where id = %s", $_GET["nid"]);
	$o->query($sql);
	$f = $o->fetch_array();

	$TITLE = "選手";
	$QST = "?cid=94";

	$THIS = $f["name"];
	$PARENT = "広告設定";
}

if($_GET["cid"]!=0){
	$l[]=sprintf("<li class=\"root\"><a href=\"%srepo_n/%s\">%s</a></li>",$ADPATH,$QST,$TITLE);
}
$l[]=sprintf("<li>%s</li>",$PARENT);


?>
