<?php
if($q->get_file()===2&&!$e){
	if($DEBUGMODE==0)echo sprintf("<script type=\"text/javascript\">document.location.href='%s%s/?%s';</script>",$ADPATH,$CURRENTDIRECTORY,$g->g_url("types,".$EDITDELETEINITIAL."id,c,search"));
}
?>


<?php if($q->get_dir()===0){ ?>

<?php if($q->get_file()===0){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_input.gif" alt="入力した内容を確認する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php if(($CURRENTDIRECTORY=="repo_n")&&$META!=111){ ?><script type="text/javascript">chgExpire(54)</script><?php } ?>
<?php }elseif($q->get_file()===1){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left" class="bg2"><a href="javascript:go_back('.?<?=$g->g_url()?>')"><img src="/shared/cms/img/btn_modify.gif" alt="エントリの内容を修正する" width="150" height="25" class="rollover2"></a></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_input2.gif" alt="このエントリを確定する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php echo "<input type=\"hidden\" name=\"back\" value=\"1\" >\n";@echo_hidden($sv); ?>
<?php }elseif($q->get_file()===2){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><a href="<?=$ADPATH?><?=$CURRENTDIRECTORY?>/?<?=$g->g_url("types,".$EDITDELETEINITIAL."id,c,search")?>"><img src="/shared/cms/img/btn_returntop.gif" alt="ディレクトリのトップへ戻る" width="150" height="25" class="rollover2"></a></td>
</tr>
</table>
<?php } ?>

<?php }elseif($q->get_dir()===1){ ?>

<?php if($q->get_file()===0){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"<?php if($_POST["search"]==1){ ?> class="bg2"<?php } ?>><?php if($_POST["search"]==1){ ?>
<script type="text/javascript">
function searchBack(){
	document.ff.action="../search/conf.php?<?=$g->g_url("nid")?>";
	document.ff.method="POST";
	document.ff.submit();
}
</script><a href="javascript:searchBack()"><img src="/shared/cms/img/btn_returnresult.gif" alt="検索一覧へ戻る" width="150" height="25" class="rollover2"></a>
<?php }else{ ?><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ><?php } ?></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_edit.gif" alt="編集した内容を確認する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php if((($CURRENTDIRECTORY=="repo_n"&&$p["oc"]!=55)||($CURRENTDIRECTORY=="repo_s"&&$p["oc"]!=55))&&$META!=111){ ?><script type="text/javascript">chgExpire(54)</script><?php } ?>
<?php }elseif($q->get_file()===1){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left" class="bg2"><a href="javascript:go_back('.?<?=$g->g_url()?>')"><img src="/shared/cms/img/btn_modify.gif" alt="エントリの内容を修正する" width="150" height="25" class="rollover2"></a></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_edit2.gif" alt="エントリの編集を確定する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php echo "<input type=\"hidden\" name=\"back\" value=\"1\" >\n";@echo_hidden($sv); ?>
<?php }elseif($q->get_file()===2){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><a href="<?=$ADPATH?><?=$CURRENTDIRECTORY?>/?<?=$g->g_url("types,".$EDITDELETEINITIAL."id,c,search")?>"><img src="/shared/cms/img/btn_returntop.gif" alt="ディレクトリのトップへ戻る" width="150" height="25" class="rollover2"></a></td>
</tr>
</table>
<?php } ?>

<?php }elseif($q->get_dir()===2){ ?>

<?php if($q->get_file()===0){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left" class="bg2"><a href="../edit/?<?=$g->g_url()?>"><img src="/shared/cms/img/btn_modify.gif" alt="エントリの内容を修正する" width="150" height="25" class="rollover2"></a></td>
<td width="160" align="left" class="bg2"><a href="<?=$ADPATH?><?=$CURRENTDIRECTORY?>/?<?=$g->g_url("types,".$EDITDELETEINITIAL."id,c")?>"><img src="/shared/cms/img/btn_stop.gif" alt="エントリの削除を中止する" width="150" height="25" class="rollover2"></a></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_delete.gif" alt="このエントリを削除する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php @echo_hidden($p); ?>
<?php }elseif($q->get_file()===1){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left" class="bg2"><a href="../edit/?<?=$g->g_url()?>"><img src="/shared/cms/img/btn_modify.gif" alt="エントリの内容を修正する" width="150" height="25" class="rollover2"></a></td>
<td width="160" align="left" class="bg2"><a href="<?=$ADPATH?><?=$CURRENTDIRECTORY?>/?<?=$g->g_url("types,".$EDITDELETEINITIAL."id,c")?>"><img src="/shared/cms/img/btn_stop.gif" alt="エントリの削除を中止する" width="150" height="25" class="rollover2"></a></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_delete2.gif" alt="エントリの削除を確定する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php }elseif($q->get_file()===2){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><a href="<?=$ADPATH?><?=$CURRENTDIRECTORY?>/?<?=$g->g_url("types,".$EDITDELETEINITIAL."id,c,search")?>"><img src="/shared/cms/img/btn_returntop.gif" alt="ディレクトリのトップへ戻る" width="150" height="25" class="rollover2"></a></td>
</tr>
</table>
<?php } ?>


<?php }elseif($q->get_dir()===3){ ?>
<?php if($div>1){ ?>
<table class="numTable">
<?php for($i=0;$i<$div;$i++){ ?>
<?php if(($i%25)==0){ ?><tr><?php } ?>
<?php if($no==$i*$offset){ ?>
<td><a class="activiti"><?php echo $i+1; ?></a></td>
<?php }else{ ?>
<td><a href=".?<?=$g->g_url("no")?>&no=<?php echo $i*$offset; ?>"><?php echo $i+1; ?></a></td>
<?php }?>
<?php if(($i%25)==24){ ?></tr><?php } ?>
<?php } ?>
</table>
<?php } ?>

<?php }elseif($q->get_dir()===4){ ?>
<?php if($q->get_file()===0){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><a href="javascript:go_back('.?<?=$g->g_url()?>')"><img src="/shared/cms/img/btn_searchclear.gif" alt="エントリの内容を修正する" width="150" height="25" class="rollover2"></a></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150"><input name="imageField" type="image" src="/shared/cms/img/btn_search.gif" alt="この条件で検索する" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php }elseif($q->get_file()===1){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><?=@echo_hidden($sv);?><input type="hidden" name="search" value="1" ><a href="javascript:go_back('.?<?=$g->g_url()?>')"><img src="/shared/cms/img/btn_searchchg.gif" alt="検索条件を変更する" width="150" height="25" class="rollover2"></a></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150"><img src="/shared/cms/img/spacer.gif" alt="#" width="150" height="1" ></td>
</tr>
</table>
<?php } ?>

<?php }elseif($q->get_dir()===5){ ?>
<?php if($q->get_file()===0){ ?>
<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150"><input name="imageField" type="image" src="/shared/cms/img/btn_import.gif" alt="データを一括インポートする" width="150" height="25" class="rollover2"></td>
</tr>
</table>
<?php } ?>
<?php } ?>