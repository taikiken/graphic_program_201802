$(function(){
	
	var u,n,g,s,type,data;
	
	var dmn="";
	//var dmn="http://www.undotsushin.com";
	
	$(".sapi").change(function(){
		u=$("option:selected",this).val();
		if(u<15){
			$(".apibox").hide();
			return;
		}
		var s=$("option:selected",this).attr("class").split(" ");
		n=s[0].match(/sn([0-9]+)/)[1]-0;
		g=s[1];
		$(".url").html(u);
		if(u!=""){
			$(".apibox").hide();
			$(".api"+n).show();
		}else{
			$(".apibox").hide();
		}
		$("pre").html("");
	});

	$(".sapi2").change(function(){
		var tu=$("option:selected",this).val();
		if(tu<3){
			setuser("","","","");
			$("form input:eq(1)").val("");
			return;
		}
		$.ajax({
			type:"POST",
			data:"token="+tu,
			url:dmn+"/shared/module/user.php",
			success:function(m){
				setuser(m.name,m.email,m.bio,m.profile_picture);
			}
		});
	});
	function setuser(name,email,bio,profile_picture){
		$(".api22 input:eq(0)").val(email);
		$(".api22 input:eq(2)").val(name);
		$(".api22 textarea").val(bio);
		if(profile_picture){
			$(".api22 .img").show();
			$(".api22 .img img").attr("src",sprintf("/prg_img/img/"+profile_picture));
		}else{
			$(".api22 .img img").attr("src","");
			$(".api22 .img").hide();
		}
	}

	$("#articlesl").change(function(){
		$.ajax({
			type:"POST",
			data:"id="+$("option:selected",this).val(),
			url:dmn+"/shared/module/comment.php",
			success:function(m){
				$("#articlecomment").html(m);
			}
		});
	});

	$("#articlesl2").change(function(){
		$.ajax({
			type:"POST",
			data:"id="+$("option:selected",this).val(),
			url:dmn+"/shared/module/comment2.php",
			success:function(m){
				$("#articlecomment2").html(m);
			}
		});
	});

	$(".btns").click(function(){

		var vl=[];
		var uu,ud;
		$("pre").html("");

		$(".vv",".api"+n).each(function(){
			var v=$(this).get(0).tagName;
			var q=$(this).parents("tr").index()-1;
			if(v.match(/(input|textarea)/i)){
				vl[q]=$(this).val();
			}else{
				vl[q]=$("option:selected",this).val();
			}
		});

		if(n==2){
			vl[0]=vl[0]==""?"":sprintf("/%s",trim(vl[0]));
			vl[1]=vl[1]==""?0:trim(vl[1]);
			vl[2]=vl[2]==""?10:trim(vl[2]);
			uu=u+sprintf("%s?offset=%s&length=%s",vl[0],vl[1],vl[2]);
		}else if(n==3){
			vl[0]=vl[0]==""?"":sprintf("/%s",trim(vl[0]));
			vl[1]=vl[1]==""?0:trim(vl[1]);
			vl[2]=vl[2]==""?10:trim(vl[2]);
			uu=u+sprintf("%s?offset=%s&length=%s",vl[0],vl[1],vl[2]);
		}else if(n==4){
			vl[0]=sprintf("/%s",trim(vl[0]));
			vl[1]=vl[1]==""?"":sprintf("/%s",trim(vl[1]));
			vl[2]=vl[2]==""?0:trim(vl[2]);
			vl[3]=vl[3]==""?10:trim(vl[3]);
			uu=u+sprintf("%s%s?offset=%s&length=%s",vl[0],vl[1],vl[2],vl[3]);
		}else if(n==5){
			if(vl[0]==""){
				alert("検索語を入力してください");
				return;
			}
			vl[0]=sprintf("/%s",encodeURIComponent(vl[0]));
			vl[1]=vl[1]==""?0:trim(vl[1]);
			vl[2]=vl[2]==""?10:trim(vl[2]);
			uu=u+sprintf("%s?offset=%s&length=%s",vl[0],vl[1],vl[2]);
		}else if(n==6){
			uu=u+sprintf("/%s",vl[0]);
		}else if(n==7){			
			vl[0]=sprintf("/%s",trim(vl[0]));
			vl[1]=vl[1]==""?"":sprintf("/%s",trim(vl[1]));
			vl[2]=vl[2]==""?0:trim(vl[2]);
			vl[3]=vl[3]==""?10:trim(vl[3]);
			uu=u+sprintf("%s%s?offset=%s&length=%s",vl[0],vl[1],vl[2],vl[3]);
		}else if(n==9){
			ud=$(".sapi2 option:selected").val();

			uu=u+sprintf("%s/bookmark",vl[0]);
		}else if(n==10){
			ud=$(".sapi2 option:selected").val();

			uu=u+sprintf("%s/bookmark",vl[0]);
		}else if(n==11){
			var uv=$("#commentbody").val();
			if(uv==""){
				alert("コメントを入力してください");
				return;
			}
			uu=u+sprintf("/%s%s",vl[0],vl[1]==0?"":sprintf("/%s",vl[1]));
			data=sprintf("body=%s",uv);

		}else if(n==12){
			ud=$(".sapi2 option:selected").val();

			if(vl[1]==""){
				alert("コメントを選択してください");
				return;
			}
			if(vl[2]==""){
				alert("good,badを選択してください");
				return;
			}
		
			uu=u+sprintf("%s/%s",vl[2],vl[1]);

		}else if(n==13){
			ud=$(".sapi2 option:selected").val();

			ud=$("#articlecomment3 option:selected").attr("class")=="rc1"?"like":"bad";	
			uu=u+sprintf("%s/%s",ud,vl[0]);

		}else if(n==14){
			ud=$(".sapi2 option:selected").val();

			ud=vl[0].split(":");
			uu=u;
			uu+=(ud.length==2)?sprintf("/%s/%s",ud[0],ud[1]):sprintf("/%s/%s/%s",ud[0],ud[1],ud[2]);
		}else if(n==15||n==17){
			ud=$(".sapi2 option:selected").val();

			uu=u;
			
		}else if(n==16){
			
			uu=u+sprintf("/%s",vl[0]);
		}else if(n==18){

			ud=$(".sapi2 option:selected").val();

			
			data=new FormData($(".account")[0]);
			uu=u;
			

		}else if(n==19||n==20){
			ud=$(".sapi2 option:selected").val();

			vl[0]=vl[0]==""?0:trim(vl[0]);
			vl[1]=vl[1]==""?10:trim(vl[1]);
			uu=u+sprintf("?offset=%s&length=%s",vl[0],vl[1]);

		}else if(n==8||n==21){
			ud=$(".sapi2 option:selected").val();

			uu=u;
		}else if(n==22){
			ud=$(".sapi2 option:selected").val();

			data=new FormData($("form")[1]);
			uu=u;

		}else if(n==24){
			
			data=new FormData($("form")[2]);
			uu=u;

		}else if(n==25){			
			vl[0]=trim(vl[0]);
			vl[1]=trim(vl[1]);

			data=sprintf("email=%s&password=%s",vl[0],vl[1]);
			uu=u;

		}else if(n==26||n==27||n==28){
			ud=$(".sapi2 option:selected").val();

			uu=u;

		}else if(n==29){
			vl[0]=trim(vl[0]);

			data=sprintf("email=%s",vl[0]);
			uu=u;
		}else if(n==30){			
			vl[0]=trim(vl[0]);
			vl[1]=trim(vl[1]);
			vl[2]=trim(vl[2]);
			data=sprintf("service=%s&id=%s&token=%s",vl[0],vl[1],vl[2]);
			uu=u;
		}else if(n==31){
			uu=u+sprintf("/%s",vl[0]);
		}else if(n==1||n==23){
			uu=u;
		}else{
			
		}

		$(".url").html(sprintf("<a href='%s' target='_blank'>%s</a>",uu,uu));

		$.ajax({
			type:g,
			data:data,
			url:dmn+uu,
			contentType:(n==18||n==22||n==24)?false:"application/x-www-form-urlencoded",
			processData:false,
			beforeSend:function(m){
				m.setRequestHeader("Authorization","OAuth realm=www.undotsushin.com, oautn_token="+$("option:selected",".sapi2").val());
			},
			success:function(m){
				$("pre").html(m);
				if(n==22){
					var s=$(".api22 .img img").attr("src")+"?s="+Math.random()*10000000;
					$(".api22 .img img").attr("src",s);
				}else if(n==3){
					var m=JSON.parse(m);
					//alert(m.response.articles.length)
				}
				
			}
		});
	});
	
});



function q(s){
	console.log(s);
}

function sprintf(format){
	var args=arguments;
	var i=1;
	return format.replace(/%s/g, function(a,b){
		return args[i++];
	});
}
function trim(s){ 
    return (s+"").replace(/\s+|\s+$/g,"");
}
