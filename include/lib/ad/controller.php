<?php

$TABLE="advertise";

if($_GET["rid"]==2){
	$a[]=array("head","システム設定");
	$a[]=array("inputcheckbox","CMS管理項目オプション","cmdtypes",array("速報・紙面記事形式","関連リンク","サマリー","元記事URL","MP4動画","Youtube","Facebook","動画キャプション","コンテンツ仕様選択","外部Brightcove RefID"),"","","","");
	$a[]=array("inputradio","続きを読むリンク先","readmore",array("運動通信Web View","媒体指定URL"),"","","","");
	$a[]=array("inputradio","Canonical","canonical",array("運動通信URL","媒体指定URL"),"","","","");
	$a[]=array("textfield","出力バケット名","bucket","20","","","");
	$a[]=array("inputradio","海外からのアクセス","geoblock",array("許可する","許可しない"),"","","","");

}elseif($_GET["cid"]==10){
	$a[]=array("head","テーマ設定");
	$a[]=array("textfield","ベース","base","20","","","","＠dark");
	$a[]=array("textfield","背景色 *16進数","bgcolor","20","","","","#000000\n#FFFFFF");
	$a[]=array("img","PC一覧ヘッダ画像","pc_headerimglist","2000-300-0-0-0-0","","",$BILLINGUAL);
	$a[]=array("img","PC詳細ページヘッダ画像","pc_headerimgdetail","2000-150-0-0-0-0","","",$BILLINGUAL);
	$a[]=array("img","スマホ一覧ヘッダ画像","sp_headerimglist","750-600-0-0-0-0","","",$BILLINGUAL);
	$a[]=array("img","スマホ詳細ページヘッダ画像","sp_headerimgdetail","750-190-0-0-0-0","","",$BILLINGUAL);
	$a[]=array("inputradio","スマホ一覧ナビ表示","sp_showfilter",array("表示する","表示しない"),"","","","");

}elseif($_GET["cid"]==1){
	$a[]=array("head","システム設定");
	$a[]=array("inputradio","続きを読むリンク先","readmore",array("運動通信Web View","媒体指定URL"),"","","","");
}

