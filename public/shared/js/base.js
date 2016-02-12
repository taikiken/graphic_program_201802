$(function(){
	
	$(".bookmark").click(function(){
		$(this).removeClass("def");
		$(this).addClass("act").html("ブックマークしました");
	});
	
});

function q(s){
	console.log(s);
}

function sprintf(format){
	var ary=arguments;
	var idx=1;
	return format.replace(/%s/g, function(a,b){
		return ary[idx++];
	});
}