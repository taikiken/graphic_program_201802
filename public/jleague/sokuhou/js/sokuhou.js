(function() {
	
	if ( location.hostname.match(/dev./)) {
		jsondevurl = "dev-";
	} else {
		jsondevurl = "";
	}
	
	var situationId = false,gameId,year;
	window.onload = function() {
		getData(year,gameId,situationId);
		manualReload();
	}
	var escapeJsHTML = function (str) {
		return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\//g, '\\/').replace(/</g, '\\x3c').replace(/>/g, '\\x3e').replace(/(0x0D)/g, '\r').replace(/(0x0A)/g, '\n').replace(/&/g, '&amp;');
	};
	var getParameter = function(){
		var url = window.location.search,tmp,hash,para;
		tmp = url.split('&');
		hash = tmp[0].slice(1);
		para = hash.split('=');
		gameId = para[1] ? escapeJsHTML(para[1]) :false;
		if (!gameId) {
			location.href = "https://sportsbull.jp/jleague/match/";
			exit;
		}
		year = gameId.substr(0,4);
	}();
	var startAutoReload = setInterval(function(){
		getData(year,gameId,situationId);
	},10000);
	var manualReload = function(){
		var elm = document.querySelector('.btn-update');
		elm.addEventListener('click', manualReloadEvent, false);
	}
	var manualReloadEvent = function() {
		event.stopImmediatePropagation();
		getData(year,gameId,situationId);
	}
	var getOtherGame = function(y,m,d){
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					createOtherGame(data.response,m,d);
				}
			}
		}
		req.open('GET', "https://"+jsondevurl+"jlive.sportsbull.jp/json/v1/"+y+"/jleague/schedule/"+m+"-"+d+".json");
		req.send(null);
	};
	var createOtherGame = function(data,m,d){
		var card,L,elm = document.querySelector('#other-match-list'),elm2,elm3,elm4;
		var league = {"Ｊ１リーグ":"J1 ","Ｊ２リーグ":"J2 ","ＪリーグYBCルヴァンカップ":"ルヴァン杯 ","Ｊ１昇格プレーオフ":"J2 "};
		var date = m+"/"+d+"("+data.weekday+") "
		for (var i = 0; i < data.league.length; i++) {
			for (var j = 0; j < data.league[i].card.length; j++) {
				card = data.league[i].card[j];
				L = league[data.league[i].title];
				elm2 = document.createElement('a');
				elm2.setAttribute('href', '?id='+card.gameid);
				elm2.classList.add("other-match-individual");
				elm3 = document.createElement('div');
				elm3.classList.add("other-match-team");
				elm3.innerText = "VS";
				elm4 = document.createElement('span');
				elm4.classList.add("team-image");
				elm4.classList.add("team-"+card.hometeam.id);
				elm3.insertBefore(elm4, elm3.firstChild);
				elm4 = document.createElement('span');
				elm4.classList.add("team-image");
				elm4.classList.add("team-"+card.awayteam.id);
				elm3.appendChild(elm4);
				elm2.appendChild(elm3);
				elm3 = document.createElement('div');
				elm3.classList.add("other-match-detail");
				elm3.innerText = L+card.group+card.round;
				elm2.appendChild(elm3);
				elm3 = document.createElement('div');
				elm3.classList.add("other-match-date");
				elm3.innerText = date+card.time+card.stadium;
				elm2.appendChild(elm3);

				elm.appendChild(elm2);
			}
		}
	}
	var getData = function(y,id,situationId){
		var url = "https://"+jsondevurl+"jlive.sportsbull.jp/json/v1/"+y+"/jleague/"+id+".json",req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if (this.readyState == 4) {
				// data = JSON.parse(req.response);
				// situationId ? reload(data.response) : callBack(data.response);
				if( this.status == 200 && req.response != "undefined"){
					data = JSON.parse(req.response);
					situationId ? reload(data.response) : callBack(data.response);
				}else{
					console.log("Not Data");
					location.href = "https://sportsbull.jp/jleague/match/";
					exit;
				}
			}
		}
		req.open('GET', url);
		req.send(null);
	}

	var callBack = function(data){
		var gameinfo = data.gameinfo,home,away,elm,events = typeof(data.event) == "undefined" ? "" : data.event.events;
		if (gameinfo.team[0].homeaway == 0) {
			home = gameinfo.team[0];
			away = gameinfo.team[1];
		}else{
			home = gameinfo.team[1];
			away = gameinfo.team[0];
		}
		situationId = data.situation.id;
		y = gameinfo.dateY;
		m = ( '00' + gameinfo.dateM ).slice( -2 );
		d = ( '00' + gameinfo.dateD ).slice( -2 );
		getOtherGame(y,m,d);
		if (situationId == 1) {//試合前
			elm = document.querySelector("article");
			elm.classList.add("hide");
			elm = document.querySelector("#timeline");
			elm.classList.add("hide");
			elm = document.querySelector("#data");
			elm.classList.add("hide");
			headerCreate(gameinfo,home,away,data.situation.name);
			subHeaderCreate(home,away);
			if (typeof(data.gameinfo.referee) != "undefined") {
				stadiumCreate(gameinfo.referee,gameinfo.stadium,data.result);
			}else{
				elm = document.querySelector("#stadium");
				elm.classList.add("hide");
			}
			if (typeof(home.member) != "undefined" && typeof(away.member) != "undefined") {
				memberCreate(home,away);
			}else{
				elm = document.querySelector("#member");
				elm.classList.add("hide");
			}
			dataCreate(home,away);
		}else{
			headerCreate(gameinfo,home,away,data.situation.name);
			subHeaderCreate(home,away);
			timeLineCreate(events,data.event.summary,situationId);
			stadiumCreate(gameinfo.referee,gameinfo.stadium,data.result);
			memberCreate(home,away);
			dataCreate(home,away);
		}
		if (situationId > 2) {
			elm = document.querySelector(".btn-update");
			elm.classList.add("hide");
		}
	}
	var headerCreate = function(gameinfo,home,away,situation){
		var elm,elm2,template;
		//title
		elm = document.querySelector('h1 .title-wrapper');
		elm2 = document.querySelector('h1 .title-league');
		elm2.innerText = gameinfo.league+" 第"+gameinfo.occasion+"節";
		template = elm2.cloneNode(true);
		elm.innerHTML = gameinfo.dateY+"年"+gameinfo.dateM+"月"+gameinfo.dateD+"日("+gameinfo.weekday+")<br>";
		elm.appendChild(template);
		//home
		elm = document.querySelector('#header .fixtures-home');
		elm.firstElementChild.innerText = home.teaminfo.nameS;
		elm.lastElementChild.classList.add("team-"+home.teaminfo.id);
		if (situationId != 1) {
			elm = document.querySelector('#header .score .jp');
			elm.innerText = home.score;
		}
		
		//away
		elm = document.querySelector('#header .fixtures-away');
		elm.firstElementChild.classList.add("team-"+away.teaminfo.id);
		elm.lastElementChild.innerText = away.teaminfo.nameS;
		if (situationId != 1) {
			elm = document.querySelector('#header .score .tha');
			elm.innerText = away.score;
		}
		//state
		elm = document.querySelector('.stadium');
		elm.innerText = gameinfo.time+" "+gameinfo.stadiumS;
		elm = document.querySelector('.state span');
		elm.innerText = situation;
	}
	var subHeaderCreate = function(home,away){
		var elm,elm2;
		//subheader home
		elm = document.querySelectorAll('#subHeader .fixtures p');
		elm2 = elm[0].querySelector('.team-image');
		elm2.classList.add("team-"+home.teaminfo.id);
		elm2 = elm[0].querySelector('.team');
		elm2.innerText = home.teaminfo.nameS;
		if (situationId != 1) {
			elm[1].firstElementChild.innerText = home.score;
		}
		//subheader away
		elm2 = elm[2].querySelector('.team-image');
		elm2.classList.add("team-"+away.teaminfo.id);
		elm2 = elm[2].querySelector('.team');
		elm2.innerText = away.teaminfo.nameS;
		if (situationId != 1) {
			elm[1].lastElementChild.innerText = away.score;
		}
	}
	var timeLineCreate = function(event,summary,situationId){
		var elm,elm2,eventId = {"0":"2","4":"3","5":"8","6":"4","7":"11","8":"5"},events;
		//timeline
		elm = document.querySelector('#events');
		elm2 = document.querySelector('#events section');
		template = elm2.cloneNode(true);
		elm.innerHTML = "";
		if (summary){
			elm2 = template.cloneNode(true);
			var text = elm2.querySelector('.text');
			elm2.classList.add("event_id_10");
			elm2.classList.add("time_line3");
			text.innerText = summary;
			elm.appendChild(elm2);
		};
		var events = event;
		for (var i = 0; i < event.length; i++) {
			elm2 = template.cloneNode(true);
			switch (events[i].type){
				case 0:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					var time = elm2.querySelector('.time'),text = elm2.querySelector('.text');
					if (events[i].team == 1) {//away
						elm2.classList.add("event_id_"+eventId[events[i].type]);
						elm2.classList.add("time_line2");
					}else{
						elm2.classList.add("event_id_"+eventId[events[i].type]);
						elm2.classList.add("time_line1");
					}
					time.innerText = events[i].time;
					text.innerText = events[i].comment;
					break;
				case 1://前後半キックオフ
					elm2.classList.add("event_id_1");
					elm2.classList.add("time_line3");
					var text = elm2.querySelector('.text');
					text.innerText = events[i].comment;
					break;
				case 2://アディショナルタイム
					elm2.classList.add("event_id_6");
					elm2.classList.add("time_line3");
					var text = elm2.querySelector('.text');
					if ( events[i].time.match(/前半/)) {
						text.innerText = "前半"+events[i].comment;
					}else{
						text.innerText = "後半"+events[i].comment;
					}
					break;
				case 3://前後半終了
					var text = elm2.querySelector('.text');
					if ( events[i].time.match(/前半/)) {
						elm2.classList.add("event_id_7");
						elm2.classList.add("time_line3");
					}else{
						elm2.classList.add("event_id_9");
						elm2.classList.add("time_line3");
					}
					text.innerText = events[i].comment;
					break;
			}
			elm.appendChild(elm2);
		}
		
	}

	var stadiumCreate = function(referee,stadium,info){
		var elm,elm2;
		//stadium
		if (referee.main){
			elm = document.querySelector('#stadium table');
			elm2 = elm.querySelector('.staDetail1 td');
			elm2.innerText = stadium;
			elm2 = elm.querySelector('.staDetail2 td');
			elm2.innerText = info.spectators;
			elm2 = elm.querySelector('.staDetail3 td');
			elm2.innerHTML = info.condition.weather+"/"+info.condition.temperature+"/"+info.condition.humidity;
			elm2 = elm.querySelector('.staDetail4 td');
			elm2.innerText = referee.main.replace( /　/g , " " );
			elm2 = elm.querySelector('.staDetail5 td');
			elm2.innerText = referee.linesman[0].replace( /　/g , " " )+"、"+referee.linesman[1].replace( /　/g , " " );
			elm2 = elm.querySelector('.staDetail6 td');
			elm2.innerText = referee.forth.replace( /　/g , " " );
			if (typeof(referee.other) == "undefined"){
				elm2 = elm.querySelector('.staDetail7');
				elm2.classList.add("hide");
			}else{
				elm2 = elm.querySelector('.staDetail7');
				elm2.classList.remove("hide");
				elm2 = elm.querySelector('.staDetail7 td');
				elm2.innerText = referee.other[0]+"、"+referee.other[1];
			}
		}
	}
	var memberCreate = function(home,away){
		var elm,elm2,tr,trTmp = document.createElement('tr'),tdTmp = document.createElement('td'),benchLength,a;
		//member
		elm = document.querySelector('#starting tbody');
		for (var i = 0; i < 11; i++) {
			tr = trTmp.cloneNode(true);
			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = home.member.starting[i].pos;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = home.member.starting[i].no;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			a = document.createElement('a');
			a.setAttribute('href', "/jleague/player/?teamId="+home.teaminfo.id+"&playerId="+home.member.starting[i].id);
			// a.setAttribute('target', "_blank");
			a.innerText = home.member.starting[i].name.replace( /　/g , " " );
			elm2.appendChild(a);
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			elm2.classList.add("id-"+home.member.starting[i].id);
			elm2.innerText = "";
			tr.appendChild(elm2);

			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = away.member.starting[i].pos;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = away.member.starting[i].no;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			a = document.createElement('a');
			a.setAttribute('href', "/jleague/player/?teamId="+away.teaminfo.id+"&playerId="+away.member.starting[i].id);
			// a.setAttribute('target', "_blank");
			a.innerText = away.member.starting[i].name.replace( /　/g , " " );
			elm2.appendChild(a);
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			elm2.classList.add("id-"+away.member.starting[i].id);
			elm2.innerText = "";
			tr.appendChild(elm2);
			elm.appendChild(tr);
		}

		elm = document.querySelector('#bench tbody');
		if (home.member.bench.length >= away.member.bench.length) {
			benchLength = home.member.bench.length;
		}else{
			benchLength = away.member.bench.length;
		}
		
		for (var i = 0; i < benchLength; i++) {
			tr = trTmp.cloneNode(true);
			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = typeof(home.member.bench[i]) == "undefined" ? "" : home.member.bench[i].pos;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = typeof(home.member.bench[i]) == "undefined" ? "" : home.member.bench[i].no;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			if (typeof(home.member.bench[i]) != "undefined") {
				a = document.createElement('a');
				a.setAttribute('href', "/jleague/player/?teamId="+home.teaminfo.id+"&playerId="+home.member.bench[i].id);
				// a.setAttribute('target', "_blank");
				a.innerText = home.member.bench[i].name.replace( /　/g , " " );
				elm2.appendChild(a);
			}else{
				elm2.innerText = "";
			}
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			if (typeof(home.member.bench[i]) == "undefined") {
				elm2.innerText = "";
			}else{
				elm2.classList.add("id-"+home.member.bench[i].id);
				elm2.innerText = "";
			}
			tr.appendChild(elm2);

			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = typeof(away.member.bench[i]) == "undefined" ? "" : away.member.bench[i].pos;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			elm2.innerText = typeof(away.member.bench[i]) == "undefined" ? "" : away.member.bench[i].no;
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			if (typeof(away.member.bench[i]) != "undefined") {
				a = document.createElement('a');
				a.setAttribute('href', "/jleague/player/?teamId="+away.teaminfo.id+"&playerId="+away.member.bench[i].id);
				// a.setAttribute('target', "_blank");
				a.innerText = away.member.bench[i].name.replace( /　/g , " " );
				elm2.appendChild(a);
			}else{
				elm2.innerText = "";
			}
			tr.appendChild(elm2);
			elm2 = tdTmp.cloneNode(true);
			if (typeof(away.member.bench[i]) == "undefined") {
				elm2.innerText = "";
			}else{
				elm2.classList.add("id-"+away.member.bench[i].id);
				elm2.innerText = "";
			}
			tr.appendChild(elm2);
			elm.appendChild(tr);
		}
		elm = document.querySelector('#coach tbody');
		var tr =  trTmp.cloneNode(true);
		elm2 = tdTmp.cloneNode(true);
		var dire = typeof(home.member.director) == "undefined" ? "-" : home.member.director;
		elm2.innerText = dire;
		tr.appendChild(elm2);
		elm2 = tdTmp.cloneNode(true);
		dire = typeof(home.member.director) == "undefined" ? "-" : away.member.director;
		elm2.innerText = dire;
		tr.appendChild(elm2);
		elm.appendChild(tr);

		if(home.change){
			for (var i = 0; i < home.change.length; i++) {
				if (home.change[i].in.id) {
					elm = document.querySelector('.id-'+home.change[i].in.id);
					elm.classList.add("change-in");
					elm.innerText = home.change[i].time.total.replace( /分/g , "\'" );
				}
				elm = document.querySelector('.id-'+home.change[i].out.id);
				elm.classList.add("change-out");
				elm.innerText = home.change[i].time.total.replace( /分/g , "\'" );
			}
		}
		if(away.change){
			for (var i = 0; i < away.change.length; i++) {
				if (away.change[i].in.id) {
					elm = document.querySelector('.id-'+away.change[i].in.id);
					elm.classList.add("change-in");
					elm.innerText = away.change[i].time.total.replace( /分/g , "\'" );
				}
				elm = document.querySelector('.id-'+away.change[i].out.id);
				elm.classList.add("change-out");
				elm.innerText = away.change[i].time.total.replace( /分/g , "\'" );
			}
		}
	}
	var dataCreate = function(home,away){
		var elm,elm2,tr = document.createElement('tr'),thTmp = document.createElement('th'),tdTmp = document.createElement('td');
		//data
		elm = document.querySelector('#data thead');
		elm2 = thTmp.cloneNode(true);
		tr.appendChild(elm2);
		for (var i = 0; i < 2; i++) {
			var spanHome = document.createElement('span'),spanAway = document.createElement('span');
			spanHome.classList.add("team-image");
			spanHome.classList.add("team-"+home.teaminfo.id);
			spanAway.classList.add("team-image");
			spanAway.classList.add("team-"+away.teaminfo.id);
			elm2 = thTmp.cloneNode(true);
			elm2.appendChild(spanHome);
			tr.appendChild(elm2);
			elm2 = thTmp.cloneNode(true);
			elm2.appendChild(spanAway);
			tr.appendChild(elm2);
		}
		elm.appendChild(tr);

		if (typeof(home.stats) != "undefined") {
			elms = document.querySelectorAll('#data tbody tr');
			var array = ["fk","ck","pk","shoot","card"];
			var nullArray = {fk: '-', ck: '-', pk: '-', shoot: '-', red: '-', yellow: '-'};
			if (home.stats.today == null) home.stats.today = nullArray;
			if (away.stats.today == null) away.stats.today = nullArray;
			if (home.stats.average == null) home.stats.average = nullArray;
			if (away.stats.average == null) away.stats.average = nullArray;

			for (var i = 0; i < array.length; i++) {
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? home.stats.today[array[i]] : home.stats.today.yellow+"/"+home.stats.today.red;
				elms[i].appendChild(elm2);
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? away.stats.today[array[i]] : away.stats.today.yellow+"/"+away.stats.today.red;
				elms[i].appendChild(elm2);
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? home.stats.average[array[i]] : home.stats.average.yellow+"/"+home.stats.average.red;
				elms[i].appendChild(elm2);
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? away.stats.average[array[i]] : away.stats.average.yellow+"/"+away.stats.average.red;
				elms[i].appendChild(elm2);
			}
		}
	}
	var reload = function(data){
		var gameinfo = data.gameinfo,home,away,elm,events = typeof(data.event) == "undefined" ? "" : data.event.events;
		if (gameinfo.team[0].homeaway == 0) {
			home = gameinfo.team[0];
			away = gameinfo.team[1];
		}else{
			home = gameinfo.team[1];
			away = gameinfo.team[0];
		}
		situationId = data.situation.id;
		if (situationId == 1) {//試合前
			reloadHeader(home,away,data.situation.name);
			if (typeof(data.gameinfo.referee) != "undefined") {
				elm = document.querySelector("#stadium");
				elm.classList.remove("hide");
				reloadStadium(gameinfo.referee,gameinfo.stadium,data.result);
			}
			if (typeof(home.member) != "undefined" && typeof(away.member) != "undefined") {
				elm = document.querySelector("#member");
				elm.classList.remove("hide");
				elm = document.querySelector("#starting table tbody tr");
				if (isset(elm)) {
					reloadMember(home,away);
				}else{
					memberCreate(home,away);
				}
				
			}
		}else if(events != ""){
			elm = document.querySelector("article");
			elm.classList.remove("hide");
			elm = document.querySelector("#timeline");
			elm.classList.remove("hide");
			elm = document.querySelector("#stadium");
			elm.classList.remove("hide");
			elm = document.querySelector("#member");
			elm.classList.remove("hide");
			elm = document.querySelector("#data");
			elm.classList.remove("hide");
			reloadHeader(home,away,data.situation.name);
			reloadSubHeader(home,away);
			reloadTimeLine(events,data.event.summary,situationId);
			reloadStadium(gameinfo.referee,gameinfo.stadium,data.result);
			reloadMember(home,away);
			reloadData(home,away);
		}
		if (situationId > 2) {//上のelseを通した後にタイマー停止
			clearInterval(startAutoReload);
			elm = document.querySelector(".btn-update");
			elm.classList.add("hide");
		}
		elm = document.querySelector(".btn-update");
		elm.classList.add("anime");
		setTimeout(function(){
			elm = document.querySelector(".btn-update");
			elm.classList.remove("anime");
		}, 1000);
		
	}
	var reloadTimeLine = function(event,summary,situationId){
		var elm,elm2,elm3,eventId = {"0":"2","4":"3","5":"8","6":"4","7":"11","8":"5"},cnt;
		//timeline
		elm = document.querySelector('#events');
		elm2 = document.querySelector('#events section');
		template = elm2.cloneNode(true);
		elm2 = document.createElement('section');
		elm3 = template.querySelector('.time');
		elm2.appendChild(elm3);
		elm3 = template.querySelector('.text');
		elm2.appendChild(elm3);
		template = elm2.cloneNode(true);
		elm.innerHTML = "";
		if (summary){
			elm2 = template.cloneNode(true);
			var text = elm2.querySelector('.text');
			elm2.classList.add("event_id_10");
			elm2.classList.add("time_line3");
			text.innerText = summary;
			elm.appendChild(elm2);
		};
		for (var i = 0; i < event.length; i++) {
			elm2 = template.cloneNode(true);
			switch (event[i].type){
				case 0:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					var time = elm2.querySelector('.time'),text = elm2.querySelector('.text');
					if (event[i].team == 1) {//away
						elm2.classList.add("event_id_"+eventId[event[i].type]);
						elm2.classList.add("time_line2");
					}else{
						elm2.classList.add("event_id_"+eventId[event[i].type]);
						elm2.classList.add("time_line1");
					}
					time.innerText = event[i].time;
					text.innerText = event[i].comment;
					break;
				case 1://前後半キックオフ
					elm2.classList.add("event_id_1");
					elm2.classList.add("time_line3");
					var text = elm2.querySelector('.text');
					text.innerText = event[i].comment;
					break;
				case 2://アディショナルタイム
					elm2.classList.add("event_id_6");
					elm2.classList.add("time_line3");
					var text = elm2.querySelector('.text');
					if ( event[i].time.match(/前半/)) {
						text.innerText = "前半"+event[i].comment;
					}else{
						text.innerText = "後半"+event[i].comment;
					}
					break;
				case 3://前後半終了
					var text = elm2.querySelector('.text');
					if ( event[i].time.match(/前半/)) {
						elm2.classList.add("event_id_7");
						elm2.classList.add("time_line3");
					}else{
						elm2.classList.add("event_id_9");
						elm2.classList.add("time_line3");
					}
					text.innerText = event[i].comment;
					break;
			}
			elm.appendChild(elm2);
		}
		
	}
	var reloadData = function(home,away){
		var elm,elm2,tr = document.createElement('tr'),thTmp = document.createElement('th'),tdTmp = document.createElement('td');
		//data
		elms = document.querySelectorAll('#data tbody tr');
		var array = ["fk","ck","pk","shoot","card"];
		var nullArray = {fk: '-', ck: '-', pk: '-', shoot: '-', red: '-', yellow: '-'};
		if (home.stats.today == null) home.stats.today = nullArray;
		if (away.stats.today == null) away.stats.today = nullArray;
		if (home.stats.average == null) home.stats.average = nullArray;
		if (away.stats.average == null) away.stats.average = nullArray;
		for (var i = 0; i < array.length; i++) {
			elm = elms[i].querySelectorAll('td');
			if (elm.length == 1 ) {
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? home.stats.today[array[i]] : home.stats.today.yellow+"/"+home.stats.today.red;
				elms[i].appendChild(elm2);
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? away.stats.today[array[i]] : away.stats.today.yellow+"/"+away.stats.today.red;
				elms[i].appendChild(elm2);
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? home.stats.average[array[i]] : home.stats.average.yellow+"/"+home.stats.average.red;
				elms[i].appendChild(elm2);
				elm2 = tdTmp.cloneNode(true);
				elm2.innerText = array[i] != "card" ? away.stats.average[array[i]] : away.stats.average.yellow+"/"+away.stats.average.red;
				elms[i].appendChild(elm2);
			}else{
				elm[1].innerText = array[i] != "card" ? home.stats.today[array[i]] : home.stats.today.yellow+"/"+home.stats.today.red;
				elm[2].innerText = array[i] != "card" ? away.stats.today[array[i]] : away.stats.today.yellow+"/"+away.stats.today.red;
				elm[3].innerText = array[i] != "card" ? home.stats.average[array[i]] : home.stats.average.yellow+"/"+home.stats.average.red;
				elm[4].innerText = array[i] != "card" ? away.stats.average[array[i]] : away.stats.average.yellow+"/"+away.stats.average.red;
			}
		}
	}
	var reloadHeader = function(home,away,situation){
		var elm,elm2;
		
		if (situationId != 1) {
			//home
			elm = document.querySelector('#header .score .jp');
			elm.innerText = home.score;
			//away
			elm = document.querySelector('#header .score .tha');
			elm.innerText = away.score;
		}
		
		//state
		elm = document.querySelector('.state span');
		elm.innerText = situation;
	}
	var reloadStadium = function(referee,stadium,info){
		var elm,elm2;
		//stadium
		if (referee.main){
			elm = document.querySelector('#stadium table');
			elm2 = elm.querySelector('.staDetail1 td');
			elm2.innerText = stadium;
			elm2 = elm.querySelector('.staDetail2 td');
			elm2.innerText = info.spectators;
			elm2 = elm.querySelector('.staDetail3 td');
			elm2.innerHTML = info.condition.weather+"/"+info.condition.temperature+"/"+info.condition.humidity;
			elm2 = elm.querySelector('.staDetail4 td');
			elm2.innerText = referee.main;
			elm2 = elm.querySelector('.staDetail5 td');
			elm2.innerText = referee.linesman[0]+"、"+referee.linesman[1];
			elm2 = elm.querySelector('.staDetail6 td');
			elm2.innerText = referee.forth;
		}
		if (typeof(referee.other) == "undefined"){
			elm2 = elm.querySelector('.staDetail7');
			elm2.classList.add("hide");
		}else{
			elm2 = elm.querySelector('.staDetail7');
			elm2.classList.remove("hide");
			elm2 = elm.querySelector('.staDetail7 td');
			elm2.innerText = referee.other[0]+"、"+referee.other[1];
		}
	}
	var reloadMember = function(home,away){
		if(home.change){
			for (var i = 0; i < home.change.length; i++) {
				if (home.change[i].in.id) {
					elm = document.querySelector('.id-'+home.change[i].in.id);
					elm.classList.add("change-in");
					elm.innerText = home.change[i].time.total.replace( /分/g , "\'" ) ;
				}
				elm = document.querySelector('.id-'+home.change[i].out.id);
				elm.classList.add("change-out");
				elm.innerText = home.change[i].time.total.replace( /分/g , "\'" );
			}
		}
		if(away.change){
			for (var i = 0; i < away.change.length; i++) {
				if (away.change[i].in.id) {
					elm = document.querySelector('.id-'+away.change[i].in.id);
					elm.classList.add("change-in");
					elm.innerText = away.change[i].time.total.replace( /分/g , "\'" );
				}
				elm = document.querySelector('.id-'+away.change[i].out.id);
				elm.classList.add("change-out");
				elm.innerText = away.change[i].time.total.replace( /分/g , "\'" );
			}
		}
		
		elm = document.querySelectorAll('#coach td');
		if (elm[0].innerText == "-") {
			var dire = typeof(home.member.director) == "undefined" ? "-" : home.member.director;
			elm[0].innerText = dire;
			dire = typeof(home.member.director) == "undefined" ? "-" : away.member.director;
			elm[1].innerText = dire;
		}
	}
	var reloadSubHeader = function(home,away){
		var elm,elm2;
		//subheader home
		elm = document.querySelectorAll('#subHeader .fixtures p');
		elm[1].firstElementChild.innerText = home.score;
		//subheader away
		elm2 = elm[2].querySelector('.team-image');
		elm[1].lastElementChild.innerText = away.score;
	}
	var isset = function(data){
		if(data === "" || data === null || data === undefined){
			return false;
		}else{
			return true;
		}
	};
}());