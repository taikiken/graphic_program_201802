<?php
class getData {
	public static $scheduleUrl = "https://img.sportsbull.jp/static/americanfootball/2017/autumn/schedule.json";
	public static $standingUrl = "https://img.sportsbull.jp/static/americanfootball/2017/autumn/standing.json";
	public static $gameUrl = "https://img.sportsbull.jp/static/americanfootball/2017/autumn/%s.json";

	public static function setJudgment($target) {
		if (isset($target) && !empty($target)) {
			return true;
		}else{
			return false;
		}
	}
	public static function getSchedule() {
		$json = file_get_contents(self::$scheduleUrl);
		$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
		$json = json_decode($json,true);
		$gameArray = array("公式戦"=>"game-category1","入替戦"=>"game-category2","全日本"=>"game-category3","甲子園ボウル"=>"game-category4");
		$result = array("lastupdate"=>"","game-category1"=>"","game-category2"=>"","game-category3"=>"","game-category4"=>"");
		$result["lastupdate"] = date("Y年n月j日 H:i:s",strtotime($json["response"]["lastupdate"]));
		foreach ($json["response"]["schedule"] as $key => $value) {
			$tmp = "";
			foreach ($value["league"] as $oneDay) {
				$date = date("n月j日",strtotime($oneDay["date"]));
				$date .= "(".$oneDay['weekday'].")";
				$li = "";
				foreach ($oneDay["games"] as $game) {
					// ダイジェストエリアを試合詳細へ変更するためコメントアウト
					// if (empty($game['highlightmovieurl'])) {
					// 	$movie = "<div class='digest'>ダイジェスト動画</div>";
					// }else{
					// 	$movie = "<a class='digest active' href='".$game['highlightmovieurl']."'>ダイジェスト動画</a>";
					// }
					if (empty($game['json'])) {
						$gameLink = <<< EOM
							<div class="match">
								<span class="team-{$game['team'][0]['id']}">{$game['team'][0]['name']}</span>
								{$game['team'][0]['score']} - {$game['team'][1]['score']}
								<span class="team-{$game['team'][1]['id']}">{$game['team'][1]['name']}</span>
							</div>
							<div class='digest'>ダイジェスト動画</div>
EOM;
					}else{
						$gameLink = <<< EOM
							<a class="match active" href="/stats/ua_kansai/match/?gameId={$game['gameid']}">
								<span class="team-{$game['team'][0]['id']}">{$game['team'][0]['name']}</span>
								{$game['team'][0]['score']} - {$game['team'][1]['score']}
								<span class="team-{$game['team'][1]['id']}">{$game['team'][1]['name']}</span>
							</a>
							<a class='digest active' href='/stats/ua_kansai/match/?gameId={$game['gameid']}'>ダイジェスト動画</a>
EOM;
					}
					$li .= <<< EOM
						<li>
							{$gameLink}
						</li>
EOM;
				}
				$tmp .= <<< EOM
					<div class="list">
						<p>{$date}</p>
						<ul>
							{$li}
						</ul>
					</div>
EOM;
			}
			$result[$gameArray[$value["leaguetype"]]]["schedule"] = $tmp;
			if ($value["leaguetype"] == "公式戦") {
				$result[$gameArray[$value["leaguetype"]]]["standing"] = self::getStanding();
			}
		}
		foreach ($result as $key => $value) {
			if (empty($value)) {
				$result[$key]["schedule"] = "<div class='non-data'>対象の日程はございません</div>";
			}
		}
		return $result;
	}

