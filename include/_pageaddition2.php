
<?php if($q->get_dir()==0){ ?>
<?php if($q->get_file()!==2){ ?>
<?php

unset($_COMMENT);
$POSITION=array("一覧の最初に追加","一覧の最後に追加");
$d_name="ページ追加オプション";

if(!isset($_POST["POSITION"])){
	$_POST["POSITION"]=($CURRENTDIRECTORY=="repo_n")?0:1;
}

?>
<tr>
<th colspan="2" class="inputHeader" scope="row"><?=$d_name?></th>
</tr>
<?php } ?>
<?php if($q->get_file()==0){ ?>
<tr>
<td rowspan="2" class="inputTitle"><?=$d_name?></td>
<td class="inputFields"><?php for($I=0;$I<count($POSITION);$I++){ ?><input type="radio" class="box" name="POSITION" value="<?=$I?>" id="POT<?=$I?>"<?php if(strlen($_POST["POSITION"])>0){if($_POST["POSITION"]==$I)echo " checked"; }else{if($I==0)echo " checked";} ?> ><label for="POT<?=$I?>"><?=$POSITION[$I]?></label><?php } ?></td>
</tr>
<tr>
<td class="inputCap">エントリを追加する位置を一覧の最初か最後か選択してください。デフォルト状態では一番<?=($CURRENTDIRECTORY=="repo_n")?"最初":"最後"?>に追加されます。</td>
</tr>
<?php }elseif($q->get_file()==1){ ?>
<tr>
<td class="confTitle"><?=$d_name?></td>
<td class="confFields"><?=$POSITION[$_POST["POSITION"]]?><input type="hidden" name="POSITION" value="<?=$_POST["POSITION"]?>" ></td>
</tr>
<?php } ?>
<?php }elseif($q->get_dir()==1){ ?>
<?php if($q->get_file()==0){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr>
<td rowspan="2" class="inputTitle">順番並び替え</td>
<td class="inputFields"><?php

$sql=sprintf("select id,types,n from repo_e where nid=%s order by n",$_GET["nid"]);
$o->query($sql);
while($f=$o->fetch_array()){
	$SOPT[]=$f;
}

?><select name="POSITION" style="width:760px;"><?=echoBlockContents2($SOPT)?></select></td>
</tr>
<tr>
<td class="inputCap">このエントリを選択されたエントリの次の順番に並び替えを行います。</td>
</tr>
<?php }elseif($q->get_file()==1){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr>
<td class="confTitle">順番並び替え</td>
<td class="confFields"><?php

if($_POST["POSITION"]==""){
	echo "順番並び替えしない";
}else{
	$sql=sprintf("select id,types,n from repo_e where id=%s order by n",$_POST["POSITION"]);
	$o->query($sql);
	$f=$o->fetch_array();
	echo sprintf("%s:%sの次に移動",$f["n"],$contentsEditorTypes[$f["types"]]);
}

?><input type="hidden" name="POSITION" value="<?=$_POST["POSITION"]?>"></td>
</tr>
<?php } ?>
<?php }?>