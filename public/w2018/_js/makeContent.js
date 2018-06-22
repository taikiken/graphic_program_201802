
//日程・結果作成
makeContent['schedule'] = function(jsonFile) {
	// console.log(jsonFile);
	// var scheduleArea = document.querySelector('#schedule_area');

	//scheduleElm作成
	// var scheduleElm = document.querySelector('.schedule');
	var scheduleUl = document.querySelector('.schedule ul');
	if (!isset(scheduleUl)) {
		scheduleCheckBaseElm = setInterval(function(){
			makeContent['schedule'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(scheduleCheckBaseElm);
	}
	
	var matchesElm = document.querySelector('.matches');
	//schedule,matches inner 作成
	var matchesInner,todayMachFlg = false;
	jsonFile.schedule.forEach(function(value, index) {
		if (value.date == jsonFile.today.date) { 
			todayMachFlg = true;
		}
		var date = value.date.substr(6).replace('-', '/');
		date += '('+value.weekday+')';

		//schedule inner作成
		var scheduleLi = document.createElement('li');
		scheduleLi.innerText = date;
		scheduleLi.classList.add(value.date);
		//matches inner作成
		var matchesInnerDiv = document.createElement('div');
		matchesInnerDiv.id = value.date;

		var valueDay = value.date.substr(-2,2);
		valueDay = (valueDay-0)+1;
		valueDay = ('00' + valueDay).slice(-2);
		var valueYm = value.date.substr(0,8);
		var newValueDate= valueYm+valueDay;
		if (nowHour > 6) {
			var toDayDay = jsonFile.today.date.substr(-2,2);
			toDayDay = (toDayDay-0)+1;
			toDayDay = ('00' + toDayDay).slice(-2);
			var toDayYm = jsonFile.today.date.substr(0,8);
			var newTodayDate= toDayYm+toDayDay;
		}else{
			var newTodayDate = jsonFile.today.date;
		}
// console.log(newValueDate+":"+newTodayDate);
		if (newValueDate == newTodayDate) {//   value.date == jsonFile.today.date
			scheduleLi.classList.add('active');
		}else{
			if (todayMachFlg == false && (newValueDate > newTodayDate || value.date == "2018-07-16")) {//value.date > jsonFile.today.date
				scheduleLi.classList.add('active');
				todayMachFlg = true;
			}else{
				matchesInnerDiv.classList.add('hide');
			}
		}
		
		scheduleUl.appendChild(scheduleLi);
		var h3 = document.createElement('h3');
		h3.innerHTML = date;
		matchesInnerDiv.appendChild(h3);

		//match作成
		value.card.forEach(function(value2, index2) {
			var matchElm = document.createElement('div');
			var matchA = document.createElement('a');
			matchA.setAttribute("href","/w2018/sokuhou/?gameid="+value2.gameid);
			// matchElm.id = value2.gameid;
			matchElm.classList.add('match');

			//home
			var homeTeam = document.createElement('div');
			homeTeam.classList.add('home_team');
			homeTeam.innerText = value2.hometeam.name;
			var homeImg = document.createElement('img');
			homeImg.setAttribute('src', '/w2018/_img/'+value2.hometeam.id+'.png');
			homeTeam.appendChild(homeImg);
			var homeScore = document.createElement('div');
			homeScore.classList.add('home_score');
			homeScore.innerText = value2.hometeam.score;
			//data
			var data = document.createElement('div');
			data.classList.add('data');
			data.innerText = value2.group;
			var status = document.createElement('span');
			status.classList.add('id_'+value2.status.id);
			status.classList.add('status');
			if (value2.status.id == 1) {
				status.innerText = value2.time;
			}else if(value2.status.id == 2){
				status.innerText = value2.status.name;
			}else{
				status.classList.add('end');
				status.innerText = value2.status.name;
			}
			data.appendChild(status);
			var stadium = document.createElement('span');
			stadium.classList.add('stadium');
			stadium.innerText = value2.stadium;
			data.appendChild(stadium);
			//away
			var awayTeam = document.createElement('div');
			awayTeam.classList.add('away_team');
			awayTeam.innerText = value2.awayteam.name;
			var awayImg = document.createElement('img');
			awayImg.setAttribute('src', '/w2018/_img/'+value2.awayteam.id+'.png');
			awayTeam.appendChild(awayImg);
			var awayScore = document.createElement('div');
			awayScore.classList.add('away_score');
			awayScore.innerText = value2.awayteam.score;

			matchA.appendChild(homeTeam);//homeTeam 追加
			matchA.appendChild(homeScore);//homeScore 追加
			matchA.appendChild(data);//data 追加
			matchA.appendChild(awayScore);//awayScore 追加
			matchA.appendChild(awayTeam);//awayTeam 追加

			matchElm.appendChild(matchA);
			matchesInnerDiv.appendChild(matchElm);//matchElm 追加
		});

		matchesElm.appendChild(matchesInnerDiv);//matches inner 追加
	});

	//scheduleにイベント追加
	var targetElm = document.querySelectorAll('.schedule li');
	Array.prototype.forEach.call(targetElm, function(item) {
		item.addEventListener( "click" , function () {
			//schedule
			var li = document.querySelectorAll('.schedule li');
			Array.prototype.forEach.call(li, function(item2) {
				item2.classList.remove('active');
			});
			var date = item.className;
			item.classList.add('active');

			//match
			var div = document.querySelectorAll('.matches > div');
			Array.prototype.forEach.call(div, function(item2) {
				item2.classList.add('hide');
			});
			document.getElementById(date).classList.remove('hide');
		} , false );
	});

	var elements = document.querySelectorAll( ".schedule li" ) ;
	elements = [].slice.call( elements ) ;//配列を作成

	//schedule_areaの当日を表示する
	var todayElm = document.querySelector('.schedule li.active');
	if (todayElm !== null) {
		var todayRect = todayElm.getBoundingClientRect();
		var todayIndex = elements.indexOf( todayElm ) ;
		document.querySelector('.schedule ul').scrollLeft = todayRect.width * (todayIndex-1);
	}
	//preveイベント
	var prevElm = document.querySelector('.schedule .prev');
	prevElm.addEventListener( "click" , function () {
		var activeElm = document.querySelector('.schedule li.active');
		var rect = activeElm.getBoundingClientRect();
		if (activeElm.previousElementSibling !== null) {
			activeElm.previousElementSibling.click();
			var index = elements.indexOf( activeElm ) ;
			document.querySelector('.schedule ul').scrollLeft = rect.width * (index-1)-30;
		}
	} , false );
	//nextイベント
	var nextElm = document.querySelector('.schedule .next');
	nextElm.addEventListener( "click" , function () {
		var activeElm = document.querySelector('.schedule li.active');
		var rect = activeElm.getBoundingClientRect();
		if (activeElm.nextElementSibling !== null) {
			activeElm.nextElementSibling.click();
			var index = elements.indexOf( activeElm ) ;
			document.querySelector('.schedule ul').scrollLeft = rect.width * (index+1)-30;
		}
	} , false );
}

//sokuhou_area 詳細作成
makeContent['sokuhou'] = function(jsonFile) {
	// console.log(jsonFile);
	var baseElm = document.querySelector('#sokuhou_area');

	if (!isset(baseElm)) {
		sokuhouCheckBaseElm = setInterval(function(){
			makeContent['sokuhou'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(sokuhouCheckBaseElm);
	}
	var homeInfo = jsonFile.gameinfo.team[0],awayInfo = jsonFile.gameinfo.team[1];
	//グループ
	baseElm.querySelector(".group").innerHTML = jsonFile.gameinfo.group;
	//スタジアム
	baseElm.querySelector(".stadium").innerHTML = jsonFile.gameinfo.stadiumS;
	//ホームフラッグ
	baseElm.querySelector(".home_team").innerHTML = '<img src="/w2018/_img/'+homeInfo.teaminfo.id+'.png"><br>'+homeInfo.teaminfo.nameS;
	baseElm.querySelector(".data_timeline .head .home").innerHTML = '<img src="/w2018/_img/'+homeInfo.teaminfo.id+'.png">';
	baseElm.querySelector(".data_timeline table .home").innerHTML = '<img src="/w2018/_img/'+homeInfo.teaminfo.id+'.png">';
	//アウェイフラッグ
	baseElm.querySelector(".away_team").innerHTML = '<img src="/w2018/_img/'+awayInfo.teaminfo.id+'.png"><br>'+awayInfo.teaminfo.nameS;
	baseElm.querySelector(".data_timeline .head .away").innerHTML = '<img src="/w2018/_img/'+awayInfo.teaminfo.id+'.png">';
	baseElm.querySelector(".data_timeline table .away").innerHTML = '<img src="/w2018/_img/'+awayInfo.teaminfo.id+'.png">';

	makeContent['makeCommonTag'](jsonFile);
}

makeContent['makeCommonTag'] = function(jsonFile) {
	var baseElm = document.querySelector('#sokuhou_area');

	var homeInfo = jsonFile.gameinfo.team[0],awayInfo = jsonFile.gameinfo.team[1];
	//試合開始時間・状態
	baseElm.querySelector(".status").innerHTML = jsonFile.situation.name;
	
	//ホームスコア
	baseElm.querySelector(".home_score").innerHTML = homeInfo.score ? homeInfo.score:0;
	//アウェイスコア
	baseElm.querySelector(".away_score").innerHTML = awayInfo.score ? awayInfo.score:0;

	//REPORT EVENT
	if (isset(jsonFile.event)) {
		baseElm.querySelector(".event").innerHTML = '';
		if (isset(jsonFile.event.summary)) {
			baseElm.querySelector(".event").innerHTML = '<div class="line_2 event_type9"><p class="time"></p><p class="text">'+jsonFile.event.summary+'</p></div>'
		}
		var eventType,line,time,text;
		jsonFile.event.events.forEach(function(val,key) {
			eventType = "event_type"+val.type;
			line = val.type == 1 || val.type == 3 ? "line_1":"line_"+val.team;//typeが１or3の場合はアウェイ表示
			time = val.type == 1 || val.type == 2 || val.type == 9 ? '':val.time;//typeが１or2or9の場合はtimeなし
			text = val.comment;
			if (val.type == 3 && text.match(/前半終了/)) {
				eventType = 'event_type3_1';
				time = '';
			}else if(val.type == 3 && (text.match(/試合終了/) || text.match(/後半終了/))){
				eventType = 'event_type3_2';
				time = '';
			}
			baseElm.querySelector(".event").innerHTML += '<div class="'+line+' '+eventType+'">'+
				'<p class="time">'+time+'</p>'+
				'<p class="text">'+text+'</p>'+
			'</div>';
		});
	} else{
		baseElm.querySelector(".event").innerHTML = '<div class="line_2 event_type9"><p class="time"></p><p class="text">速報情報はありません。<br>試合開始までお待ちください。</p></div>';
	}

	//DATA
	if (isset(jsonFile.timeline)) {
		baseElm.querySelector(".data_timeline .expansion .home ul").innerHTML = '';
		baseElm.querySelector(".data_timeline .expansion .away ul").innerHTML = '';
		if (jsonFile.timeline.length > 90) {
			baseElm.querySelector(".data_timeline .expansion .home ul").classList.add('long');
			baseElm.querySelector(".data_timeline .expansion .away ul").classList.add('long');
			var removeList = baseElm.querySelector(".data_timeline .expansion").querySelectorAll('.hide');
			removeList.forEach(function(val,key) {
				val.classList.remove("hide");
			});
		}
		jsonFile.timeline.forEach(function(val,key) {
			baseElm.querySelector(".data_timeline .expansion .home ul").innerHTML += '<li class="event_'+val.play.home+'">'+val.time+'</li>';
			baseElm.querySelector(".data_timeline .expansion .away ul").innerHTML += '<li class="event_'+val.play.away+'">'+val.time+'</li>';
		});
	}else{
		baseElm.querySelector(".data_timeline .expansion .home ul").innerHTML = '';
		baseElm.querySelector(".data_timeline .expansion .away ul").innerHTML = '';
	}
	if (isset(homeInfo.stats)) {
		var homeStats = homeInfo.stats.today,awayStats = awayInfo.stats.today;
		var tableElm = baseElm.querySelector(".data_timeline table");
		tableElm.querySelector(".fk").innerHTML = '<td>FK</td><td>'+homeStats.fk+'</td><td>'+awayStats.fk+'</td>';
		tableElm.querySelector(".ck").innerHTML = '<td>CK</td><td>'+homeStats.ck+'</td><td>'+awayStats.ck+'</td>';
		tableElm.querySelector(".pk").innerHTML = '<td>PK</td><td>'+homeStats.pk+'</td><td>'+awayStats.pk+'</td>';
		tableElm.querySelector(".shoot").innerHTML = '<td>シュート</td><td>'+homeStats.shoot+'</td><td>'+awayStats.shoot+'</td>';
		tableElm.querySelector(".card").innerHTML = '<td>警告/退場</td><td>'+homeStats.yellow+' / '+homeStats.red+'</td><td>'+awayStats.yellow+' / '+awayStats.red+'</td>';
		tableElm.querySelector(".play").innerHTML = '<td>プレー回数<br><span>（ペナルティエリア / アタッキングサード）</span></td>'+
		'<td>'+homeStats.playCount.parea+' / '+homeStats.playCount.attacking3rd+'</td><td>'+awayStats.playCount.parea+' / '+awayStats.playCount.attacking3rd+'</td>';
		tableElm.querySelector(".pass").innerHTML = '<td>敵陣でのパス<br><span>（総数 / 成功率）</span></td>'+
		'<td>'+homeStats.opponentAreaPass.count+' / '+homeStats.opponentAreaPass.rate+'%</td><td>'+awayStats.opponentAreaPass.count+' / '+awayStats.opponentAreaPass.rate+'%</td>';
		tableElm.querySelector(".pass2").innerHTML = '<td>パス方向比率 (%)</td>'+
		'<td class="small">前 : '+homeStats.passDirectionRate.front+'<br>後 : '+homeStats.passDirectionRate.rear+'<br>左 : '+homeStats.passDirectionRate.left+'<br>右 : '+homeStats.passDirectionRate.right+'</td>'+
		'<td class="small">前 : '+awayStats.passDirectionRate.front+'<br>後 : '+awayStats.passDirectionRate.rear+'<br>左 : '+awayStats.passDirectionRate.left+'<br>右 : '+awayStats.passDirectionRate.right+'</td>';
	}else{
		var tableElm = baseElm.querySelector(".data_timeline table");
		tableElm.querySelector(".fk").innerHTML = '<td>FK</td><td>-</td><td>-</td>';
		tableElm.querySelector(".ck").innerHTML = '<td>CK</td><td>-</td><td>-</td>';
		tableElm.querySelector(".pk").innerHTML = '<td>PK</td><td>-</td><td>-</td>';
		tableElm.querySelector(".shoot").innerHTML = '<td>シュート</td><td>-</td><td>-</td>';
		tableElm.querySelector(".card").innerHTML = '<td>警告/退場</td><td>- / -</td><td>- / -</td>';
		tableElm.querySelector(".play").innerHTML = '<td>プレー回数<span><br>（ペナルティエリア / アタッキングサード）</span></td>'+
		'<td>- / -</td><td>- / -</td>';
		tableElm.querySelector(".pass").innerHTML = '<td>敵陣でのパス<span><br>（総数 / 成功率）</span></td><td>- / -</td><td>- / -</td>';
		tableElm.querySelector(".pass2").innerHTML = '<td>パス方向比率 (%)</td>'+
		'<td class="small">前 : -<br>後 : -<br>左 : -<br>右 : -</td>'+
		'<td class="small">前 : -<br>後 : -<br>左 : -<br>右 : -</td>';
	}

	//MEMBER
	if (isset(homeInfo.member)) {
		var homeMember = homeInfo.member,awayMember = awayInfo.member;
		var memberElm = baseElm.querySelector(".member .member_area");

		//starting
		memberElm.querySelector(".starting_member .home").innerHTML = '';
		memberElm.querySelector(".starting_member .away").innerHTML = '';
		homeMember.starting.forEach(function(val,key) {
			memberElm.querySelector(".starting_member .home").innerHTML += '<li id="id'+val.id+'"><div class="name">'+val.pos+' '+val.no+' '+val.name+'</div></li>';
		});
		awayMember.starting.forEach(function(val,key) {
			memberElm.querySelector(".starting_member .away").innerHTML += '<li id="id'+val.id+'"><div class="name">'+val.pos+' '+val.no+' '+val.name+'</div></li>';
		});

		//bench
		memberElm.querySelector(".bench_member .home").innerHTML = '';
		memberElm.querySelector(".bench_member .away").innerHTML = '';
		homeMember.bench.forEach(function(val,key) {
			memberElm.querySelector(".bench_member .home").innerHTML += '<li id="id'+val.id+'"><div class="name">'+val.pos+' '+val.no+' '+val.name+'</div></li>';
		});
		awayMember.bench.forEach(function(val,key) {
			memberElm.querySelector(".bench_member .away").innerHTML += '<li id="id'+val.id+'"><div class="name">'+val.pos+' '+val.no+' '+val.name+'</div></li>';
		});

		//director
		// memberElm.querySelector(".director .home").innerHTML = isset(homeMember.director) ? homeMember.director :'-';
		// memberElm.querySelector(".director .away").innerHTML = isset(awayMember.director) ? awayMember.director :'-';
		
		//change
		if (isset(homeInfo.change)) {
			homeInfo.change.forEach(function(val,key) {
				if (isset(val.in.id)) {
					memberElm.querySelector("#id"+val.in.id).innerHTML += '<div class="in">'+val.time.total.replace( '分', '' )+'</div>';
				}
				if (isset(val.out.id)) {
					memberElm.querySelector("#id"+val.out.id).innerHTML += '<div class="out">'+val.time.total.replace( '分', '' )+'</div>';
				}
			});
		}
		if (isset(awayInfo.change)) {
			awayInfo.change.forEach(function(val,key) {
				if (isset(val.in.id)) {
					memberElm.querySelector("#id"+val.in.id).innerHTML += '<div class="in">'+val.time.total.replace( '分', '' )+'</div>';
				}
				if (isset(val.out.id)) {
					memberElm.querySelector("#id"+val.out.id).innerHTML += '<div class="out">'+val.time.total.replace( '分', '' )+'</div>';
				}
			});
		}
	}else{
		var memberElm = baseElm.querySelector(".member .member_area");
		//starting
		memberElm.querySelector(".starting_member .home").innerHTML = '<li><div class="name">-</div></li>';
		memberElm.querySelector(".starting_member .away").innerHTML = '<li><div class="name">-</div></li>';
		//bench
		memberElm.querySelector(".bench_member .home").innerHTML = '<li><div class="name">-</div></li>';
		memberElm.querySelector(".bench_member .away").innerHTML = '<li><div class="name">-</div></li>';
		//director
		// memberElm.querySelector(".director .home").innerHTML = '-';
		// memberElm.querySelector(".director .away").innerHTML = '-';
	}

	//SATADIUM
	var stadiumElm = baseElm.querySelector(".stadium_area .stadium_table");
	stadiumElm.querySelector(".stadium").innerHTML = '<td>スタジアム</td><td>'+jsonFile.gameinfo.stadium+'</td>';
	if (isset(jsonFile.gameinfo.referee)) {
		stadiumElm.querySelector(".main").innerHTML = '<td>主審</td><td>'+jsonFile.gameinfo.referee.main+'</td>';
		stadiumElm.querySelector(".linesman").innerHTML = '<td>副審</td><td>'+jsonFile.gameinfo.referee.linesman[0]+' / '+jsonFile.gameinfo.referee.linesman[1]+'</td>';
		stadiumElm.querySelector(".forth").innerHTML = '<td>第4の審判員</td><td>'+jsonFile.gameinfo.referee.forth+'</td>';
	}else{
		stadiumElm.querySelector(".main").innerHTML = '<td>主審</td><td>-</td>';
		stadiumElm.querySelector(".linesman").innerHTML = '<td>副審</td><td>- / -</td>';
		stadiumElm.querySelector(".forth").innerHTML = '<td>第4の審判員</td><td>-</td>';
	}
	if (isset(jsonFile.result)) {
		stadiumElm.querySelector(".spectators").innerHTML = '<td>入場者数</td><td>'+jsonFile.result.spectators+'</td>';
		stadiumElm.querySelector(".condition").innerHTML = '<td>天候/気温/湿度</td><td>'+jsonFile.result.condition.weather+' / '+jsonFile.result.condition.temperature+' / '+jsonFile.result.condition.humidity+'</td>';
	}else{
		stadiumElm.querySelector(".spectators").innerHTML = '<td>入場者数</td><td>-</td>';
		stadiumElm.querySelector(".condition").innerHTML = '<td>天候/気温/湿度</td><td>- / - / -</td>';
	}
}


//国別チーム一覧
makeContent['team'] = function(jsonFile) {
	// console.log(jsonFile);
	var baseElm = document.querySelector('.team_list');
	if (!isset(baseElm)) {
		teamCheckBaseElm = setInterval(function(){
			makeContent['team'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(teamCheckBaseElm);
	}

	jsonFile.area.forEach(function(value, index) {
		var h3 = document.createElement('h3');
		h3.innerHTML = value.label;
		baseElm.appendChild(h3);

		//table作成
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		tr.innerHTML = '<th width="45%">国名</th>'+
              '<th>グループ</th>'+
              '<th>出場回数</th>';
		table.appendChild(tr);//tr追加
		value.country.forEach(function(value2, index2) {
			tr = document.createElement('tr');
			if (!isset(value2.group)) {
				value2.group = '-';
			}
			tr.innerHTML = '<td>'+
				'<a href="/w2018/team/list.html?teamid='+value2.id+'">'+
				'<img src="/w2018/_img/'+value2.id+'.png" width="25%"> '+value2.name+'</a>'+
				'</td>'+
				'<td>'+value2.group+'</td>'+
				'<td>'+value2.history+'</td>';
			table.appendChild(tr);//tr追加
		});
		baseElm.appendChild(table);
	});
}
//国別選手一覧
makeContent['memberList'] = function(jsonFile) {
	// console.log(jsonFile);
	var baseElm = document.querySelector('.member_list');
	if (!isset(baseElm)) {
		memberListCheckBaseElm = setInterval(function(){
			makeContent['memberList'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(memberListCheckBaseElm);
	}

	var h3 = document.createElement('h3');
	h3.innerHTML = jsonFile.team.name;
	baseElm.appendChild(h3);
	//table作成
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	tr.innerHTML = '<th>Pos</th>'+
		'<th>No</th>'+
		'<th width="33%">名前</th>'+
		'<th>所属</th>';
	table.appendChild(tr);//tr追加
	jsonFile.player.forEach(function(value, index) {
		tr = document.createElement('tr');
		tr.innerHTML = '<td>'+value.position+'</td>'+
			'<td>'+value.no+'</td>'+
			'<td><a href="/w2018/team/player.html?teamid='+jsonFile.team.id+'&playerid='+value.id+'">'+value.name+'</a></td>'+
			'<td>'+value.team+'</td>';
		table.appendChild(tr);//tr追加
	});
	baseElm.appendChild(table);

	// var targetElm = baseElm.querySelectorAll('.player');
	// Array.prototype.forEach.call(targetElm, function(item) {
	// 	item.addEventListener( "click" , function () {
	// 		var teamId = item.getAttribute('data-teamid');
	// 		var playerId = item.getAttribute('data-playerid');
	// 		bullGetJson("player",'https://'+jsondevurl+'jlive.sportsbull.jp/json/v1/2018/fwc/player/'+teamId+'/'+playerId+'.json');
	// 	} , false );
	// });
}
//選手詳細
makeContent['player'] = function(jsonFile) {
	// console.log(jsonFile);
	var baseElm = document.querySelector('.player');
	if (!isset(baseElm)) {
		playerCheckBaseElm = setInterval(function(){
			makeContent['player'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(playerCheckBaseElm);
	}

	var h3 = document.createElement('h3');
	h3.innerHTML = jsonFile.player.name;
	baseElm.appendChild(h3);
	for (key in jsonFile.player) {
		if (!isset(jsonFile.player[key])) {
			jsonFile.player[key] = "-";
		}
	}
	//table作成
	var table = document.createElement('table');
	table.innerHTML = '<tr><th>背番号</th><td>'+jsonFile.player.no+'</td><tr>'+
		'<tr><th>ポジション</th><td>'+jsonFile.player.position+'</td><tr>'+
		'<tr><th>誕生日</th><td>'+jsonFile.player.birthday.replace('-', '/').replace('-', '/')+'</td><tr>'+
		'<tr><th>身長</th><td>'+jsonFile.player.height+'cm</td><tr>'+
		'<tr><th>体重</th><td>'+jsonFile.player.weight+'kg</td><tr>'+
		'<tr><th>血液型</th><td>'+jsonFile.player.bloodtype+'</td><tr>'+
		'<tr><th>出身地</th><td>'+jsonFile.player.hometown+'</td><tr>'+
		'<tr><th>A代表キャップ数</th><td>'+jsonFile.player.acap+'</td><tr>'+
		'<tr><th>A代表ゴール数</th><td>'+jsonFile.player.agoal+'</td><tr>'+
		'<tr><th>所属チーム</th><td>'+jsonFile.player.team+'</td><tr>'+
		'<tr><th>所属チーム歴</th><td>'+jsonFile.player.teamhistory+'</td><tr>'+
		'<tr><th>個人タイトル</th><td>'+ jsonFile.player.individualtitle +'</td><tr>'+
		'<tr><th>経歴</th><td>'+jsonFile.player.career+'</td><tr>';
	baseElm.appendChild(table);
}
//グループランキング作成
makeContent['ranking'] = function(jsonFile) {
	// console.log(jsonFile);
	var groupsElm = document.querySelector('.groups');
	if (!isset(groupsElm)) {
		rankingCheckBaseElm = setInterval(function(){
			makeContent['ranking'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(rankingCheckBaseElm);
	}

	//groups inner 作成
	jsonFile.group.forEach(function(value, index) {
		//groupElm作成
		var group = document.createElement('div');
		group.classList.add('group');

		var h3 = document.createElement('h3');
		h3.innerHTML = value.label;
		group.appendChild(h3);

		//table作成
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		tr.innerHTML = '<th width="45%">国名</th>'+
				'<th>勝点</th>'+
				'<th>試合</th>'+
				'<th>勝</th>'+
				'<th>引</th>'+
				'<th>負</th>'+
				'<th>得失</th>';
		table.appendChild(tr);//tr追加
		
		//グループ順位並び替え
		value.team.sort(function(a,b){
			if(a.ranking<b.ranking) return -1;
			if(a.ranking > b.ranking) return 1;
			return 0;
		});
		value.team.forEach(function(value2, index2) {
			tr = document.createElement('tr');
			tr.innerHTML = '<td>'+
				'<a href="/w2018/team/list.html?teamid='+value2.id+'">'+
				'<img src="/w2018/_img/'+value2.id+'.png" width="25%"> '+value2.name+'</a>'+
				'</td>'+
				'<td>'+value2.point+'</td>'+
				'<td>'+value2.game+'</td>'+
				'<td>'+value2.win+'</td>'+
				'<td>'+value2.draw+'</td>'+
				'<td>'+value2.lose+'</td>'+
				'<td>'+value2.diff+'</td>';
			table.appendChild(tr);//tr追加
		});
		group.appendChild(table);
		if (index == 7) {
			groupsElm.insertBefore(group, groupsElm.firstChild);
		}else{
			groupsElm.appendChild(group);
		}
	});
}

//トーナメント表作成
makeContent['tournament'] = function(jsonFile) {
	//tournamentElm作成
	var tournamentElm = document.querySelector('.tournament');
	if (!isset(tournamentElm)) {
		tournamentCheckBaseElm = setInterval(function(){
			makeContent['tournament'](jsonFile);
		},100);
		return false;
	}else{
		clearInterval(tournamentCheckBaseElm);
	}

	var h3 = document.createElement('h3');
	h3.innerHTML = "決勝トーナメント";
	tournamentElm.appendChild(h3);

	var lastUpdate = document.createElement('div');
	lastUpdate.classList.add('last_update');
	lastUpdate.innerText = '更新日:'+jsonFile.lastupdate.substr(0,16);
	tournamentElm.appendChild(lastUpdate);

	var a = document.createElement('a');
	a.setAttribute('href', jsonFile.img);//jsonFile.img
	a.setAttribute('target', '_blank');
	a.innerHTML = '<img src="'+jsonFile.img+'" width="100%">';//jsonFile.img
	tournamentElm.appendChild(a);
}

