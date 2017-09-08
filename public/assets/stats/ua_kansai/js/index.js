$(function(){
	$('#game-category li').on('click',function(){
		var index;
		index = $('#game-category li').index(this);
		$('#game-category').removeClass( );
		$('#game-category').addClass("active-"+index);
		$('[class^="game-category"]').hide();
		$('.game-category'+(index+1)).show();
	});
});