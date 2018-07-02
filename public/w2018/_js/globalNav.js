(function() {
	var req = new XMLHttpRequest(),globalNav,elms;
	req.onreadystatechange = function(){
		if( this.readyState == 4 && this.status == 200 ){
			if( this.response ){
				globalNav = req.responseText;
				elms = document.getElementsByClassName('global-nav');
				elms[0].innerHTML = globalNav;
				var menuUl = document.querySelector('.global-nav ul');
				if ( location.href.match(/ranking/)) {
					menuUl.querySelector('a:nth-of-type(2)').classList.add("now");
				} else if( location.href.match(/tournament/)){
					menuUl.querySelector('a:nth-of-type(3)').classList.add("now");
				} else if( location.href.match(/team/)){
					menuUl.querySelector('a:nth-of-type(4)').classList.add("now");
				} else {
					menuUl.querySelector('a:nth-of-type(1)').classList.add("now");
				}
			}
		}
	}
	req.open('GET', "/w2018/inc/globalnav.html");
	req.send(null);
}());