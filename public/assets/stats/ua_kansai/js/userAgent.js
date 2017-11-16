(function() {
	var agent = navigator.userAgent;
	var url = window.location.href ;
	if ( agent.match(/undotsushin-ios/) || agent.match(/undotsushin-android/)) {
		$("header.head-sec").hide();
		$("#ua-app-big-banner").show();
		$("#athletech_sp").show();
	}else if(agent.indexOf('iPhone') > 0 || agent.indexOf('iPod') > 0 || agent.indexOf('Android') > 0 && agent.indexOf('Mobile') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('Android') > 0){
		$("#ua-sp-big-banner").show();
		$("#athletech_sp").show();
	}else{
		$("#ua-pc-big-banner").show();
		$("#athletech_pc").show();
	}
}());