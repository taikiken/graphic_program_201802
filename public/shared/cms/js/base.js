go_back=function(url){
	if(url.slice(-1,url.length)=="?")url=".";
	document.f.action=url;
	document.f.method="POST";
	document.f.submit();
}

var te="";

function sprintf(format){
	var ary=arguments;
	var idx=1;
	return format.replace(/%s/g, function(a,b){
		return ary[idx++];
	});
}

function i(n,f,d){
	document.getElementById(f).style.display=(n)?"block":"none";
	if(arguments.length==3)document.getElementById(f+"_e").style.display=(n)?"block":"none";
}

chgUserPermission=function(n){
	for(var i=0;i<document.f["p_systems[]"].length;i++){
		document.f["p_systems[]"][i].disabled=(n==51)?"":"disabled";
		document.f["p_systems[]"][i].checked=(n==50)?"":"checked";
	}
}
chgExpire=function(n){
	var status=(n==54)?"disabled":"";
	if(n==54)document.f["p_oc"][0].checked="checked";
	var a=["sy","sm","sd","ey","em","ed"];
	for(var i=0;i<a.length;i++){
		document.f["p_"+a[i]].disabled=status;
	}
}

function wrapperback(){
	$("#container").fadeOut();
	$("#flash,#flashimg").hide();
	$('select, object, embed').show();
}
function editImages(name,flags,width,height,copyright,copytype,thumno,thumpos,fname,path,op){
	var arrayPageSize=getPageSize();
	var arrayPageScroll=getPageScroll();
	var fTop=arrayPageScroll[1];
	var fLeft=(arrayPageSize[0]-1151)/2;	
	
	$("#flash").css({position:"absolute",left:fLeft+"px",top:fTop+"px"}).html("");
	$('select, object, embed,#overlay').hide();
	var so=new SWFObject("/editdm/modimg/flash.swf?img="+name+"&amp;fname="+fname+"&amp;w="+width+"&amp;h="+height+"&amp;flags="+flags+"&amp;copyright="+encodeURI(copyright)+"&amp;copytype="+copytype+"&amp;thumno="+thumno+"&amp;thumpos="+thumpos+"&amp;path="+path+"&amp;op="+op, "topMovie", "1151", "651", "8", "#fff");
	so.write("flash");
	$("#container").height(arrayPageSize[1]).fadeIn();
	$("#flash").delay(100).show();
}
function setEditImages(n){
	$("#container,#flashimg").hide();
	editImages(ImgData[n][0],ImgData[n][1],ImgData[n][2],ImgData[n][3],ImgData[n][4],ImgData[n][5],ImgData[n][6],ImgData[n][7],ImgData[n][8],ImgData[n][9],ImgData[n][10]);
}
function imgSwap(fname,img,w,h){
	if(fname.indexOf("img")!=-1){
		var p=w<780?1:780/w;
		$("img[name='"+fname+"']").prop({src:img+"?m="+Math.random()*1000}).width(w*p).height(h*p);
		wrapperback();
	}else{
		var arrayPageSize=getPageSize();
		var arrayPageScroll=getPageScroll();
		var fTop=arrayPageScroll[1]+30;
		var fLeft=(arrayPageSize[0]-(w+20))/2;
		$('overlay,container,select,object,embed').hide();
		var l="<img src=\""+img+"?m="+Math.random()*1000+"\" width=\""+w+"\" height=\""+h+"\" >"+"<div class=\"clearfix bbtnb\"><img src=\"/shared/img/lightbox/closelabel.gif\" width=\"66\" height=\"22\" alt=\"\" class=\"bbclose\"><a href=\"javascript:setEditImages("+fname+")\" ><img src=\"/shared/cms/img/btn_thumnail.png\" ></a></div>"
		$("#flash").html("<div></div>").hide();
		$("#flashimg").css({position:"absolute",left:fLeft+"px",top:fTop+"px"}).html(l).fadeIn();
		$(".bbtnb .bbclose").click(function(){
			$("#lightbox,#flashimg").hide();
			$("#container").fadeOut();
			$('select, object, embed').show();
		});
	}
}
function flashimgExit(){
	$("#flashimg").hide().html("");
	$('select, object, embed').show();
}

