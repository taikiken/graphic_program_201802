<?php unset($t);unset($rt); ?>
<dl class="ml"><dt><?=$p[$i]["n"].":".$contentsEditorTypes[$p[$i]["types"]]?><?php

if($_GET["cid"]!=25){

	if($p[$i]["types"]==1){
		if(strlen($p[$i]["img1"])>0){
			echo sprintf("<img src=\"/prg_img/thumbnail1/%s\" width=\"180\">",$p[$i]["img1"]);
		}else{
			echo "<img src=\"/shared/cms/img/noimg.png\" width=\"180\">";
		}
	}elseif($p[$i]["types"]==5){
		echo sprintf("<iframe width=\"180\" height=\"100\" src=\"https://www.youtube.com/embed/%s\" frameborder=\"0\" allowfullscreen></iframe>",$p[$i]["youtube"]);
	}elseif($p[$i]["types"]==6){
		echo sprintf("<div id='dmaps' style='width:180px;height:100px;'></div><script>$(function(){var ltlg=new google.maps.LatLng(%s,%s);var map=new google.maps.Map(document.getElementById('dmaps'),{center:ltlg,zoom:18,draggable:false,scrollwheel:false,disableDoubleClickZoom:true,disableDefaultUI:true});var marker=new google.maps.Marker({position:ltlg,map:map});});</script>",$p[$i]["fn1"],$p[$i]["fn0"]);
	}

}

?></dt><?php if($_GET["cid"]!=25){ ?><dd><?php echo makeContentsPreview($p[$i]); ?></dd><?php } ?></dl>
