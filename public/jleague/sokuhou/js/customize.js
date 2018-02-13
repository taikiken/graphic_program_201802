$(window).on('load', function(){
	acordion();
});

$(function(){
	var currentWidth = window.innerWidth;
	window.addEventListener("resize", function() {
		if (currentWidth == window.innerWidth) {
			return;
		}
		currentWidth = window.innerWidth;
		acordion();
	});

	$('.acordion-ttl').click(function(e){
		if ( window.innerWidth < 768 ){
			$('+.acordion-inner', this).slideToggle(200);
			$(this).toggleClass('acordion-on');
		}
	});

	$('.anchor-link a[href^="#"]').on('click',function (e) {
		e.preventDefault();

		var headerHight = 70;
		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top-headerHight
			}, 500, 'swing', function () {
			window.location.hash = target;
		});
	});
	var subHeader = $('#subHeader');
	$(window).on('scroll', function(){
		var pos = $(this).scrollTop();
		content_pos = $('#content').position().top;
		if(pos >= content_pos){
			subHeader.addClass('show');
		} else {
			subHeader.removeClass('show');
		}
	});
});

function acordion() {
	if ( window.innerWidth < 768 ){
		$('.acordion-inner').hide();
	}
	else {
		$('.acordion-inner').show();
	}
}