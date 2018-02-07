(function() {
	var year,teamId,master;
	var setting = function(){
		getDataSchedule("0",year,"0",teamId);//(leagueId,year,month,team,occasion)
		getDataDirectory(year,teamId);
		getDataTeamInfo(year,teamId,false);
		yearChangeMatch();
		yearChangeLog();
	}
	var escapeJsHTML = function (str) {
		return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\//g, '\\/').replace(/</g, '\\x3c').replace(/>/g, '\\x3e').replace(/(0x0D)/g, '\r').replace(/(0x0A)/g, '\n').replace(/&/g, '&amp;');
	};
	var getParameter = function(){
		var url = window.location.search,tmp,hash,para;
		if(url.match(/teamId/)){
			tmp = url.split('&');
			hash = tmp[0].slice(1);
			para = hash.split('=');
			teamId = para[1] ? escapeJsHTML(para[1]) :false;
		}else{
			location.href = "https://sportsbull.jp/jleague/match/";
		}
	}();
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
					setting();
				}
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
	var getDataSchedule = function(id,year,month,team,occasion){
		var url = "https://jlive.sportsbull.jp/api/v1/jleague/schedule.php?";
		var l = id ? id:"",y = year ? year:"",m = month ? month:"",t = team ? team:"",o = occasion ? "&occasion="+occasion:"";
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBackSchedule(data.response);
				}
			}
		}
		req.open('GET', url+"league="+ l +"&year="+ y +"&month="+ m +"&team="+ t + o);
		req.send(null);
	}
	var getDataDirectory = function(year,teamId){
		var y = year,id = teamId;
		var url = "https://jlive.sportsbull.jp/json/v1/"+y+"/jleague/team/"+id+"/player.json";
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBackDirectory(data.response);
					getDataNews(data.response.team.name);
				}
			}
			if( this.readyState == 4 && this.status != 200 ){
				location.href = "https://sportsbull.jp/jleague/match/";
			}
		}
		req.open('GET', url);
		req.send(null);
	}
	//年度選択があるため分ける
	var getDataTeamInfo = function(year,teamId,logOnry){
		var y = year,id = teamId;
		var url = "https://jlive.sportsbull.jp/json/v1/"+y+"/jleague/team/"+id+"/info.json";
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					if (logOnry) {
						logCreate(data.response.data.gamelog);
					}else{
						callBackTeamInfo(data.response);
					}
				}
			}
		}
		req.open('GET', url);
		req.send(null);
	}
	var getDataNews = function(teamName){
		var teamName = encodeURIComponent( teamName );
		var url = "https://sportsbull.jp/api/v1/articles/search/"+teamName;
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBackNews(data.response.articles);
				}
			}
		}
		req.open('GET', url);
		req.send(null);
	}
	var createH2 = function(id,name){
		var baseElm = document.querySelector('.team-info h2'),span;
		span = document.createElement('span');
		span.classList.add("team-"+id);
		span.innerText = name;
		baseElm.appendChild(span);
	}
	var createBreadCrumb = function(id,name){
		var a = document.querySelector('.show-for-large .foot-breadCrumb li:last-child a');
		a.setAttribute('href', "/jleague/team/?teamId="+id);
		var span = document.querySelector('.show-for-large .foot-breadCrumb li:last-child a span');
		span.innerText = name;

		a = document.querySelector('.show-for-small .foot-breadCrumb li:last-child a');
		a.setAttribute('href', "/jleague/team/?teamId="+id);
		var span = document.querySelector('.show-for-small .foot-breadCrumb li:last-child a span');
		span.innerText = name;
	}
	var callBackNews = function(articles){
		var baseElm = document.querySelector('#relation ul'),li,a,div,img,p;
		for (var i = 0; i < 5; i++) {
			li = document.createElement('li');
			a = document.createElement('a');
			a.setAttribute('href', articles[i].url);
			div = document.createElement('div');
			img = document.createElement('img');
			img.setAttribute('src', articles[i].media.images.medium);
			img.setAttribute('alt', articles[i].media.images.caption);
			div.appendChild(img);
			a.appendChild(div);
			div = document.createElement('div');
			p = document.createElement('p');
			p.innerText = articles[i].title;
			div.appendChild(p);
			p = document.createElement('p');
			p.innerText = articles[i].display_date;
			div.appendChild(p);
			a.appendChild(div);
			li.appendChild(a);
			baseElm.appendChild(li);
		}
	}
	var callBackSchedule = function(data){
		// console.log(data);
		if (isset(data)) {
			scheduleCreate(data);
			// occasionPrevNext();
		}else{
			var elm = document.querySelector("#matches"),elm2;
			elm2 = document.createElement('p');
			elm2.classList.add("not-applicable");
			elm2.innerText = "該当する試合がございません。";
			elm.appendChild(elm2);
		}
		
	}
	var callBackDirectory = function(data){
		// console.log(data);
		createH2(data.team.id,data.team.name);
		createBreadCrumb(data.team.id,data.team.name);
		document.title = data.team.name+" / チーム情報 | スポーツブル / SPORTS BULL";
		var baseElm,elm,player,li,a,img,div,span,position = {"GK":"gk","DF":"df","MF":"mf","FW":"fw"};
		//更新日
		baseElm = document.querySelector('.directory .update');
		wday = getDate(data.lastupdate);
		update = data.lastupdate.replace( "-" , "年" ).replace( "-" , "月" ).replace( " " , "日"+wday );
		baseElm.innerText = '更新日：'+update;

		baseElm = document.querySelector('.directory ul');
		for (var i = 0; i < data.player.length; i++) {
			player = data.player[i];
			li = document.createElement('li');
			a = document.createElement('a');
			a.setAttribute('href', "/jleague/player/?teamId="+teamId+"&playerId="+player.id);
			img = document.createElement('img');
			if (player.img != "") {
				img.setAttribute('src', player.img);
			}else{
				img.setAttribute('src', "/jleague/images/team/noimage.jpg");
			}
			img.setAttribute('alt', player.name);
			a.appendChild(img);
			div = document.createElement('div');
			span = document.createElement('span');
			span.classList.add(position[player.position]);
			span.innerText = player.no;
			div.appendChild(span);
			span = document.createElement('span');
			span.innerText = player.name.replace( /　/g , " " ) ;
			div.appendChild(span);
			a.appendChild(div);
			li.appendChild(a);
			baseElm.appendChild(li);
		}
	}

	var callBackTeamInfo = function(data){
		// console.log(data);
		var log = data.data,baseElm,li,a,p,div;
		//更新日
		baseElm = document.querySelector('.team-data .update');
		wday = getDate(data.lastupdate);
		update = data.lastupdate.replace( "-" , "年" ).replace( "-" , "月" ).replace( " " , "日"+wday );
		baseElm.innerText = '更新日：'+update;
		baseElm = document.querySelector('.log-year');
		baseElm.innerText = year+"年";
		//通算
		baseElm = document.querySelector('.team-data .total');
		p = document.createElement('p');
		p.innerText = log.game;
		baseElm.appendChild(p);//試合数
		p = document.createElement('p');
		p.innerText = log.win;
		baseElm.appendChild(p);//勝
		p = document.createElement('p');
		p.innerText = log.draw;
		baseElm.appendChild(p);//分
		p = document.createElement('p');
		p.innerText = log.lose;
		baseElm.appendChild(p);//敗
		p = document.createElement('p');
		p.innerText = log.winningpercent.home+"%";
		baseElm.appendChild(p);//ホーム勝率
		p = document.createElement('p');
		p.innerText = log.winningpercent.away+"%";
		baseElm.appendChild(p);//アウェイ勝率
		p = document.createElement('p');
		p.innerText = log.point;
		baseElm.appendChild(p);//得点
		p = document.createElement('p');
		p.innerText = log.lost;
		baseElm.appendChild(p);//失点
		p = document.createElement('p');
		p.innerText = log.point-log.lost;
		baseElm.appendChild(p);//得失点
		p = document.createElement('p');
		p.innerText = log.point;
		baseElm.appendChild(p);//勝ち点

		logCreate(log.gamelog);
	}
	var logCreate = function(gamelog){
		var baseElm = document.querySelector('.game-log'),li,p;
		baseElm.innerHTML = "";
		for (var i = 0; i < gamelog.length; i++) {
			li = document.createElement('li');
			p = document.createElement('p');
			p.innerText = gamelog[i].date;
			li.appendChild(p);//月日
			p = document.createElement('p');
			p.innerText = gamelog[i].time;
			li.appendChild(p);//ko時刻
			p = document.createElement('p');
			p.innerText = gamelog[i].stadium;
			li.appendChild(p);//会場
			p = document.createElement('p');
			p.innerText = gamelog[i].score;
			li.appendChild(p);//スコア
			p = document.createElement('p');
			p.innerText = gamelog[i].vord;
			li.appendChild(p);//勝敗
			p = document.createElement('p');
			p.innerText = gamelog[i].vs;
			li.appendChild(p);//対戦相手
			p = document.createElement('p');
			p.innerText = gamelog[i].shoot;
			li.appendChild(p);//シュート数
			p = document.createElement('p');
			p.innerText = gamelog[i].fk;
			li.appendChild(p);//FK
			p = document.createElement('p');
			p.innerText = gamelog[i].pk;
			li.appendChild(p);//PK
			p = document.createElement('p');
			p.innerText = gamelog[i].ck;
			li.appendChild(p);//CK
			p = document.createElement('p');
			p.innerText = gamelog[i].yellow+"/"+gamelog[i].red;
			li.appendChild(p);//警告/退場
			p = document.createElement('p');
			p.innerText = gamelog[i].spectator;
			li.appendChild(p);//入場者数
			baseElm.appendChild(li);//勝ち点
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
				elm2 = document.createElement('h4');
				elm2.classList.add("ttl-h3");
				title2 = document.createElement('span');
				title2.classList.add("ttl-h3-league");

				title2.innerText = oneDay.league[j].title + "第" + oneDay.occasion +"節";
				elm2.innerText = title;
				elm2.appendChild(title2);
				elm.appendChild(elm2);

				//game-wrapper
				elm2 = document.createElement('div');
				elm2.classList.add("game-wrapper");
				for (var c = 0; c < card.length; c++) {
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

	var yearChangeMatch = function(){
		var elm = document.querySelector('.select-year-match'),elm2;
		for (var i = 0; i < master.year.length; i++) {
			elm2 = document.createElement('option');
			elm2.setAttribute('value', master.year[i].id);
			elm2.innerText = master.year[i].label;
			elm.appendChild(elm2);
		}
		elm = document.querySelector('.match-select select');
		elm.addEventListener('change', yearChangeMatchEvent);
	}
	var yearChangeMatchEvent = function() {
		year = document.yearMatch.elements["select-year-match"].value;
		getDataSchedule("0",year,"0",teamId);//(leagueId,year,month,team,occasion)
	}
	var yearChangeLog = function(){
		var elm = document.querySelector('.select-year-log'),elm2;
		for (var i = 0; i < master.year.length; i++) {
			elm2 = document.createElement('option');
			elm2.setAttribute('value', master.year[i].id);
			elm2.innerText = master.year[i].label;
			elm.appendChild(elm2);
		}
		elm = document.querySelector('.log-select select');
		elm.addEventListener('change', yearChangeLogEvent);
	}
	var yearChangeLogEvent = function() {
		year = document.yearLog.elements["select-year-log"].value;
		getDataTeamInfo(year,teamId,true);
	}
	var isset = function(data){
		if(data === "" || data === null || data === undefined){
			return false;
		}else{
			return true;
		}
	};

}());

$(function(){
	$('.nav-team li').on('click',function(){
		var index,clickEevent,target = ["match","directory","team-data"];
		index = $('.nav-team li').index(this);
		$('.nav-team ul').removeClass( );
		$('.nav-team ul').addClass("active-"+index);
		for (var i = 0; i < target.length; i++) {
			$("."+target[i]).hide();
		}
		$("."+target[index]).show();
	});
	var directoryActive = GetCookie("playerActive");
	if ( directoryActive == 1) {
		$('.nav-team li:nth-of-type(2)').trigger('click');
		var date = new Date();
		date.setTime( date.getTime() - 1 );
		document.cookie = 'playerActive=;path=/jleague/;expires=' + date.toUTCString();
	}
});
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
