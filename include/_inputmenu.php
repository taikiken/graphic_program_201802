<?php if(($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==4)&&$q->get_file()==0){  ?>
<tr>
<td class="inputTitle"><?=$d_name?></td>
<td class="inputFields">
<div class="clearfix">
<span class="colrow">列数(横)</span>
<div class="clearfix  fl langs"><input type="text" style="width:70px;" name="col" value="" class="in q2" readonly></div><ul class="rows" style="display:none"><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>選択をクリアする</li></ul>
<span class="colrow2">行数(縦)</span>
<ul class="menucont clearfix"><li class="madd"><a href="javascript://">行を追加</a></li><li class="mdel"><a href="javascript://">行を削除</a></li></ul>
</div>
<div class="inmenu"><?=modInputData($p[$f_name])?><input type="hidden" name="p_<?=$f_name?>" value="<?=mod_HTML($p[$f_name])?>"></div>
<span class="atten">列数・行数決定後、左上の入力欄にエクセルのデータをペーストするとセルのデータが入力エリアに格納されます。<br>表タイトルには項目の先頭に+を付けてください。例）+表タイトル</span>
</td>
</tr>
<script type="text/javascript">
$(function(){

	$(window).keyup(function(e){
		if(event.ctrlKey){
			var keycode=event.keyCode;
			var keychar=String.fromCharCode(keycode).toUpperCase();
			if(keychar=="V")deploy();
		}		
	});
	$(".inmenu textarea:eq(0)").on("blur,change",function(){
		deploy();
	});
	function deploy(){
		if(!$(".pms:eq(0) textarea:eq(0)").val())return;
		if($(".pms:eq(0) textarea:eq(0)").val().match(/\t/)){
			var row=$(".pms").length;
			var col=$(".q2").val()-0;					
			var t=$(".pms:eq(0) textarea:eq(0)").val().replace(/\r\n?/g,"\n").split("\n");
			for(var i=0;i<row;i++){
				t[i]=t[i].split("\t");
				for(j=0;j<col;j++){
					$(".pms:eq("+i+") textarea:eq("+j+")").val(t[i][j]);
				}
			}
		}
		$("textarea").each(function(){
			var v=$(this).val().replace(/(^\s+)|(\s+$)|(\r|\n)/g,"");
			$(this).val(v);
		});	
	}

	$(".rollover2").click(function(){
		var leng=$(".pms").length;
		var leng2=$(".pms:eq(0) textarea").length;
		var l=[];
		for(var i=0;i<leng;i++){
			var m=[];
			for(var j=0;j<leng2;j++){
				var s=$(".pms:eq("+i+") textarea:eq("+j+")").val();
				m[j]=s?s:"&nbsp;";
			}
			l[i]=m.join("\t");
		}
		l=l.join("\n");
		$("[name='p_title']").val(l);
	});

	$("[name='col']").click(function(){

		var leng=$(".pms").length;
		if(leng){
			$(".optionsel,.optionselbg").hide();
			alert("行が存在するので列数は変更できません");
			return;
		}
		
		var n=$(this).attr("name");
		var y=$(this).offset().top+$(this).height()+14;
		var w=$(this).width()+28;
		var x=$(this).offset().left;
		var u=$(".rows").html();		
		var l=$(".rows li").length;
		var h=l<10?l*20:200;
		
		$(".optionsel").html("<ul>"+u+"</ul>").css({zIndex:1000,top:y+"px",left:x+"px",width:w+"px",height:h+"px"}).show();
		var cize=getPageSize();
		$(".optionselbg").css({width:cize[0]-1,height:cize[1]-1}).show().click(function(){
			$(".optionsel").hide();
			$(this).hide();
		});
		$(".optionsel li").hover(
			function(){$(this).css({backgroundColor:"#efefef"});},
			function(){$(this).css({backgroundColor:"#fff"});}
		);
		$(".optionsel li").click(function(){
			var v=$(this).html()!="選択をクリアする"?$(this).html():"";
			$("input[name='"+n+"']").focus().val(v.replace(/\(\d+\)$/,""));
			$(".optionsel,.optionselbg").hide();
		});	
		
	});
	
	var leng=$(".pms").length;
	if(leng>0){
		$("[name='col']").val($(".pms:eq(0) textarea").length);
	}
	
	$(".madd,.mdel").click(function(){
		
		var n=$("[name='col']").val();
		if(n){
			n=n-0;
		}else{
			alert("表の列数を選択してください。");
			return;
		}
		
		if($(this).attr("class")=="madd"){
			
			var leng=$(".pms").length;
			var input='<textarea style="width:%s" name="zzz_%s%s" class="in tt%s" rows="1"></textarea>';
			var list='<div class="pms clearfix">%s</div>';
			
			var e="";
			for(var i=0;i<n;i++){
				e+=sprintf(input,Math.floor(82/n)+"%",leng,i,i);
			}
			var s=sprintf(list,e);
			$(".inmenu").append(s);
		
		}else{
			var l=$(".inmenu div").length-1;
			if($(".inmenu div:eq("+l+") textarea:eq(0)").val()==""&&$(".inmenu div:eq("+l+") textarea:eq(1)").val()==""){
				$(".inmenu div:eq("+l+")").remove();
			}else{
				if(window.confirm('項目名、値が入力されていますが削除しますか？')){
					$(".inmenu div:eq("+l+")").remove();
				}
			}
		}
	});
});
</script>
<?php }else{ ?>
<?php
	if($q->get_dir()==2){
		if($q->get_file()==0)$sv=$p;
		elseif($q->get_file()==1)$sv=$_POST;
		$v="";
	}else{
		$v="p_";
	}
	$val=$sv[$v.$f_name];
?>
<tr>
<td class="confTitle"><?=$d_name?></td>
<td class="confFields"><?php if(strlen($val)>0){ ?><div class="cms_table"><?php echo modDispText($val,$_POST["p_media"]); ?></div><?php }else{ ?>入力無し<?php } ?><input type="hidden" name="p_<?=$f_name?>" value="<?=mod_HTML($val)?>" ></td>
</tr>
<?php } ?>