(function() {
	
	if ( location.hostname.match(/dev./)) {
		jsondevurl = "dev-";
	} else {
		jsondevurl = "";
	}
	
	var iframeDoc;
	var year;
	var master,league = [],occasionArray=[],leagueId = 2,month,teamId,teamGroup = [];//occasion;
	Array.prototype.getLastVal = function (){ return this[this.length -1];}
	var setting = function(){
		getData(leagueId,year,"13");//(leagueId,year,month,team,occasion)
		leagueChange();
	}

	var baseCreate = function (){
		// 目印のaタグからパラメータとってきたら消す
		var target = document.querySelector("#sportbull-jleague-match-widget");

		var iframe = document.createElement('iframe');
		iframe.scrolling = 'no';
		iframe.frameBorder = 0;
		iframe.marginWidth = 0;
		iframe.marginHeight = 0;
		iframe.width = '100%';
		iframe.height = '100%';
		iframe.id = 'jleague-widget-iframe-match';

		target.appendChild(iframe);

		var baseElm = document.createElement("div");
		baseElm.classList.add("widget");
		var header,h1,a,span,form,select,div;
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
		span.innerText = "Jリーグ速報";

		h1.appendChild(span);
		baseElm.appendChild(h1);

		var mainDiv,nav,ul,img;
		mainDiv = document.createElement("div");
		mainDiv.classList.add("content-wrapper");
		nav = document.createElement("nav");
		nav.classList.add("nav-tab-wrapper");
		nav.classList.add("nav-match");
		ul = document.createElement("ul");
		nav.appendChild(ul);
		mainDiv.appendChild(nav);
		
		div = document.createElement("div");
		div.classList.add("ttl-h2");
		div.classList.add("mt20");
		div.classList.add("first-view");
		div.innerText = "直近の試合";
		mainDiv.appendChild(div);

		div = document.createElement("div");
		div.id = "matches";
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
		//css仮
		// var link = d.createElement('link');
		// link.href = 'cleaned_standings.css';
		// link.rel = 'stylesheet';
		// link.type = 'text/css';
		// var h = d.querySelector('head');
		// h.appendChild(link);
		// var link = d.createElement('link');
		// link.href = '/assets/css/ui.css?var=20170324';
		// link.rel = 'stylesheet';
		// link.type = 'text/css';
		// var h = d.querySelector('head');
		// h.appendChild(link);
		// link = d.createElement('link');
		// link.href = '/jleague/css/jleague.css?var=20170324';
		// link.rel = 'stylesheet';
		// link.type = 'text/css';
		// h.appendChild(link);
		//css仮

		var css = function(){/*
		@charset "UTF-8";body{background-color:#fff;color:#333;font-family:ヒラギノ角ゴ ProN W3,Hiragino Kaku Gothic ProN,メイリオ,Meiryo,ＭＳ\ Ｐゴシック,Arial,verdana,sans-serif;font-size:14px}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}body,h1,h2,h3,h4,h5,h6,p,th,ul{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}.f12{font-size:86%!important}.nav-tab-wrapper .nav-tab:after{-webkit-transform:scale(0.5);transform:scale(0.5);height:100%;top:0;left:0;width:100%;position:absolute;z-index:-1;display:block;content:"";-webkit-transition:all .2s ease;transition:all .2s ease}a:active,a:hover,a:link,a:visited{color:#0e357f;text-decoration:none}@media only screen and (min-width:769px){.nav-tab-wrapper .nav-tab:hover{text-decoration:none}.nav-tab-wrapper .nav-tab:hover:after{background:#ebf0fa;-webkit-transform:scale(1);transform:scale(1)}.head-sec .head-sec-inner{position:relative;width:68pc;height:50px;margin:0 auto}.head-sec .head-sec-inner h1{position:absolute;top:1pc;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.head-sec .head-sec-inner:after,.head-sec .head-sec-inner:before{content:"";display:table;clear:both}.head-sec .head-sec-inner h1 a{background-image:url(https://sportsbull.jp/assets/images/sprite/sprite-header.png);background-position:0 0;background-repeat:no-repeat;display:block;width:190px;height:20px;overflow:hidden;font-size:0;text-indent:100%;white-space:nowrap;outline:0}.tbl-standings thead .tbl-clm-immediate,.tbl-standings thead th:first-child{display:table-cell}.tbl-standings .tbl-standings-clm{font-size:9pt}.tbl-standings .tbl-standings-clm div{background-position:center 26px}.tbl-standings tbody td.tbl-detail-immediate,.tbl-standings tbody td.tbl-detail-rank{display:table-cell}.txt-table-description{overflow:hidden}.txt-standings-left{float:left;display:-webkit-box;display:-ms-flexbox;display:flex;margin-right:10px}.standings-notice{float:right}}@media only screen and (max-width:768px){*{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;-moz-font-feature-settings:"liga","kern"}.head-sec .head-sec-inner{position:relative;height:50px}.head-sec .head-sec-inner:after,.head-sec .head-sec-inner:before{content:"";display:table;clear:both}.head-sec .head-sec-inner h1{position:absolute;top:18px;left:50%;margin-left:-66px}.head-sec .head-sec-inner h1 a{background-image:url(https://sportsbull.jp/assets/sp/images/sprite/sp-sprite-header.png);background-repeat:no-repeat;overflow:hidden;font-size:0;text-indent:100%;white-space:nowrap;outline:0;background-position:0 0;display:block;width:99pt;height:14px}}.team-86{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kawasakif.png)}.team-120{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kashima.png)}.team-122{background-image:url(https://sportsbull.jp/jleague/images/common/emb-urawa.png)}.team-124{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yokohamafm.png)}.team-126{background-image:url(https://sportsbull.jp/jleague/images/common/emb-shimizu.png)}.team-128{background-image:url(https://sportsbull.jp/jleague/images/common/emb-gosaka.png)}.team-129{background-image:url(https://sportsbull.jp/jleague/images/common/emb-hiroshima.png)}.team-131{background-image:url(https://sportsbull.jp/jleague/images/common/emb-iwata.png)}.team-132{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kashiwa.png)}.team-133{background-image:url(https://sportsbull.jp/jleague/images/common/emb-cosaka.png)}.team-136{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kobe.png)}.team-150{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kofu.png)}.team-193{background-image:url(https://sportsbull.jp/jleague/images/common/emb-nigata.png)}.team-199{background-image:url(https://sportsbull.jp/jleague/images/common/emb-omiya.png)}.team-238{background-image:url(https://sportsbull.jp/jleague/images/common/emb-sendai.png)}.team-269{background-image:url(https://sportsbull.jp/jleague/images/common/emb-tosu.png)}.team-270{background-image:url(https://sportsbull.jp/jleague/images/common/emb-fctokyo.png)}.team-276{background-image:url(https://sportsbull.jp/jleague/images/common/emb-sapporo.png)}.team-121{background-image:url(https://sportsbull.jp/jleague/images/common/emb-chiba.png)}.team-123{background-image:url(https://sportsbull.jp/jleague/images/common/emb-tokyov.png)}.team-127{background-image:url(https://sportsbull.jp/jleague/images/common/emb-nagoya.png)}.team-130{background-image:url(https://sportsbull.jp/jleague/images/common/emb-shonan.png)}.team-134{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kyoto.png)}.team-135{background-image:url(https://sportsbull.jp/jleague/images/common/emb-fukuoka.png)}.team-176{background-image:url(https://sportsbull.jp/jleague/images/common/emb-mito.png)}.team-207{background-image:url(https://sportsbull.jp/jleague/images/common/emb-oita.png)}.team-294{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yamagata.png)}.team-296{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yokohamafc.png)}.team-30103{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kusatsu.png)}.team-30116{background-image:url(https://sportsbull.jp/jleague/images/common/emb-tokushima.png)}.team-30148{background-image:url(https://sportsbull.jp/jleague/images/common/emb-ehime.png)}.team-30302{background-image:url(https://sportsbull.jp/jleague/images/common/emb-gifu.png)}.team-30303{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kumamoto.png)}.team-30314{background-image:url(https://sportsbull.jp/jleague/images/common/emb-okayama.png)}.team-30526{background-image:url(https://sportsbull.jp/jleague/images/common/emb-kanazawa.png)}.team-30528{background-image:url(https://sportsbull.jp/jleague/images/common/emb-matsumoto.png)}.team-30531{background-image:url(https://sportsbull.jp/jleague/images/common/emb-nagasaki.png)}.team-30532{background-image:url(https://sportsbull.jp/jleague/images/common/emb-machida.png)}.team-30536{background-image:url(https://sportsbull.jp/jleague/images/common/emb-sanuki.png)}.team-30851{background-image:url(https://sportsbull.jp/jleague/images/common/emb-yamaguchi.png)}.team-30369{background-image:url(https://sportsbull.jp/jleague/images/common/emb-commingsoon.png)}.txt-standings-left{font-size:9pt}.banner a{width:375px;max-width:100%;display:block;margin:20px auto 0;transition:all .3s ease}.banner a:hover{opacity:.6}select{-webkit-transition:all .3s ease;transition:all .3s ease}select:disabled{color:#ccc;background-color:#eee}.body-sec{background-color:#f5f5f5}.body-sec .body-sec-inner{background:transparent}@media only screen and (min-width:769px){.main-sec{padding-top:60px}}.ttl-h1-wrapper{background:#cc141d;color:#fff;padding:9pt 15px;margin-bottom:10px;font-weight:700}.ttl-h1-wrapper .ttl-h1-select{float:right}.ttl-h1-wrapper .ttl-h1-select select{background:#cc141d;border:solid 1px #fff;font-size:.9rem;width:88px;border-radius:6px}.ttl-h1-wrapper .ttl-h1-txt{font-size:1.1rem}.ttl-h2{color:#0e357f;border-bottom:solid 3px #0e357f;margin-bottom:10px}.ttl-h2,.ttl-h3{font-weight:700;font-size:1rem}.ttl-h3{border-left:solid 4px #cc141d;padding:4px 0 4px 6px;margin-bottom:15px}.ttl-h4{color:#333;border-bottom:solid 1px #0e357f;text-align:center;font-size:1rem;margin-bottom:20px}.content-wrapper{padding:0 10px 5pc}@media only screen and (min-width:769px){.content-wrapper{padding:0 0 5pc}}.nav-tab-wrapper{margin:40px 0 20px}.nav-tab-wrapper ul{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.nav-tab-wrapper .nav-tab{border-top:solid 2px #0e357f;border-bottom:solid 2px #0e357f;border-right:solid 1px #efefef;text-align:center;cursor:pointer;font-weight:700;color:#0e357f;line-height:40px;z-index:1;position:relative;background-color:#fff;overflow:hidden;-webkit-box-flex:1;-ms-flex:1;flex:1}.nav-tab-wrapper .nav-tab,.nav-tab-wrapper .nav-tab:after{display:block;-webkit-transition:all .2s ease;transition:all .2s ease}.nav-tab-wrapper .nav-tab:after{-webkit-transform:scale(0.5);transform:scale(0.5);height:100%;top:0;left:0;width:100%;position:absolute;z-index:-1;content:''}@media only screen and (min-width:769px){.nav-tab-wrapper .nav-tab:hover{text-decoration:none}.nav-tab-wrapper .nav-tab:hover:after{background:#ebf0fa;-webkit-transform:scale(1);transform:scale(1)}}.nav-tab-wrapper .nav-tab:first-child{border-left:solid 2px #0e357f;border-top-left-radius:4px;border-bottom-left-radius:4px}.nav-tab-wrapper .nav-tab:last-child{border-right:solid 2px #0e357f;border-top-right-radius:4px;border-bottom-right-radius:4px}.nav-tab-wrapper.active-0 .nav-tab:nth-child(1),.nav-tab-wrapper.active-1 .nav-tab:nth-child(2),.nav-tab-wrapper.active-2 .nav-tab:nth-child(3),.nav-tab-wrapper.active-3 .nav-tab:nth-child(4),.nav-tab-wrapper.active-4 .nav-tab:nth-child(5){background:#0e357f;color:#fff}.nav-tab-wrapper.active-0 .nav-tab:nth-child(1):after,.nav-tab-wrapper.active-1 .nav-tab:nth-child(2):after,.nav-tab-wrapper.active-2 .nav-tab:nth-child(3):after,.nav-tab-wrapper.active-3 .nav-tab:nth-child(4):after,.nav-tab-wrapper.active-4 .nav-tab:nth-child(5):after{content:none}.sp-bnr{margin-top:20px;text-align:center}@media only screen and (min-width:769px){.sp-bnr{width:620px;margin:20px auto 0;overflow:hidden}}.sp-bnr div.sp-bnr-first{width:100%}@media only screen and (min-width:769px){.sp-bnr div.sp-bnr-first{width:300px;height:250px;margin-right:20px;float:left}}.sp-bnr div.sp-bnr-second{display:none}@media only screen and (min-width:769px){.sp-bnr div.sp-bnr-second{width:300px;height:250px;display:block;float:left}}#cup{display:none}.jleague-link{display:-webkit-box;display:-ms-flexbox;display:flex}.jleague-link a{color:#cc141d;text-decoration:none;font-weight:700;-webkit-transition:all .3s ease;transition:all .3s ease;margin-right:20px}.jleague-link a:hover{opacity:.6}.jleague-link a li{list-style:none;padding:0 2.2rem 0 .5rem;border:1px solid #cc141d;font-size:14px;line-height:2.5rem;vertical-align:middle;display:table;position:relative;background-color:#fff}@media only screen and (max-width:768px){.jleague-link a li{font-size:9pt;padding:0 2rem 0 .5rem;line-height:2rem}}.jleague-link a li:after{position:absolute;right:0;content:'';width:1.7rem;height:2.5rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;background:#cc141d url(https://sportsbull.jp/jleague/images/common/ico-arrow-right-white.png)no-repeat center center;background-size:6px}@media only screen and (max-width:768px){.jleague-link a li:after{width:1.5rem;height:2rem}}.jleague-link a:last-child{margin-right:0}.txt-note-gray{color:#666;text-align:right;margin-bottom:50px;font-size:.75rem}.txt-note-red{color:#cc141d}.tbl-standings{width:100%;margin-bottom:25px}.tbl-standings tr{border-bottom:1px solid rgba(14,53,127,.1)}.tbl-standings tr.standings-bg-red{background-color:rgba(204,20,29,.1)}.tbl-standings tr.standings-bg-yellow{background-color:rgba(204,174,20,.15)}.tbl-standings tr.standings-bg-blue{background-color:rgba(20,112,204,.1)}.tbl-standings thead tr{border-bottom:solid 1px #0e357f}.tbl-standings thead th:first-child{display:none}@media only screen and (min-width:769px){.tbl-standings thead th:first-child{display:table-cell}}.tbl-standings thead .tbl-clm-immediate{display:none}@media only screen and (min-width:769px){.tbl-standings thead .tbl-clm-immediate{display:table-cell}}.tbl-standings .tbl-standings-clm{text-align:center;color:#0e357f;cursor:pointer;font-size:10px;font-weight:700}@media only screen and (min-width:769px){.tbl-standings .tbl-standings-clm{font-size:9pt}}.tbl-standings .tbl-standings-clm div{background-size:10px;background-repeat:no-repeat;background-position:center 24px;padding-bottom:18px}@media only screen and (min-width:769px){.txt-table-description{overflow:hidden}}.ol-list-wrapper,.ul-list-wrapper{margin-left:1.5em}.ul-list-wrapper{list-style-type:disc}ul.paging{border-bottom:2px solid #0e357f;margin-bottom:20px;overflow:hidden}ul.paging li{-webkit-transition:all .3s ease;transition:all .3s ease;display:inline;color:#0e357f;cursor:pointer}ul.paging li:hover{opacity:.6;text-decoration:none}ul.paging li.prev{text-align:left;padding-left:9pt;background:url(https://sportsbull.jp/jleague/images/match/ico-arrow-left.png)no-repeat 0 5px;background-position:left center;background-size:6px;float:left}ul.paging li.next{text-align:right;padding-right:9pt;background:url(https://sportsbull.jp/jleague/images/match/ico-arrow-right.png)no-repeat right 5px;background-position:right center;background-size:6px;float:right}.refine-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.refine-wrapper .refine-column01{width:75%}@media only screen and (min-width:769px){.refine-wrapper .refine-column01{display:inherit;width:auto}}.refine-wrapper .refine-column01 .refine-column02{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding-bottom:5px}@media only screen and (min-width:769px){.refine-wrapper .refine-column01 .refine-column02{display:inherit;padding-bottom:0}}.refine-wrapper .refine-column01 .refine-column02 .select-section{width:50%}@media only screen and (min-width:769px){.refine-wrapper .refine-column01 .refine-column02 .select-section{width:220px;margin-right:10px}}.refine-wrapper .refine-column01 .refine-column02 .select-month{width:45%}@media only screen and (min-width:769px){.refine-wrapper .refine-column01 .refine-column02 .select-month{width:150px;margin-right:10px}}.refine-wrapper .refine-column01 .select-team{width:100%}@media only screen and (min-width:769px){.refine-wrapper .refine-column01 .select-team{width:15pc;margin-right:10px}}.refine-wrapper .refine-btn{border:0;width:20%;background:#0e357f;color:#fff;font-weight:700;background-size:20px;border-radius:5px;-webkit-transition:all .3s ease;transition:all .3s ease}.refine-wrapper .refine-btn:hover{opacity:.6}@media only screen and (min-width:769px){.refine-wrapper .refine-btn{width:90pt;height:30px}}.refine-wrapper .refine-btn.animation{-webkit-animation:a .8s both;animation:a .8s both}@-webkit-keyframes a{0,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}60%{-webkit-transform:translateY(-3px);transform:translateY(-3px)}}@keyframes a{0,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}60%{-webkit-transform:translateY(-3px);transform:translateY(-3px)}}#matches .ttl-h3{margin-bottom:10px;margin-top:40px}#matches .ttl-h3 .ttl-h3-league{font-size:14px}#matches .not-applicable{padding:30px 10px}.game-wrapper .game-match{margin-bottom:10px;border-bottom:1px solid rgba(14,53,127,.1);padding-bottom:10px}.game-wrapper .game-inner{display:table;width:100%}@media only screen and (min-width:769px){.game-wrapper .game-inner{display:block;width:65%}}.game-wrapper .game-inner .team-away,.game-wrapper .game-inner .team-home{width:10%;display:table-cell;text-align:center;font-size:9pt}.game-wrapper .game-inner .score-away,.game-wrapper .game-inner .score-home{color:#0e357f;display:table-cell;width:20%;text-align:center;vertical-align:middle;font-weight:700;font-size:2rem}.game-wrapper .game-inner span.img-emblem{width:50px;height:50px;display:block;background-size:100%;background-repeat:no-repeat}@media only screen and (min-width:769px){.game-wrapper .game-inner span.img-emblem{width:70px;height:70px}}.game-wrapper .game-inner .game-date{display:table-cell;vertical-align:middle;text-align:center;width:40%;color:#666;font-size:9pt}.game-wrapper .game-inner .game-date .game-data-time{font-size:.8rem}.game-wrapper .game-inner .game-date .game-status{font-size:.8rem;text-align:center;display:block;padding:5px 10px;margin-top:5px;white-space:nowrap;font-weight:700;width:5pc;margin:0 auto;color:#fff;background-color:#cc141d}.game-btn{border:2px solid rgba(14,53,127,.8);width:100%;padding:8px;display:block;border-radius:5px;text-align:center;font-weight:700;font-size:1rem;margin-top:10px;z-index:1;position:relative;background-color:#fff;-webkit-transition:all .2s ease;transition:all .2s ease;overflow:hidden}@media only screen and (min-width:769px){.game-btn{float:right;width:33%;margin-top:-65px}}.game-btn:after{-webkit-transform:scale(0.5);transform:scale(0.5);height:100%;top:0;left:0;width:100%;position:absolute;z-index:-1;display:block;content:'';-webkit-transition:all .2s ease;transition:all .2s ease}@media only screen and (min-width:769px){.game-btn:hover{text-decoration:none}.game-btn:hover:after{background:#ebf0fa;-webkit-transform:scale(1);transform:scale(1)}}.br:before{content:"\a";white-space:pre}@media only screen and (min-width:769px){.br:before{display:none}}.nav-tab.levain{font-size:9pt;line-height:20px}@media only screen and (min-width:769px){.nav-tab.levain{font-size:100%;line-height:40px}}
		*/}.toString().match(/\n([\s\S]*)\n/)[1];

		var style = document.createElement("style");
		style.innerHTML = css;
		d.head.appendChild(style);

		setting();
	};

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
		req.open('GET', "https://"+jsondevurl+"jlive.sportsbull.jp/json/v1/year.json");
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
					// setting();
					baseCreate();
				}
			}
		}
		req.open('GET', "https://"+jsondevurl+"jlive.sportsbull.jp/json/v1/"+year+"/jleague/master.json");
		req.send(null);
	};
	
	var getData = function(id,year,month,team,occasion){
		var url = "https://"+jsondevurl+"jlive.sportsbull.jp/api/v1/jleague/schedule.php?";
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
		}else{
			var elm = iframeDoc.querySelector("#matches"),elm2;
			elm.innerHTML = "";
			elm2 = document.createElement('p');
			elm2.classList.add("not-applicable");
			elm2.innerText = "該当する試合がございません。";
			elm.appendChild(elm2);
		}
		iframeHeight();
	}
	var scheduleCreate = function(data){
		var elm = iframeDoc.querySelector('#matches'),elm2,elm3,elm4,elm5,elm6,title,title2,oneDay,card,next,prev,group,round;
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
					elm5.innerText = card[c].hometeam.name;
					elm6 = document.createElement('span');
					elm6.classList.add("img-emblem");
					elm6.classList.add("team-"+card[c].hometeam.id);
					elm5.insertBefore(elm6, elm5.firstChild);
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
					elm5.innerText = card[c].awayteam.name;
					elm6 = document.createElement('span');
					elm6.classList.add("img-emblem");
					elm6.classList.add("team-"+card[c].awayteam.id);
					elm5.insertBefore(elm6, elm5.firstChild);
					elm4.appendChild(elm5);
					elm3.appendChild(elm4);
					//link
					if (card[c].startingmember == 1 || card[c].status.id == 2 || card[c].status.id == 3 ) {
						elm4 = document.createElement('a');
						elm4.classList.add("game-btn");
						elm4.setAttribute('href', "https://sportsbull.jp/jleague/sokuhou/?id="+card[c].gameid);
						elm4.setAttribute('target', "_blank");
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

	var iframeHeight = function(){
		var height = iframeDoc.querySelector('.widget').clientHeight;
		document.querySelector('#jleague-widget-iframe-match').style.height = (height+60)+'px';
	}
	var iframeMatchResize = function(){
		var resizeTimer;
		window.addEventListener('resize', function (event) {
			if (resizeTimer !== false) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(function () {
				var height = iframeDoc.querySelector('.widget').clientHeight;
				document.querySelector('#jleague-widget-iframe-match').style.height = (height+60)+'px';
			}, 500);
		});
	}();
	var leagueChange = function(){
		var elm = iframeDoc.querySelector('.nav-match ul'),elm2;
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
				elm[i].parentNode.parentNode.className = "nav-tab-wrapper nav-match active-"+i ;
				leagueId = league[i];
				getData(league[i],year,"13");
				break ;
			}
		}
		elm = iframeDoc.querySelector(".first-view");
		elm.classList.remove("hide");
	}
	
	var isset = function(data){
		if(data === "" || data === null || data === undefined){
			return false;
		}else{
			return true;
		}
	};

}());