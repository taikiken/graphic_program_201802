<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$api=array(
	array("/api/v1/articles/home?offset=0&length=20","トップページ 新着（デフォルト20件）"),
	array("/api/v1/articles/home/headline?offset=0&length=5","トップページ ヘッドライン（最大5件）"),
	array("/api/v1/articles/home/pickup?offset=0&length=10","トップページ ピックアップ（デフォルト10件）"),
	array("/api/v1/articles/category/all","カテゴリー新着")
);

$sql="select id,name,name_e from pm_ where cid=20 and flag=1 order by n";
$o->query($sql);
while($f=$o->fetch_array()){
	$caa[$f["name_e"]]=$f["id"];
	$api2[]=array(sprintf("/api/v1/articles/category/%s?offset=0&length=20",$f["name_e"]),sprintf("%s新着",$f["name"]));
}

if(count($_GET)>0){
	
	/*
	
	# 成功系		
	200	OK	成功。
	201	Created	新しいリソースを作成した。POST、PUTなど。
	202	Accepted	リクエストを受け付けた。同期的に処理できない時に。
	204	No Content	内容なし。DELETEなどでレスポンスボディが不要な時に。
	
	# 失敗系		
	400	Bad Request	汎用エラー。リクエストデータに不正値がある等。
	401	Unauthorized	認証エラー。
	403	Forbidden	アクセス禁止。権限がない場合等。
	404	Not Found	リソースが存在しない。
	405	Method Not Allowed	メソッドが間違っている。GETしか受け付けないURIに対してPOSTされた時など。
	409	Conflict	リソースが競合している。ユニークなキーが既存のリソースと衝突した場合等。
	415	Unsupported Media Type	指定されたメディアタイプがサポートされていない。
	429	Too Many Requests	リクエストの回数制限に引っかかる場合など。
	500	Internal Server Error	サーバ側の問題によるエラー。
	503	Service Unavailable	一時的にサービス出来ない場合。
	
	*/

	$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
	$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;
	$uid=isset($_REQUEST["uid"])?$_REQUEST["uid"]:"";
	
	if(isset($_REQUEST["category"])){
		
		$c=$_GET["category"]=="all"?"":sprintf(" and m1=%s",$caa[$_GET["category"]]);
		$sql=sprintf("select id,title,body,type,img1,t1,video,videocaption,videoimg,category,slug,relativetime,date,isotime,weekday,uid,name0,name1,profile,icon,typeid%s from (select t1.*,t2.* from (select id,title,body,img1,(select name from repo where id=d1) as type,d2,t1,t8 as video,t2 as videocaption,img2 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a1||'年'||a2||'月'||a3||'日'||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1%s) as t1,(select id as uid,cid as typeid,t1 as name0,t2 as name1,t3 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as t3 order by relativetime limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=t3.id and userid=%s) as is_bookmark",$uid):"",$c,$length,$offset);
		
	}else{
	
		$c=isset($_REQUEST["c"])?$_REQUEST["c"]:"home";
		
		if($c=="home"){
			$sql=sprintf("select id,title,body,type,img1,t1,video,videocaption,videoimg,category,slug,relativetime,date,isotime,weekday,uid,name0,name1,profile,icon,typeid%s from (select t1.*,t2.* from (select id,title,body,img1,(select name from repo where id=d1) as type,d2,t1,t8 as video,t2 as videocaption,img2 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a1||'年'||a2||'月'||a3||'日'||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1) as t1,(select id as uid,cid as typeid,t1 as name0,t2 as name1,t3 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as t3 order by relativetime limit %s offset %s",
			$uid!=""?sprintf("(select id from u_bookmark where pageid=t3.id and userid=%s) as is_bookmark",$uid):"",$length,$offset);
	
		}elseif($c=="headline"){
			$sql=sprintf("select id,title,body,type,img1,t1,video,videocaption,videoimg,category,slug,relativetime,date,isotime,weekday,uid,name0,name1,profile,icon,typeid%s from (select t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=8 and flag=1) as tt2,(select id,title,body,img1,(select name from repo where id=d1) as type,d2,t1,t8 as video,t2 as videocaption,img2 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a1||'年'||a2||'月'||a3||'日'||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,t1 as name0,t2 as name1,t3 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as t3 order by sort limit %s offset %s",
			$uid!=""?sprintf("(select id from u_bookmark where pageid=t3.id and userid=%s) as is_bookmark",$uid):"",$length,$offset);
		}elseif($c=="pickup"){
			$sql=sprintf("select id,title,body,type,img1,t1,video,videocaption,videoimg,category,slug,relativetime,date,isotime,weekday,uid,name0,name1,profile,icon,typeid%s from (select t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=9 and flag=1) as tt2,(select id,title,body,img1,(select name from repo where id=d1) as type,d2,t1,t8 as video,t2 as videocaption,img2 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a1||'年'||a2||'月'||a3||'日'||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,t1 as name0,t2 as name1,t3 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as t3 order by sort limit %s offset %s",
			$uid!=""?sprintf("(select id from u_bookmark where pageid=t3.id and userid=%s) as is_bookmark",$uid):"",$length,$offset);
		}
	}
	
	$o->query($sql);
	
	while($f=$o->fetch_array())$p[]=$f;
	
	for($i=0;$i<count($p);$i++){
	
		$s[$i]["id"]=(int)$p[$i]["id"];
		$s[$i]["date"]=$p[$i]["isotime"];
		$s[$i]["display_date"]=get_relativetime($p[$i]["relativetime"]);
		$s[$i]["title"]=mod_HTML($p[$i]["title"]);
		$s[$i]["description"]=strlen($p[$i]["t1"])>0?mod_HTML($p[$i]["t1"]):mod_HTML(mb_substr(strip_tags($p[$i]["body"]),0,100));
		$s[$i]["category"]=$p[$i]["category"]; 
		$s[$i]["url"]=sprintf("%s/%s/e%s.html",$domain,$p[$i]["slug"],$p[$i]["id"]);
		$s[$i]["is_bookmarked"]=strlen($p[$i]["is_bookmarked"])>0?true:false;
		$s[$i]["media_type"]=strlen($p[$i]["video"])>0?"video":"image";

/*		
		$s[$i]["media"]["images"]=array();
		$n=0;
		for($j=1;$j<=5;$j++){
			if(strlen($p[$i]["img".$j])>0){

				$n++;
			}
		}
		if(count($s[$i]["media"]["images"])==0){
			$s[$i]["media"]["images"][0]["thumbnail"]="";
			$s[$i]["media"]["images"][0]["medium"]="";
			$s[$i]["media"]["images"][0]["large"]="";
			$s[$i]["media"]["images"][0]["caption"]="";
		}
*/

		$s[$i]["media"]["images"]["thumbnail"]=checkstr(sprintf("%s/prg_img/thumbnail3/%s",$domain,$p[$i]["img1"]));
		$s[$i]["media"]["images"]["medium"]=checkstr(sprintf("%s/prg_img/thumbnail1/%s",$domain,$p[$i]["img1"]));
		$s[$i]["media"]["images"]["large"]=checkstr(sprintf("%s/prg_img/thumbnail2/%s",$domain,$p[$i]["img1"]));
		$s[$i]["media"]["images"]["caption"]=checkstr($p[$i]["t1"],1);
		
		$s[$i]["media"]["video"]["thumbnail"]=checkstr($p[$i]["videoimg"],1);
		$s[$i]["media"]["video"]["url"]=checkstr($p[$i]["video"],1);
		$s[$i]["media"]["video"]["caption"]=checkstr($p[$i]["videocaption"],1);
	
		$s[$i]["user"]["id"]=(int)$p[$i]["uid"];
		$s[$i]["user"]["name"]=mod_HTML($p[$i]["name0"].$p[$i]["name1"]);
		$s[$i]["user"]["profile_picture"]=strlen($p[$i]["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["icon"]):"";
		$s[$i]["user"]["bio"]==checkstr($p[$i]["profile"]);
		$s[$i]["user"]["url"]=sprintf("%s/member/e%s.html",$domain,$p[$i]["uid"]);
		
		$s[$i]["user"]["type"]["id"]=(int)$p[$i]["typeid"];
		$s[$i]["user"]["type"]["label"]=$p[$i]["type"];
		
		$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1",$p[$i]["id"]);
		$o->query($sql);
		$f=$o->fetch_array();
		
		$s[$i]["comments_count"]=$f["n"];
		
		if($f["n"]>0){
	
			$sql=sprintf("select t3.*,%s,%s from  (select id,userid,pageid,regitime,relativetime,comment,good,bad,typeid,name0,name1,profile,icon,label,(good+bad) as popular from (select id,pageid,userid,to_char(regitime, 'YYYY-MM-DD HH24:MI:SS') as regitime,extract(epoch from (now()-regitime)/60) as relativetime,comment,(select count(*) as n from u_reaction where commentid=u_comment.id and reaction=1 and flag=1) as good,(select count(*) as n from u_reaction where commentid=u_comment.id and reaction=2 and flag=1) as bad  from u_comment where pageid=%s and commentid=0 and flag=1) as t1,(select id as uid,cid as typeid,t1 as name0,t2 as name1,t3 as profile,img1 as icon,(select name from repo where id=cid) as label from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.uid) as t3 order by popular desc limit 6 offset 0",
			$uid!=""?"(select id from u_reaction where userid=6 and reaction=1 and commentid=t3.id) as isgood":"0 as isgood",
			$uid!=""?"(select id from u_reaction where userid=6 and reaction=2 and commentid=t3.id) as isbad":"0 as isbad",
			$p[$i]["id"]);		
			$o->query($sql);
	
			$n=0;
	
			while($f=$o->fetch_array()){
				$s[$i]["comments_popular"][$n]["id"]=(int)$f["id"];
				$s[$i]["comments_popular"][$n]["date"]=str_replace(" ","T",$f["regitime"]);
				$s[$i]["comments_popular"][$n]["display_date"]=get_relativetime($f["relativetime"]);
				$s[$i]["comments_popular"][$n]["body"]=mod_HTML($f["comment"],1);
				$s[$i]["comments_popular"][$n]["is_like"]=$f["isgood"]!="0"?true:false;
				$s[$i]["comments_popular"][$n]["is_bad"]=$f["isbad"]!="0"?true:false;
				$s[$i]["comments_popular"][$n]["like"]=(int)$f["good"];
				$s[$i]["comments_popular"][$n]["bad"]=(int)$f["bad"];
				$s[$i]["comments_popular"][$n]["url"]=sprintf("%s/%s/e%s-%s.html",$domain,$p[$i]["slug"],$p[$i]["id"],$f["id"]);
	
				$s[$i]["comments_popular"][$n]["user"]["id"]=(int)$f["userid"];
				$s[$i]["comments_popular"][$n]["user"]["name"]=mod_HTML($f["name0"].$f["name1"]);
				$s[$i]["comments_popular"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
				$s[$i]["comments_popular"][$n]["user"]["bio"]==checkstr($f["profile"]);
				$s[$i]["comments_popular"][$n]["user"]["url"]=sprintf("%s/member/e%s.html",$domain,$f["userid"]);
				
				$s[$i]["comments_popular"][$n]["user"]["type"]["id"]=(int)$f["typeid"];
				$s[$i]["comments_popular"][$n]["user"]["type"]["label"]=$f["label"];
	
				$n++;
			}
			
		}else{
			$s[$i]["comments_popular"]=array();
		}
		
	}
	
	$y=array();
	
	$y["status"]["code"]=200;
	$y["status"]["user_message"]="";
	$y["status"]["developer_message"]="";
	
	$y["response"]["count"]=count($s);
	$y["response"]["articles"]=$s;

}


?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/shared/css/base2.css">
<script src="/shared/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/shared/js/base2.js" type="text/javascript"></script>
<title>debug</title>
</head>
<body>
<div>
<select>
<option value="">API種別</option>
<?php for($i=0;$i<count($api);$i++){ ?>
<?php if($i==3&&isset($_REQUEST["category"])){ ?>
<option value="/api/v1/articles/category/all" selected="selected">カテゴリー新着</option>
<?php }else{ ?>
<option value="<?=$api[$i][0]?>"<?=$api[$i][0]==$_SERVER['REQUEST_URI']?" selected=\"selected\"":""?>><?=$api[$i][1]?></option>
<?php } ?>
<?php } ?>
</select>

<?php if(strlen($_GET["category"])>0){ ?>
<select class="ss2">
<option value="/api/v1/articles/category/all?offset=0&length=20">すべてのカテゴリー</option>
<?php for($i=0;$i<count($api2);$i++){ ?>
<option value="<?=$api2[$i][0]?>"<?=$api2[$i][0]==$_SERVER['REQUEST_URI']?" selected=\"selected\"":""?>><?=$api2[$i][1]?></option>
<?php } ?>
</select>

<?php } ?>

<?php if(count($_GET)>0){ ?><span><?=$_SERVER['REQUEST_URI']?></span><?php } ?>
</div>
<pre>
<?php

if(count($_GET)>0){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}

?>
</pre>
</body>
</html>
