(function() {
	var year;
	var master,league = [];
	var setting = function(){
		getData("2",year);
		leagueChange();
	}
	window.onload = function() {
		yearChange();
	}
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
					for (var i = 0; i < master.league.length; i++) {
						if (master.league[i].id > 0) {
							league.push(master.league[i].id);
						}
					}
				}
				setting();
			}
		}
		req.open('GET', "https://jlive.sportsbull.jp/json/v1/"+year+"/jleague/master.json");
		req.send(null);
	};

	var getDate = function(date){
		var dateArr = date.split('-');
		dateArr[2] = dateArr[2].split(' ');
		var mdy = dateArr[1] + '/' + dateArr[2][0] + '/' + dateArr[0]
		var dateObj = new Date(mdy) ;
		var weekday = [ "日", "月", "火", "水", "木", "金", "土" ] ;
		var wday = "（" + weekday[ dateObj.getDay() ] + "）" ;
		return wday;
	}
	var getData = function (leagueId,year) {
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBack(data.response,leagueId);
				}
			}
		}
		req.open('GET', 'https://jlive.sportsbull.jp/json/v1/'+year+'/jleague/ranking/'+leagueId+'.json');
		req.send(null);
	};
	
	var callBack = function(data,leagueId){
		var league = leagueId == "2" ? "j1":leagueId == "4" ? "cup":"j2",insertElm = league == "cup" ? document.querySelector('#cup .tbl-standings tbody') : document.querySelector('#league .tbl-standings tbody'),title,time,row,insertElm,update,wday,e,group;
		title = document.getElementsByClassName("ttl-h2");
		title[0].innerHTML = data.league;
		time = document.getElementsByClassName("txt-note-gray");
		wday = getDate(data.lastupdated);
		update = data.lastupdated.replace( "-" , "年" ).replace( "-" , "月" ).replace( " " , "日"+wday ) ;
		time[0].innerHTML = '更新日：'+update;
		if (league == "cup") {
			e = document.getElementById('league');
			e.style.display="none";
			e = document.getElementById('cup');
			e.style.display="block";
			insertElm.innerHTML = '';
			var clone = e.children,clone1 = clone[0].cloneNode(true),clone2 = clone[1].cloneNode(true);
			if (clone[2]) {
				clone[3].parentNode.removeChild(clone[3]);
				clone[2].parentNode.removeChild(clone[2]);
			}
			group = data.standing[0].group;
			clone[0].innerHTML = group;
			document.getElementById('notice-j1league').style.display="none";
			document.getElementById('notice-j2league').style.display="none";
		}else{
			e = document.getElementById('league');
			e.style.display="block";
			e = document.getElementById('cup');
			e.style.display="none";
			insertElm.innerHTML = '';
			if (league == "j1") {
				document.getElementById('notice-j1league').style.display="block";
				document.getElementById('notice-j2league').style.display="none";
			}else{
				document.getElementById('notice-j1league').style.display="none";
				document.getElementById('notice-j2league').style.display="block";
			}
			
		}
		for(var key in data.standing) {
			if (league == "cup" && data.standing[key].group != group ) {
				insertElm = clone2.querySelector("tbody");
				group = data.standing[key].group;
			}
			row = createStandingsRow(data.standing[key]);
			insertElm.appendChild(row);
		}
		if (league == "j1") {
			var tr = insertElm.querySelectorAll("tr");
			for(var i = 0; i < 3; i++) {
				tr[key-i].classList.add('standings-bg-red');
			}
		}else if (league == "cup") {
			clone1.innerHTML = group;
			e = document.getElementById('cup');
			e.appendChild(clone1);
			e.appendChild(clone2);
		}else{
			var tr = insertElm.querySelectorAll("tr");
			tr[0].classList.add('standings-bg-yellow');
			tr[1].classList.add('standings-bg-yellow');
			tr[2].classList.add('standings-bg-blue');
			tr[3].classList.add('standings-bg-blue');
			tr[4].classList.add('standings-bg-blue');
			tr[5].classList.add('standings-bg-blue');
			for(var i = 0; i < 2; i++) {
				tr[key-i].classList.add('standings-bg-red');
			}
		}
		sort();
	}

	var createStandingsRow = function(data){
		var elm = document.createElement("tr"),e,e2,teamId,replace = ["nochange","up","down"],group,a;
			//前節差
			e = document.createElement("td");
			e.classList.add('tbl-detail-rank');
			e2 = document.createElement("span");
			e2.classList.add('img-rank-'+replace[data.replace]);
			e.appendChild(e2);
			elm.appendChild(e);
			//順位
			e = document.createElement("td");
			e.innerHTML = data.ranking;
			elm.appendChild(e);
			//クラブ名
			e = document.createElement("td");
			e.classList.add('tbl-detail-club');
			a = document.createElement('a');
			a.setAttribute('href', "/jleague/team/?teamId="+data.team.id);
			e2 = document.createElement("span");
			e2.classList.add('img-emblem');//IE
			e2.classList.add('team-'+data.team.id);
			a.appendChild(e2);
			e2 = document.createElement("span");
			e2.classList.add('tbl-standings-team');
			e2.innerHTML = data.team.name;
			a.appendChild(e2);
			e.appendChild(a);
			elm.appendChild(e);
			//勝ち点
			e = document.createElement("td");
			e.innerHTML = data.point;
			elm.appendChild(e);
			//試合数
			e = document.createElement("td");
			e.innerHTML = data.game;
			elm.appendChild(e);
			//勝
			e = document.createElement("td");
			e.innerHTML = data.win;
			elm.appendChild(e);
			//分
			e = document.createElement("td");
			e.innerHTML = data.draw;
			elm.appendChild(e);
			//負
			e = document.createElement("td");
			e.innerHTML = data.lose;
			elm.appendChild(e);
			//得点
			e = document.createElement("td");
			e.innerHTML = data.score;
			elm.appendChild(e);
			//失点
			e = document.createElement("td");
			e.innerHTML = data.lost;
			elm.appendChild(e);
			//得失点
			e = document.createElement("td");
			e.innerHTML = data.differ;
			elm.appendChild(e);
			//直近5試合
			if (!data.group) {
				e = document.createElement("td");
				e.classList.add('tbl-detail-immediate');
				for (var i = 4; i >= 0 ; i--){
					e2 = document.createElement("span");
					e2.classList.add('img-match-'+data.recent[i]);
					e.appendChild(e2);
				}
				elm.appendChild(e);
			}else{

			}
		return elm;
	}
	var yearChange = function(){
		var elm = document.querySelector('.select-year'),elm2;
		for (var i = 0; i < master.year.length; i++) {
			elm2 = document.createElement('option');
			elm2.setAttribute('value', master.year[i].id);
			elm2.innerText = master.year[i].label;
			elm.appendChild(elm2);
		}
		elm = document.querySelector('select');
		elm.addEventListener('change', yearChangeEvent);
	}
	var yearChangeEvent = function() {
		year = document.year.elements["select-year"].value;
		getMaster();
	}
	var leagueChange = function(){
		var elm = document.querySelector('.nav-standings ul'),elm2;
		elm.innerHTML = "";
		for (var i = 0; i < master.league.length; i++) {
			if (master.league[i].id > 0) {
				elm2 = document.createElement('li');
				elm2.classList.add('nav-tab');
				if (master.league[i].id != 4) {
					elm2.innerText = master.league[i].name;
				}else{
					elm2.classList.add('f12');
					elm2.innerText = "ルヴァンカップ";
				}
				elm.appendChild(elm2);
			}
		}
		elm.parentNode.className = "nav-tab-wrapper nav-standings active-0";
		var elms = elm.getElementsByTagName("li");
		for (var i=0 ; i<elms.length ; i++){
			elms[i].addEventListener('click', leagueChangeEvent, false);
		}
	}
	var leagueChangeEvent = function() {
		var elm = document.getElementsByClassName("nav-tab");
		for( var i=0,l=elm.length; l>i; i++ ) {
			if( this == elm[i] ) {
				elm[i].parentNode.parentNode.className = "nav-tab-wrapper nav-standings active-"+i ;
				break ;
			}
		}
		getData(league[i],year);
	}
	var sort = function(){
		var elm = document.querySelectorAll('table thead');
		for (var i=0 ; i<elm.length ; i++){
			var elms = elm[i].getElementsByTagName("th");
			for (var j=0 ; j<elms.length ; j++){
				elms[j].addEventListener('click', sortEvent, false);
			}
		}
	}
	var sortEvent = function() {
		var newtr =[],tmp1,tmp2,tmp3;
		var elm = this.parentNode;
		var elms = elm.getElementsByTagName("th");
		var array = [];
		var sort = this.firstElementChild.getAttribute("class");
		if (sort) {
			for (var i=0 ; i<elms.length ; i++){
				if( this == elms[i] ) {
					if(!elms[i].classList.contains('selected')){
						sort = "arrow-up";
						elms[i].classList.add('selected');
					}
					
					tmp1 = this.parentNode.parentNode.parentNode;
					tmp2 = tmp1.querySelectorAll("tbody tr");
					for (var j=0 ; j<tmp2.length ; j++){
						var t = tmp2[j].querySelectorAll("td");
						var c = t[i] ? t[i].innerText:0;
						array.push({trNo:Number(j),val:Number(c)});
					}
					if (sort == "arrow-down") {
						//降順
						elms[i].firstElementChild.classList.remove("arrow-down");
						elms[i].firstElementChild.classList.add("arrow-up");
						array.sort(function(a,b){
							if(a.val > b.val) return -1;
							if(a.val < b.val) return 1;
							return 0;
						});
					}else if(sort == "arrow-up"){
						//昇順
						elms[i].firstElementChild.classList.remove("arrow-up");
						elms[i].firstElementChild.classList.add("arrow-down");
						array.sort(function(a,b){
							if(a.val < b.val) return -1;
							if(a.val > b.val) return 1;
							return 0;
						});
					}
					tmp3 = tmp1.querySelector("tbody");
					var newtbody = document.createElement("tbody");
					for (var j=0 ; j<array.length ; j++){
						newtbody.appendChild(tmp2[array[j]["trNo"]]);
					}
					tmp3.innerHTML = "";
					for (var j=0 ; j<array.length ; j++){
						tmp3.appendChild(newtbody.children[0]);
					}
					
				}else if(elms[i].firstElementChild && (elms[i].firstElementChild.classList.contains("arrow-up") || elms[i].firstElementChild.classList.contains("arrow-down"))){
					elms[i].firstElementChild.classList.remove("arrow-up");
					elms[i].firstElementChild.classList.remove("arrow-down");
					elms[i].firstElementChild.classList.add("arrow-down");
					elms[i].classList.remove('selected');
				}
			}
		}
	}

}());