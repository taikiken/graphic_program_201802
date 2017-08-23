$(function(){
	$('#game-info li').on('click',function(){
		var index,target = ["basic-info","score-info","personal-info"];
		index = $('#game-info li').index(this);
		$('#game-info').removeClass( );
		$('#game-info').addClass("active-"+index);
		for (var i = 0; i < target.length; i++) {
			$("#"+target[i]).hide();
		}
		$("#"+target[index]).show();
	});
	$('#team-tab li').on('click',function(){
		var index,target = ["home","away"];
		index = $('#team-tab li').index(this);
		$('#team-tab').removeClass( );
		$('#team-tab').addClass("active-"+index);
		for (var i = 0; i < target.length; i++) {
			$("."+target[i]).hide();
		}
		$("."+target[index]).show();
	});
});