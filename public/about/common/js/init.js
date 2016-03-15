// init.js

//画像ボタンhover
$(function(){
	$("a img").hover(
		function(){
			$(this).stop().animate({ opacity: "0.7"}, 300);
		},
		function(){
			$(this).stop().animate({ opacity: "1.0"}, 300);
		}
	);
});


//画像変更
$(function(){
    var $setElem = $('.imgChange'),
    pcName = '_pc',
    spName = '_sp',
    replaceWidth = 750;
 
    $setElem.each(function(){
        var $this = $(this);
        function imgSize(){
            var windowWidth = parseInt($(window).width());
            if(windowWidth >= replaceWidth) {
                $this.attr('src',$this.attr('src').replace(spName,pcName)).css({visibility:'visible'});
            } else if(windowWidth < replaceWidth) {
                $this.attr('src',$this.attr('src').replace(pcName,spName)).css({visibility:'visible'});
            }
        }
        $(window).resize(function(){imgSize();});
        imgSize();
    });
});
/*function imgChange(){
    var w = $(window).width();
    var x = 767;
    if (w <= x) {
		$('.imgChange').each(function(){
			$(this).attr("src",$(this).attr("src").replace('_pc', '_sp'));
		});
    } else {
		$('.imgChange').each(function(){
			$(this).attr("src",$(this).attr("src").replace('_sp', '_pc'));
		});
    }
}

$(function(){
	imgChange();
});

$(window).resize(function () {
	imgChange();
});*/