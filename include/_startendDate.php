<?php if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php } ?>
<?php $HEADERFLAG=0; ?>
<?php if($q->get_file()!=2){ ?>
<tr>
<td <?=$q->get_file()==0 ? "rowspan=\"2\"":""?> class="<?=$q->get_file()==0 ? "input":"conf"?>Title"><?=$d_name?></td>
<td class="<?=$q->get_file()==0 ? "input":"conf"?>Fields">
<?php

$f_name=fieldsplit($f_name);

for($lsla=0;$lsla<2;$lsla++){
	$FIELDNAMES=$f_name[$lsla];
	$SIZE=$lsla;
	include $INCLUDEPATH."_date2.php";
	if($lsla==0)echo "～";
}
?>
</td>
</tr>
<?php if($q->get_file()==0){ ?>
<tr>
<td class="inputCap"><?=$d_name?>を選択してください。</td>
</tr>
<?php } ?>
<?php } ?>