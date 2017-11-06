function selectedmedia(id){
	
	$(".inputCap,.facebook,.t7,.t9,.body,.t16,.youtube,.t30,.swf,.t8,.a7a8a9a10a11a12,.brightcove,.streampack").show();

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

	//Contents詳細
	if(in_array(id,CONTENTS_ALLOWED))contents(1);
	else contents(0);

	//外部Brightcove
	if(in_array(id,EXBRIGHTCOVE_ALLOWED))exbrightcove(1);
	else exbrightcove(0);

	//streampack
	if(in_array(id,STREAMPACK_ALLOWED))streampack(1);
	else streampack(0);

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
	if(f===1)$(".t9,.t7").show();
	else $(".t9,.t7").hide();
}
function contents(f){
	if(f===1)$(".bodyflag").show();
	else $(".bodyflag").hide();
}
function exbrightcove(f){
	if(f===1)$(".brightcove").show();
	else $(".brightcove").hide();
}
function streampack(f){
	if(f===1)$(".streampack").show();
	else $(".streampack").hide();
}

function toggle_options(t,f){
	t.css({"display":f===1?"block":"none"});
}

function getActualDimension(image) {
    var run, mem, w, h, key = "actual";

    // for Firefox, Safari, Google Chrome
    if ("naturalWidth" in image) {
        return {width: image.naturalWidth, height: image.naturalHeight};
    }
    if ("src" in image) { // HTMLImageElement
        if (image[key] && image[key].src === image.src) {return  image[key];}

        if (document.uniqueID) { // for IE
            w = $(image).css("width");
            h = $(image).css("height");
        } else { // for Opera and Other
            mem = {w: image.width, h: image.height}; // keep current style
            $(this).removeAttr("width").removeAttr("height").css({width:"",  height:""});    // Remove attributes in case img-element has set width  and height (for webkit browsers)
            w = image.width;
            h = image.height;
            image.width  = mem.w; // restore
            image.height = mem.h;
        }
        return image[key] = {width: w, height: h, src: image.src}; // bond
    }

    // HTMLCanvasElement
    return {width: image.width, height: image.height};
}

