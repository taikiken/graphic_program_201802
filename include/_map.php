<?php if(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==0){ ?>
<div class="clearfix mapbox" style="clear:both;">
<div class="clearfix">
<input type="text" class="adtxt in" value="">
<span class="gmAbtn rollover">検索</span>
</div>
<div id="dmaps" style="width:700px;height:360px;margin:7px 0 5px 0;"></div>
</div>
<span class="gmCbtn rollover">地図中心点の緯度経度で設定</span>
<span class="gmClrbtn rollover">クリア</span>
<script type="text/javascript">

$(function(){

	var lng=139.7717784;
	var lat=35.6814133;
	
	function latlngcheck(){
		var slng=$("input[name='p_fn0']").val();
		var slat=$("input[name='p_fn1']").val();
		if(slng!=""){
			lng=slng;
			lat=slat;
		}
	}
	latlngcheck();

	var ls=new google.maps.LatLng(lat,lng);

	function mpsearch(){

	}

	$(".gmAbtn").click(function(){
		var s=$(".adtxt").val();
		var y=$(".adtxt").offset().top+$(this).height()+2;
		var x=$(".adtxt").offset().left;
		var w=$(".adtxt").width()+30;
		
		if(s==""){
			$(".optionsel").html("<span>住所や施設名を入力してください。</span>");
			var h=28;
			$(".optionsel").css({top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
			$(".optionsel").delay(2000).fadeOut();
			return;
		}
		
		$.ajax({
			type: "POST",
			url: "/editdm/module/getlatlng.php",
			data: "address="+s,
			success: function(m){
				if(m){
					$(".optionsel").html("<ul>"+m+"</ul>");
					var l=(m.match(/gmlat/g)||[]).length;
					var h=l<10?l*20:200;
					$(".optionsel").css({top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
				}else{
					$(".optionsel").html("<span>「"+s+"」は見つかりませんでした。</span>");
					var h=28;
					$(".optionsel").css({top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
					$(".optionsel").delay(2000).fadeOut();
					return;
				}
				$(".optionsel li").hover(
					function(){$(this).css({backgroundColor:"#efefef"});},
					function(){$(this).css({backgroundColor:"#fff"});}
				);
				$(".optionsel li").click(function(){
					ls=new google.maps.LatLng($(".gmlng",this).html(),$(".gmlat",this).html());
					map.panTo(ls);
					marker.setPosition(ls);
				});	
				$(".adtxt").focus(function(){
					$(".optionsel").hide();
				});
			}
		});	
	});
	$(".adtxt").keypress(function(e){
		if(e.which==13){
			var s=$(".adtxt").val();
			var y=$(".adtxt").offset().top+$(this).height()+10;
			var x=$(".adtxt").offset().left;
			var w=$(".adtxt").width()+30;
			
			if(s==""){
				$(".optionsel").html("<span>住所や施設名を入力してください。</span>");
				var h=28;
				$(".optionsel").css({top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
				$(".optionsel").delay(2000).fadeOut();
				return;
			}
			
			$.ajax({
				type: "POST",
				url: "/editdm/module/getlatlng.php",
				data: "address="+s,
				success: function(m){
					if(m){
						$(".optionsel").html("<ul>"+m+"</ul>");
						var l=(m.match(/gmlat/g)||[]).length;
						var h=l<10?l*20:200;
						$(".optionsel").css({top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
					}else{
						$(".optionsel").html("<span>「"+s+"」は見つかりませんでした。</span>");
						var h=28;
						$(".optionsel").css({top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
						$(".optionsel").delay(2000).fadeOut();
						return;
					}
					$(".optionsel li").hover(
						function(){$(this).css({backgroundColor:"#efefef"});},
						function(){$(this).css({backgroundColor:"#fff"});}
					);
					$(".optionsel li").click(function(){
						ls=new google.maps.LatLng($(".gmlng",this).html(),$(".gmlat",this).html());
						map.panTo(ls);
						marker.setPosition(ls);
					});	
					$(".adtxt").focus(function(){
						$(".optionsel").hide();
					});
				}
			});
		}
	});

	var map=new google.maps.Map(
		document.getElementById('dmaps'),{
			center:ls,
			zoom:18,
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			mapTypeControl:true,
			scaleControl:true,
			navigationControl:true,
			navigationControlOptions:{
				style:google.maps.NavigationControlStyle.ZOOM_PAN
			}
		}
	);
	var marker=new google.maps.Marker({
		position:ls,
		map:map,
		icon:new google.maps.MarkerImage('/shared/cms/img/d.png',new google.maps.Size(20,20),new google.maps.Point(0,0),new google.maps.Point(10,10)),
		zIndex:google.maps.Marker.MAX_ZINDEX++
	});
	
	google.maps.event.addListener(map,"idle",function(){jp();});
	google.maps.event.addListener(map,"bounds_changed",function(){jp();});
	google.maps.event.addListener(map,"zoom_changed",function(){jp();});
	
	function jp(){
		ls=map.getCenter();
		lat=ls.lat();
		lng=ls.lng();
		map.panTo(ls);
		marker.setPosition(ls);
	}
	$(".gmCbtn").click(function(){
		$(".optionsel").hide();
		$("input[name='p_fn0']").val(lng);
		$("input[name='p_fn1']").val(lat);
	});
	$(".gmClrbtn").click(function(){
		$("input[name='p_fn0']").val("");
		$("input[name='p_fn1']").val("");
	});
	$(".chbtn").click(function(){
		var r=0.5625;
		var w=$("input[name='p_n1']").val();
		var h=$("input[name='p_n2']").val();
		if(w!=""&&h!=""){
		}else if(w!=""){
			w=w-0;
			h=Math.round(w*r);
		}else if(h!=""){
			h=h-0;
			w=Math.round(h/r);
		}else{
			w=660;
			h=401;
		}
		$("#dmaps").width(w).height(h);
		$("input[name='p_n1']").val(w);
		$("input[name='p_n2']").val(h);
		
	});

	var w=$("input[name='p_n1']").val();
	var h=$("input[name='p_n2']").val();
	if(w==""){
		$("input[name='p_n1']").val(660);
		$("input[name='p_n2']").val(400);
	}

});
</script>
<?php }else{ ?>
<div class="clearfix mapbox" style="padding:10px 0 0 0;"><div id="dmaps" style="width:700px;height:315px;"></div></div>
<script type="text/javascript">

$(function(){

	var lat,lng;
	function latlngcheck(){
<?php
		if(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==0){
			echo "var slng=$(\"input[name='p_fn0']\").val();var slat=$(\"input[name='p_fn1']\").val();";
		}else{
			if($q->get_dir()==2&&$q->get_file()==0){
				echo "var slng=$(\"input[name='fn0']\").val();var slat=$(\"input[name='fn1']\").val();";
			}elseif($q->get_dir()==2&&$q->get_file()==1){
				echo sprintf("var slng=%s;var slat=%s;",$_POST["fn0"],$_POST["fn1"]);
			}else{
				echo "var slng=$(\"input[name='p_fn0']\").val();var slat=$(\"input[name='p_fn1']\").val();";
			}
		}
?>		
		if(slng!=""){
			lng=slng;
			lat=slat;
			var ltlg=new google.maps.LatLng(lat,lng);
			var map=new google.maps.Map(
				document.getElementById('dmaps'),{
					center:ltlg,
					zoom:18,
					draggable:false,
					scrollwheel:false,
					disableDoubleClickZoom:true,
					disableDefaultUI:true
				}
			);
			var marker=new google.maps.Marker({
				position:ltlg,
				map:map
			});
		}else{
			$(".mapbox").hide();
		}
	}
	latlngcheck();
});
</script>
<?php } ?>