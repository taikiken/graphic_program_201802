(function() {
	var iframeDoc,baseCreateFlg = true;
	var year;
	var master,league = [];
	var setting = function(){
		getData("2",year);
		leagueChange();
	}

	var baseCreate = function (){
		// 目印のaタグからパラメータとってきたら消す
		var target = document.querySelector("#sportbull-jleague-standings-widget");

		var iframe = document.createElement('iframe');
		iframe.scrolling = 'no';
		iframe.frameBorder = 0;
		iframe.marginWidth = 0;
		iframe.marginHeight = 0;
		iframe.width = '100%';
		iframe.height = '100%';
		iframe.id = 'jleague-widget-iframe-standings';
		target.appendChild(iframe);

		var baseElm = document.createElement("div");
		baseElm.classList.add("widget");
		var header,h1,a,span,form,select,div,div2;
		header = document.createElement("header");
		header.classList.add("head-sec");
		div = document.createElement("div");
		div.classList.add("head-sec-inner");
		h1 = document.createElement("h1");
		a = document.createElement("a");
		a.setAttribute('href', 'https://sportsbull.jp/jleague/match/?utm_source=stats_widget&utm_medium=web&utm_campaign=jleague_widget');
		a.setAttribute('target', '_blank');
		a.innerText = "SPORTS BULL";
		h1.appendChild(a);
		div.appendChild(h1);
		header.appendChild(div);
		baseElm.appendChild(header);

		h1 = document.createElement("h1");
		h1.classList.add("ttl-h1-wrapper");
		span = document.createElement("span");
		span.classList.add("ttl-h1-txt");
		span.innerText = "順位表";
		form = document.createElement("form");
		form.classList.add("ttl-h1-select");
		form.setAttribute('action', '?');
		form.setAttribute('name', 'year');
		select = document.createElement("select");
		select.classList.add("select-year");
		select.setAttribute('name', 'select-year');
		form.appendChild(select);
		h1.appendChild(span);
		h1.appendChild(form);
		baseElm.appendChild(h1);

		var mainDiv,nav,ul,h2,h3,p,leagueDiv,cupDiv,table,cupTable,thead,tbody,tr,th,img;
		mainDiv = document.createElement("div");
		mainDiv.classList.add("content-wrapper");
		nav = document.createElement("nav");
		nav.classList.add("nav-tab-wrapper");
		nav.classList.add("nav-standings");
		ul = document.createElement("ul");
		nav.appendChild(ul);
		mainDiv.appendChild(nav);
		h2 = document.createElement("h2");
		h2.classList.add("ttl-h2");
		mainDiv.appendChild(h2);
		p = document.createElement("p");
		p.classList.add("txt-note-gray");
		mainDiv.appendChild(p);

		var thClass = ["rank","club","winpoint","match","win","draw","lose","score","goal","goalscore","immediate"];
		var thText = ["順位","クラブ名","勝点","試合数","勝","分","負","得点","失点","得失点","直近5試合"];
		leagueDiv = document.createElement("div");
		leagueDiv.id = "league";
		table = document.createElement("table");
		table.classList.add("tbl-standings");
		thead = document.createElement("thead");
		tr = document.createElement("tr");
		th = document.createElement("th");
		tr.appendChild(th);
		for (var i = 0; i < thClass.length; i++) {
			th = document.createElement("th");
			th.classList.add("tbl-clm-"+thClass[i]);
			th.classList.add("tbl-standings-clm");
			if(i==0){ th.classList.add("selected"); }
			div = document.createElement("div");
			if(i!=1 && i!=3 && i!=10 ){ div.classList.add("arrow-down"); }
			div.innerText = thText[i];
			th.appendChild(div);
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		tbody = document.createElement("tbody");
		table.appendChild(tbody);
		leagueDiv.appendChild(table);
		mainDiv.appendChild(leagueDiv);

		cupDiv = document.createElement("div");
		cupDiv.id = "cup";
		h3 = document.createElement("h3");
		h3.classList.add("ttl-h3");
		cupDiv.appendChild(h3);
		cupTable = table.cloneNode(true);
		th = cupTable.querySelector(".tbl-clm-immediate");
		th.parentNode.removeChild(th);
		cupDiv.appendChild(cupTable);
		mainDiv.appendChild(cupDiv);

		div = document.createElement("div");
		div.id = "notice-j1league";
		div2 = document.createElement("div");
		div2.classList.add("txt-table-description");
		p = document.createElement("p");
		p.classList.add("txt-standings-left");
		p.classList.add("txt-standings-left-red");
		p.innerText = "Ｊ２降格枠";
		div2.appendChild(p);
		p = document.createElement("p");
		p.classList.add("txt-note-red");
		p.classList.add("standings-notice");
		p.innerText = "※試合中の順位表は公式記録が発表されるまでの暫定記録となります。";
		div2.appendChild(p);
		div.appendChild(div2);
		mainDiv.appendChild(div);

		div = document.createElement("div");
		div.id = "notice-j2league";
		div2 = document.createElement("div");
		div2.classList.add("txt-table-description");
		p = document.createElement("p");
		p.classList.add("txt-standings-left");
		p.classList.add("txt-standings-left-yellow");
		p.innerText = "Ｊ１自動昇格枠";
		div2.appendChild(p);
		p = document.createElement("p");
		p.classList.add("txt-standings-left");
		p.classList.add("txt-standings-left-blue");
		p.innerText = "プレーオフ出場圏";
		div2.appendChild(p);
		p = document.createElement("p");
		p.classList.add("txt-standings-left");
		p.classList.add("txt-standings-left-red");
		p.innerText = "Ｊ３自動降格枠";
		div2.appendChild(p);
		p = document.createElement("p");
		p.classList.add("txt-note-red");
		p.innerHTML = "※試合中の順位表は公式記録が発表されるまでの暫定記録となります。<br />※直近５試合の成績は試合開催日の全試合終了後に更新となります。";
		div.appendChild(div2);
		div.appendChild(p);
		mainDiv.appendChild(div);

		div = document.createElement("div");
		div.classList.add("banner");
		a = document.createElement("a");
		a.setAttribute('href', 'https://sportsbull.jp/jleague/match/?utm_source=stats_widget&utm_medium=web&utm_campaign=jleague_widget');
		a.setAttribute('target', '_blank');
		img = document.createElement("img");
		img.setAttribute('src', 'https://sportsbull.jp/jleague/images/common/bnr-widget-jleague01.jpg');
		img.setAttribute('alt', 'SPORTS BULL');
		img.setAttribute('width', '100%');
		a.appendChild(img);
		div.appendChild(a);
		mainDiv.appendChild(div);

		baseElm.appendChild(mainDiv);

		// iframeにウィジェットの内容
		iframe.contentWindow.document.writeln("<body></body>");
		iframeDoc = iframe.contentWindow.document.querySelector("body");
		iframeDoc.appendChild(baseElm);
		var d = iframe.contentWindow.document;

		var css = function(){/*
		@charset "UTF-8";body{background-color:#fff;color:#333;font-family:ヒラギノ角ゴ ProN W3,Hiragino Kaku Gothic ProN,メイリオ,Meiryo,ＭＳ\ Ｐゴシック,Arial,verdana,sans-serif;font-size:14px}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}body,h1,h2,h3,h4,h5,h6,p,th,ul{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}.f12{font-size:86%!important}.ttl-h1-wrapper{background:#cc141d;color:#fff;padding:9pt 15px;margin-bottom:10px;font-weight:700}.ttl-h1-wrapper .ttl-h1-select{float:right}.ttl-h1-wrapper .ttl-h1-select select{background:#cc141d;border:solid 1px #fff;font-size:.9rem;width:88px;border-radius:6px}.ttl-h1-wrapper .ttl-h1-txt{font-size:1.1rem}.ttl-h2{color:#0e357f;border-bottom:solid 3px #0e357f;margin-bottom:10px}.ttl-h2,.ttl-h3{font-weight:700;font-size:1rem}.ttl-h3{border-left:solid 4px #cc141d;padding:4px 0 4px 6px;margin-bottom:15px}.nav-tab-wrapper{margin:40px 0 20px}.nav-tab-wrapper ul{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.nav-tab-wrapper .nav-tab{border-top:solid 2px #0e357f;border-bottom:solid 2px #0e357f;border-right:solid 1px #efefef;text-align:center;cursor:pointer;font-weight:700;color:#0e357f;line-height:40px;z-index:1;position:relative;background-color:#fff;overflow:hidden;-webkit-box-flex:1;-ms-flex:1;flex:1}.nav-tab-wrapper .nav-tab,.nav-tab-wrapper .nav-tab:after{display:block;-webkit-transition:all .2s ease;transition:all .2s ease}.nav-tab-wrapper .nav-tab:after{-webkit-transform:scale(0.5);transform:scale(0.5);height:100%;top:0;left:0;width:100%;position:absolute;z-index:-1;content:""}@media only screen and (min-width:769px){.nav-tab-wrapper .nav-tab:hover{text-decoration:none}.nav-tab-wrapper .nav-tab:hover:after{background:#ebf0fa;-webkit-transform:scale(1);transform:scale(1)}.head-sec .head-sec-inner{position:relative;width:68pc;height:50px;margin:0 auto}.head-sec .head-sec-inner h1{position:absolute;top:1pc;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.head-sec .head-sec-inner:after,.head-sec .head-sec-inner:before{content:"";display:table;clear:both}.head-sec .head-sec-inner h1 a{background-image:url(https://sportsbull.jp/assets/images/sprite/sprite-header.png);background-position:0 0;background-repeat:no-repeat;display:block;width:190px;height:20px;overflow:hidden;font-size:0;text-indent:100%;white-space:nowrap;outline:0}.tbl-standings thead .tbl-clm-immediate,.tbl-standings thead th:first-child{display:table-cell}.tbl-standings .tbl-standings-clm{font-size:9pt}.tbl-standings .tbl-standings-clm div{background-position:center 26px}.tbl-standings tbody td.tbl-detail-immediate,.tbl-standings tbody td.tbl-detail-rank{display:table-cell}.txt-table-description{overflow:hidden}.txt-standings-left{float:left;display:-webkit-box;display:-ms-flexbox;display:flex;margin-right:10px}.standings-notice{float:right}}@media only screen and (max-width:768px){*{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;-moz-font-feature-settings:"liga","kern"}.head-sec .head-sec-inner{position:relative;height:50px}.head-sec .head-sec-inner:after,.head-sec .head-sec-inner:before{content:"";display:table;clear:both}.head-sec .head-sec-inner h1{position:absolute;top:18px;left:50%;margin-left:-66px}.head-sec .head-sec-inner h1 a{background-image:url(https://sportsbull.jp/assets/sp/images/sprite/sp-sprite-header.png);background-repeat:no-repeat;overflow:hidden;font-size:0;text-indent:100%;white-space:nowrap;outline:0;background-position:0 0;display:block;width:99pt;height:14px}}.nav-tab-wrapper .nav-tab:first-child{border-left:solid 2px #0e357f;border-top-left-radius:4px;border-bottom-left-radius:4px}.nav-tab-wrapper .nav-tab:last-child{border-right:solid 2px #0e357f;border-top-right-radius:4px;border-bottom-right-radius:4px}.nav-tab-wrapper.active-0 .nav-tab:nth-child(1),.nav-tab-wrapper.active-1 .nav-tab:nth-child(2),.nav-tab-wrapper.active-2 .nav-tab:nth-child(3),.nav-tab-wrapper.active-3 .nav-tab:nth-child(4),.nav-tab-wrapper.active-4 .nav-tab:nth-child(5){background:#0e357f;color:#fff}.nav-tab-wrapper.active-0 .nav-tab:nth-child(1):after,.nav-tab-wrapper.active-1 .nav-tab:nth-child(2):after,.nav-tab-wrapper.active-2 .nav-tab:nth-child(3):after,.nav-tab-wrapper.active-3 .nav-tab:nth-child(4):after,.nav-tab-wrapper.active-4 .nav-tab:nth-child(5):after{content:none}#cup{display:none}.team-86{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kawasakif.png)}.team-120{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kashima.png)}.team-122{background-image:url(https://sportsbull.jp/jleague/images/common/emb-urawa.png)}.team-124{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yokohamafm.png)}.team-126{background-image:url(https://sportsbull.jp/jleague/images/common/emb-shimizu.png)}.team-128{background-image:url(https://sportsbull.jp/jleague/images/common/emb-gosaka.png)}.team-129{background-image:url(https://sportsbull.jp/jleague/images/common/emb-hiroshima.png)}.team-131{background-image:url(https://sportsbull.jp/jleague/images/common/emb-iwata.png)}.team-132{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kashiwa.png)}.team-133{background-image:url(https://sportsbull.jp/jleague/images/common/emb-cosaka.png)}.team-136{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kobe.png)}.team-150{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kofu.png)}.team-193{background-image:url(https://sportsbull.jp/jleague/images/common/emb-nigata.png)}.team-199{background-image:url(https://sportsbull.jp/jleague/images/common/emb-omiya.png)}.team-238{background-image:url(https://sportsbull.jp/jleague/images/common/emb-sendai.png)}.team-269{background-image:url(https://sportsbull.jp/jleague/images/common/emb-tosu.png)}.team-270{background-image:url(https://sportsbull.jp/jleague/images/common/emb-fctokyo.png)}.team-276{background-image:url(https://sportsbull.jp/jleague/images/common/emb-sapporo.png)}.team-121{background-image:url(https://sportsbull.jp/jleague/images/common/emb-chiba.png)}.team-123{background-image:url(https://sportsbull.jp/jleague/images/common/emb-tokyov.png)}.team-127{background-image:url(https://sportsbull.jp/jleague/images/common/emb-nagoya.png)}.team-130{background-image:url(https://sportsbull.jp/jleague/images/common/emb-shonan.png)}.team-134{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kyoto.png)}.team-135{background-image:url(https://sportsbull.jp/jleague/images/common/emb-fukuoka.png)}.team-176{background-image:url(https://sportsbull.jp/jleague/images/common/emb-mito.png)}.team-207{background-image:url(https://sportsbull.jp/jleague/images/common/emb-oita.png)}.team-294{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yamagata.png)}.team-296{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yokohamafc.png)}.team-30103{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kusatsu.png)}.team-30116{background-image:url(https://sportsbull.jp/jleague/images/common/emb-tokushima.png)}.team-30148{background-image:url(https://sportsbull.jp/jleague/images/common/emb-ehime.png)}.team-30302{background-image:url(https://sportsbull.jp/jleague/images/common/emb-gifu.png)}.team-30303{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kumamoto.png)}.team-30314{background-image:url(https://sportsbull.jp/jleague/images/common/emb-okayama.png)}.team-30526{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kanazawa.png)}.team-30528{background-image:url(https://sportsbull.jp/jleague/images/common/emb-matsumoto.png)}.team-30531{background-image:url(https://sportsbull.jp/jleague/images/common/emb-nagasaki.png)}.team-30532{background-image:url(https://sportsbull.jp/jleague/images/common/emb-machida.png)}.team-30536{background-image:url(https://sportsbull.jp/jleague/images/common/emb-sanuki.png)}.team-30851{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yamaguchi.png)}.team-30369{background-image:url(https://sportsbull.jp/jleague/images/common/emb-commingsoon.png)}.txt-note-gray{color:#666;text-align:right;margin-bottom:50px;font-size:.75rem}.txt-note-red{color:#cc141d}.tbl-standings{width:100%;margin-bottom:25px}.tbl-standings tr{border-bottom:1px solid rgba(14,53,127,.1)}.tbl-standings tr.standings-bg-red{background-color:rgba(204,20,29,.1)}.tbl-standings tr.standings-bg-yellow{background-color:rgba(204,174,20,.15)}.tbl-standings tr.standings-bg-blue{background-color:rgba(20,112,204,.1)}.tbl-standings thead tr{border-bottom:solid 1px #0e357f}.tbl-standings thead .tbl-clm-immediate,.tbl-standings thead th:first-child{display:none}.tbl-standings .tbl-standings-clm{text-align:center;color:#0e357f;cursor:pointer;font-size:10px;font-weight:700}.tbl-standings .tbl-standings-clm div{background-size:10px;background-repeat:no-repeat;background-position:center 24px;padding-bottom:18px}.tbl-standings .tbl-standings-clm div.arrow-down{background-image:url(https://sportsbull.jp/jleague/images/common/ico-triangle-grey.png)}.tbl-standings .tbl-standings-clm.selected .arrow-up{background-image:url(https://sportsbull.jp/jleague/images/common/ico-triangle-white-up.png)}.tbl-standings .tbl-standings-clm.selected{background:#666;color:#fff}.tbl-standings .tbl-standings-clm.selected .arrow-down{background-image:url(https://sportsbull.jp/jleague/images/common/ico-triangle-white.png)}.tbl-standings .tbl-standings-clm div.arrow-up{background-image:url(https://sportsbull.jp/jleague/images/common/ico-triangle-grey-up.png)}.tbl-standings tbody td{text-align:center;font-size:.75rem;padding:10px 0}.tbl-standings tbody td:nth-of-type(2){font-weight:700;color:#cc141d}.tbl-standings tbody td.tbl-detail-rank span{width:9pt;height:8px;background-repeat:no-repeat;display:block;margin:0 auto}.tbl-standings tbody td.tbl-detail-rank span.img-rank-up{background-image:url(https://sportsbull.jp/jleague/images/standings/ico-rank-up.png)}.tbl-standings tbody td.tbl-detail-rank span.img-rank-nochange{background-image:url(https://sportsbull.jp/jleague/images/standings/ico-rank-keep.png)}.tbl-standings tbody td.tbl-detail-rank span.img-rank-down{background-image:url(https://sportsbull.jp/jleague/images/standings/ico-rank-down.png)}.tbl-standings tbody td.tbl-detail-immediate,.tbl-standings tbody td.tbl-detail-rank{display:none}.tbl-standings tbody td.tbl-detail-immediate span{width:13px;height:9pt;background-repeat:no-repeat;display:inline-block;background-position:left}.tbl-standings tbody td.tbl-detail-immediate span.img-match-W{background-image:url(https://sportsbull.jp/jleague/images/standings/ico-rank-win.png)}.tbl-standings tbody td.tbl-detail-immediate span.img-match-D{background-image:url(https://sportsbull.jp/jleague/images/standings/ico-rank-draw.png)}.tbl-standings tbody td.tbl-detail-immediate span.img-match-L{background-image:url(https://sportsbull.jp/jleague/images/standings/ico-rank-lose.png)}.tbl-standings tbody td.tbl-detail-club{text-align:left;font-weight:700}.tbl-standings tbody td.tbl-detail-club .img-emblem{width:37px;height:37px;display:inline-block;background-size:100%;vertical-align:middle;margin-right:2px}.txt-standings-left{font-size:9pt}.txt-standings-left:before{content:"";width:20px;height:20px;display:inline-block;margin-right:2px;position:relative}.txt-standings-left.txt-standings-left-red:before{background-color:rgba(204,20,29,.1)}.txt-standings-left.txt-standings-left-yellow:before{background-color:rgba(204,174,20,.15)}.txt-standings-left.txt-standings-left-blue:before{background-color:rgba(20,112,204,.1)}.banner a{width:375px;max-width:100%;display:block;margin:20px auto 0;transition:all .3s ease}a:hover{opacity:.6}@-webkit-keyframes anime-btn{0,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}60%{-webkit-transform:translateY(-3px);transform:translateY(-3px)}}@keyframes anime-btn{0,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}60%{-webkit-transform:translateY(-3px);transform:translateY(-3px)}}
		*/}.toString().match(/\n([\s\S]*)\n/)[1];

		var style = document.createElement("style");
		style.innerHTML = css;
		d.head.appendChild(style);

		setting();
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
				// setting();
				if (baseCreateFlg) {
					baseCreate();
				}else{
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
		var league = leagueId == "2" ? "j1":leagueId == "4" ? "cup":"j2",insertElm = league == "cup" ? iframeDoc.querySelector('#cup .tbl-standings tbody') : iframeDoc.querySelector('#league .tbl-standings tbody'),title,time,row,insertElm,update,wday,e,group;
		title = iframeDoc.getElementsByClassName("ttl-h2");
		title[0].innerHTML = data.league;
		time = iframeDoc.getElementsByClassName("txt-note-gray");
		wday = getDate(data.lastupdated);
		update = data.lastupdated.replace( "-" , "年" ).replace( "-" , "月" ).replace( " " , "日"+wday ) ;
		time[0].innerHTML = '更新日：'+update;
		if (league == "cup") {
			e = iframeDoc.querySelector('#league');
			e.style.display="none";
			e = iframeDoc.querySelector('#cup');
			e.style.display="block";
			insertElm.innerHTML = '';
			var clone = e.children,clone1 = clone[0].cloneNode(true),clone2 = clone[1].cloneNode(true);
			if (clone[2]) {
				clone[3].parentNode.removeChild(clone[3]);
				clone[2].parentNode.removeChild(clone[2]);
			}
			group = data.standing[0].group;
			clone[0].innerHTML = group;
			iframeDoc.querySelector('#notice-j1league').style.display="none";
			iframeDoc.querySelector('#notice-j2league').style.display="none";
		}else{
			e = iframeDoc.querySelector('#league');
			e.style.display="block";
			e = iframeDoc.querySelector('#cup');
			e.style.display="none";
			insertElm.innerHTML = '';
			if (league == "j1") {
				iframeDoc.querySelector('#notice-j1league').style.display="block";
				iframeDoc.querySelector('#notice-j2league').style.display="none";
			}else{
				iframeDoc.querySelector('#notice-j1league').style.display="none";
				iframeDoc.querySelector('#notice-j2league').style.display="block";
			}
			
		}

		for(var key = 0; key <  data.standing.length; key++) {
			if (league == "cup" && data.standing[key].group != group ) {
				insertElm = clone2.querySelector("tbody");
				group = data.standing[key].group;
			}
			row = createStandingsRow(data.standing[key]);
			insertElm.appendChild(row);
		}
		if (league == "j1") {
			var tr = insertElm.querySelectorAll("tr");
			for(var i = 1; i < 4; i++) {
				tr[key - i].classList.add('standings-bg-red');
			}
		}else if (league == "cup") {
			clone1.innerHTML = group;
			e = iframeDoc.querySelector('#cup');
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
			for(var i = 1; i < 3; i++) {
				tr[key-i].classList.add('standings-bg-red');
			}
		}
		sort();
		iframeHeight();
	}

	var createStandingsRow = function(data){
		var elm = document.createElement("tr"),e,e2,teamId,replace = ["nochange","up","down"],group;
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
			e2 = document.createElement("span");
			e2.classList.add('img-emblem');//IE
			e2.classList.add('team-'+data.team.id);
			e.appendChild(e2);
			e2 = document.createElement("span");
			e2.classList.add('tbl-standings-team');
			e2.innerHTML = data.team.name;
			e.appendChild(e2);
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

	var iframeHeight = function(){
		var height = iframeDoc.querySelector('.widget').clientHeight;
		document.querySelector('#jleague-widget-iframe-standings').style.height = (height+60)+'px';
	}
	var iframeStandingsResize = function(){
		var resizeTimer;
		window.addEventListener('resize', function (event) {
			if (resizeTimer !== false) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(function () {
				var height = iframeDoc.querySelector('.widget').clientHeight;
				document.querySelector('#jleague-widget-iframe-standings').style.height = (height+60)+'px';
			}, 500);
		});
	}();

	var yearChange = function(){
		var elm = iframeDoc.querySelector('.select-year'),elm2;
		for (var i = 0; i < master.year.length; i++) {
			elm2 = document.createElement('option');
			elm2.setAttribute('value', master.year[i].id);
			elm2.innerText = master.year[i].label;
			elm.appendChild(elm2);
		}
		elm = iframeDoc.querySelector('select');
		elm.addEventListener('change', yearChangeEvent);
	}
	var yearChangeEvent = function() {
		// year = iframeDoc.year.elements["select-year"].value;
		var elm = iframeDoc.querySelector('.ttl-h1-select')
		year = elm.elements["select-year"].value;
		baseCreateFlg = false;
		getMaster();
	}
	var leagueChange = function(){
		var elm = iframeDoc.querySelector('.nav-standings ul'),elm2;
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
		var elm = iframeDoc.getElementsByClassName("nav-tab");
		for( var i=0,l=elm.length; l>i; i++ ) {
			if( this == elm[i] ) {
				elm[i].parentNode.parentNode.className = "nav-tab-wrapper nav-standings active-"+i ;
				break ;
			}
		}
		getData(league[i],year);
	}
	var sort = function(){
		var elm = iframeDoc.querySelectorAll('table thead');
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