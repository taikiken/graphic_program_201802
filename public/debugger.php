<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$api=array(
	array("/api/v1/sessions/","[-] ログイン",25,"POST"),
	array("/api/v1/category","[-] カテゴリー一覧",1,"GET"),
	array("/api/v1/initialize","[-] イニシャライズ",23,"GET"),
	array("/api/v1/articles/home","[A-10] ホーム非ログイン",2,"GET"),
	array("/api/v1/articles/self","[A-20] ホームログイン後",3,"GET"),
	array("/api/v1/articles/category","[A/B] 記事一覧",4,"GET"),
	array("/api/v1/articles/search","[H] 検索結果",5,"GET"),
	array("/api/v1/articles","[C] 記事詳細",6,"GET"),
	array("/api/v1/articles/","[C] 記事のブックマーク登録",9,"PUT"),
	array("/api/v1/articles/","[C] 記事のブックマーク削除",10,"DELETE"),
	array("/api/v1/comments/article","[C] コメント一覧",7,"GET"),
	array("/api/v1/comments/article","[C] コメント投稿",11,"POST"),
	array("/api/v1/comments/article","[C] コメント削除",14,"DELETE"),
	array("/api/v1/comments/","[C] コメントへのgood,bad",12,"PUT"),
	array("/api/v1/comments/","[C] コメントへのgood,bad削除",13,"DELETE"),
	array("/api/v1/users/bookmark","[M] ブックマークした記事一覧",15,"GET"),
	array("/api/v1/users/self","[M] ユーザ情報（自分）",8,"GET"),
	array("/api/v1/users","[M] ユーザ情報（ユーザ指定）",16,"GET"),
	array("/api/v1/users/self/settings/interest","[M] 興味のある競技一覧",17,"GET"),
	array("/api/v1/users/self/settings/interest","[M] 興味のある競技更新",18,"PUT"),
	array("/api/v1/users/self/activities","[M] アクティビティ取得",19,"GET"),
	array("/api/v1/users/self/notifications","[M] お知らせ取得",20,"GET"),
	array("/api/v1/users/self/notifications/count","[M] お知らせ未読数取得",28,"GET"),
	array("/api/v1/users/self/notifications/read","[M] お知らせ既読化",26,"PUT"),
	array("/api/v1/users/self/settings/account","[M] アカウント情報の取得",21,"GET"),
	array("/api/v1/users/self/settings/account","[M] アカウント情報の更新",22,"POST"),
	array("/api/v1/users/","[-] 新規ユーザ登録",24,"POST"),
	array("/api/v1/users/","[-] 退会",27,"DELETE")
);

$api2[]=array("all","すべて（all）");
$sql="select id,name,name_e from pm_ where cid=20 and flag=1 order by n";
$o->query($sql);
while($f=$o->fetch_array()){
	$caa[$f["name_e"]]=$f["id"];
	$api2[]=array($f["name_e"],sprintf("%s（%s）",$f["name"],$f["name_e"]));
}

$sql="select id,title from repo_n where cid=1 and flag=1 order by a1 desc,a2 desc,a3 desc,a4 desc,a5 desc,a6 desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$article[]=$f;
}

$sql="select id,title,a15 from repo_n where qid=2 and cid!=3 and flag=1 order by cid,n";
$o->query($sql);
while($f=$o->fetch_array()){
	$user[]=$f;
}

?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/shared/css/base3.css">
<script src="/shared/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/shared/js/base3.js" type="text/javascript"></script>
<title>運動通信API確認ページ</title>
</head>
<body>
<div class="heading">
<div class="h1 clearfix">
<h1>運動通信API確認ページ</h1>
</div>
<select class="sapi2">
<option value="">ログインユーザ選択</option>
<?php for($i=0;$i<count($user);$i++){ ?>
<option value="<?=$user[$i]["a15"]?>"><?=$user[$i]["title"]?></option>
<?php } ?>
</select>
<select class="sapi">
<option value="">API種別</option>
<?php for($i=0;$i<count($api);$i++){ ?>
<option value="<?=$api[$i][0]?>"<?=$api[$i][0]==$_SERVER['REQUEST_URI']?" selected=\"selected\"":""?> class="sn<?=$api[$i][2]?> <?=$api[$i][3]?>"><?=$api[$i][1]?></option>
<?php } ?>
</select>

<span class="url"></span>


<div class="apibox api1 clearfix pt20">
<span class="btns">データを確認</span>
</div>