	public static function getStanding() {
		$json = file_get_contents(self::$standingUrl);
		$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
		$json = json_decode($json,true);
		$ranking = $json["response"]["team"];
		$rankingTable = $json["response"]["tournament"];
		$result = array("win" => "○","lose" => "●" );
		$lastupdate = date("Y年n月j日 H:i:s",strtotime($json["response"]["lastupdate"]));
		$html = "";
		$html = "<h2 class='star'><span class='sp-none'>星取表</span><span class='pc-none'>順位表</span> / Division1</h2>";
		$html .= "<div class='lastupdate'>最終更新日：".$lastupdate."</div>";
		$html .= <<< EOM
		<table>
			<thead>
				<tr>
					<th width="10%">順位</th>
					<th>大学名<br class="sp-none">（勝-敗-分）</th>
					<th>{$ranking[0]['shortname']}</th>
					<th>{$ranking[1]['shortname']}</th>
					<th>{$ranking[2]['shortname']}</th>
					<th>{$ranking[3]['shortname']}</th>
					<th>{$ranking[4]['shortname']}</th>
					<th>{$ranking[5]['shortname']}</th>
					<th>{$ranking[6]['shortname']}</th>
					<th>{$ranking[7]['shortname']}</th>
				</tr>
			</thead>
EOM;
		$tbody = "<tbody>";
		foreach ($ranking as $key => $value) {
			$win_lose = $value["result"]["win"]."-".$value["result"]["lose"]."-".$value["result"]["draw"];
			$tr = "<tr>";
			$tr .= "<td>".$value["rank"]."</td>
				<td>".$value["name"]."<br class='sp-none'>(".$win_lose.")</td>";
			foreach ($rankingTable[$key] as $detail) {
				if ($detail["result"] == "-") {
					$tr .= "<td class='non'></td>";
				}else{
					$tr .= "<td>".$result[$detail["result"]]."<br class='sp-none'>".$detail["score"]."</td>";
				}
			}
			$tr .= "</tr>";
			$tbody .= $tr;
		}
		$tbody .= "</tbody>";
		$html .= $tbody;
		$html .= "</table>";
		return $html;
	}

