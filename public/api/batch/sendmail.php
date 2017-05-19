<?php

include "local.php";

function mailreminder($id,$file,$t2,$t3){
	
	global $imgpath;
	
	$to="info@baseballgate.jp";
	$subject=sprintf("【六大学野球】%svs%sのエンコードが完了しました",$t2,$t3);
	$body=sprintf("
	
	URL: https://sportsbull.jp/p/%s/
	
	HD : https://video-jp.sportsbull.jp/big6tv/%s/hd/%s.m3u8
	SD : https://video-jp.sportsbull.jp/big6tv/%s/sd/%s.m3u8
	
	",$id,$file,$file,$file,$file);
	$from="noreply@sportsbull.jp";
	$reply="info@sportsbull.jp";
	
	return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply);
}

//六大学野球のハイライト動画記事が作成されたらBG担当者にメールを送る
mailreminder($_GET["id"],$_GET["file"],urldecode($_GET["t2"]),urldecode($_GET["t3"]));

?>