<div class="apibox api2 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>タイプ</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv type in" placeholder="type" style="width:200px"><span class="spl">(String)　[(空：新着順) | pickup | headline]</span></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api3 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>タイプ</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv type in" placeholder="type" style="width:200px"><span class="spl">(String)　[(空：新着順) | pickup | headline]</span></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api4 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>カテゴリー</th><td class="c2">○</td><td class="c3"><select class="vv">
<?php for($i=0;$i<count($api2);$i++){ ?>
<option value="<?=$api2[$i][0]?>"<?=$api2[$i][0]==$_SERVER['REQUEST_URI']?" selected=\"selected\"":""?>><?=$api2[$i][1]?></option>
<?php } ?>
</select><span class="spl">(String)　[all|baseball|mlb ,etc...]</span></td></tr>
<tr><th>タイプ</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv type in" placeholder="type" style="width:200px"><span class="spl">(String)　[(空：新着順) | ranking | video]</span></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api5 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>検索語</th><td class="c2">○</td><td class="c3"><input type="text" value="" class="vv type in" style="width:200px"><span class="spl">(String) ※カンマ、スペース区切りでand条件</span></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api6 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ページID</th><td class="c2">○</td><td class="c3"><select class="vv">
<?php for($i=0;$i<count($article);$i++){ ?>
<option value="<?=$article[$i]["id"]?>"><?=$article[$i]["title"]?></option>
<?php } ?>
</select><span class="spl">(Integer)</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api7 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ページID</th><td class="c2">○</td><td class="c3"><select class="vv">
<?php for($i=0;$i<count($article);$i++){ ?>
<option value="<?=$article[$i]["id"]?>"><?=$article[$i]["title"]?></option>
<?php } ?>
</select><span class="spl">(Integer) 名波監督～にいくつかテストデータが入っています</span></td></tr>
<tr><th>タイプ<br>コメントID</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv type in" placeholder="type or comment_id" style="width:200px"><span class="spl">(String)　[(空:すべて) | normal | official | self | [commend_id:例）8]]</span></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api8 clearfix pt20">
<span class="btns">データを確認</span>
</div>

<div class="apibox api9 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ページID</th><td class="c2">○</td><td class="c3"><select class="vv">
<?php for($i=0;$i<count($article);$i++){ ?>
<option value="<?=$article[$i]["id"]?>"><?=$article[$i]["title"]?></option>
<?php } ?>
</select><span class="spl">(Integer) </span></td></tr>
</table>
<span class="btns">ブックマーク登録</span>
</div>

<div class="apibox api10 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ページID</th><td class="c2">○</td><td class="c3"><select class="vv">
<?php for($i=0;$i<count($article);$i++){ ?>
<option value="<?=$article[$i]["id"]?>"><?=$article[$i]["title"]?></option>
<?php } ?>
</select><span class="spl">(Integer) </span></td></tr>
</table>
<span class="btns">ブックマーク削除</span>
</div>

<div class="apibox api11 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ページID</th><td class="c2">○</td><td class="c3"><select class="vv" id="articlesl">
<?php for($i=0;$i<count($article);$i++){ ?>
<option value="<?=$article[$i]["id"]?>"><?=$article[$i]["title"]?></option>
<?php } ?>
</select><span class="spl">(Integer) </span></td></tr>
<tr><th>コメントID</th><td class="c2">-</td><td class="c3">
<select class="vv" id="articlecomment">
<option value="0">記事へコメント</option>
<?php

$sql=sprintf("select id,comment,(select title from repo_n where id=userid) as user from u_comment where pageid=%s and commentid=0 and flag=1",$article[0]["id"]);
$o->query($sql);

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"><?=$f["user"]?>：<?=mb_substr($f["comment"],0,25)?></option>
<?php } ?>
</select><span class="spl">(Integer) ※コメントへのリプライの場合のみ指定</span></td></tr>
<tr><th>コメント</th><td class="c2">○</td><td class="c3"><textarea id="commentbody" rows="5" style="width:500px;"></textarea><br><span class="spl">(String)</span></td></tr>
</table>
<span class="btns">コメント投稿</span>
</div>

<div class="apibox api12 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ページID</th><td class="c2">不要</td><td class="c3"><select class="vv" id="articlesl2">
<?php for($i=0;$i<count($article);$i++){ ?>
<option value="<?=$article[$i]["id"]?>"><?=$article[$i]["title"]?></option>
<?php } ?>
</select><span class="spl">※コメント表示させるために選択するようにしています </span></td></tr>
<tr><th>コメントID</th><td class="c2">○</td><td class="c3">
<select class="vv" id="articlecomment2">
<?php

$sql=sprintf("select id,comment,(select title from repo_n where id=userid) as user from u_comment where pageid=%s and commentid=0 and flag=1",$article[0]["id"]);
$o->query($sql);
while($f=$o->fetch_array()){
	$p[]=$f;
}

