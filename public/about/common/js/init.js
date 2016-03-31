// init.js

//画像変更
$(function(){
    var $setElem = $('.imgChange'),
    pcName = '_pc',
    spName = '_sp',
    replaceWidth = 768;
 
    $setElem.each(function(){
        var $this = $(this);
        function imgSize(){
            var windowWidth = window.innerWidth ? window.innerWidth: $(window).width();
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