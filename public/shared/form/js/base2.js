$(function(){

	$('[type="submit"],[type="button"],[type="text"],[type="email"],[type="number"],[type="tel"],textareat').css({padding:"3px",margin:"0px 5px"});
	$("#p_zip0,#p_zip1,#p_v1").width(50);
	$('select').css({padding:"2px 3px",margin:"0px 5px",width:"auto"});

	$(".prev").click(function(){
		var d=document.location.href.toString().match(/_([0-9]+)\./)[1];
		document.fg.action="./index_"+d+".html";
		document.fg.submit();
	});
	
	$(".errArea li").click(function(){
		var s=$(this).attr("rel");
		//if(!s.match('^p_'))s="p_"+s;
		$('body,html').animate({scrollTop:$("#"+s).offset().top-((issp==1)?35:15)+"px"},500,function(){
			$("#"+s).focus();
		});
	});
	$(":text,textarea,select,:file").blur(function(){
		if(!$(this).css("backgroundColor").match(/^[#fF]{7}$/)&&$(this).css("backgroundColor")!="rgb(255, 255, 255)"){
			if($(this).val()!=""&&$(this).val()!="選択してください"){
				$(this).css({backgroundColor:"#ffffff"});
				$("li[rel='"+$(this).attr("name")+"']").hide();
				if(issp!=1)$('body,html').animate({scrollTop:($($.browser.safari?'body':'html').scrollTop()+20)+"px"},50);
			}else{
				$(this).css({backgroundColor:"#ffeee6"});
			}
		}
	});
	$(":checkbox,:radio").click(function(){
		if(!$(this).css("backgroundColor").match(/^[#fF]{7}$/)&&$(this).css("backgroundColor")!="rgb(255, 255, 255)"){
			if($(this).attr("checked")){
				$("[name="+$(this).attr("name")+"]").css({backgroundColor:"#ffffff"});
			}else{
				$("[name="+$(this).attr("name")+"]").css({backgroundColor:"#ffeee6"});
			}
		}
	});

	if(issp==0){
		if($("#p_kana0"))$.fn.autoKana('#p_name0','#p_kana0');
		if($("#p_kana1"))$.fn.autoKana('#p_name1','#p_kana1');
	}
	$("input,textarea").focus(function(){
		$.ajax({
			type:"POST",
			url:"/shared/module/inputchecker.php",
			data:"btn="+$(this).attr("name"),
			success: function(msg){}
		});
	});
});