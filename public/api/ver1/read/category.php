<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$category=bind($_REQUEST["category"]);

$sql=sprintf("select id,name,title,url,img,url1,img1,alt,description,name_e,og_image,no_image from u_categories where name_e='%s'",$category);
$o->query($sql);
$f=$o->fetch_array();

$y=array();
$categoriesinfo=array();

if(strlen($f["name"])>0){

	$categoriesinfo=set_categoriesinfo($f);

	/*

	https://github.com/undotsushin/undotsushin/issues/970#issue-168779151
	カテゴリーにpickup, hedlineの記事を追加

	pickupとheadlineが同じ場合は、CMS「記事選択」から新規登録で、該当カテゴリーslugにカテゴリー名を入力する。
	例）クライミング 'climbing'

	pickupとheadlineを分離して管理する場合、CMS「記事選択」から新規登録で、該当カテゴリーslugに '_headline'を付加する。
	例）クライミング 'climbing_headline'

	*/

	$sql=sprintf("select id from repo where t1='%s'",$category);
	$o->query($sql);
	$c=$o->fetch_array();

	$uid=auth();

	if(strlen($c["id"])>0){

		$sql=sprintf("select rt1.title as modtitle,rt2.* from (select d2,title,n as sort from u_headline where cid=%s and flag=1) as rt1,(select * from %s) as rt2 where rt1.d2=rt2.id order by sort",$c["id"],sprintf($articletable,set_isbookmark($uid),""));
		$nsql=sprintf("select count(id) as n from u_headline where cid=%s and flag=1",$c["id"]);

		$o->query($nsql);
		$f=$o->fetch_array();
		$count=$f["n"];

		if($count>0){

			$o->query($sql);
			while($f=$o->fetch_array())$p[]=$f;

			//カテゴリー一覧でも使うのでファイルに出す
			$s=array();
			include "public/articlecomments.php";

			$categoriesinfo["pickup"]["articles"]=$s;

			//11/11 iOSだけヘッドラインを非表示にする
			/*
			if(preg_match("#undotsushin/com\.limret\.undotsushin#",$_SERVER['HTTP_USER_AGENT'])){
				$categoriesinfo["headline"]["articles"]=array();
			}else{
				$categoriesinfo["headline"]["articles"]=$s;
			}
			*/
			$categoriesinfo["headline"]["articles"]=$s;

		}
	}
	//ここまで

	unset($c);
	unset($p);

	$sql=sprintf("select id from repo where t1='%s_headline'",$category);
	$o->query($sql);
	$c=$o->fetch_array();

	if(strlen($c["id"])>0){

		$sql=sprintf("select rt1.title as modtitle,rt2.* from (select d2,title,n as sort from u_headline where cid=%s and flag=1) as rt1,(select * from %s) as rt2 where rt1.d2=rt2.id order by sort",$c["id"],sprintf($articletable,set_isbookmark($uid),""));
		$nsql=sprintf("select count(id) as n from u_headline where cid=%s and flag=1",$c["id"]);

		$o->query($nsql);
		$f=$o->fetch_array();
		$count=$f["n"];

		$o->query($sql);
		while($f=$o->fetch_array())$p[]=$f;

		//カテゴリー一覧でも使うのでファイルに出す
		$s=array();
		include "public/articlecomments.php";

		$categoriesinfo["headline"]["articles"]=$s;

	}else{
		$categoriesinfo["headline"]["articles"]=$s;
	}


	$y["status"]["code"]=200;
	$y["status"]["user_message"]="";
	$y["status"]["developer_message"]="";

}else{

	$y["status"]["code"]=404;
	$y["status"]["user_message"]="指定されたカテゴリーは存在しません。";
	$y["status"]["developer_message"]="指定されたカテゴリーは存在しません。";
}


  if ( $category === 'big6tv' ) :

    $categoriesinfo['live']          = '/api/big6tv/live';
    $categoriesinfo['live_interval'] = 20;
    $categoriesinfo['webviews']      = array(
      '/big6tv/webview/',
    );

  endif;

  # ref. #1918
  if ( $category === 'motorsports' ) :
    $categoriesinfo['webviews']     = array(
      '/category/motorsports/webviews/links/',
    );
  endif;

  # ref. #2227
  if ( $category === 'seriku' ) :
    $categoriesinfo['webviews']     = array(
      '/seriku/webview/',
    );
  endif;

  # ref. #2185
  if ( $category === 'inhigh' ) :
    $categoriesinfo['webviews']     = array(
      '/inhigh/webview/',
    );
  endif;

  # ref. #2104
  if ( $category === 'highschoolbaseball' ) :
    $categoriesinfo['webviews']     = array(
      '/stats/hsb/webview/app/',
    );
  endif;

  // #2080
  if ( $category === 'top' ) :
    $categoriesinfo['webviews'] = array(
      '/stats/webview/',
    );
  endif;
$y["response"]=$categoriesinfo;

print_json($y,$_SERVER['HTTP_REFERER']);

?>
