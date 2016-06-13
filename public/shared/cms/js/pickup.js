$(function(){

	var preLoad=new Object();
	$('.btn').each(function(){
		var imgSrc=this.src;
		var fType=imgSrc.substring(imgSrc.lastIndexOf('.'));
		var imgName=imgSrc.substr(0, imgSrc.lastIndexOf('.'));
		var imgOver=imgName+'_o'+fType;
		preLoad[this.src]=new Image();
		preLoad[this.src].src=imgOver;
		$(this).hover(function(){this.src=imgOver;},function(){this.src=imgSrc;});
	});

	$("#pageController select").change(function(){
		var n=$(":selected",this).val();
		if(n!=""){
			var a=originalarno.join(",");
			var b=selectedimgno.join(",");
			if(a!=b){
				if(window.confirm("決定されていない変更は破棄されますが移動しますか？")){
					window.location.href="./index.php?i="+n;
				}else{
					$(".attention").html("右上の決定ボタンを押してください。").show();
				}
			}else{
				window.location.href="./index.php?i="+n;
			}
		}
	});
	
	$(".box li a").hover(
		function(){
			$(".title,.bg",this).show();
			$(".icon",this).hide();
		},
		function(){
			$(".title,.bg",this).hide();
			$(".icon",this).show();
		}
	);
	
	$(".box li a").click(function(){
		var n=selectedimgno.length;
		var id=$(this).attr("class").match(/n([0-9]+)/)[1]-0;
		var img=$(".img",this).html();
		$(".attention").hide();
		if(n<maxn){
			add(n,id,img);
			$(this).siblings(".slected").show();
			if(n>0)$(".btnes:lt("+n+")").show();
		}else{
			add2(n,id,img);
			$(this).siblings(".slected").show();
		}
	});
	
	function add(n,id,img){
		selectedimgno.push(id);
		selectedimgsrc.push(img);
		$(".box2 li:eq("+n+") .imgcbx").hide().html(img).show();
		$(".box2 li:eq("+n+") .deletebtn").show();
	}
	function add2(n,id,img){
		var delimgno=selectedimgno.shift();
		var delimg=selectedimgsrc.shift();
		$(".n"+delimgno).siblings(".slected").hide();
		selectedimgno.push(id);
		selectedimgsrc.push(img);
		for(var i=0;i<n;i++){
			$(".box2 li:eq("+i+") .imgcbx").html(selectedimgsrc[i]);
			$(".box2 li:eq("+i+") .deletebtn").show();
		}
	}
	
	$(".btnes").click(function(){
		var n=$(this).index()+1;
		selectedimgno.splice(n-1,2,selectedimgno[n],selectedimgno[n-1]);
		selectedimgsrc.splice(n-1,2,selectedimgsrc[n],selectedimgsrc[n-1]);
		$(".attention").hide();
		$(".box2 li .imgcbx").html("");
		$(".deletebtn").hide();
		for(var i=0;i<selectedimgsrc.length;i++){
			$(".box2 li:eq("+i+") .imgcbx").html(selectedimgsrc[i]);
			$(".box2 li:eq("+i+") .deletebtn").show();
		}
	});
	
	$(".deletebtn").click(function(){
		var n=$(this).parent().index();
		var id=selectedimgno[n];
		$(".attention").hide();
		$(".n"+id).siblings(".slected").hide();
		selectedimgno.splice(n,1);
		selectedimgsrc.splice(n,1);
		$(".box2 li .imgcbx").html("");
		$(".deletebtn").hide();
		for(var i=0;i<selectedimgsrc.length;i++){
			$(".box2 li:eq("+i+") .imgcbx").html(selectedimgsrc[i]);
			$(".box2 li:eq("+i+") .deletebtn").show();
		}
		$(".btnes").hide();
		if(selectedimgsrc.length>0)$(".btnes:lt("+(selectedimgsrc.length-1)+")").show();
	});
	
	
	
	$(".finish").hover(
		function(){
			$(this).css({backgroundColor:"#999",color:"#fff"});
		},
		function(){
			$(this).css({backgroundColor:"#fff",color:"#333"});
		}
	);
	$(".finish").click(function(){
		var a=originalarno.join(",");
		var b=selectedimgno.join(",");
		var e=$(".lngradio:checked").attr("id");
		var c=$("[for='"+e+"']").html();
		var d=$(".puright").html();
		if(a!=b){
			if(window.confirm(c+d+"を下記内容で設定します。よろしいですか？")){
				$.ajax({
					type:"POST",
					url:"/editdm/module/pickup.php",
					data:"lang="+e.replace("ls","")+"&cid="+cid+"&eid="+b,
					success:function(m){
						if(m){
							$(".attention").html(c+d+"を上記のとおり設定いたしました。").show();
						}
					}
				});			
			}
		}else{
			$(".attention").html("下のサムネイル画像からピックアップするコンテンツを選択してください。").show();
		}
	});
	
	var maxn;
	function initls(){
		maxn=$(".box2 li").length;
		$(".attention").hide();
		if(selectedimgno.length>0){
			for(var i=0;i<selectedimgno.length;i++){
				selectedimgsrc[i]=$(".n"+selectedimgno[i]+" .img").html();
				$(".n"+selectedimgno[i]).siblings(".slected").show();
				$(".box2 li:eq("+i+") .imgcbx").html(selectedimgsrc[i]);
				$(".box2 li:eq("+i+") .deletebtn").show();
			}
			$(".btnes:lt("+(selectedimgsrc.length-1)+")").show();
		}
	}
	initls();


	$(".boxaa").height($(".box2").height());
	var s=$(".floatingb").offset().top;
	$(window).scroll(function(){
		var winTop=$(this).scrollTop();
		if (winTop>=s){
			$(".floatingb").css({position:"fixed",top:"0",left:0,right:0,zIndex:1000});
		}else{
			$(".floatingb").css({position:"static"});
		}
	});

});