function encodeURI(str){
	var s0,i,s,u;
	s0="";
	for (i=0; i<str.length; i++){
		s=str.charAt(i);
		u=str.charCodeAt(i);
		if(s==" "){
			 s0+="+";
		}else{
			if(u==0x2a||u==0x2d||u==0x2e||u==0x5f||((u>=0x30)&&(u<=0x39))||((u>=0x41)&&(u<=0x5a))||((u>=0x61)&&(u<=0x7a))){
				s0=s0+s;
			}else{
				if((u>=0x0)&&(u<=0x7f)){
					s="0"+u.toString(16);
					s0+="%"+ s.substr(s.length-2);
				}else if(u>0x1fffff){
					s0+="%"+(0xf0+((u&0x1c0000)>>18)).toString(16);
					s0+="%"+(0x80+((u&0x3f000)>>12)).toString(16);
					s0+="%"+(0x80+((u&0xfc0)>>6)).toString(16);
					s0+="%"+(0x80+(u&0x3f)).toString(16);
				}else if(u>0x7ff){
					s0+="%"+(0xe0+((u&0xf000)>>12)).toString(16);
					s0+="%"+(0x80+((u&0xfc0)>>6)).toString(16);
					s0+="%"+(0x80+(u&0x3f)).toString(16);
				}else{
					s0+="%"+(0xc0+((u&0x7c0)>>6)).toString(16);
					s0+="%"+(0x80+(u&0x3f)).toString(16);
				}
			}
		}
	}
	return s0;
}

function cn(s,t){

/*	
	var no=(t==1)?[s-1,s]:[s,s+1];
	for(var i=no[0];i<no.length;i++){
		
	}
*/
	
	$.ajax({
		type: "POST",
		url: "/editdm/module/orderswitch.php",
		data: "u=1&s="+s+"&t="+t+"&table="+cd+"&fieldname="+fieldname+"&where="+where,
		success: function(m){
			if(m==1){
				location.reload();
			}
		}
	});
}

getPageSize = function(){
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) { // all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}
	if(xScroll < windowWidth){
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}
	var arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}
getPageScroll = function(){
	var xScroll, yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){  // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;
	}

	var arrayPageScroll = new Array(xScroll,yScroll);
	return arrayPageScroll;
}
var ImgData=[];
function deleteWrap(){
	$("#overwrap").hide();
	$(".lenz").hide();
	$(".lbbg").hide();
}

