$(function(){
	
	var img=[];
	var un=0;
	
	$('#inputFile').on("change",function(){
		var files=this.files;
		for(var i=0;i<files.length;i++){
			$(".box ul").append("<li></li>");
		}
		$.ajax({
			url:"upload.php",
			type:"POST",
			processData:false,
			contentType:false,
			data:new FormData($('#fup')[0]),
			enctype:'multipart/form-data',
			dataType:'Json',
			complete:function(r){
				var l="";
				var m=eval("("+r.responseText+")");
				var n=img.length;
				for(var i=0;i<m.length;i++){
					img[n+i]=m[i];
				}
				img.sort();
				iresize(img[0],0);
			}
		});
	});
	
	function iresize(n,i){
		$.ajax({
			url:"resize.php",
			type:"POST",
			data:"f="+n,
			success:function(){
				$(".box ul li:eq("+i+")").append("<img src='../../../prg_img/movie/"+n+"'>");
				if(i<img.length){
					un++;
					iresize(img[un],un);
				}
			}
		});
	}

	$(".btnss").click(function(){
		$('#inputFile').click();
	});
});