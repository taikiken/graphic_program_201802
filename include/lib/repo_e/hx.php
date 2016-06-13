<?php if(($q->get_dir()===0||$q->get_dir()===1)&&($q->get_file()===0)){ ?>
<tr>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields">
<?php if($q->get_dir()===0){ ?>
<script language="javascript">
var eurl=".?<?=$g->g_url('types')?>&types=";
$(function(){

	var s=<?=$_GET["types"]?>;
	$(".expbox div").css({left:(s*117)+"px"});
	$(".expbox li").click(function(){
		document.location.href=eurl+$(this).index();
	});

	$("#p_types").change(function(){
		var v=$(":selected",this).val();
		if(v!=""){
			var oc=[];
			var occupy=0;
			if(v==0||v==1){
				oc[0]=$("[name='p_title']").val();
			}else if(v==2){
				oc[0]=$("[name='media']").val();
				oc[1]=$("[name='p_title']").val();
				oc[2]=$("[name='p_link']").val();
			}else if(v==3){
				oc[0]=$("[name='media']").val();
				oc[1]=$("[name='p_title']").val();
			}else if(v==4){
				oc[0]=$("[name='p_media']").val();
				oc[1]=$("[name='col']").val();
			}
			for(var i=0;i<oc.length;i++){
				if(oc[i]){
					occupy=1;
					break;
				}
			}
			
			if(occupy==1){
				if(window.confirm('コンテンツ入力中にブロックタイプを変更するとデータが削除されてしまいます。\nブロックタイプを変更しますか？')){
					document.location.href=eurl+v;
				}
			}else{
				document.location.href=eurl+v;
			}
		}
	});

});
</script>
<select name="p_types" id="p_types">
<?php
for($QX=0;$QX<count($contentsEditorTypes);$QX++){
	if(strlen($contentsEditorTypes[$QX])>0)echo sprintf("<option value=\"%s\"%s>%s</option>",$QX,($TYPES==$QX)?" selected":"",$contentsEditorTypes[$QX]);
}
?>
</select>　登録するコンテンツブロックのタイプを選択してください。
<?php }else{ ?>
<b><?=$contentsEditorTypes[$TYPES]?></b> ※ブロックタイプの編集はできません。
<?php } ?>
</td>
</tr>
<?php }elseif(($q->get_dir()===0||$q->get_dir()===1)&&($q->get_file()===1)){ ?>
<tr>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields"><?=$contentsEditorTypes[$_GET["types"]]?></td>
</tr>
<?php }elseif($q->get_dir()==2){ ?>
<tr>
<td class="confTitle">ブロックタイプ</td>
<td class="confFields"><?=$contentsEditorTypes[$_GET["types"]]?></td>
</tr>
<?php } ?>