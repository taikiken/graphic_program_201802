(function() {
	var req = new XMLHttpRequest(),jleagueCopyright,elms;
	req.onreadystatechange = function(){
		if( this.readyState == 4 && this.status == 200 ){
			if( this.response ){
				jleagueCopyright = req.responseText;
				elms = document.getElementsByClassName('jleague-copyright');
				elms[0].innerHTML = jleagueCopyright;
			}
		}
	}
	req.open('GET', "/jleague/inc/jleagueCopyright.html");
	req.send(null);
}());