(function() {
	var year,teamId,playerId;
	var setting = function(){
		getData(year,teamId,playerId);
	}
	var escapeJsHTML = function (str) {
		return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\//g, '\\/').replace(/</g, '\\x3c').replace(/>/g, '\\x3e').replace(/(0x0D)/g, '\r').replace(/(0x0A)/g, '\n').replace(/&/g, '&amp;');
	};
	var getParameter = function(){
		var url = window.location.search,tmp,hash,para;
		if(url.match(/teamId/) && url.match(/playerId/)){
			tmp = url.split('&');
			hash = tmp[0].slice(1);
			para = hash.split('=');
			teamId = para[1] ? escapeJsHTML(para[1]) :false;
			para = tmp[1].split('=');
			playerId = para[1] ? escapeJsHTML(para[1]) :false;
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
					setting();
					// getMaster();
				}
			}
		}
		req.open('GET', "https://jlive.sportsbull.jp/json/v1/year.json");
		req.send(null);
	}();

	var getDate = function(date){
		var dateArr = date.split('-');
		dateArr[2] = dateArr[2].split(' ');
		var mdy = dateArr[1] + '/' + dateArr[2][0] + '/' + dateArr[0]
		var dateObj = new Date(mdy) ;
		var weekday = [ "日", "月", "火", "水", "木", "金", "土" ] ;
		var wday = "（" + weekday[ dateObj.getDay() ] + "）" ;
		return wday;
	}
	var getData = function(year,teamId,playerId){
		var url = "https://jlive.sportsbull.jp/json/v1/"+year+"/jleague/team/"+teamId+"/"+playerId+".json";
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBack(data.response);
					getDataNews(data.response.data.name);
				}
			}
			if( this.readyState == 4 && this.status != 200 ){
				location.href = "https://sportsbull.jp/jleague/match/";
			}
		}
		req.open('GET', url);
		req.send(null);
	}
	var getDataNews = function(playerName){
		var playerName = encodeURIComponent( playerName );
		var url = "https://sportsbull.jp/api/v1/articles/search/"+playerName;
		var req = new XMLHttpRequest(),data = {};
		req.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200 ){
				if( this.response ){
					data = JSON.parse(req.response);
					callBackNews(data.response.articles,data.response.count);
				}
			}
		}
		req.open('GET', url);
		req.send(null);
	}
	var callBackNews = function(articles,count){
		var baseElm = document.querySelector('#relation ul'),li,a,div,img,p;
		if (count != 0) {
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
		}else{
			baseElm = document.querySelector('#relation')
			div = document.createElement('div');
			div.innerText = "該当する記事はありませんでした。";
			div.classList.add("mb30");
			baseElm.appendChild(div);
		}
	}
	var callBack = function(data){
		var baseElm,elm,player = data.data,div,ul,li,a,img,p,span,position = {"GK":"gk","DF":"df","MF":"mf","FW":"fw"},detail;
		//title
		document.title = player.name+" / "+data.team.name+" | スポーツブル / SPORTS BULL";
		createBreadCrumb(data.team.id,data.team.name,player.id,player.name);
		//h2,h3
		baseElm = document.querySelector('.plofile h2');
		baseElm.classList.add("team-"+teamId);
		baseElm.innerText = data.team.name;
		baseElm = document.querySelector('.plofile h3');
		baseElm.classList.add(position[player.position]);
		baseElm.innerText = "　"+player.name.replace( /　/g , " " ) ;
		span = document.createElement('span');
		span.innerText = player.no;
		baseElm.insertBefore(span, baseElm.firstChild);
		span = document.createElement('span');
		span.innerText = "/ "+player.nameE;
		baseElm.appendChild(span);
		//photo
		baseElm = document.querySelector('.plofile .photo');
		div = document.createElement('div');
		div.classList.add("nameE");
		div.innerHTML = player.nameE.replace( / /g , "<br>" ) ;;
		baseElm.appendChild(div);
		img = document.createElement('img');
		if (player.img != "") {
			img.setAttribute('src', player.img);
		}else{
			img.setAttribute('src', "/jleague/images/team/noimage.jpg");
		}
		img.setAttribute('alt', player.name);
		baseElm.appendChild(img);
		ul = document.createElement('ul');
		li = document.createElement('li');
		li.innerText = player.birthday.replace( /-/g , "/" ) ;
		ul.appendChild(li);//生年月日
		li = document.createElement('li');
		li.innerText = player.height+"cm/"+player.weight+"kg";
		ul.appendChild(li);//身長/体重
		li = document.createElement('li');
		li.innerText = player.hometown;
		ul.appendChild(li);//出身地
		li = document.createElement('li');
		li.innerText = player.firstdate == "--" ? "-" : player.firstdate.replace( /-/g , "/" ) ;
		ul.appendChild(li);//初出場
		// li = document.createElement('li');
		// li.innerText = player.firstdate.replace( /-/g , "/" ) ;
		// ul.appendChild(li);//初得点
		li = document.createElement('li');
		li.innerText = player.acap+"回";
		ul.appendChild(li);//代表出場
		baseElm.appendChild(ul);
		//更新日
		baseElm = document.querySelector('.plofile .update');
		wday = getDate(data.lastupdate);
		update = data.lastupdate.replace( "-" , "年" ).replace( "-" , "月" ).replace( " " , "日"+wday ) ;
		baseElm.innerText = '更新日：'+update;
		//成績
		baseElm = document.querySelector('.achievement ul');
		li = document.createElement('li');
		p = document.createElement('p');
		p.innerText = player.stats.total.goal;
		li.appendChild(p);//ゴール数
		p = document.createElement('p');
		p.innerText = player.stats.total.shoot;
		li.appendChild(p);//シュート数
		p = document.createElement('p');
		p.innerText = player.stats.total.entry;
		li.appendChild(p);//出場試合数
		p = document.createElement('p');
		p.innerText = player.stats.total.yellow+"/"+player.stats.total.red;
		li.appendChild(p);//警告/退場
		baseElm.appendChild(li);

		for (var i = 0; i < player.stats.details.length; i++) {
			detail = player.stats.details[i];
			li = document.createElement('li');
			li.setAttribute('data-game-id',detail.gameid);
			p = document.createElement('p');
			p.innerHTML = detail.date.replace( /-/g , "/" )+"<br><span>詳細 ></span>";
			li.appendChild(p);//試合日
			p = document.createElement('p');
			p.innerText = detail.vs;
			li.appendChild(p);//対戦相手
			p = document.createElement('p');
			p.innerText = detail.result;
			li.appendChild(p);//勝敗
			p = document.createElement('p');
			p.innerText = detail.starting == 1 ? "先発":"サブ";
			li.appendChild(p);//出場
			p = document.createElement('p');
			p.innerText = detail.goal;
			li.appendChild(p);//ゴール数
			p = document.createElement('p');
			p.innerText = detail.shoot;
			li.appendChild(p);//シュート数
			p = document.createElement('p');
			p.innerText = detail.time;
			li.appendChild(p);//出場時間
			p = document.createElement('p');
			p.innerText = detail.yellow+"/"+detail.red;
			li.appendChild(p);//警告/退場
			baseElm.appendChild(li);
		}
		//前所属チーム
		baseElm = document.querySelector('.previous-team');
		p = document.createElement('p');
		p.innerText = player.history;
		baseElm.appendChild(p);
	}
	var createBreadCrumb = function(teamId,teamName,playerId,playerName){
		var a = document.querySelector('.show-for-large .foot-breadCrumb li:nth-of-type(3) a');
		a.setAttribute('href', "/jleague/team/?teamId="+teamId);
		var span = document.querySelector('.show-for-large .foot-breadCrumb li:nth-of-type(3) a span');
		span.innerText = teamName;
		a = document.querySelector('.show-for-large .foot-breadCrumb li:last-child a');
		a.setAttribute('href', "/jleague/player/?teamId="+teamId+"&playerId="+playerId);
		span = document.querySelector('.show-for-large .foot-breadCrumb li:last-child a span');
		span.innerText = playerName;

		a = document.querySelector('.show-for-small .foot-breadCrumb li:nth-of-type(3) a');
		a.setAttribute('href', "/jleague/team/?teamId="+teamId);
		span = document.querySelector('.show-for-small .foot-breadCrumb li:nth-of-type(3) a span');
		span.innerText = teamName;
		a = document.querySelector('.show-for-small .foot-breadCrumb li:last-child a');
		a.setAttribute('href', "/jleague/player/?teamId="+teamId+"&playerId="+playerId);
		span = document.querySelector('.show-for-small .foot-breadCrumb li:last-child a span');
		span.innerText = playerName;
	}
}());

$(function(){
	$(document).on("click", '.achievement li', function(){
		var gameId = $(this).data("game-id");
		var index = $('.achievement li').index(this);
		if (index > 0) {
			// window.open("https://sportsbull.jp/jleague/sokuhou/?id="+gameId);
			location.href = "https://sportsbull.jp/jleague/sokuhou/?id="+gameId;
		}
	});
	var url = document.referrer;
	if ( url.match(/sportsbull\.jp\/jleague\/team\//)) {
		var expire = new Date();
		expire.setTime( expire.getTime() + 1000 * 3600 * 1 );
		document.cookie = 'playerActive=1;path=/jleague/;expires=' + expire.toUTCString();
	}
});