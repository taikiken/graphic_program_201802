function selectedmedia(id){
	$(".inputCap,.facebook,.t7,.t9,.body,.t16,.youtube,.t30,.swf,.t8,.a7a8a9a10a11a12").show();
	
	//関連リンク
	if(in_array(id,RELATEDLINK_ALLOWED))relatedlink(1);
	else relatedlink(0);
	
	//記事種別
	if(in_array(id,CONTENTSTYPE_ALLOWED))genre(1);
	else genre(0);
		
	//記事種別
	if(in_array(id,SUMMARY_ALLOWED)) summary(1);
	else summary(0);

	//元記事
	if(in_array(id,ORIGINALURL_ALLOWED)) originalurl(1);
	else originalurl(0);

	//MP4
	if(in_array(id,MOVIE_ALLOWED))movie(1);
	else movie(0);

	//YOUTUBE
	if(in_array(id,YOUTUBE_ALLOWED))youtube(1);
	else youtube(0);

	//FACEBOOK
	if(in_array(id,FACEBOOK_ALLOWED))facebook(1);
	else facebook(0);

	//FACEBOOK
	if(in_array(id,MCAPTION_ALLOWED))mcaption(1);
	else mcaption(0);

	//FACEBOOK
	if(in_array(id,CONTENTS_ALLOWED))contents(1);
	else contents(0);
/*		
	//コンテンツ
	if($.inArray(id,CONTENTS_EDITED)!=-1){
		$(".body .inputFields textarea").remove();
		if(dir==0||dir==2){
			//$(".body .inputFields").html("<span style=\"line-height:3em;\">本文は基本情報登録後、一覧のページ管理より行ってください。</span>");
		}else{
			var l=location.href.match(/nid=([0-9]+)&/);
			//$(".body .inputFields").html(sprintf("<a href=\"/editdm/repo_e/?nid=%s&cid=1\" style=\"line-height:3em;\">本文はこちらのリンクもしくは一覧のページ管理より行ってください。</a>",l[1]));
		}
	}
*/
}

function relatedlink(f){
	if(f===1){
		$(".inputHeader").each(function(){
			if($(this).html()=="関連リンク"){
				$(this).parents("tr").show();
				$(".t2,.t3,.t4,.t5,.t6,.b2,.b3,.b4,.b5,.b6").show();
			}
		});
	}else{
		$(".inputHeader").each(function(){
			if($(this).html()=="関連リンク"){
				$(this).parents("tr").hide();
				$(".t2,.t3,.t4,.t5,.t6,.b2,.b3,.b4,.b5,.b6").hide();
			}
		});
	}
}
function genre(f){
	if(f===1){
		$(".inputTitle").each(function(){
			if($(this).html()=="記事種別"){
				$(this).parents("tr").show();
			}
		});
	}else{
		$(".inputTitle").each(function(){
			if($(this).html()=="記事種別"){
				$(this).parents("tr").hide();
			}
		});
	}
}
function mcaption(f){
	if(f===1)$(".t8").show();
	else $(".t8").hide();
}
function youtube(f){
	if(f===1)$(".youtube").show();
	else $(".youtube").hide();
}
function facebook(f){
	if(f===1)$(".facebook").show();
	else $(".facebook").hide();
}
function movie(f){
	if(f===1)$(".swf").show();
	else $(".swf").hide();
}
function summary(f){
	if(f===1)$(".t16").show();
	else $(".t16").hide();
}
function originalurl(f){
	if(f===1)$(".t9").show();
	else $(".t9").hide();
}
function contents(f){
	if(f===1)$(".bodyflag").show();
	else $(".bodyflag").hide();
}
function toggle_options(t,f){
	t.css({"display":f===1?"block":"none"});
}

