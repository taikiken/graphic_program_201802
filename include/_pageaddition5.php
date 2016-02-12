<?php

unset($_COMMENT);
$POSITION=array("一覧の最初に追加","一覧の最後に追加");
$d_name="順番並び替えオプション";

if(!isset($_POST["POSITION"])){
	$_POST["POSITION"]=($CURRENTDIRECTORY=="repo_n")?0:1;
}

$rT=$_GET["cid"];

?>
<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0||$q->get_file()==1){ ?>
	<tr class="cellid<?=$III?>">
	<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
	</tr>
	<tr class="cellid<?=$III?>">
	<th colspan="2" class="inputHeader" scope="row"><?=$d_name?></th>
	</tr>
	<?php if($q->get_file()==0){ ?>
		<tr class="cellid<?=$III?>">
		<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
		</tr>
		<tr class="cellid<?=$III?>">
		<td rowspan="2" class="inputTitle">順番並び替え</td>
		<td class="inputFields"><?php
		
		$sql=sprintf("select id,id||'：'||%s as name,n from repo_n where cid=%s order by n",multiLangTitle("title"),$rT);
		$o->query($sql);
		while($f=$o->fetch_array()){
			$SOPT[]=$f;
		}
		
		?><select name="POSITION" style="width:760px;"><?=echoBlockContents4($SOPT)?></select></td>
		</tr>
		<tr class="cellid<?=$III?>">
		<td class="inputCap">このエントリを選択されたエントリの次の順番に並び替えを行います。</td>
		</tr>
	<?php }elseif($q->get_file()==1){ ?>
		<tr class="cellid<?=$III?>">
		<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
		</tr>
		<tr class="cellid<?=$III?>">
		<td class="confTitle">順番並び替え</td>
		<td class="confFields"><?php
		
		if($_POST["POSITION"]==""){
			echo "順番並び替えしない";
		}else{
			$sql=sprintf("select id||'：'||%s as name from repo_n where id=%s",multiLangTitle("title"),$_POST["POSITION"]);
			$o->query($sql);
			$f=$o->fetch_array();
			echo $f["name"];
			echo " の次に移動";
		}
		
		?><input type="hidden" name="POSITION" value="<?=$_POST["POSITION"]?>"></td>
		</tr>
	<?php } ?>
	<?php } ?>
<?php }?>