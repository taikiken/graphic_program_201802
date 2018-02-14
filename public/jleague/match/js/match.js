(function() {
	var year;
	var master,league = [],occasionArray=[],leagueId = 2,month,teamId,teamGroup = [];//occasion;
	Array.prototype.getLastVal = function (){ return this[this.length -1];}
	var setting = function(){
		getData(leagueId,year,"13");//(leagueId,year,month,team,occasion)
		createForm();
		leagueChange();
		createFormOccasion();
		occasionChange();
		monthChange();
		teamChange();
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
					setting();
				}
			}
		}
		req.open('GET', "https://jlive.sportsbull.jp/json/v1/"+year+"/jleague/master.json");
		req.send(null);
	};
	
	var getData = function(id,year,month,team,occasion){
		var url = "https://jlive.sportsbull.jp/api/v1/jleague/schedule.php?";
		var l = id ? id:"",y = year ? year:"",m = month ? month:"",t = team ? team:"",o = occasion ? "&occasion="+occasion:"";
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBack(data.response);
					// console.log(url+"league="+ l +"&year="+ y +"&month="+ m +"&team="+ t + o);
				}
			}
		}
		req.open('GET', url+"league="+ l +"&year="+ y +"&month="+ m +"&team="+ t + o);
		req.send(null);
	}
	
	var callBack = function(data){
		if (isset(data)) {
			scheduleCreate(data);
			occasionPrevNext();
		}else{
			var elm = document.querySelector("#matches"),elm2;
			elm.innerHTML = "";
			elm2 = document.createElement('p');
			elm2.classList.add("not-applicable");
			elm2.innerText = "該当する試合がございません。";
			elm.appendChild(elm2);
		}
		
	}
	var scheduleCreate = function(data){
		var elm = document.querySelector('#matches'),elm2,elm3,elm4,elm5,elm6,title,title2,oneDay,card,next,prev,group,round,a;
		elm.innerHTML = "";
		if (!data) { return false; }
		for (var i = 0; i < data.date.length; i++) {
			oneDay = data.date[i]
			title = oneDay.date.replace( "-" , "年" ).replace( "-" , "月" ) + "日("+oneDay.weekday+")：";
			for (var j = 0; j < oneDay.league.length; j++) {
				//h2title
				card = oneDay.league[j].card;
				elm2 = document.createElement('h2');
				elm2.classList.add("ttl-h3");
				title2 = document.createElement('span');
				title2.classList.add("ttl-h3-league");
				if (leagueId == 4 ) {//ルヴァンカップの場合
					group = card[0].group;
					round = card[0].round;
					title2.innerText = oneDay.league[j].title + group + round;
				}else{
					title2.innerText = oneDay.league[j].title + "第" + oneDay.occasion +"節";
				}
				elm2.innerText = title;
				elm2.appendChild(title2);
				elm.appendChild(elm2);
				
				//paging prev
				elm2 = document.createElement('ul');
				elm2.classList.add("paging");
				elm3 = document.createElement('li');
				elm3.classList.add("prev");

				prev = oneDay.occasion-2;
				next = oneDay.occasion;
				if (typeof(occasionArray[prev]) == "undefined") {
					elm2.appendChild(elm3);
					elm3.classList.add("hide");
				}else{
					if (Object.keys(occasionArray[prev]).length === 0) {
						for (var p = prev; p >= 0; p--) {
							if (Object.keys(occasionArray[p]).length !== 0) {
								prev = p;
								break;
							}
						}
					}
					elm3.classList.remove("hide");
					elm3.setAttribute('data-occasion',occasionArray[prev].query);
					elm3.innerText = leagueId != 4 ? "第" + (prev+1) +"節" : occasionArray[prev].label;
					elm2.appendChild(elm3);
				}
				//paging next
				elm3 = document.createElement('li');
				elm3.classList.add("next");
				if (typeof(occasionArray[oneDay.occasion]) == "undefined") {
					elm2.appendChild(elm3);
					elm3.classList.add("hide");
				}else{
					if (Object.keys(occasionArray[next]).length === 0) {
						for (var n = next; n < occasionArray.length; n++) {
							if (Object.keys(occasionArray[n]).length !== 0) {
								next = n;
								break;
							}
						}
					}
					elm3.classList.remove("hide");
					elm3.setAttribute('data-occasion',occasionArray[next].query);
					elm3.innerText = leagueId != 4 ? "第" + (next+1) +"節" : occasionArray[next].label;
					elm2.appendChild(elm3);
				}
				
				elm.appendChild(elm2);
				//game-wrapper
				elm2 = document.createElement('div');
				elm2.classList.add("game-wrapper");
				for (var c = 0; c < card.length; c++) {
					if (leagueId == 4 && (group != card[c].group || round != card[c].round)) {//ルヴァンカップの場合
						group = card[c].group;
						round = card[c].round;
						elm3 = document.createElement('h2');
						elm3.classList.add("ttl-h3");
						title2 = document.createElement('span');
						title2.classList.add("ttl-h3-league");
						title2.innerText = oneDay.league[j].title + group + round;
						elm3.innerText = title;
						elm3.appendChild(title2);
						elm2.appendChild(elm3);
					}

					elm3 = document.createElement('div');
					elm3.classList.add("game-match");
					elm4 = document.createElement('div');
					elm4.classList.add("game-inner");
					
					//team-home
					elm5 = document.createElement('div');
					elm5.classList.add("team-home");
					a = document.createElement('a');
					a.setAttribute('href', "/jleague/team/?teamId="+card[c].hometeam.id);
					a.innerText = card[c].hometeam.name;
					elm6 = document.createElement("span");
					elm6.classList.add('img-emblem');//IE
					elm6.classList.add("team-"+card[c].hometeam.id);
					a.insertBefore(elm6, a.firstChild);
					elm5.appendChild(a);
					elm4.appendChild(elm5);
					//score-home
					elm5 = document.createElement('div');
					elm5.classList.add("score-home");
					elm5.innerText = card[c].hometeam.score == "" ? "-":card[c].hometeam.score;
					elm4.appendChild(elm5);
					//game-date
					elm5 = document.createElement('div');
					elm5.classList.add("game-date");
					elm5.innerText = card[c].stadium;
					elm6 = document.createElement('span');
					elm6.classList.add("game-status");
					elm6.innerText = card[c].status.id == 1 ? card[c].time : card[c].status.name;
					elm5.appendChild(elm6);
					elm4.appendChild(elm5);
					//score-away
					elm5 = document.createElement('div');
					elm5.classList.add("score-away");
					elm5.innerText = card[c].awayteam.score == "" ? "-":card[c].awayteam.score;
					elm4.appendChild(elm5);
					//team-away
					elm5 = document.createElement('div');
					elm5.classList.add("team-away");
					a = document.createElement('a');
					a.setAttribute('href', "/jleague/team/?teamId="+card[c].awayteam.id);
					a.innerText = card[c].awayteam.name;
					elm6 = document.createElement("span");
					elm6.classList.add('img-emblem');//IE
					elm6.classList.add("team-"+card[c].awayteam.id);
					a.insertBefore(elm6, a.firstChild);
					elm5.appendChild(a);
					elm4.appendChild(elm5);
					elm3.appendChild(elm4);
					//link
					if (card[c].startingmember == 1 || card[c].status.id == 2 || card[c].status.id == 3 ) {
						elm4 = document.createElement('a');
						elm4.classList.add("game-btn");
						elm4.setAttribute('href', "/jleague/sokuhou/?id="+card[c].gameid);
						// elm4.setAttribute('target', "_blank");
						if (card[c].status.id == 1) {
							elm4.innerText = "スターティングメンバー";
						}else{
							elm4.innerText = "試合詳細";//card[c].status.name;
						}
						elm3.appendChild(elm4);
					}
					elm2.appendChild(elm3);
				}
				elm.appendChild(elm2);
			}
		}
	}

	var yearChange = function(){
		var elm = document.querySelector('.select-year'),elm2;
		for (var i = 0; i < master.year.length; i++) {
			elm2 = document.createElement('option');
			elm2.setAttribute('value', master.year[i].id);
			elm2.innerText = master.year[i].label;
			elm.appendChild(elm2);
		}
		elm = document.querySelector('.ttl-h1-select select');
		elm.addEventListener('change', yearChangeEvent);
	}
	var yearChangeEvent = function() {
		year = document.year.elements["select-year"].value;
		leagueId = 2;
		getMaster();
		elm = document.querySelector(".first-view");
		elm.classList.remove("hide");
	}

	var leagueChange = function(){
		var elm = document.querySelector('.nav-match ul'),elm2;
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
				elm[i].parentNode.parentNode.className = "nav-tab-wrapper nav-match active-"+i ;
				leagueId = league[i];
				createFormOccasion();
				clearForm();
				getData(league[i],year,"13");
				elm = document.conditions.elements["select-team"].getElementsByTagName('optgroup');
				elm[0].parentNode.removeChild(elm[0]);
				if (league[i] == "2" || league[i] == "4") {
					elm = document.querySelector('.select-team');
					elm.appendChild(teamGroup[0]);//j1
				}else{
					elm = document.querySelector('.select-team');
					elm.appendChild(teamGroup[1]);//j2
				}
				break ;
			}
		}
		elm = document.querySelector(".first-view");
		elm.classList.remove("hide");
	}
	var createForm = function() {
		//team
		var elm = document.querySelector('.select-team'),tmp1,tmp2,elm2;
		elm.innerHTML = "";
		elm2 = document.createElement('option');
		elm2.setAttribute('value', "");
		elm2.innerText = "すべてのクラブ";
		elm.appendChild(elm2);
		for (var i = 0; i < master.team.length; i++) {
			tmp1 = document.createElement('optgroup');
			tmp1.setAttribute('label', master.team[i].league);
			for (var j = 0; j < master.team[i].club.length; j++) {
				tmp2 = document.createElement('option');
				tmp2.setAttribute('value', master.team[i].club[j].id);
				tmp2.innerText = master.team[i].club[j].name;
				tmp1.appendChild(tmp2);
			}
			teamGroup[i] = tmp1;
		}
		elm.appendChild(teamGroup[0]);//j1
		elm = document.querySelector('.select-month');
		elm.innerHTML = "";
		elm2 = document.createElement('option');
		elm2.setAttribute('value', "");
		elm2.innerText = "月選択";
		elm.appendChild(elm2);
		for (var i = 0; i < master.month.length; i++) {
			tmp2 = document.createElement('option');
			tmp2.setAttribute('value', master.month[i].id);
			tmp2.innerText = master.month[i].name;
			elm.appendChild(tmp2);
		}
		elm = document.querySelector('.refine-btn');
		elm.addEventListener('click', searchEvent, false);
	}
	var teamChange = function(){
		var elm = document.querySelector('.select-team');
		elm.addEventListener('change', teamChangeEvent);
	}
	var teamChangeEvent = function() {
		searchAction();
	}
	var searchEvent = function() {
		var occasion = document.conditions.elements["select-section"].value == '' ? "" : document.conditions.elements["select-section"].value;
		month = document.conditions.elements["select-month"].value == '' ? "0" : document.conditions.elements["select-month"].value;
		teamId = document.conditions.elements["select-team"].value == '0' ? "" : document.conditions.elements["select-team"].value;
		getData(leagueId,year,month,teamId,occasion);//(league,year,month,team,occasion)
		elm = document.querySelector(".first-view");
		elm.classList.add("hide");
	}
	var searchAction = function(){
		var elm;
		elm = document.querySelector(".refine-btn");
		elm.classList.add("animation");
		setTimeout(function(){
			elm = document.querySelector(".refine-btn");
			elm.classList.remove("animation");
		}, 1000);
	}
	var createFormOccasion = function(){
		var elm = document.querySelector('.select-section'),elm2,max;
		elm.innerHTML = "";
		elm2 = document.createElement('option');
		elm2.setAttribute('value', "");
		elm2.innerText = "節選択";
		elm.appendChild(elm2);
		createOccasionArray();
		for (var i = 0; i < occasionArray.length; i++) {
			elm2 = document.createElement('option');
			if (Object.keys(occasionArray[i]).length !== 0) {
				elm2.setAttribute('value', occasionArray[i].query);
				elm2.innerText = occasionArray[i].label;
			}else{
				elm2.setAttribute('value', '-');
				elm2.innerText = "第"+(i+1)+"節";
				elm2.disabled = true;
			}
			elm.appendChild(elm2);
		}
	}
	var createOccasionArray = function(){
		var max;
		occasionArray = [];
		for (var i = 0; i < master.league.length; i++) {
			if (master.league[i].id == leagueId) {
				if (leagueId == 4) {//ルヴァンカップの場合
					occasionArray = master.league[i].occasion;
				}else{
					max = master.league[i].occasion.getLastVal();
					for (var j = 0; j < max.no; j++) {
						occasionArray[j] = {};
					}
					for (var j = 0; j < master.league[i].occasion.length; j++) {
						occasionArray[master.league[i].occasion[j].no-1] = master.league[i].occasion[j];
					}
				}
				
			}
		}
	}
	var occasionChange = function(){
		var elm = document.querySelector('.refine-column02 .select-section');
		elm.addEventListener('change', occasionChangeEvent);
	}
	var occasionChangeEvent = function() {
		var val = document.conditions.elements["select-section"].value;
		if (val == 0) {
			document.conditions.elements["select-month"].disabled = false;
			document.conditions.elements["select-team"].disabled = false;
		}else{
			document.conditions.elements["select-month"].disabled = true;
			document.conditions.elements["select-team"].disabled = true;
			document.conditions.elements["select-team"].value = '';
		}
		searchAction();
	}
	var occasionPrevNext = function(){
		var elm = document.querySelectorAll('.prev');
		for (var i = 0; i < elm.length; i++) {
			elm[i].addEventListener('click', occasionPrevNextEvent);
		}
		elm = document.querySelectorAll('.next');
		for (var i = 0; i < elm.length; i++) {
			elm[i].addEventListener('click', occasionPrevNextEvent);
		}
	}
	var occasionPrevNextEvent = function() {
		var occasion = this.dataset.occasion;
		getData(leagueId,year,"","",occasion);//(league,year,month,team,occasion)
		elm = document.querySelector(".first-view");
		elm.classList.add("hide");
		clearForm();
		window.scrollTo(0,100);
	}
	var monthChange = function(){
		var elm = document.querySelector('.refine-column02 .select-month');
		elm.addEventListener('change', monthChangeEvent);
	}
	var monthChangeEvent = function() {
		var val = document.conditions.elements["select-month"].value;
		if (val == 0) {
			document.conditions.elements["select-section"].disabled = false;
		}else{
			document.conditions.elements["select-section"].disabled = true;
		}
		searchAction();
	}
	var clearForm = function(){
		document.conditions.elements["select-section"].value = '';
		document.conditions.elements["select-section"].disabled = false;
		document.conditions.elements["select-month"].value = '';
		document.conditions.elements["select-month"].disabled = false;
		document.conditions.elements["select-team"].value = '';
		document.conditions.elements["select-team"].disabled = false;
		month = "";
		team = "";
	}
	var isset = function(data){
		if(data === "" || data === null || data === undefined){
			return false;
		}else{
			return true;
		}
	};

}());