	public static function getMatch($gameId) {
		$url = sprintf(self::$gameUrl,$gameId);
		$json = file_get_contents($url);
		$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
		$json = json_decode($json,true);
		$json = $json["response"];
		if (empty($gameId) || empty($json)) {
			header('Location: https://sportsbull.jp/stats/ua_kansai/');
			exit;
		}
		$gameinfo = $json["gameinfo"];
		$playFirst = $json["team"][0];
		$drawFirst = $json["team"][1];
		$scoreInfo = $json["events"];
		$date = date("n月j日",strtotime($gameinfo["date"]));

		$result = array("date"=>$date,"playFirstName"=>$playFirst['name'],"drawFirstName"=>$drawFirst['name'],"headInner"=>"","movie"=>"","digest"=>"","quarter"=>"","data"=>"","scoreInfo"=>"","personalInfo"=>"","autoReload"=>false);

		$result["autoReload"] = $gameinfo['status']!="試合終了" && $gameinfo['status']!="中止" && $gameinfo['status']!="ノーゲーム" ? true:false;

		if (!self::setJudgment($gameinfo['status'])) {
			$gameinfo['status'] = "試合中";
		}
		if (!self::setJudgment($gameinfo['stadium'])) {
			$gameinfo['stadium'] = "-";
		}
		if (!self::setJudgment($gameinfo['weather'])) {
			$gameinfo['weather'] = "-";
		}
		if (!self::setJudgment($gameinfo['spectators'])) {
			$gameinfo['spectators'] = "-";
		}
		//ヘッダーインナー
		$result["headInner"] = <<< EOM
			<div class="game-name">{$gameinfo['league']}</div>
			<div class="result">
				<div class="home-name">
					<span class="team-{$playFirst['id']}">{$playFirst['name']}</span>
				</div>
				<div class="home-score">{$playFirst['score']['total']}</div>
				<div class="vs">vs</div>
				<div class="away-score">{$drawFirst['score']['total']}</div>
				<div class="away-name">
					<span class="team-{$drawFirst['id']}">{$drawFirst['name']}</span>
				</div>
			</div>
			<div class="state">{$gameinfo['status']}</div>
			<div class="info">
				{$date}({$gameinfo['weekday']})　{$gameinfo['kickoff']}～<br />
				於：{$gameinfo['stadium']}　天候：{$gameinfo['weather']}　観衆：{$gameinfo['spectators']}人
			</div>
EOM;
		if (self::setJudgment($json['highlightmovieurl']['movie'])) :
			//関連動画
			$result["movie"] = <<< EOM
				<ul>
					<li>
						<a href="{$json['highlightmovieurl']['movie']}">
							<div>
								<img src="{$json['highlightmovieurl']['img']}" alt="{$json['highlightmovieurl']['title']}">
							</div>
							<div><p>ダイジェスト</p><p>{$json['highlightmovieurl']['title']}</p></div>
						</a>
					</li>
				</ul>
EOM;
		else:
			$result["movie"] = <<< EOM
				<div class="mb30">関連動画はありません</div>
EOM;
		endif;
		if (self::setJudgment($json['movieurl'])) :
			//ダイジェスト動画
			$result["digest"] = '<a href="'.$json['movieurl'].'" target="_blank">フルバージョンの動画はこちら</a>';
		endif;
		//各クオーター結果
		if (self::setJudgment($playFirst['score'])) :
			foreach ($playFirst['score'] as $key => $value) {
				self::setJudgment($playFirst['score'][$value]) ? "": $playFirst['score'][$value] = "-";
				self::setJudgment($drawFirst['score'][$value]) ? "": $drawFirst['score'][$value] = "-";
			}
			$result["quarter"] = <<< EOM
				<tr>
					<td>{$playFirst['name']}</td>
					<td>{$playFirst['score']['1q']}</td>
					<td>{$playFirst['score']['2q']}</td>
					<td>{$playFirst['score']['3q']}</td>
					<td>{$playFirst['score']['4q']}</td>
					<td>{$playFirst['score']['total']}</td>
				</tr>
				<tr>
					<td>{$drawFirst['name']}</td>
					<td>{$drawFirst['score']['1q']}</td>
					<td>{$drawFirst['score']['2q']}</td>
					<td>{$drawFirst['score']['3q']}</td>
					<td>{$drawFirst['score']['4q']}</td>
					<td>{$drawFirst['score']['total']}</td>
				</tr>
EOM;
		else :
			$result["quarter"] = <<< EOM
				<tr>
					<td>{$playFirst['name']}</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
				<tr>
					<td>{$drawFirst['name']}</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
EOM;
		endif;
		//データ
		$playData = $playFirst["stats"];
		$drawData = $drawFirst["stats"];
		$result["data"] = <<< EOM
			<thead>
                <tr>
                  <th colspan="2"></th>
                  <th>{$playFirst['name']}</th>
                  <th>{$drawFirst['name']}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="2">タッチダウン</td>
                  <td>{$playData['touchdown']}</td>
                  <td>{$drawData['touchdown']}</td>
                </tr>
                <tr>
                  <td rowspan="2">PAT</td>
                  <td>（1点）回数-成功</td>
                  <td>{$playData['pat']['1point']}</td>
                  <td>{$drawData['pat']['1point']}</td>
                </tr>
                <tr>
                  <td>（2点）回数-成功</td>
                  <td>{$playData['pat']['2point']}</td>
                  <td>{$drawData['pat']['2point']}</td>
                </tr>
                <tr>
                  <td>フィールドゴール</td>
                  <td>回数-成功</td>
                  <td>{$playData['fieldgoal']}</td>
                  <td>{$drawData['fieldgoal']}</td>
                </tr>
                <tr>
                  <td colspan="2">セイフティ</td>
                  <td>{$playData['safety']}</td>
                  <td>{$drawData['safety']}</td>
                </tr>
                <tr>
                  <td colspan="2">1stダウン（ラン-パス-反則）</td>
                  <td>{$playData['1stdown']}</td>
                  <td>{$drawData['1stdown']}</td>
                </tr>
                <tr>
                  <td rowspan="2">パス</td>
                  <td>試投-成功-被Intercept</td>
                  <td>{$playData['pass']['throw']}</td>
                  <td>{$drawData['pass']['throw']}</td>
                </tr>
                <tr>
                  <td>獲得ヤード</td>
                  <td>{$playData['pass']['yds']}</td>
                  <td>{$drawData['pass']['yds']}</td>
                </tr>
                <tr>
                  <td>ラン</td>
                  <td>回数-獲得ヤード</td>
                  <td>{$playData['run']}</td>
                  <td>{$drawData['run']}</td>
                </tr>
                <tr>
                  <td>攻撃</td>
                  <td>回数-獲得ヤード</td>
                  <td>{$playData['attack']}</td>
                  <td>{$drawData['attack']}</td>
                </tr>
                <tr>
                  <td>反則</td>
                  <td>回数-喪失ヤード</td>
                  <td>{$playData['penalty']}</td>
                  <td>{$drawData['penalty']}</td>
                </tr>
                <tr>
                  <td>ファンブル</td>
                  <td>回数-喪失回数</td>
                  <td>{$playData['fumble']}</td>
                  <td>{$drawData['fumble']}</td>
                </tr>
                <tr>
                  <td colspan="2">ボール所有時間</td>
                  <td>{$playData['possession']}</td>
                  <td>{$drawData['possession']}</td>
                </tr>
                <tr>
                  <td colspan="2">3rd Down Conversions</td>
                  <td>{$playData['3rdDownConversions']}</td>
                  <td>{$drawData['3rdDownConversions']}</td>
                </tr>
                <tr>
                  <td colspan="2">4rd Down Conversions</td>
                  <td>{$playData['4thDownConversions']}</td>
                  <td>{$drawData['4thDownConversions']}</td>
                </tr>
              </tbody>
EOM;

		//得点経過
		$color = array('blue', 'red');
		if (self::setJudgment($scoreInfo)) :
			foreach ($scoreInfo as $key => $value) {
				$result["scoreInfo"] .= <<< EOM
	            <li>
	              <div class="{$color[$value['pord']]}">{$value['team']}</div>
	              <div class="passage">{$value['time']} {$value['play']}</div>
	            </li>
EOM;
			}
		else :
			$result["scoreInfo"] .= <<< EOM
	            <div>得点経過情報はありません</div>
EOM;
		endif;
		//個人成績
		$noneData = <<< EOM
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
EOM;
		// $playData = $playFirst["playersdata"];
		// $drawData = $drawFirst["playersdata"];
		$playersData = array($playFirst["playersdata"],$drawFirst["playersdata"]);
		for ($i=0; $i < 2; $i++) { 
			$keyName = $i==0 ? "playFirst" : "drawFirst";
			//ラン
			$result["personalInfo"][$keyName]["run"]["total"] = $playersData[$i]['run']['total'];
			foreach ($playersData[$i]['run']['player'] as $player) {
				$result["personalInfo"][$keyName]["run"]["data"] .= <<< EOM
	                  <tr>
	                    <td>{$player['no']} {$player['name']}</td>
	                    <td>{$player['data']['att']}</td>
	                    <td>{$player['data']['yds']}</td>
	                    <td>{$player['data']['td']}</td>
	                    <td>{$player['data']['lg']}</td>
	                  </tr>
EOM;
			}

			//パス
			$result["personalInfo"][$keyName]["pass"]["total"] = $playersData[$i]['pass']['total'];
			foreach ($playersData[$i]['pass']['player'] as $player) {
				$result["personalInfo"][$keyName]["pass"]["data"] .= <<< EOM
	                  <tr>
	                    <td>{$player['no']} {$player['name']}</td>
	                    <td>{$player['data']['cpat']}</td>
	                    <td>{$player['data']['yds']}</td>
	                    <td>{$player['data']['td']}</td>
	                    <td>{$player['data']['int']}</td>
	                  </tr>
EOM;
			}

			//レシーブ
			$result["personalInfo"][$keyName]["receive"]["total"] = $playersData[$i]['receive']['total'];
			foreach ($playersData[$i]['receive']['player'] as $player) {
				$result["personalInfo"][$keyName]["receive"]["data"] .= <<< EOM
	                  <tr>
	                    <td>{$player['no']} {$player['name']}</td>
	                    <td>{$player['data']['att']}</td>
	                    <td>{$player['data']['yds']}</td>
	                    <td>{$player['data']['td']}</td>
	                    <td>{$player['data']['lg']}</td>
	                  </tr>
EOM;
			}

			//個人成績のデータが無い場合に空を挿入
			foreach ($result["personalInfo"][$keyName] as $key => $value) {
				if (empty($value["total"])) {
					$result["personalInfo"][$keyName][$key]["total"] = " - ";
					$result["personalInfo"][$keyName][$key]["data"] = $noneData;
				}
			}
		}
		return $result;
	}
	//直近日程取得
	public static function getScheduleRecent() {
		$json = file_get_contents(self::$scheduleUrl);
		$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
		$json = json_decode($json,true);
		$endArray = array();
		$recentArray = array();
		$result = "";
		//全日程から終了した1日分を取得
		foreach ($json["response"]["schedule"] as $key => $value) {
			$keyDate = "";
			//大会ごとにまわす
			foreach ($value["league"] as $oneDay) {
				//一番最後の試合詳細がある（jsonがある）試合を残す
				foreach ($oneDay["games"] as $game) {
					if (!empty($game['json'])) {
						$keyDate = $oneDay["date"];
						$tmp = $oneDay;
						break;
					}
				}
			}
			if (!empty($keyDate)) $endArray[$keyDate][] = $tmp;
		}
		//全日程から予定1日分を取得
		foreach ($json["response"]["schedule"] as $key => $value) {
			$cnt = 0;
			//大会ごとにまわす
			foreach ($value["league"] as $oneDay) {
				//一番最初の試合詳細がない（jsonがない）試合を残す
				foreach ($oneDay["games"] as $game) {
					if (empty($game['json'])) {
						$recentArray[$oneDay["date"]][] = $oneDay;
						$cnt++;
						break;
					}
				}
				if ($cnt == 1) break;
			}
		}
		
		//終了日程、予定日程から1日づつでHTMLを生成
		krsort($endArray);//降順
		ksort($recentArray);//昇順
		$keyArray = array($endArray,$recentArray);
		for ($i=0; $i < 2; $i++) { 
			$cnt = 0;
			foreach ($keyArray[$i] as $key => $value) {
				$date = date("n月j日",strtotime($key));
				$week = "";
				$li = "";
				foreach ($value as $key2 => $value2) {
					$week = "(".$value2['weekday'].")";
					foreach ($value2["games"] as $game) {
						// ダイジェストエリアを試合詳細へ変更するためコメントアウト
						// if (empty($game['highlightmovieurl'])) {
						// 	$movie = "<div class='digest'>ダイジェスト動画</div>";
						// }else{
						// 	$movie = "<a class='digest active' href='".$game['highlightmovieurl']."'>ダイジェスト動画</a>";
						// }
						if (empty($game['json'])) {
							$gameLink = <<< EOM
								<div class="match">
									<span class="team-{$game['team'][0]['id']}">{$game['team'][0]['name']}</span>
									{$game['team'][0]['score']} - {$game['team'][1]['score']}
									<span class="team-{$game['team'][1]['id']}">{$game['team'][1]['name']}</span>
								</div>
								<div class='digest'>ダイジェスト動画</div>
EOM;
						}else{
							$gameLink = <<< EOM
								<a class="match active" href="/stats/ua_kansai/match/?gameId={$game['gameid']}">
									<span class="team-{$game['team'][0]['id']}">{$game['team'][0]['name']}</span>
									{$game['team'][0]['score']} - {$game['team'][1]['score']}
									<span class="team-{$game['team'][1]['id']}">{$game['team'][1]['name']}</span>
								</a>
								<a class='digest active' href='/stats/ua_kansai/match/?gameId={$game['gameid']}'>ダイジェスト動画</a>
EOM;
						}
						$li .= <<< EOM
							<li>
								{$gameLink}
							</li>
EOM;
					}
				}
				$date = $date.$week;
				$result .= <<< EOM
					<div class="list">
						<p>{$date}</p>
						<ul>
							{$li}
						</ul>
					</div>
EOM;
				$cnt++;
				if ($cnt == 1) break;
			}
		}
		if (empty($result)) {
			$result = "<div class='non-data mt20 mb30'>直近の日程はございません</div>";
		}
		return $result;
	}
}
?>