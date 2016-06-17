<?php

$TABLE="advertise";

if($_GET["cid"]==1){
	$a[]=array("head","システム設定");
	$a[]=array("inputradio","続きを読むリンク先","readmore",array("運動通信Web View","媒体指定URL"),"","","","");
}
if($_GET["rid"]==2){
	$a[]=array("head","システム設定");
	$a[]=array("inputcheckbox","CMS管理項目オプション","cmdtypes",array("速報・紙面記事形式","関連リンク","サマリー","元記事URL","MP4動画","Youtube","Facebook","動画キャプション","コンテンツ仕様選択"),"","","","");
	$a[]=array("inputradio","続きを読むリンク先","readmore",array("運動通信Web View","媒体指定URL"),"","","","");
	$a[]=array("inputradio","Canonical","canonical",array("運動通信URL","媒体指定URL"),"","","","");
	$a[]=array("textfield","出力バケット名","bucket","20","","","");
	$a[]=array("inputradio","海外からのアクセス","geoblock",array("許可する","許可しない"),"","","","");
}
if($_GET["cid"]==10){
	$a[]=array("head","テーマ設定");
	$a[]=array("textfield","ベース","base","20","","","","＠dark");
	$a[]=array("textfield","背景色 *16進数","bgcolor","20","","","","#000000\n#FFFFFF");
	$a[]=array("img","PC一覧ヘッダ画像","pc_headerimglist","3000--0-0-0-0","","",$BILLINGUAL);
	$a[]=array("img","PC詳細ページヘッダ画像","pc_headerimgdetail","3000--0-0-0-0","","",$BILLINGUAL);
	$a[]=array("img","スマホ一覧ヘッダ画像","sp_headerimglist","3000--0-0-0-0","","",$BILLINGUAL);
	$a[]=array("img","スマホ詳細ページヘッダ画像","sp_headerimgdetail","3000--0-0-0-0","","",$BILLINGUAL);
	$a[]=array("inputradio","スマホ一覧ナビ表示","sp_showfilter",array("表示する","表示しない"),"","","","");
}
if($_GET["cid"]!=0){
	$a[]=array("head","記事下バナー設定：（親＞子）カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
	$a[]=array("inputradio","記事下バナー表示","bannerflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","ALTテキスト","bannertext","70","","","");
	$a[]=array("img","PCバナー","pc_bannerimg","728-90-0-0-0-0","","",$BILLINGUAL);
	$a[]=array("textfield","PCリンク先","pc_bannerlink","90","","","");
	$a[]=array("img","スマホバナー","sp_bannerimg","640-200-0-0-0-0","","",$BILLINGUAL);
	$a[]=array("textfield","スマホリンク先","sp_bannerlink","90","","","");
}

$a[]=array("head","動画広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[]=array("inputradio","広告表示","ad_videoflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textarea","VAST","ad_videoid","2","","","");

$a[]=array("head","PC広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[]=array("inputradio","サイド右上レクタングル広告表示","sidebar_topflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","サイド右上レクタングルID","sidebar_top","90","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","サイド右下ハーフページ広告表示","sidebar_bottomflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","サイド右下ハーフページID","sidebar_bottom","90","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事タイトル下ビッグバナー広告表示","single_topflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事タイトル下ビッグバナー広告ID","single_top","90","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事本文下レクタングル（右）表示","single_bottom_leftflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事本文下レクタングル（右）ID","single_bottom_left","90","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事本文下レクタングル（左）広告表示","single_bottom_rightflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事本文下レクタングル（左）ID","single_bottom_right","90","","","");

$a[]=array("head","スマホ広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事一覧広告表示","ad_sp_listflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事一覧広告ID","ad_sp_listid","40","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事詳細広告表示","ad_sp_detailflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事詳細広告ID","ad_sp_detailid","40","","","");

$a[]=array("head","iOS広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事一覧広告表示","ad_ios_listflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事一覧広告ID","ad_ios_listid","40","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事詳細広告表示","ad_ios_detailflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事詳細広告ID","ad_ios_detailid","40","","","");

$a[]=array("head","Android広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事一覧広告表示","ad_android_listflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事一覧広告ID","ad_android_listid","40","","","");
if($_GET["cid"]!=0)$a[]=array("inputradio","記事詳細広告表示","ad_android_detailflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
$a[]=array("textfield","記事詳細広告ID","ad_android_detailid","40","","","");

function output(){	
	global $o,$SERVERPATH;
	$sql="select id from u_media";
	$o->query($sql);
	$r=array();
	while($f=$o->fetch_array()){
		$file=sprintf("%s/api/ver1/static/ad/2-%s.dat",$SERVERPATH,$f["id"]);
		$s=unserialize(file_get_contents($file));
		$y=is_array($s["cmdtypes"])?$s["cmdtypes"]:array();
		
		for($i=0;$i<9;$i++){
			if(in_array($i,$y))$r[$i][]=$f["id"];
		}
		
		$op[$f["id"]]["readmore"]=isset($s["readmore"])?$s["readmore"]:0;
		$op[$f["id"]]["canonical"]=isset($s["canonical"])?$s["canonical"]:0;
		$op[$f["id"]]["bucket"]=isset($s["bucket"])?$s["bucket"]:"";
		$op[$f["id"]]["geoblock"]=isset($s["geoblock"])?$s["geoblock"]:0;
		
	}
	
	$file=sprintf("%s/api/ver1/static/cms.dat",$SERVERPATH);
	file_put_contents($file,serialize($r));
	$file=sprintf("%s/api/ver1/static/media.dat",$SERVERPATH);
	file_put_contents($file,serialize($op));
}

$file=sprintf("%s/api/ver1/static/ad/%s-%s.dat",$SERVERPATH,isset($_GET["rid"])?$_GET["rid"]:$_GET["cid"],$_GET["nid"]);
if($q->get_dir()===1){
	if($q->get_file()===0){
		$flag=array("親の広告表示設定を継承する","広告を設定する","広告を表示しない");
		if(file_exists($file)){
			unset($p);
			$data=unserialize(file_get_contents($file));
			for($i=0;$i<count($a);$i++){
				if(preg_match("/flag/",$a[$i][2])){
					$p[$a[$i][2]]=sprintf("%s:%s",$data[$a[$i][2]],$flag[$data[$a[$i][2]]]);
				}else{
					$p[$a[$i][2]]=$data[$a[$i][2]];
				}
			}
		}
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){
		data_conf();
	}elseif($q->get_file()===2){
		while(list($k,$v)=each($_POST)){
			if(preg_match("/(^p_|img)/",$k)){
				$data[preg_replace("/^p_/","",$k)]=!preg_match("/flag/",$k)?$v:(int)$v;
			}
		}
		$data=serialize($data);
		$e=file_put_contents($file,$data);
		
		output();
	}
}

$EDITDELETEINITIAL="";

?>