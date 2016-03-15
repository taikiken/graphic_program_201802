<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>無題ドキュメント</title>
<script src="/shared/js/jquery-1.11.0.min.js"></script>
<script>

$(function(){
	$.ajax({
		type:"GET",
		url:"v1/sessions/social",
		success:function(m){
			$("pre").html(window.JSON.stringify(m));
		}
	});
	
});

</script>
</head>
<body>
<pre></pre>
</body>
</html>