function ut_init(){

	if(cd=="repo_n"){

		$(".imglist li:eq(3)").css({"clear":"both"});

		var ni=$("[name='p_d2']").val();
		if(ni&&!ni.match(/^[0-9]+$/)){
			var s=ni.match(/^([0-9]+):/);
			ni=s[1]-0;
		}

		$(".m_time .inputFields").append('<span class="btncurrenttime rollover " id="sm_time">現在の日時を設定</span>');
		$("#sm_time").click(function(){
			var now = new Date();
			var u=[];
			u[0]=now.getFullYear();
			u[1]=now.getMonth()+1;
			u[2]=now.getDate();
			u[3]=now.getHours();
			u[4]=now.getMinutes();
			u[5]=now.getSeconds();
			$("[name='p_m_time']").val(sprintf("%s-%s-%s %s:%s:%s",u[0],("0"+u[1]).slice(-2),("0"+u[2]).slice(-2),("0"+u[3]).slice(-2),("0"+u[4]).slice(-2),("0"+u[5]).slice(-2)));
		});

		if(dir===0&&fil===0){
			settime("a1a2a3a4a5a6");
			settime("a7a8a9a10a11a12");

			var c=$.cookie("exusername");
			if(c){
				$("[name='p_d2']").val(c);
				$("[name='p_d1']").val($.cookie("exusercategory"));
				ni=c.match(/^([0-9]+):/)[1]-0;
			}

			$(".m_time").hide();
		}

		$(".inputTitle").each(function(){
			if($(this).html()=="カテゴリー"){
				$(this).append("<span class='kaijo'>チェックを解除</span>");
			}
		});
		$(".kaijo").click(function(){
			$("input",$(this).parent().siblings(".inputFields")).prop("checked",false);
		});

		// 記事に関連する選手確認の場合
		$(".btnplayerpreview").click(function()
		{
			var loc=document.location.href;
			var url;
			if (loc.match(/dev/))
			{
				// 開発環境
				url = "https://dev.sportsbull.jp/";
			}
			else
			{
				// 本番環境
				url = "https://sportsbull.jp/";
			}
			var btnid = $(this).attr('id');
			var btnno = btnid.match(/([0-9])/)[1];
			var playerid = $("[name='p_pid" + btnno + "']").val();

			if (playerid != "")
			{
				// 選手が選択されていれば表示
				window.open(url + sprintf("athlete/%s/", playerid.match(/^([0-9]+)/)[0]));
			}
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
			/*
			d1d2flag=0;
			$(".d1d2 td:eq(1)").append("<span class=\"nonedit\"> ※編集できません。</span>");
			$("[name='p_d1'],[name='p_d2']").css({
				"backgroundImage":"none",
				"backgroundColor":"#efefef",
				"cursor":"default"
			});
			*/
			//$("[name='p_bodyflag']").prop("disabled","disabled");
			//$(".bodyflag .inputFields label").css("color","#AAA");
			$(".bodyflag .inputFields").append("<span class=\"nonedit\"> ※一度選択したページ仕様を変更すると入力したデータが消去されますのでご注意ください。</span>");

		}
		selectedmedia(ni);

	}else if(cd=="u_epg"){

		$(".newEntry").hide();
		$(".edit").each(function(){
			$(this).css("color","#000").fadeTo(1,0.2);
			$(this).parent("a").attr("href","javascript://");
		});

	}else if(cd=="u_headline"){

		/*
		//たとえば選択できる競技を野球のみに絞る
		if(cid==11){
			$(".m_d2").html("select id,'['||a1||'-'||a2||'-'||a3||' '||a4||':'||a5||'] ' ||title||'('||(select title from u_media as e where e.id=repo_n.d2)||')' as title from repo_n where cid=1 and flag=1 and m1={p_d1} order by m_time desc");
			$(".m_d1").height(22);
			$(".m_d1 li:gt(0)").remove();
			$(".title").hide();
		}
		*/

		if(cid==9||cid==13||cid==14||cid==15){
			/*
			$(".newEntry").hide();
			$(".delete").each(function(){
				$(this).css("color","#000").fadeTo(1,0.2);
				$(this).parent("a").attr("href","javascript://");
			});
			*/
		}

		if(dir==3){
			//$(".delete").parent("a").attr({"href":"javascript://"}).fadeTo(1,0.5);
		}

		if((dir==0||dir==1)&&fil===0){

			if(location.href.match(/cid=12&rid=7/)){
				$("[name='p_d1']").val("114:サッカー");
			}

			if($("[name='p_d2']").val().match(/^[0-9]+$/)){

				var url="/editdm/repo_n/edit/?nid="+$("[name='p_d2']").val()+"&cid=1";

				var prevtitle;
				$("[name='p_d1']").change(function(){
					$("[name='p_d2']").val("");
				});

				$.ajax({
					type: "POST",
					url: "/editdm/module/gettitle.php",
					data: {"id" : $("[name='p_d2']").val(), "cid" : cid},
					//data: "id="+$("[name='p_d2']").val(),
					success: function(m){
						prevtitle=m;
						$("[name='p_d2']").val(prevtitle);
						url="/editdm/repo_n/edit/?nid="+$("[name='p_d2']").val().match(/^([0-9]+)$/)[1]+"&cid="+cid;
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

	}else if(cd=="repo"){

		if(rid==7){

			$(".display,.t_display").hide();

			/*
			if(cid==0&&dir==3){
				$(".newEntry").hide();
				$(".blockds:eq(3) td:eq(3) a,.blockds:eq(3) td:eq(4) a").attr("href","javascript://").css({"color":"#999"});
				$(".blockds:eq(3) .colname .j2").append("　※LS CMSに遷移します(スポーツブルCMSから編集はできません)。");
				$(".blockds:eq(3) .colname a").attr("href",sprintf("http://input.sportsbull.jp/legendsstadium%s/",location.href.match(/cms/)?"":"2"));
				//$(".colname,.t_title").css({"borderLeft":"1px solid #ccc"});
				//$(".numbering,.display,.t_numbering,.t_display").hide();
				$("td").css({"paddingTop":"8px","paddingBottom":"8px"});
			}
			*/

		}else if(rid==48){

			$(".newEntry").hide();
			$(".delete,.edit").each(function(){
				$(this).css("color","#000").fadeTo(1,0.2);
				$(this).parent("a").attr("href","javascript://");
			});

		}else{

		}

	}else if(cd=="u_member"){

		$(".t_display,.display").css({"borderLeft":"3px solid #ccc"});

		if(dir==1||dir==2){
			$(".img1 a,.imgDelete,.img1 input,.img1 .inputCap").hide();
			$("[name='img1']").attr("src",$("[name='img1']").attr("src").replace(/img/,"img/users"));
		}

	}else if(cd=="advertise"){

		$("#cmdtypes9").before("<br>");
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

			if(key.match(/^ad_video/)){
				key=".ad_videoid,.ad_pc_videotag,.ad_sp_videotag,.ad_ios_videotag,.ad_android_videotag";
			}else if(key.match(/^ad/)){
				key="."+key.replace(/flag/,"id");
			}else if(key.match(/^(sidebar|single)_/)){
				key="."+key.replace(/flag/,"");
			}else if(key.match(/^banner/)){
				key=".bannertext,.pc_bannerimg,.pc_bannerlink,.sp_bannerimg,.sp_bannerlink,.android_bannerimg,.android_bannerlink,.ios_bannerimg,.ios_bannerlink";
			}else if(key.match(/^abodybanner/)){
				key=".abodybannertext,.pc_abodybannerimg,.pc_abodybannerlink,.sp_abodybannerimg,.sp_abodybannerlink,.android_abodybannerimg,.android_abodybannerlink,.ios_abodybannerimg,.ios_abodybannerlink";
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
			function whresize(){
				var t=$("textarea").val();
				t=t.replace(/width="[0-9]+"/,"width=\"728\"").replace(/height="[0-9]+"/,"height=\"410\"").replace(/max-width:[0-9]+px/,"max-width:728px");
				$("textarea").val(t);
				if(!t.match(/location\.href/))$(".containerbox").html("").append(sprintf("<div class=\"cms_widget\">%s</div>",t)).show();
			}
			$("textarea").on("change",function(){
				whresize();
			});
			if($("textarea").val())whresize();

		}
	}
	else if (cd == "tbl_player")
	{
		/*
		 * 選手
		 */
		// 選手情報登録画面で、カテゴリー項目に「チェックを解除」項目を追加
		$(".inputTitle").each(function()
		{
			if ($(this).html() == "カテゴリー")
			{
				$(this).append("<span class='kaijo'>チェックを解除</span>");
			}
		});

		// 「チェックを解除」項目選択時にカテゴリーのチェックを解除
		$(".kaijo").click(function()
		{
			$("input", $(this).parent().siblings(".inputFields")).prop("checked", false);
		});

	}

	if(location.href.match(/repo_s\/\?rid=2/)){
		$(".newEntry").hide();
	}

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

	$(".orderby,.exuser,.excategory,.expickup,.orderby_p,.excategory_p").change(function(){
		var s=$(this).val();
		$.cookie($(this).attr("class").replace(".",""),s,{path:"/editdm/",expires:1});
		location.reload();
	});

	$(".btncurrenttime").click(function(){
		settime($(this).parents("tr").attr("class"));
	});
	$(".btnpreview").click(function(){
		var l=document.location.href;
		var u;
		if(l.match(/dev/)){
			u="https://dev.sportsbull.jp/";
		}else{
			u="https://sportsbull.jp/";
		}

		if (rid != 95)
		{
			window.open(u+"/p/"+$("[name='p_d2']").val().match(/^([0-9]+):/)[1]);
		}
		else
		{
			// 注目の選手
			window.open(u + "/athlete/" + $("[name='p_d2']").val().match(/^([0-9]+):/)[1]);
		}
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

	$(".inputFields img").delay(2000).each(function(){
		var e=$(this).attr("name");
		if(e&&e.match(/headerimg/)){
			$(this).width(800).css({"marginBottom":"7px"});
		}

	});

	pagenation();

});
