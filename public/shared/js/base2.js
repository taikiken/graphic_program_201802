$(function(){
	
	$("select").change(function(){
		var u=$("option:selected",this).val();
		if(u!="")location.href=u;
		else $("pre,span,.ss2").html("");
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