for($i=0;$i<count($p);$i++){
	$s[]=sprintf("<option value=\"%s\">%s：%s</option>",$p[$i]["id"],$p[$i]["user"],mb_substr($p[$i]["comment"],0,25));
	
	$sql=sprintf("select id,(select title from repo_n where id=userid) as username,comment,regitime from u_comment where commentid=%s and flag=1 order by regitime desc",$p[$i]["id"]);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s[]=sprintf("<option value=\"%s\">　%s：%s</option>",$f["id"],$f["username"],mb_substr($f["comment"],0,25));
	}
	
}

echo implode("",$s);

?>
</select><span class="spl">(Integer)</span></td></tr>
<tr><th>タイプ</th><td class="c2">○</td><td class="c3"><input type="text" value="" class="vv type in" placeholder="type" style="width:200px"><span class="spl">(String)　[good | bad]</span></td></tr>
</table>
<span class="btns">good,badする</span>
</div>

<div class="apibox api13 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>コメントID</th><td class="c2">○</td><td class="c3">
<select class="vv" id="articlecomment3">
<?php

$sql="select t1.id,commentid,(select title from repo_n where id=userid) as user,reaction,pageid,comment from (select * from u_reaction) as t1,(select id,pageid,comment from u_comment where flag=1) as t2 where t1.commentid=t2.id";
$o->query($sql);

while($f=$o->fetch_array()){

?>
<option value="<?=$f["commentid"]?>" class="rc<?=$f["reaction"]?>"><?=$f["user"]?>：[<?=$f["reaction"]==1?"good":"bad"?>]：<?=mb_substr($f["comment"],0,25)?></option>
<?php } ?>
</select><span class="spl">(Integer)　※投稿者とログインユーザが一致する場合のみ削除できます。</span></td></tr>
</table>
<span class="btns">good,bad削除</span>
</div>

<div class="apibox api14 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>コメントID</th><td class="c2">○</td><td class="c3">
<select class="vv">
<?php

$sql="select id,comment,pageid,username,(case when itime is not null then itime else regitime end) as rtime,itime from (select id,pageid,(select title from repo_n where id=userid) as username,comment,regitime,(select max(regitime) from u_comment as t1 where t1.commentid=u_comment.id) as itime from u_comment where commentid=0 and flag=1) as t2 order by rtime desc";
$o->query($sql);

while($f=$o->fetch_array()){
	$p[]=$f;
}

for($i=0;$i<count($p);$i++){

?>
<option value="<?=$p[$i]["pageid"]?>:<?=$p[$i]["id"]?>"><?=$p[$i]["username"]?>：<?=mb_substr($p[$i]["comment"],0,25)?></option>
<?php
	if(strlen($p[$i]["itime"])>0){
		$sql=sprintf("select id,(select title from repo_n where id=userid) as username,comment,regitime from u_comment where commentid=%s and flag=1 order by regitime desc",$p[$i]["id"]);
		$o->query($sql);
		
		while($f=$o->fetch_array()){
?>
<option value="<?=$p[$i]["pageid"]?>:<?=$p[$i]["id"]?>:<?=$f["id"]?>">　<?=$f["username"]?>：<?=mb_substr($f["comment"],0,25)?></option>
<?php } ?>
<?php } ?>
<?php } ?>
</select><span class="spl">(Integer) ※/api/v1/comments/article/{article_id}{/commend_id}{/reply_id}</span></td></tr>
</table>
<span class="btns">コメント削除</span>
</div>


<div class="apibox api15 clearfix pt20"><table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>


<div class="apibox api16 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>ユーザID</th><td class="c2">○</td><td class="c3">
<select class="vv">
<?php

$sql="select id,title,a15 from repo_n where qid=2 and flag=1 order by cid,n";
$o->query($sql);

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"><?=$f["title"]?></option>
<?php } ?>
</select><span class="spl">(Integer)</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api17 clearfix pt20">
<span class="btns">データを確認</span>
</div>

<div class="apibox api18 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>カテゴリーID</th><td class="c2">○</td><td class="c3">
<select class="vv" id="categorys" size="10" multiple>
<?php

$sql="select id,name from pm_ where cid=20 and flag=1 order by cid,n";
$o->query($sql);

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"><?=$f["name"]?></option>
<?php } ?>
</select><span class="spl">(Integer)</span></td></tr>
</table><span class="btns">データを更新</span>
</div>

