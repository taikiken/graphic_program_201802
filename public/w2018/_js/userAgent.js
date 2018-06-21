(function() {
	var agent = navigator.userAgent;
	var url = window.location.href ;
	if ( !agent.match(/undotsushin-ios/) && !agent.match(/undotsushin-android/)) {
		// var elm = document.querySelector('header.head-sec');
		// if (url.match(/sokuhou/)) {//sokuhou
		// 	elm = document.querySelector('header .pageTitle');
		// 	elm.classList.remove("hide");
		// }else{//standings,match
		// 	elm.classList.remove("hide");
		// }
		// elm.classList.remove("hide");
		// elm = document.querySelector('#footer');
		// elm.classList.remove("hide");
	}else{
		// if (url.match(/sokuhou/)) {//sokuhou
		// 	var elm = document.querySelector('body');
		// 	elm.style.marginTop = "-45px";
		// 	elm.style.backgroundPosition = "center 0";
		// }
	}
	
}());
var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
	GunosyAdsSDK.bid({
		mediaId: 14722,
		frameId: 42697,
	});
	GunosyAdsSDK.bid({
		mediaId: 14722,
		frameId: 42698,
	});
}

