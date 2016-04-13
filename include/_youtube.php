<?php if(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==0){ ?>
<?php

$defsize=array(660,401);

$p["n1"]=strlen($p["n1"]>0)?$p["n1"]:$defsize[0];

?>
<div class="eyoutube"><iframe width="<?=$defsize[0]?>" height="<?=$defsize[1]?>" src="https://www.youtube.com/embed/<?=$p[$a]?>" frameborder="0" allowfullscreen></iframe></div>

<script type="text/javascript">

$(function(){
	<?php if(strlen($p[$a])>0){ ?>$(".eyoutube").show();<?php } ?>
	function zth(str){
		return str.replace("．",".").replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);}).replace(/,/g,"");
	}
	var yu=$("[name='p_youtube']").val();
	function sml(n,m){
		if(yu==m)return;
		
		if(m.length!=11){
			yu=m.match(/\?v=([^&]+)/)[1];
			$("[name='p_youtube']").val(yu);
			m=yu;
		}
		
		yu=m;
		var src="https://www.youtube.com/embed/";
		$(".eyoutube").show();
		$(".eyoutube iframe").prop("src",src+m);
	}
	$("[name='p_youtube']").on('change blur',function(){
		sml($(this).attr("name"),$(this).val());
	});
	$("[name='p_youtube']").on('keydown',function(e){
		if((e.which&&e.which===13)||(e.keyCode&&e.keyCode===13)){
			sml($(this).attr("name"),$(this).val());
			return false;
		}
	});
	$(".chbtn").click(function(){
		
		var w=$("[name='p_n1']").val();
		
		var r=0.5625;
		
		if(w!=""){
			h=Math.round(w*r)+30;
		}else{
			w=<?=$defsize[0]?>;
			h=<?=$defsize[1]?>;
		}
		
		$(".eyoutube iframe").width(w).height(h);
		$("[name='p_n1']").val(w);
	});
});

</script>
<?php }else{ ?>
<?php

$yid=$e["p_".$a];
$yw=$e["p_n1"];

if($q->get_dir()==2){
	if($q->get_file()==0){
		$yid=$e[$a];
		$yw=$e["n1"];
	}elseif($q->get_file()==0){
		$yid=$_POST[$a];
		$yw=$_POST["n1"];
	}
}

if(strlen($yw)==0){
	$yw=640;
}

if(strlen($yid)>0){

?>
<script type="text/javascript">
$(function(){
	$(".chbtn").hide();
});
</script>
<div class="youtube"><iframe width="<?=$yw?>" height="<?=round($yw*0.5625)+30?>" src="https://www.youtube.com/embed/<?=$yid?>" frameborder="0" allowfullscreen></iframe></div>
<?php }?>
<?php } ?>