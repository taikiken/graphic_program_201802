<?php if($MULTILANG==1){ ?>
<dl class="langselect clearfix">
<dt>言語切替</dt>
<dd class="clearfix">
<?php if(!preg_match("/\/pickup\//",$_SERVER['REQUEST_URI'])){ ?>
<input type="radio" name="langselect" class="lngradio" value="al" id="lsal" /><label for="lsal" class="rollover">全言語</label>
<?php } ?>
<?php for($i=0;$i<count($LANG);$i++){ ?>
<input type="radio" name="langselect" class="lngradio" value="<?=$LANG[$i]?>" id="ls<?=$LANG[$i]?>" /><label for="ls<?=$LANG[$i]?>" class="rollover">[<?=strtoupper($LANG[$i])?>]:<?=$LANGv[$i]?></label>
<?php
$lngsm[]=$LANG[$i];
} 
?>
</dd>
</dl>
<script type="text/javascript">

var lang=[<?=sprintf("\"%s\"",implode("\",\"",$lngsm))?>];

function langswitch(s,f){

	if(s!="al"){
		for(var i=0;i<lang.length;i++){
			if(s==lang[i]){
				$("."+lang[i]).show();
				$("label[for='ls"+lang[i]+"']").css({color:"#ff0000",opacity:1,cursor:"default"});
				$("label[for='ls"+lang[i]+"']").addClass("lngA");
			}else{
				$("."+lang[i]).hide();
				$("label[for='ls"+lang[i]+"']").css({color:"#fff",cursor:"pointer"});
				$("label[for='ls"+lang[i]+"']").removeClass("lngA");
				if(fil==1){
					$("input[name$='"+lang[i]+"']").remove();
				}
			}
		}
		$("label[for='lsal']").css({color:"#fff",cursor:"pointer"});
		$(".pickup").show();
	}else{
		for(var i=0;i<lang.length;i++){
			$("."+lang[i]).show();
			$("input,textarea","."+lang[i]).prop("disabled",false);
			$("label[for='ls"+lang[i]+"']").css({color:"#fff",cursor:"pointer"});
			$("label[for='ls"+lang[i]+"']").removeClass("lngA");
		}
		$("label[for='lsal']").css({color:"#ff0000",opacity:1,cursor:"default"});
		$("label[for='lsal']").addClass("lngA");
		$(".pickup").hide();
	}
	$.cookie('lang',s,{expires:365,path:"/"});
	if(f==1&&window.location.href.match(/\/pickup\//))location.reload();
}

$(document).ready(function(){

	if($.cookie('lang')=="al")$(".pickup").hide();
	else $(".pickup").show();
	
	var langc=!$.cookie('lang')?"al":$.cookie('lang');
	
	$("#ls"+langc).prop("checked",true);
	langswitch(langc);
	
	if(fil===1){
		$(".lngradio").prop("disabled",true);
		$(".langselect label").addClass("lngA").css({cursor:"default"}).fadeTo(1,0.5);
	}
	
	$(".toe").click(function(){
		var lng=$(this).parents("tr").attr("class");
		$.cookie('lang',lng,{expires:365,path:"/"});
	});

	var u=window.location.href;
	if(u.match(/(repo_n)/)){
		$(".t_display,.display").hide();
		$(".colname").css({paddingLeft:0,paddingRight:"1px"});
	}

	$(".lngradio").click(function(){
		var s=$(this).val();
		langswitch(s,1);
	});
});
</script>
<?php } ?>
