<?php
class getData {
	public static $scheduleUrl = "https://dev-img.sportsbull.jp/static/americanfootball/2017/autumn/schedule.json";
	public static $standingUrl = "https://dev-img.sportsbull.jp/static/americanfootball/2017/autumn/standing.json";
	public static $gameUrl = "https://dev-img.sportsbull.jp/static/americanfootball/2017/autumn/%s.json";

	public static function getSchedule() {
		$json = file_get_contents(self::$scheduleUrl);
		$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
		$json = json_decode($json,true);
		$gameArray = array("公式戦"=>"game-category1","入替戦"=>"game-category2","新日本"=>"game-category3","甲子園ボール"=>"game-category4");
		$result = array("game-category1"=>"","game-category2"=>"","game-category3"=>"","game-category4"=>"");
		foreach ($json["response"]["schedule"] as $key => $value) {
			$tmp = "";
			foreach ($value["league"] as $oneDay) {
				$date = date("n月j日",strtotime($oneDay["date"]));
				$date .= "(".$oneDay['weekday'].")";
				$li = "";
				foreach ($oneDay["games"] as $game) {
					if (empty($game['highlightmovieurl'])) {
						$movie = "<div>ダイジェスト動画</div>";
					}else{
						$movie = "<a href='".$game['highlightmovieurl']."'>ダイジェスト動画</a>";
					}
					$li .= <<< EOM
						<li>
							<a href="/stats/ua_kansai/match/?gameId={$game['gameid']}">
								<span class="team-{$game['team'][0]['id']}">{$game['team'][0]['name']}</span>
								{$game['team'][0]['score']} - {$game['team'][1]['score']}
								<span class="team-{$game['team'][1]['id']}">{$game['team'][1]['name']}</span></a>
							{$movie}
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
				$result[$key]["schedule"] = "<div>対象の日程はございません</div>";
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
		$html = "";
		$html = "<h2 class='star'>星取表 / Division1</h2><table>";
		$html .= <<< EOM
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

		$gameinfo = $json["gameinfo"];
		$playFirst = $json["team"][0];
		$drawFirst = $json["team"][1];
		$scoreInfo = $json["events"];
		$date = date("n月j日",strtotime($gameinfo["date"]));

		$result = array("date"=>$date,"playFirstName"=>$playFirst['name'],"drawFirstName"=>$drawFirst['name'],"headInner"=>"","movie"=>"","quarter"=>"","data"=>"","scoreInfo"=>"","personalInfo"=>"");

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
				{$date}（{$gameinfo['weekday']}）　{$gameinfo['kickoff']}～<br />
				於：{$gameinfo['stadium']}　天候：{$gameinfo['weather']}　観衆：{$gameinfo['spectators']}人
			</div>
EOM;
		
		//関連動画
		$result["movie"] = <<< EOM
			<ul>
				<li>
					<a href="{$json['highlightmovieurl']['movie']}">
						<div>
							<img src="{$json['highlightmovieurl']['img']}" alt="前半、ゴールを決めた川崎Ｆ・ＭＦ中村（右）は小林とハイタッチ（撮影・山崎安昭）">
						</div>
						<div><p>ダイジェスト</p><p>{$json['highlightmovieurl']['title']}</p></div>
					</a>
					<a href="{$json['movieurl']}" target="_blank">フルバージョンの動画はこちら</a>
				</li>
			</ul>
EOM;
		
		//各クオーター結果
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
                  <td>{$playData['pass']['yard']}</td>
                  <td>{$drawData['pass']['yard']}</td>
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
                  <td colspan="2">3rd Down Conersions</td>
                  <td>{$playData['3rdDownConversions']}</td>
                  <td>{$drawData['3rdDownConversions']}</td>
                </tr>
                <tr>
                  <td colspan="2">4rd Down Conersions</td>
                  <td>{$playData['4thDownConversions']}</td>
                  <td>{$drawData['4thDownConversions']}</td>
                </tr>
              </tbody>
EOM;
		//得点経過
		$color = array('blue', 'red');
		foreach ($scoreInfo as $key => $value) {
			$result["scoreInfo"] .= <<< EOM
            <li>
              <div class="{$color[$value['pord']]}">{$value['team']}</div>
              <div class="passage">{$value['time']} {$value['play']}</div>
            </li>
EOM;
		}

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
}
?>