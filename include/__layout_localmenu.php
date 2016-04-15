<ul class="controllMenu clearfix">
<?php if($CURRENTDIRECTORY=="repo_n"){ ?>
	<?php if($SEARCHS==70){ ?>
	<li class="ds"><a href="./search/?<?=$g->g_url()?>">絞り込み検索</a></li>
    <?php } ?>
	<?php if($_GET["cid"]==1){ ?>
<li class="ds"><a href="./search/?<?=$g->g_url()?>">検索</a></li>
<li>　｜　並び替え：<select class="orderby">
<?php

$ob=array(array("","　登録順　"),array("snew","　公開日新しい順　"),array("sold","　公開日古い順　"));
$c=!isset($_COOKIE["orderby"])?"":$_COOKIE["orderby"];

for($i=0;$i<count($ob);$i++){

?>
<option value="<?=$ob[$i][0]?>"<?=$c==$ob[$i][0]?" selected=\"selected\"":""?>><?=$ob[$i][1]?></option>
<?php } ?>
</select>
　｜
</li>

<li>抽出：<select class="exuser">
<?php

$sql="select id,(select name from repo where id=u_member.cid) as name,title from u_member where cid in(3,4,5) and flag=1 order by cid,n";
$o->query($sql);

$c=!isset($_COOKIE["exuser"])?"":$_COOKIE["exuser"];

echo sprintf("<option value=\"\"%s>　すべての投稿者</option>",$c==0?" selected=\"selected\"":"");

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"<?=$c==$f["id"]?" selected=\"selected\"":""?>>　<?=$f["name"]."：".$f["title"]?></option>
<?php } ?>
</select>
</li>

<li><select class="excategory">
<?php

$c=!isset($_COOKIE["excategory"])?0:$_COOKIE["excategory"];

?>

<?php

$sql="select id,name,case when num is null then 0 else num end from (select id,name,n from pm_ where cid=20 and flag=1) as t1 left join (select m1,count(m1) as num from repo_n where cid=1 group by m1) as t2 on t1.id=t2.m1 order by n";
$o->query($sql);

echo sprintf("<option value=\"\"%s>　すべてのカテゴリー</option>",$c==0?" selected=\"selected\"":"");

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"<?=$c==$f["id"]?" selected=\"selected\"":""?>>　<?=$f["name"]?>(<?=$f["num"]?>)</option>
<?php } ?>
<option value="a"<?=$c==="a"?" selected=\"selected\"":""?>>　指定なし</option>
</select>
</li>

<!--
    <div class="wmne clearfix">
	<span>CATEGORY</span>
    <select class="selectmenu">
    <option>ALL</option>
    <option>FOOD</option>
    <option>SHOPPING</option>
    <option>HOSPITALITY</option>
    <option>CULTURE</option>
    <option>ENTERTAINMENT</option>
    <option>TRANSPORTATION</option>
    </select>
    </div>
-->
	<?php } ?>
<?php }elseif($CURRENTDIRECTORY=="repo_e"){ ?>

	<?php if($N>0){ ?>
	<li class="ds"><a href="<?=str_replace("{lang}",$_COOKIE["lang"]."/",$PREVIEW)?>" target="_blank">ページブロック全体のプレビュー</a></li>
	<?php }else{ ?>
    <li>
    <select name="usrselection" onchange="chg_form(this.value)">
	<option value="">他のページをテンプレートとしてブロックを作成する</option>
    <?php
    
		$SQL=sprintf("select id,title from repo_n where cid=%s and id!=%s and fulltext is not null order by n",$_GET["cid"],$_GET["nid"]);
		$o->query($SQL);
		
		while($f=$o->fetch_array()){
	
	?>
    <option value="<?=$f["id"]?>"><?=mod_HTML($f["title"])?></option>
    <?php } ?>
    </select><script language="javascript">function chg_form(c){if(c!="")document.location.href=".?<?=$g->g_url()?>&template="+c;}</script>
    </li>
	<?php } ?>
<!--	<li class="ds"><a href="./editall/?<?=$g->g_url()?>" target="_blank">一括編集</a></li>-->
<?php }elseif($CURRENTDIRECTORY=="mail_"){ ?>
	<?php if($N>0){ ?>
	<li class="ds"><a href="../mail/preview/?fid=<?=$g->f("cid")?>" target="_blank">フォームブロック全体のプレビュー</a></li>
	<?php } ?>
<?php }elseif($CURRENTDIRECTORY=="pm_"){ ?>
	<li class="ds"><a href="./import/?<?=$g->g_url()?>">一括インポート</a></li>
<?php }elseif($CURRENTDIRECTORY=="repo_edit"){ ?>
<?php echo $LOCALLIST; ?>
<?php }elseif($CURRENTDIRECTORY=="log"){ ?>
<?php if(getSorC("alv")==51){ ?>
<li>
<select name="usrselection" onchange="chg_form(this.value)">
<option value="">すべてのログを表示する</option>
<?php

	if(getSorC("mid")!=1){
		$sql="select usr from authentic where usr!='psychsa'";
	}else{
		$sql="select usr from authentic";
	}
	$o->query($sql);

	while($f=$o->fetch_array()){

?>
<option value="<?=$f["usr"]?>" <?php if($_GET["usr"]==$f["usr"])echo " selected=\"selected\""; ?>><?=$f["usr"]?>のログを表示する</option>
<?php } ?>
</select><script language="javascript">
	function chg_form(c){
	if(c!="")document.location.href=".?usr="+c;
	else document.location.href=".";
}</script></li>
<?php } ?>
<li class="ds"><a href="?<?=$g->g_url()?>&types=1">エラーログのみを表示する</a></li>
<?php if(getSorC("alv")==51){ ?>
<li class="ds"><a href="./edit/">すべてのログをCSVダウンロード</a></li>
<li class="ds"><a href="./delete/">すべてのログを削除する</a></li>
<?php } ?>
<?php }elseif($CURRENTDIRECTORY=="mail"){ ?>
<?php if(getSorC("formedit")==1){ ?>
<li><select name="template" onchange="chg_form(this.value)">
<option value="">フォームをテンプレートから作成する</option>
<?php

$SQL="select id,subject from mailtemplate where flag=1 order by n";
$o->query($SQL);

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"><?=mod_HTML($f["subject"])?></option>
<?php } ?>
</select><script language="javascript">
	function chg_form(c){
	if(c!="")document.location.href=".?<?=$g->g_url()?>&from=1&template="+c;
}</script></li>
<?php } ?>
<?php }elseif($CURRENTDIRECTORY=="mailtemplate"){ ?>
<li><select name="template" onchange="chg_form(this.value)">
<option value="">既存フォームからテンプレートを作成する</option>
<?php

$SQL="select id,subject from mail order by n";
$o->query($SQL);

while($f=$o->fetch_array()){

?>
<option value="<?=$f["id"]?>"><?=mod_HTML($f["subject"])?></option>
<?php } ?>
</select><script language="javascript">
	function chg_form(c){
	if(c!="")document.location.href=".?<?=$g->g_url()?>&template="+c;
}</script></li>
<?php } ?>
</ul>