<?php if(($q->get_dir()===0||$q->get_dir()===1)&&($q->get_file()===0)){ ?>
<tr>

<?php if(count($contentsEditorTypes)!=1){ ?>
<td rowspan="2" class="inputTitle">ブロックタイプ</td>
<td class="inputFields">
<?php }else{ ?>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields">
<?php } ?>
<?php if(count($contentsEditorTypes)!=1){ ?>
<script language="javascript">
var eurl=".?<?=$g->g_url('types')?>&types=";
	get_action=function(v){
	if(v!="")document.location.href=eurl+v;
}
$(function(){
	var s=<?=$_GET["types"]?>;
	$(".expbox div").css({left:(s*117)+"px"});
	$(".expbox li").click(function(){
		document.location.href=eurl+$(this).index();
	});
});
</script>

<select name="p_types" id="p_types" onchange="get_action(this.value)">
<?php for($QX=0;$QX<count($contentsEditorTypes);$QX++){ ?>
<?php if(strlen($contentsEditorTypes[$QX])>0){ ?>
<option value="<?=$QX?>"<?php if($TYPES==$QX)echo " selected"; ?>><?=$contentsEditorTypes[$QX]?></option>
<?php } ?>
<?php } ?>
</select>　<?php echo $q->get_dir()===0?"登録":"変更" ?>するコンテンツブロックのタイプを選択してください。
<?php }else{ ?>
<?=mod_HTML($contentsEditorTypes[0])?><input type="hidden" name="p_types" value="0" >
<?php } ?>
</td>
</tr>
<?php if(count($contentsEditorTypes)!=1&&$_GET["cid"]!=25){ ?>
<tr>
<td class="inputCap"><div class="expbox"><div>&nbsp;</div><ul class="clearfix">
<li><img src="/shared/cms/img/type0.png" width="112" height="88" alt=""></li>
<li><img src="/shared/cms/img/type1.png" width="112" height="88" alt=""></li>
<li><img src="/shared/cms/img/type2.png" width="112" height="88" alt=""></li>
<li><img src="/shared/cms/img/type3.png" width="112" height="88" alt=""></li>
<li><img src="/shared/cms/img/type4.png" width="112" height="88" alt=""></li>
<li><img src="/shared/cms/img/type5.png" width="112" height="88" alt=""></li>
<li><img src="/shared/cms/img/type6.png" width="112" height="88" alt=""></li>
</ul></div></td>
</tr>
<?php } ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php }elseif(($q->get_dir()===0||$q->get_dir()===1)&&($q->get_file()===1)){ ?>
<tr>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields"><?=$contentsEditorTypes[$sv["p_types"]]?></td>
</tr>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php }else{ ?>

<?php if($q->get_dir()==2&&$q->get_file()===0){ ?>
<tr>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields"><?=$contentsEditorTypes[$p["types"]]?></td>
</tr>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php }elseif($q->get_dir()==2&&$q->get_file()===0){ ?>
<tr>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields"><?=$contentsEditorTypes[$_POST["types"]]?></td>
</tr>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php } ?>
<?php } ?>