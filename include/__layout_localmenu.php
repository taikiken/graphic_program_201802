<ul class="controllMenu clearfix">
<?php if($CURRENTDIRECTORY=="repo_n"){ ?>
	<?php if($SEARCHS==70){ ?>
	<li class="ds"><a href="./search/?<?=$g->g_url()?>">絞り込み検索</a></li>
    <?php } ?>
	<?php if($_GET["cid"]==1){ ?>
<!--
<li class="ds"><a href="./search/?<?=$g->g_url()?>">検索</a>　｜　</li>
-->
<li>並び替え：<select class="orderby">
<?php

$ob=array(array("snew","　公開日新しい順　"),array("sold","　公開日古い順　"),array("","　登録順　"));
$c=!isset($_COOKIE["orderby"])?"snew":$_COOKIE["orderby"];

for($i=0;$i<count($ob);$i++){

?>
<option value="<?=$ob[$i][0]?>"<?=$c==$ob[$i][0]?" selected=\"selected\"":""?>><?=$ob[$i][1]?></option>
<?php } ?>
</select>
　｜
</li>

<li>抽出：<select class="exuser" style="width:350px;">
<?php
if(false === empty(getSorC('is_external')) && false === empty(getSorC('u_media')))
{
    $sql="select id,(select name from repo where id=u_media.cid) as name,title from u_media where flag=1 and cid = 3 AND id IN (" . getSorC('u_media') . ") order by cid,id";
}
else
{
    $sql="select id,(select name from repo where id=u_media.cid) as name,title from u_media where flag=1 order by cid,id";
}
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

$sql="select id,name,n,(case when num1 is not null then num1 else 0 end)+(case when num2 is not null then num2 else 0 end) as num from (select id,name,n from u_categories order by n) as t0 left join (select m1,count(m1) as num1 from repo_n where cid=1 and m1 is not null group by m1) as t1 on t0.id=t1.m1 left join (select m2,count(m2) as num2 from repo_n where cid=1 and m2 is not null group by m2) as t2 on t0.id=t2.m2 order by n;";
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

<?php } elseif ($_GET["cid"] == 94) { ?>
  <?php // 選手一覧のパターン ?>
  <li>並び替え：<select class="orderby_p">
    <?php
      $ob = array(array("sold", "　登録の昇順　"), array("snew", "　登録の降順　"));
      $c = !isset($_COOKIE["orderby_p"]) ? "sold" : $_COOKIE["orderby_p"];

      for ($i=0; $i<count($ob); $i++) {
    ?>
    <option value="<?= $ob[$i][0] ?>"<?= $c == $ob[$i][0] ? " selected=\"selected\"" : "" ?>><?= $ob[$i][1] ?></option>
    <?php } ?>
  </select>
  　｜
  </li>

  <li>抽出：<select class="excategory_p">
    <?php
    	$c = !isset($_COOKIE["excategory_p"]) ? 0 : $_COOKIE["excategory_p"];
		echo sprintf("<option value=\"\"%s>　すべてのカテゴリー</option>", $c==0 ? " selected=\"selected\"" : "");

		// カテゴリー一覧を取得
		$sql = "SELECT id, name, n FROM u_categories ORDER BY n";
		$o->query($sql);

		$o2 = new db;
		while ($f=$o->fetch_array())
		{
			// カテゴリー毎に、選手テーブルに登録されているデータ件数を取得
			$sql = "SELECT COUNT(id) AS num FROM tbl_player WHERE category LIKE '%" . $f["id"] . "%'";
			$o2->query($sql);
			$f2 = $o2->fetch_array();
	?>
			<option value="<?= $f["id"] ?>"<?= $c == $f["id"] ? " selected=\"selected\"" : "" ?>>　<?= $f["name"] ?>(<?= $f2["num"] ?>)</option>
	<?php
		}
		unset($o2); ?>
	<option value="a"<?= $c === "a" ? " selected=\"selected\"" : ""?>>　指定なし</option>


  </select>
  </li>

  <?php } ?>
<?php }elseif($CURRENTDIRECTORY=="repo_e"){ ?>

	<?php if($N>0){ ?>
	<li class="ds"><a href="<?=$domain?><?=str_replace("{lang}",$_COOKIE["lang"]."/",$PREVIEW)?>" target="_blank">ページブロック全体のプレビュー</a></li>
	<?php }else{ ?>
    <!--
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
    -->
	<?php } ?>
<!--	<li class="ds"><a href="./editall/?<?=$g->g_url()?>" target="_blank">一括編集</a></li>-->
<?php }elseif($CURRENTDIRECTORY=="mail_"){ ?>
	<?php if($N>0){ ?>
	<li class="ds"><a href="../mail/preview/?fid=<?=$g->f("cid")?>" target="_blank">フォームブロック全体のプレビュー</a></li>
	<?php } ?>
<?php }elseif($CURRENTDIRECTORY=="pm_"){ ?>
	<!--<li class="ds"><a href="./import/?<?=$g->g_url()?>">一括インポート</a></li>-->
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
<?php }elseif($CURRENTDIRECTORY=="notice"){ ?>
  <!--
<li class="ds"><a href="./search/?<?=$g->g_url()?>">検索</a>　｜　</li>
-->

  </li>

  <li><select class="excategory">
      <?php

      $c=!isset($_COOKIE["excategory"])?0:$_COOKIE["excategory"];

      ?>
      <option value="a"<?=$c==="a"?" selected=\"selected\"":""?>>　すべてのカテゴリ</option>
      <option value="0"<?=$c==="0"?" selected=\"selected\"":""?>>　デフォルト</option>
      <?php

      $sql=<<<EOL
SELECT 
        id,name,n,
        (CASE WHEN num1 IS NOT NULL THEN num1 ELSE 0 end) AS num 
FROM 
        (SELECT id,name,n FROM u_categories ORDER BY n ) AS t0 
LEFT JOIN 
        (SELECT category_id,count(category_id) AS num1 
FROM
        categories_notices 
        
GROUP BY
        category_id) AS t1 
ON 
        t0.id=t1.category_id
ORDER BY
        n;
EOL;

      $o->query($sql);
      while($f=$o->fetch_array()){

        ?>
        <option value="<?=$f["id"]?>"<?=$c==$f["id"]?" selected=\"selected\"":""?>>　<?=$f["name"]?>(<?=$f["num"]?>)</option>
      <?php } ?>
    </select>
  </li>
<?php } ?>
</ul>
