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
<?php }?>