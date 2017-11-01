<?php

include $INCLUDEPATH . "local.php";

//
// JSONファイル出力処理
//
function put_json($file, $data)
{
    // JSON形式のテキストデータ作成
	$jsontext = json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

    // JSON形式のテキストデータをファイル出力
    file_put_contents($file, $jsontext);
}


//
// JSONファイル出力先設定
//
if (!$bucket)
{
	$bucket = sprintf("%s/api/ver1/static/player", $SERVERPATH);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket = sprintf("s3://%s/json", $bucket);
}

// DBオブジェクト作成
$dbo = new db;
$dbo->connect();


/*
 * 選手一覧をJSON形式のファイルに出力
 */
// 選手一覧データ取得・作成
$sql = "";
$sql .= "SELECT id, name, '' as name_kana, competition, description, img1 ";
$sql .= "FROM tbl_player ";
$sql .= "WHERE flag = 1 ";
$sql .= "ORDER BY n";
$dbo->query($sql);

$value = array();
$data = array();
$jdata = array();
while ($fdata = $dbo->fetch_array())
{
	$value["no"] = $fdata["id"];
	$value["name"] = $fdata["name"];
	$value["name_kana"] = $fdata["name_kana"];
	$value["competition"] = $fdata["competition"];
	$value["description"] = $fdata["description"];
	$value["img"] = $fdata["img1"];
    $data['body'] = $value;
	$jdata[] = $data;
}

// 選手一覧JSONファイル出力
put_json(sprintf("%s/ca_list.json", $bucket), $jdata);


/*
 * 選手の関連記事一覧をJSON形式のファイルに出力
 */
// 選手一覧データ取得
$sql = "";
$sql .= "SELECT tp.id as player_id, rn.id as repo_n_id ";
$sql .= "FROM tbl_player AS tp INNER JOIN repo_n AS rn ";
$sql .= "    ON tp.id = rn.pid1 OR tp.id = rn.pid2 OR tp.id = rn.pid3 OR tp.id = rn.pid4 OR tp.id = rn.pid5 ";
$sql .= "WHERE tp.flag = 1 AND rn.flag = 1 ";
$sql .= "ORDER BY tp.n, rn.n";
$dbo->query($sql);

$data = array();
$jdata = array();
$id = "";
$value = array();
while ($fdata = $dbo->fetch_array())
{
	if ($id != $fdata["player_id"])
	{
		// 集計対象の選手が変わった場合の処理
		if (count($value) > 0)
		{
			// JSON出力データとして設定
			$jdata[$id] = $value;

			$value = array();
		}

		// 選手IDを退避
		$id = $fdata["player_id"];
	}

	// 関連記事IDの設定
	$value[] = $fdata["repo_n_id"];
}

// JSON出力データが残っている場合の処理
if (count($value) > 0)
{
	// JSON出力データとして設定
	$jdata[$id] = $value;
}

// 選手一覧JSONファイル出力
put_json(sprintf("%s/ca_article_ids.json", $bucket), $jdata);


/*
 * 注目の選手一覧をJSON形式のファイルに出力
 * 　抽出件数はソート順に４件
 */
// 注目の選手一覧データ取得・作成
$sql = "";
$sql .= "SELECT tp.id, tp.name, '' as name_kana, tp.competition, tp.description, tp.img1 ";
$sql .= "FROM tbl_player AS tp INNER JOIN u_headline AS hl ";
$sql .= "    ON tp.id = hl.d2 AND hl.cid = 18 AND hl.qid = 17 ";
$sql .= "WHERE tp.flag = 1 AND hl.flag = 1 ";
$sql .= "ORDER BY hl.n ";
$sql .= "LIMIT 4";
$dbo->query($sql);

$value = array();
$data = array();
$jdata = array();
while ($fdata = $dbo->fetch_array())
{
	$value["no"] = $fdata["id"];
	$value["name"] = $fdata["name"];
	$value["name_kana"] = $fdata["name_kana"];
	$value["competition"] = $fdata["competition"];
	$value["description"] = $fdata["description"];
	$value["img"] = $fdata["img1"];
    $data['body'] = $value;
	$jdata[] = $data;
}

// 選手一覧JSONファイル出力
put_json(sprintf("%s/ca_picup_list.json", $bucket), $jdata);

// DBオブジェクトの解放
unset($odb);

?>