function ut_init(){
	
	if(cd=="repo_n"){
		
		var ni=$("[name='p_d2']").val();
		if(ni&&!ni.match(/^[0-9]+$/)){
			var s=ni.match(/^([0-9]+):/);
			ni=s[1]-0;
		}

		if(dir===0&&fil===0){
			settime("a1a2a3a4a5a6");
			settime("a7a8a9a10a11a12");
			
			var c=$.cookie("exusername");
			if(c){
				$("[name='p_d2']").val(c);
				$("[name='p_d1']").val($.cookie("exusercategory"));
				ni=c.match(/^([0-9]+):/)[1]-0;
			}
		}
		
		$(".inputTitle").each(function(){
			if($(this).html()=="カテゴリー"){
				$(this).append("<span class='kaijo'>チェックを解除</span>");
			}
		});
		$(".kaijo").click(function(){
			$("input",$(this).parent().siblings(".inputFields")).prop("checked",false);				
		});

		$(".t_display,.display").css({"borderLeft":"3px solid #ccc"});
		
		function switchbody(n){
			if(n==170){
				$(".ckbox:eq(0)").hide();
				$(".ckeditor").prop("disabled","disabled");
				if(dir==0||dir==2){
					$(".body .inputFields").append("<span class=\"bodyatt\" style=\"line-height:3em;color:red;\">本文は基本情報登録後、記事一覧タイトル右にに追加される「コンテンツ」より行ってください。</span>");
				}else{
					var l=location.href.match(/nid=([0-9]+)&/);
					$(".body .inputFields").append(sprintf("<a class=\"bodyatt\" href=\"/editdm/repo_e/?nid=%s&cid=1\" style=\"line-height:3em;\">本文はこちらのリンクもしくは一覧の「コンテンツ」より行ってください。</a>",l[1]));
				}
			}else{
				$(".ckbox:eq(0)").show();
				$(".ckeditor").removeProp("disabled");
				$(".bodyatt").remove();
			}
		}
		$("[name='p_bodyflag']").change(function(){
			var n=$("[name='p_bodyflag']:checked").val();
			switchbody(n);
		});
		var n=$("[name='p_bodyflag']:checked").val();
		if(!n)$("#bodyflag0").prop("checked","checked");
		switchbody(n);

		if(dir===1&&fil===0){
			d1d2flag=0;
			$(".d1d2 td:eq(1)").append("<span class=\"nonedit\"> ※編集できません。</span>");
			$("[name='p_d1'],[name='p_d2']").css({
				"backgroundImage":"none",
				"backgroundColor":"#efefef",
				"cursor":"default"
			});
			//$("[name='p_bodyflag']").prop("disabled","disabled");
			//$(".bodyflag .inputFields label").css("color","#AAA");
			$(".bodyflag .inputFields").append("<span class=\"nonedit\"> ※一度選択したページ仕様を変更すると入力したデータが消去されますのでご注意ください。</span>");
			
		}
		selectedmedia(ni);

	}else if(cd=="u_headline"){
		
		if(cid==11){
			$(".m_d2").html("select id,'['||a1||'-'||a2||'-'||a3||' '||a4||':'||a5||'] ' ||title||'('||(select title from u_media as e where e.id=repo_n.d2)||')' as title from repo_n where cid=1 and flag=1 and m1={p_d1} order by m_time desc");
			$(".m_d1").height(22);
			$(".m_d1 li:gt(0)").remove();
			$(".title").hide();
		}
		if(dir==1&&fil===0){
			if($("[name='p_d2']").val().match(/^[0-9]+$/)){
				
				var url="/editdm/repo_n/edit/?nid="+$("[name='p_d2']").val()+"&cid=1";
				
				var prevtitle;
				$("[name='p_d1']").change(function(){
					$("[name='p_d2']").val("");
				});
		
				$.ajax({
					type: "POST",
					url: "/editdm/module/gettitle.php",
					data: "id="+$("[name='p_d2']").val(),
					success: function(m){
						prevtitle=m;
						$("[name='p_d2']").val(prevtitle);
						url="/editdm/repo_n/edit/?nid="+$("[name='p_d2']").val().match(/^([0-9]+)$/)[1]+"&cid=1";
					}
				});
			}
			$(".title .inputFields").append("<span class=\"copytitle\">タイトルをコピー</span><span class=\"editimage\">画像編集</span>");
			$(".editimage").click(function(){
				window.open(url);
			});
			$(".copytitle").click(function(){
				var t=$("[name='p_d2']").val().replace(/[0-9]+:\[[0-9: -]+\] /,"");
				t=t.replace(/\([^)]+\)$/,"");
				$("[name='p_title']").val(t);
			});
		}
	}else if(cd=="u_member"){
		$(".t_display,.display").css({"borderLeft":"3px solid #ccc"});
	}else if(cd=="advertise"){
		$("[name$='flag']").each(function(){
			if($(this).prop("checked"))toggleflag($(this).attr("name"),$(this).val());
		});
		$("[name$='flag']").change(function(){
			toggleflag($(this).attr("name"),$(this).val());
		});
		function toggleflag(key,value){
			var name1=sprintf("[for='%s1']",key.replace(/^p_/,""));
			var name2=sprintf("[for='%s2']",key.replace(/^p_/,""));
			var key=key.replace(/^p_/,"");
			if(key.match(/^ad/)){
				key="."+key.replace(/flag/,"id");
			}else if(key.match(/^(sidebar|single)_/)){
				key="."+key.replace(/flag/,"");
			}else if(key.match(/^banner/)){
				key=".bannertext,.pc_bannerimg,.pc_bannerlink,.sp_bannerimg,.sp_bannerlink";		
			}
			if(value==1){
				$(key).show();
				$(name1).css({"color":"blue","fontWeight":"bold"});
				$(name2).css({"color":"#333","fontWeight":"normal"});
			}else if(value==2){
				$(key).hide();
				$(name1).css({"color":"#333","fontWeight":"normal"});
				$(name2).css({"color":"red","fontWeight":"bold"});
			}else{
				$(key).hide();
				$(name1).css({"color":"#333","fontWeight":"normal"});
				$(name2).css({"color":"#333","fontWeight":"normal"});
			}
		}
		
		$("[name='pc_headerimglist'],[name='sp_headerimglist'],[name='pc_headerimgdetail'],[name='sp_headerimgdetail']").siblings("a").hide();
	}else if(cd=="repo_e"){
		if(location.href.match(/types=5/)){
			$(".title .inputFields").append("<div class=\"containerbox\"></div>");
			$("textarea").on("change",function(){
				$(".containerbox").html($(this).val()).show();
			});
			if($("textarea").val()){
				$(".containerbox").html($("textarea").val()).show();
			}
		}
	}
	
	if(location.href.match(/repo_s\/\?rid=2/)){
		$(".newEntry").hide();
	}
	if(rid==7)$(".newEntry").hide();
	
}
function settime(field){
	field=field.match(/(a[0-9]+)(a[0-9]+)(a[0-9]+)(a[0-9]+)(a[0-9]+)(a[0-9]+)/);
	var now = new Date();
	var u=[];
	u[0]=now.getFullYear();
	u[1]=now.getMonth()+1;
	u[2]=now.getDate();
	u[3]=now.getHours();
	u[4]=now.getMinutes();
	u[5]=now.getSeconds();
	for(var i=0;i<u.length;i++){
		if(i!=0)if(u[i]<=9)u[i]="0"+u[i];	
		$("[name='p_"+field[(i+1)]+"']").val(u[i]);
		
	}
}
function pagenation(){
	var n=$(".numTable li").length;
	if(n>50){
		$(".numTable li:gt(49)").hide();
		$("#pageCommand").append("<span class=\"andmore\">51ページ以降を表示</span>");
		$(".andmore").on("click",function(){
			$(".numTable li").show();
			$(this).hide();
		});
	}
}


$(function(){

	ut_init();

	$(".orderby,.exuser,.excategory,.expickup").change(function(){
		var s=$(this).val();		
		$.cookie($(this).attr("class").replace(".",""),s,{ path:"/editdm/"});
		location.reload();
	});

	$(".btncurrenttime").click(function(){
		settime($(this).parents("tr").attr("class"));
	});	
	$(".btnpreview").click(function(){
		window.open("https://www.undotsushin.com/p/"+$("[name='p_d2']").val().match(/^([0-9]+):/)[1]);
	});
	$(".blockds:odd").css({"backgroundColor":"#f9f9f9"});

	$(".combtn").click(function(){
		var n=$(this).attr("id").match(/c([0-9]+)/)[1];
		var f=$(this).attr("src").match(/dis/)?1:0;
		$.ajax({
			type:"POST",
			url:"/editdm/module/commentflagswitch.php",
			data:"id="+n+"&flag="+f,
			success:function(m){
				if(m){
					$("#c"+n).attr("src",f==1?"/shared/cms/img/cmd_active.gif":"/shared/cms/img/cmd_disactive.gif");

				}
			}
		});
	});
	

	pagenation();
 
});