$(function(){
	
	var mx=$(".blockds").length;
	
	function menuchange(n){
		
		if(!location.href.match(/\/repo_n\//))return;
		
		if(n==0){
			$(".blockds").show();
			$(".numbering a,.numbering img").show();
		}else{
			$(".numbering a,.numbering img").hide();
			for(var i=0;i<mx;i++){
				
				var ss=$(".blockds:eq("+i+") .inbox").attr("class").match(/qwa(.*)/)[1];
				if(n==ss){
					$(".blockds:eq("+i+")").show();
				}else{
					$(".blockds:eq("+i+")").hide();
				}
			}
		}
	}
	$(".selectmenu").change(function(){
		var n=$(":selected",this).index();
		$.cookie("lasttouch",n);
		menuchange(n);
	});
	if($.cookie("lasttouch")){
		var n=$.cookie("lasttouch");
		menuchange(n);
		$(".selectmenu option:eq("+n+")").prop("selected","selected");
	}

	$("input[type='text']").css({lineHeight:"20px",height:"20px"});
	
	
	$(".rollover").hover(
		function(){
			if(!$(this).attr("class").match(/lngA/))$(this).fadeTo(100,0.7);
		},
		function(){
			if(!$(this).attr("class").match(/lngA/))$(this).fadeTo(100,1);
		}
	);
	$(".rollover2").hover(
		function(){$(this).fadeTo(100,0.9);},
		function(){$(this).fadeTo(100,1);}
	);
	
	$("input").each(function(){
		if($(this).attr("readonly"))$(this).css({backgroundColor:"#ffffeb",cursor:"pointer"});
	});
	
	$(".btncopy").click(function(){
		
		var a=$(this).attr("id").replace("btncopy rollover ","");
		
		fname=a;
		var lv=$.cookie('lang');
		var lang=$(this).attr("class").replace("btncopy rollover ","");
		var fname=$(this).attr("id").replace("btncopy rollover ","");
		var y=$(this).offset().top+$(this).height()+5;
		var w=$(this).width()+68;
		var x=$(this).offset().left;
		var h=lv=="al"?100:80;
		
		$(".optionsel").html("<ul><li class=\"en\">[EN]からコピー</li><li class=\"kr\">[KR]からコピー</li><li class=\"ch\">[CH]からコピー</li><li class=\"sc\">[SC]からコピー</li><li class=\"ta\">[TA]からコピー</li></ul>");
		$(".optionsel").css({zIndex:1000,top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
		
		var cize=getPageSize();
		$(".optionselbg").css({width:cize[0]-1,height:cize[1]-1}).show().click(function(){
			$(".optionsel").hide();
			$(this).hide();
		});

		if($.cookie('lang')!="al"){
			$(".optionsel ."+lv).hide();
		}
		$(".optionsel li").hover(
			function(){$(this).css({backgroundColor:"#efefef"});},
			function(){$(this).css({backgroundColor:"#fff"});}
		);
		$(".optionsel li").click(function(){
			var v=$(this).html().replace("からコピー","");
			var l=$(this).attr("class");
			var d=$("input[name='p_"+fname+l+"']").val();
			if(d!=""){
				$("input[name='p_"+fname+lang+"']").val(d);
			}else{
				alert(v+"版にはデータが入力されておりません。")
			}
			$(".optionsel,.optionselbg").hide();
		});
	});
	
	$(".q1").click(function(){
		
		var n=$(this).attr("name");
		var y=$(this).offset().top+$(this).height()+14;
		var w=$(this).width()+28;
		var x=$(this).offset().left;
		var u=$(n.replace("p_",".m_")).html();
		
		if(u.match(/select/)){
			var t=u.match(/{([0-9a-z_]+)}/g);
			
			var p=[];
			for(var i=0;i<t.length;i++){
				p[i]=$("input[name='"+t[i].replace(/[^0-9a-z_]/g,"")+"']").val();
				u=u.replace(t[i],"'"+p[i].replace(/[^0-9]/g,"")+"'");
				if(p[i].length==0)return;
			}
			
			if((p[0].replace(/[^0-9]/g,"")-0)<10){
				u=u.replace("{X}",1);
			}else{
				u=u.replace("{X}",2);
			}
			
			$.ajax({
				type: "POST",
				url: "/editdm/module/importdata.php",
				data: "s="+u,
				success: function(m){
					
					var m=eval("("+m+")");
					$(".optionsel").html("<ul>"+m.d+"<li>選択をクリアする</li></ul>");
					var l=m.n-0;
					
					var h=l<10?(l+1)*20:200;
					$(".optionsel").css({zIndex:100,top:y+"px",left:x+"px",width:w+"px",height:h+"px",scrollTop:0}).show();
					
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
						$("input[name='"+n+"']").val($(this).html()!="選択をクリアする"?$(this).html():"");
						$(".optionsel,.optionselbg").hide();
					});	
				}
			});
		}else{
			var l=$(n.replace("p_",".m_")+" li").length;
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
		}
	});

	$(".q1").focus(function(){
		$(this).css({backgroundImage:"none"});
	});
	$(".q1").blur(function(){
		$(this).css({backgroundImage:"url(/shared/cms/img/ar.png)"});
	});
	

	$('input').on('keydown',function(e){
		if((e.which&&e.which===13)||(e.keyCode&&e.keyCode===13)){
			$(".optionsel").hide();
			return false;
		}
	});
	$('input[readonly]').on('keydown',function(e){
		if((e.which&&e.which===8)||(e.keyCode&&e.keyCode===8)){
			return false;
		}
	});
		
	$(".flagswitch").click(function(){	
		var slang=$(this).attr("class").match(/ lang_([^"]*)/)[1];
		var sid=$(this).attr("id").replace("e","");
		var sflag=$(this).attr("src").match(/dis/)?1:0;
		var stable=cd.replace("repo_s","repo");
		var r=$(this);
		
		$.ajax({
			type: "POST",
			url: "/editdm/module/flagswitch.php",
			data: "lang="+slang+"&id="+sid+"&flag="+sflag+"&table="+stable,
			success: function(m){
				if(m==1){
					r.attr("src",sflag==1?"/shared/cms/img/cmd_active.gif":"/shared/cms/img/cmd_disactive.gif");
				}
			}
		});

	});
	

	$(".lightbox").lightbox();
	$('.lightbox > img').mouseover(function(){
		var t=$(this).offset();
		var w=$(this).width();
		var h=$(this).height();
		q=this;
		var ws=getPageSize();
		$("#overwrap").css("left",t.left);
		$("#overwrap").css("top",t.top);
		$("#overwrap").width(w);
		$("#overwrap").height(h);
		$(".lenz").css("left",t.left+(w-50)/2);
		$(".lenz").css("top",t.top+(h-50)/2);
		$(".lbbg").width(ws[0]);
		$(".lbbg").height(ws[1]);
		$(".lbbg").show();
		$(".lenz").show();
		$("#overwrap").show();
	});
	$("#loadingDiv").hide();
	$(".listTable,#pageDescription").show();
	$('.lbbg').mouseover(function(){deleteWrap();});
	$('#overwrap').click(function(){deleteWrap();$(q).parent().click();});
	
	
	$(".orderby,.exuser,.excategory").change(function(){
		var s=$(this).val();		
		$.cookie($(this).attr("class").replace(".",""),s,{ path:"/"});
		location.reload();
	});

	if(window.location.href.match(/\/repo_n\/\?cid=1/)){
		$(".t_numbering,.numbering").hide();
		$(".t_display,.display").css({"borderLeft":"3px solid #ccc"});
		$(".display").css({"padding":"5px 0 5px 5px"});
	}

});