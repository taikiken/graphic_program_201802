(function() {
	var req = new XMLHttpRequest(),globalNav,elms;
	req.onreadystatechange = function(){
		if( this.readyState == 4 && this.status == 200 ){
			if( this.response ){
				globalNav = req.responseText;
				elms = document.getElementsByClassName('global-nav');
				elms[0].innerHTML = globalNav;
				elms[1].innerHTML = globalNav;
			}
		}
	}
	req.open('GET', "/jleague/inc/globalnav.html");
	req.send(null);
}());