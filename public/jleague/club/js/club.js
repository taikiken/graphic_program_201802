(function() {
	var year;
	var master;

	!function(){
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					year =  data.response.year;
					getMaster();
				}
			}
		}
		req.open('GET', "https://jlive.sportsbull.jp/json/v1/year.json");
		req.send(null);
	}();
	var getMaster = function(){
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					master =  data.response;
					callBack(master.team);
				}
			}
		}
		req.open('GET', "https://jlive.sportsbull.jp/json/v1/"+year+"/jleague/master.json");
		req.send(null);
	};

	var callBack = function(team){
		// console.log(team);
		var elm,h2,ul,li,a,baseElm = document.querySelector('.club-list');
		for (var i = 0; i < team.length; i++) {
			h2 = document.createElement('h2');
			h2.classList.add("ttl-h2");
			h2.innerText = team[i].league;
			baseElm.appendChild(h2);
			ul = document.createElement('ul');
			for (var j = 0; j < team[i].club.length; j++) {
				li = document.createElement('li');
				a = document.createElement('a');
				a.classList.add("team-"+team[i].club[j].id);
				a.setAttribute('href', "/jleague/team/?teamId="+team[i].club[j].id);
				a.innerText = team[i].club[j].name;
				li.appendChild(a);
				ul.appendChild(li);
			}
			baseElm.appendChild(ul);
		}
	}
}());