if ($_GET["cid"] != 16)
{
	if($_GET["cid"]!=0){

		if($_GET["cid"]!=1){
			$a[]=array("head","記事一覧上バナー画像設定：（親＞子）カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
			$a[]=array("inputradio","バナー表示","bannerflag",array("親の表示設定を継承する","個別にバナーを設定する","バナーを表示しない"));
			$a[]=array("textfield","ALTテキスト（共通）","bannertext","70","","","");
			$a[]=array("img","PCバナー画像","pc_bannerimg","728-90-0-0-0-0","","",$BILLINGUAL);
			$a[]=array("textfield","PCリンク先","pc_bannerlink","100","","","");
			$a[]=array("img","スマホバナー画像","sp_bannerimg","750-234-0-0-0-0","","",$BILLINGUAL);
			$a[]=array("textfield","スマホリンク先","sp_bannerlink","100","","","");
			$a[]=array("img","iOSバナー画像","ios_bannerimg","750-234-0-0-0-0","","",$BILLINGUAL);
			$a[]=array("textfield","iOSリンク先","ios_bannerlink","100","","","");
			$a[]=array("img","Androidバナー画像","android_bannerimg","750-234-0-0-0-0","","",$BILLINGUAL);
			$a[]=array("textfield","Androidリンク先","android_bannerlink","100","","","");
		}

		$a[]=array("head","記事本文下バナー画像設定：（親＞子）カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
		$a[]=array("inputradio","バナー表示","abodybannerflag",array("親の表示設定を継承する","個別にバナーを設定する","バナーを表示しない"));
		$a[]=array("textfield","ALTテキスト（共通）","abodybannertext","70","","","");
		$a[]=array("img","PCバナー画像","pc_abodybannerimg","728-90-0-0-0-0","","",$BILLINGUAL);
		$a[]=array("textfield","PCリンク先","pc_abodybannerlink","100","","","");
		$a[]=array("img","スマホバナー画像","sp_abodybannerimg","750-234-0-0-0-0","","",$BILLINGUAL);
		$a[]=array("textfield","スマホリンク先","sp_abodybannerlink","100","","","");
		$a[]=array("img","iOSバナー画像","ios_abodybannerimg","750-234-0-0-0-0","","",$BILLINGUAL);
		$a[]=array("textfield","iOSリンク先","ios_abodybannerlink","100","","","");
		$a[]=array("img","Androidバナー画像","android_abodybannerimg","750-234-0-0-0-0","","",$BILLINGUAL);
		$a[]=array("textfield","Androidリンク先","android_abodybannerlink","100","","","");
	}

	$a[]=array("head","動画広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
	if($_GET["cid"]!=0)$a[]=array("inputradio","広告表示","ad_videoflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textarea","VAST(廃止予定)","ad_videoid","2","","","");
	$a[]=array("textarea","PC広告動画タグ","ad_pc_videotag","2","","","");
	$a[]=array("textarea","スマホ広告動画タグ","ad_sp_videotag","2","","","");
	$a[]=array("textarea","iOS広告動画タグ","ad_ios_videotag","2","","","");
	$a[]=array("textarea","android広告動画タグ","ad_android_videotag","2","","","");

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
	$a[]=array("textfield","記事一覧広告ID","ad_sp_listid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","記事詳細広告表示","ad_sp_detailflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","記事詳細広告ID","ad_sp_detailid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","ヘッドライン広告表示","ad_sp_headlineflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","ヘッドライン広告ID","ad_sp_headlineid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","人気記事広告表示","ad_sp_popularflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","人気記事広告ID","ad_sp_popularid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","オススメ記事広告表示","ad_sp_recommendflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","オススメ記事広告ID","ad_sp_recommendid","20","","","");

	$a[]=array("head","iOS広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
	if($_GET["cid"]!=0)$a[]=array("inputradio","記事一覧広告表示","ad_ios_listflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","記事一覧広告ID","ad_ios_listid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","記事詳細広告表示","ad_ios_detailflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","記事詳細広告ID","ad_ios_detailid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","ヘッドライン広告表示","ad_ios_headlineflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","ヘッドライン広告ID","ad_ios_headlineid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","人気記事広告表示","ad_ios_popularflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","人気記事広告ID","ad_ios_popularid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","オススメ記事広告表示","ad_ios_recommendflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","オススメ記事広告ID","ad_ios_recommendid","20","","","");

	$a[]=array("head","Android広告設定：（親＞子）デフォルト ＞ カテゴリー ＞ ユーザ ＞ 記事で継承されますが、子要素の指定は優先されます");
	if($_GET["cid"]!=0)$a[]=array("inputradio","記事一覧広告表示","ad_android_listflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","記事一覧広告ID","ad_android_listid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","記事詳細広告表示","ad_android_detailflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","記事詳細広告ID","ad_android_detailid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","ヘッドライン広告表示","ad_android_headlineflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","ヘッドライン広告ID","ad_android_headlineid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","人気記事広告表示","ad_android_popularflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","人気記事広告ID","ad_android_popularid","20","","","");
	if($_GET["cid"]!=0)$a[]=array("inputradio","オススメ記事広告表示","ad_android_recommendflag",array("親の広告表示設定を継承する","広告を設定する","広告を表示しない"));
	$a[]=array("textfield","オススメ記事広告ID","ad_android_recommendid","20","","","");

	// 選手情報以外の選手広告ヘッダータイトル設定
	$head_val1 = "関連選手一覧";
	$head_val2 = "カテゴリー";
	$item_val1 = "選手一覧";
}
else
{
	// 選手情報の場合の選手広告ヘッダータイトル設定
	$head_val1 = "選手詳細";
	$head_val2 = "選手";
	$item_val1 = "プロフィール";
}

/*
 * 選手の広告設定
 */
/*
 * 選手の広告設定については仕様が決まるまで表示しない
 *

// PC
$a[] = array("head", $head_val1 . " / ウェブ・デスクトップ版：（親＞子）デフォルト ＞ " . $head_val2 . "で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[] = array("inputradio", $item_val1 . " / 広告表示", "ad_pc_playerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield", $item_val1 . " / 広告ID", "ad_pc_playerid", "20", "", "", "");
if($_GET["cid"]!=0)$a[] = array("inputradio","サイドバー / 広告表示", "ad_pc_sideflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield","サイドバー / 広告ID", "ad_pc_sideid", "20", "", "", "");
if($_GET["cid"]!=0)$a[] = array("inputradio","フッター / 広告表示", "ad_pc_footerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield","フッター / 広告ID", "ad_pc_footerid", "20", "", "", "");

// モバイル
$a[] = array("head", $head_val1 . " / ウェブ・モバイル版：（親＞子）デフォルト ＞ " . $head_val2 . "で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[] = array("inputradio", $item_val1 . " / 広告表示", "ad_sp_playerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield", $item_val1 . " / 広告ID", "ad_sp_playerid", "20", "", "", "");
if($_GET["cid"]!=0)$a[] = array("inputradio","フッター / 広告表示", "ad_sp_footerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield","フッター / 広告ID", "ad_sp_footerid", "20", "", "", "");

// iOS
$a[] = array("head", $head_val1 . " / アプリ・iOS版：（親＞子）デフォルト ＞ " . $head_val2 . "で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[] = array("inputradio", $item_val1 . " / 広告表示", "ad_ios_playerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield", $item_val1 . " / 広告ID", "ad_ios_playerid", "20", "", "", "");
if($_GET["cid"]!=0)$a[] = array("inputradio","フッター / 広告表示", "ad_ios_footerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield","フッター / 広告ID", "ad_ios_footerid", "20", "", "", "");

// Android
$a[] = array("head", $head_val1 . " / アプリ・Android版：（親＞子）デフォルト ＞ " . $head_val2 . "で継承されますが、子要素の指定は優先されます");
if($_GET["cid"]!=0)$a[] = array("inputradio", $item_val1 . " / 広告表示", "ad_android_playerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield", $item_val1 . " / 広告ID", "ad_android_playerid", "20", "", "", "");
if($_GET["cid"]!=0)$a[] = array("inputradio","フッター / 広告表示", "ad_android_footerflag", array("親の広告表示設定を継承する", "広告を設定する", "広告を表示しない"));
$a[] = array("textfield","フッター / 広告ID", "ad_android_footerid", "20", "", "", "");
*/

function output(){

	global $o,$staticfilepath;

	$sql="select id from u_media";
	$o->query($sql);
	$r=array();
	while($f=$o->fetch_array()){

		$file=sprintf("%s/static/ad/2-%s.dat",$staticfilepath,$f["id"]);
		if(file_exists($file)){
			$s=unserialize(get_contents($file));
		}

		$y=is_array($s["cmdtypes"])?$s["cmdtypes"]:array();

		for($i=0;$i<12;$i++){
			if(in_array($i,$y))$r[$i][]=$f["id"];
		}

		$op[$f["id"]]["readmore"]=isset($s["readmore"])?$s["readmore"]:0;
		$op[$f["id"]]["canonical"]=isset($s["canonical"])?$s["canonical"]:0;
		$op[$f["id"]]["bucket"]=isset($s["bucket"])?$s["bucket"]:"";
		$op[$f["id"]]["geoblock"]=isset($s["geoblock"])?$s["geoblock"]:0;
	}

	$file=sprintf("%s/static/cms.dat",$staticfilepath);
	file_put_contents($file,serialize($r));
	s3upload($file,sprintf("static/cms.datt",$id));

	$file=sprintf("%s/static/media.dat",$staticfilepath);
	file_put_contents($file,serialize($op));
	s3upload($file,sprintf("static/media.dat",$id));

}

$file=sprintf("%s/static/ad/%s-%s.dat",$staticfilepath,isset($_GET["rid"])?$_GET["rid"]:$_GET["cid"],$_GET["nid"]);

if($q->get_dir()===1){
	if($q->get_file()===0){
		$flag=array("親の広告表示設定を継承する","広告を設定する","広告を表示しない");
		if(file_exists($file)){
			$data=get_contents($file);
			unset($p);
			$data=unserialize($data);
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
		s3upload($file,sprintf("static/ad/%s-%s.dat",isset($_GET["rid"])?$_GET["rid"]:$_GET["cid"],$_GET["nid"]));
		output();
	}
}

$EDITDELETEINITIAL="";

?>
