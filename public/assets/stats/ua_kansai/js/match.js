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
		var expire = new Date();
		expire.setTime( expire.getTime() + 1000 * 3600 * 1 );
		document.cookie = 'game-info='+target[index]+';path=/stats/ua_kansai/match/;expires=' + expire.toUTCString();
	});
	$('#team-tab li').on('click',function(){
		var index,target = ["play-first","draw-first"];
		index = $('#team-tab li').index(this);
		$('#team-tab').removeClass( );
		$('#team-tab').addClass("active-"+index);
		for (var i = 0; i < target.length; i++) {
			$("."+target[i]).hide();
		}
		$("."+target[index]).show();
	});

	$('#auto').on('click',function(){
		$(".refresh-container a").removeClass("selected");
		$(this).find("a").addClass("selected");
		startAutoReload();
		var expire = new Date();
		expire.setTime( expire.getTime() + 1000 * 3600 * 1 );
		document.cookie = 'autoReload=1;path=/stats/ua_kansai/match/;expires=' + expire.toUTCString();
		return false;
	});

	$('#manual').on('click',function(){
		$(".refresh-container a").removeClass("selected");
		$(this).find("a").addClass("selected");
		var autoReloadActive = GetCookie("autoReload");
		if ( autoReloadActive == 1) {
			clearAutoReload();
			var date = new Date();
			date.setTime( date.getTime() - 1 );
			document.cookie = 'autoReload=;path=/stats/ua_kansai/match/;expires=' + date.toUTCString();
		}
		return false;
	});
	$('#reload').on('click',function(){
		window.location.reload();
		return false;
	});
	var autoReloadActive = GetCookie("autoReload");
	if ( autoReloadActive == 1) {
		$('#auto').trigger('click');
	}
	var gameInfoActive = GetCookie("game-info");
	if ( gameInfoActive ) {
		var target = {"basic-info":"1","score-info":"2","personal-info":"3"};
		$('#game-info li:nth-of-type('+target[gameInfoActive]+')').trigger('click');
	}
});
var autoReload,countDown,countDownTimer,i;
var startAutoReload = function(){
	clearTimeout(autoReload);
	clearInterval(countDownTimer);
	i = 30;
	autoReload = setTimeout("location.reload()",31000);
	countDown();
}
var clearAutoReload = function(){
	clearTimeout(autoReload);
	var elm = document.querySelector('#auto span');
	i=30;
	elm.innerText = "自動更新("+i+"秒)";
	clearInterval(countDownTimer);
}
var countDown = function(){
	countDownTimer=setInterval(function(){
		var elm = document.querySelector('#auto span');
		elm.innerText = "自動更新("+i+"秒)";
		if (i==0) {
			clearInterval(countDownTimer);
		}
		i--;
	} , 1000);
}
function GetCookie( name ){
	var result = null;
	var cookieName = name + '=';
	var allcookies = document.cookie;
	var position = allcookies.indexOf( cookieName );
	if( position != -1 ){
		var startIndex = position + cookieName.length;
		var endIndex = allcookies.indexOf( ';', startIndex );
		if( endIndex == -1 ){
			endIndex = allcookies.length;
		}
		result = decodeURIComponent(
			allcookies.substring( startIndex, endIndex ) );
	}
	return result;
}