<div class="apibox api19 clearfix pt20"><table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api20 clearfix pt20"><table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>オフセット</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv offset in" placeholder="offset" style="width:50px"><span class="spl">(Integer)　※セットされていなければ0</span></td></tr>
<tr><th>レングス</th><td class="c2">-</td><td class="c3"><input type="text" value="" class="vv length in" placeholder="length" style="width:50px"><span class="spl">(Integer)　※セットされていなければ10</span></td></tr>
</table>
<span class="btns">データを確認</span>
</div>

<div class="apibox api21 clearfix pt20">
<span class="btns">データを確認</span>
</div>


<div class="apibox api22 clearfix pt20">
<form enctype="multipart/form-data">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>メールアドレス</th><td class="c2">-</td><td class="c3"><input type="text" name="email" value="" class="vv offset in" placeholder="" style="width:250px"><span class="spl">(String)</span></td></tr>
<tr><th>パスワード</th><td class="c2">-</td><td class="c3"><input type="password" name="password" value="" class="vv length in" placeholder="" style="width:250px"><span class="spl">(String)</span></td></tr>
<tr><th>名前</th><td class="c2">-</td><td class="c3"><input type="text" name="name" value="" class="vv offset in" placeholder="" style="width:250px"><span class="spl">(String)</span></td></tr>
<tr><th>プロフィール</th><td class="c2">-</td><td class="c3"><textarea id="commentbody" name="bio" class="vv" rows="5" style="width:500px;"></textarea><span class="spl">(String)</span></td></tr>
<tr><th>アイコン</th><td class="c2">-</td><td class="c3"><input type="file" name="profile_picture" class="vv" value=""><span class="spl">(Img [jpg, png, gif])</span><div class="img"><img src=""></div></td></tr>
</table>
</form>
<span class="btns">データを確認</span>
</div>

<div class="apibox api23 clearfix pt20">
<span class="btns">データを確認</span>
</div>


<div class="apibox api24 clearfix pt20">
<form enctype="multipart/form-data">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>メールアドレス</th><td class="c2">○</td><td class="c3"><input type="text" name="email" value="" class="vv offset in" placeholder="" style="width:250px"><span class="spl">(String)</span></td></tr>
<tr><th>パスワード</th><td class="c2">○</td><td class="c3"><input type="password" name="password" value="" class="vv length in" placeholder="" style="width:250px"><span class="spl">(String) ※8文字以上の英数字で入力してください。</span></td></tr>
<tr><th>名前</th><td class="c2">○</td><td class="c3"><input type="text" name="name" value="" class="vv offset in" placeholder="" style="width:250px"><span class="spl">(String)</span></td></tr>
<tr><th>プロフィール</th><td class="c2">-</td><td class="c3"><textarea name="bio" class="vv" rows="5" style="width:500px;"></textarea><span class="spl">(String)</span></td></tr>
<tr><th>アイコン</th><td class="c2">-</td><td class="c3"><input type="file" name="profile_picture" class="vv" value=""><span class="spl">(Img [jpg, png, gif])</span></td></tr>
<tr><th>興味のある<br>カテゴリー</th><td class="c2">-</td><td class="c3"><ul class="clearfix">
<?php

$sql="select id,name from pm_ where cid=20 and flag=1 order by n";
$o->query($sql);

while($f=$o->fetch_array()){

?>
<li><input type="checkbox" value="<?=$f["id"]?>" name="interest[]" id="l<?=$f["id"]?>"><label for="l<?=$f["id"]?>"><?=$f["name"]?></label></li>
<?php } ?>
</ul></td></tr>
</table>
</form>
<span class="btns">データを確認</span>
</div>


<div class="apibox api25 clearfix pt20">
<table>
<tr class="thead"><th class="c1">項目名</th><td class="c2"><b>必須</b></td><td class="c3"><b>値</b></td></tr>
<tr><th>メールアドレス</th><td class="c2">○</td><td class="c3"><input type="text" name="email" value="" class="vv offset in" placeholder="" style="width:250px"><span class="spl">(String)</span></td></tr>
<tr><th>パスワード</th><td class="c2">○</td><td class="c3"><input type="password" name="password" value="" class="vv length in" placeholder="" style="width:250px"><span class="spl">(String) ※8文字以上の英数字で入力してください。</span></td></tr>
</table>
<span class="btns">ログイン</span>
</div>

<div class="apibox api26 clearfix pt20">
<span class="btns">お知らせ既読化</span>
</div>

<div class="apibox api27 clearfix pt20">
<span class="btns">退会する</span>
</div>

<div class="apibox api28 clearfix pt20">
<span class="btns">データを確認</span>
</div>


</div>

<pre></pre>


</body>
</html>
