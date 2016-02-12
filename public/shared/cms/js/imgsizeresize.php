<?php if($q->get_dir()==1&&$q->get_file()==0){ ?>
<script type="text/javascript">
$(function(){
	
	var s=$("img[name='img11']").attr("src");
	if(s){
	
		var img=new Image();
		img.src=s;
		var ow=img.width;
		var oh=img.height;
		
		if($("[name='p_n1']").val()==""){
			$("[name='p_n1']").val(660);
		}else{
			var w=$("[name='p_n1']").val();
			var h=Math.round(w*oh/ow);
			$("[name='img11']").width(w).height(h);
		}
		$(".chbtn").click(function(){
			var w=$("[name='p_n1']").val();
			var h=Math.round(w*oh/ow);
			$("[name='img11']").width(w).height(h);
		});
	}
});
</script>
<?php }elseif($q->get_dir()==0&&$q->get_file()==0){ ?>
<script type="text/javascript">
$(function(){

	var s=$("img[name='img11']").attr("src");
	if(s){
		
		var img=new Image();
		img.src=s;
		var ow=img.width;
		var oh=img.height;
		
		if($("[name='p_n1']").val()==""){
			$("[name='p_n1']").val(660);
		}else{
			var w=$("[name='p_n1']").val();
			var h=Math.round(w*oh/ow);
			$("[name='img11']").width(w).height(h);
		}
		$(".chbtn").click(function(){
			var w=$("[name='p_n1']").val();
			var h=Math.round(w*oh/ow);
			$("[name='img11']").width(w).height(h);
		});
	}else{
		$("[name='p_n1']").val(660);
		$(".chbtn").hide();	
	}
});
</script>
<?php }else{ ?>
<script type="text/javascript">
$(function(){
	
	var s=$("img[name='img11']").attr("src");
	if(s){

		var img=new Image();
		img.src=s;
		var ow=img.width;
		var oh=img.height;

		var w=$("[name='p_n1']").val();
		var h=Math.round(w*oh/ow);
		
		$("[name='img11']").width(w).height(h);
	}
});
</script>
<?php } ?>
