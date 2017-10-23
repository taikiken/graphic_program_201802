<?php

include $INCLUDEPATH.'local.php';
include $INCLUDEPATH.'public/import.php';

ini_set("max_execution_time", 180);
/*
|--------------------------------------------------------------------------
| RSS取込バッチ
|--------------------------------------------------------------------------
|
| 取り込むメディア毎にバッチを作成する。らしい...
| RSSをパースしSQLに変換しDBに流し込む
|
*/
$MEDIAID = 63;
const MEDIA_NAME = 'perfectanavi';


# RSSファイル
# 現状、検証用RSSしかもらってないので一旦下記RSSを使用
#
const RSS_FILE = 'https://perfectanavi.com/tag/sportsbull/?feed=sportsbull';
// $RSS_FILE = dirname(__FILE__) . '/rss.xml';

$o = new db;
$o->connect();

// $sql = "delete from repo_body where pid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from u_link where pid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from u_area where pageid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from repo_n where d2={$MEDIAID};";
// $o->query($sql);
// return;

$sql = sprintf("SELECT id,name,name_e,yobi FROM u_categories WHERE flag=1 AND id NOT IN(%s) ORDER BY id DESC",implode(",", $excategory));
$o->query($sql);
while($f = $o->fetch_array()) {
	$sw = strlen($f["yobi"]) > 0 ? @explode(",", $f["yobi"]) :array();
	$sw[] = $f["name"];
	$r[] = array($f["id"], $sw, $f["name"]);
	$exword[] = $f["name"];
	$exword[] = $f["name_e"];
}

/*
|--------------------------------------------------------------------------
| パーフェクトナビRSS取込処理
|--------------------------------------------------------------------------
|
| 要は、RSSのitem（記事）単位でSQL作ってあげればOK。Xpathでitemを抜き出してゴニョゴニョ
|
*/
$content = get_contents(RSS_FILE);
$xml     = simplexml_load_string($content);
$items   = $xml->xpath('//item'); // itemのXMLオブジェクト配列取得



foreach($items as $item)
{
	#
	# item から必要な情報を抽出し前処理を行う
	#
	$keyword = key_merge((string)$item->keyword);
	$status  = (int)$item->status;
	$enclosure_url = (string)$item->enclosure->attributes()->url;
	$enclosure_url = preg_replace('/test\.perfectanavi\.com/m', 'perfectanavi:C4IiJ8V7@test.perfectanavi.com', $enclosure_url);

	$related_links = $item->xpath('relatedLink');

	$link  = (string)$item->link;
	$title = (string)$item->title;

	$region = (string)$item->area;
	$pref   = (string)$item->pref;

	$body = (string)$item->description;
	#
	# modifytag：
	# 記事本文中の画像は先方のサーバを参照するのではなくブルのS3にコピーする
	# 画像本文のimgタグのsrcをoutimg()でS3にコピーしsrcをS3のパスに変更
	#
	$modbody = modifytag(str_replace('<p>&nbsp;</p>', '', str_replace("\'","''",preg_replace('/(\r|\n|\t)/', '', $body))));

	$a_time = strtotime((string)$item->lastUpdate);
	$u_time = strtotime((string)$item->pubDate);
	#
	# SQL生成用map
	#
	$item_map = [
		'title'  		=> $title,
		't9'   			=> $link,
		't7'   			=> (string)$item->guid,
		'm_time' 		=> date('Y-m-d H:i:s', strtotime((string)$item->pubDate)),
		'u_time' 		=> date('Y-m-d H:i:s', $u_time),
		'a_time' 		=> date('Y-m-d H:i:s', $a_time),
		'a1' 			=> date('Y', $a_time),
		'a2' 			=> date('m', $a_time),
		'a3' 			=> date('d', $a_time),
		'a4' 			=> date('H', $a_time),
		'a5' 			=> date('i', $a_time),
		'a6' 			=> date('s', $a_time),
		'a7' 			=> date('Y', $u_time),
		'a8' 			=> date('m', $u_time),
		'a9' 			=> date('d', $u_time),
		'a10' 			=> date('H', $u_time),
		'a11' 			=> date('i', $u_time),
		'a12' 			=> date('s', $u_time),
		't30' 			=> $enclosure_url,
		't1' 			=> (string)$item->enclosure->attributes()->caption,
		// 'd2'   			=> $MEDIAID,
		// 'status' 		=> $status,
		// 'category' 		=> (string)$item->category,
		// 'description' 	=> $body,
		'keyword' 		=> $keyword,
	];

	#
	# タグの抽出
	#
	$tag = categorymatching($exword, $keyword);
	if(count($tag) > 0) {
		for($cnt=0; $cnt<count($tag); $cnt++) {
			if($cnt == 6) break;
			$item_map['t1' . $cnt] = esc($tag[$cnt]);
		}
	}


	#
	# 該当記事の抽出
	#
	$sql = sprintf(
		"SELECT * FROM repo_n WHERE cid = 1 AND d2 = %s AND t9 = '%s'",
		$MEDIAID,
		$link
	);
	$o->query($sql);
	$data = (object)$o->fetch_array();

	# 既に登録されている記事の場合
	if(strlen($data->id) > 0)
	{
		if($status == 1)
		{
			if(/*true || */strtotime($item_map['a_time']) > strtotime($data->a_time))
			{
				if(strlen($enclosure_url) > 0)
				{
					if(! eximg(sprintf( '%s/prg_img/raw/%s', $SERVERPATH, $data->img1 ), $enclosure_url)) {
						$item_map['img1'] = outimg($enclosure_url);
					}
				}
				else
				{
					$item_map['img1'] = '';
					$item_map['t1']   = '';
				}
				splittime($item_map['m_time'], $item_map['a_time']);
				$sqla[] = makesql($item_map, $data->id);
				$sqla[] = sprintf("UPDATE repo_body SET body = '%s' WHERE pid = %s;", $modbody, $data->id);
				$sqla[] = relatedlink_New($related_links, $data->id);
			}
		}
		elseif ($status == 0)
		{
			$sqla[] = sprintf('UPDATE repo_n SET flag = 0 WHERE id = %s;', $data->id);
		}
	}
	# 新規記事の場合
	else
	{
		if($status == 1) {
			$TITLE[] = pg_escape_string($title);

			$item_map['d1']   = 3;
			$item_map['d2']   = $MEDIAID;
			if(isset($item->category)) {
				$category = (string)$item->category;
				$item_map['m1'] = category_mapping($r, array($category, $keyword, $title, $item_map["t1"], $body));
			} else {
				$item_map['m1'] = 129;
			}
			$item_map['flag'] = 1;
			$item_map['cid']  = 1;
			/*
			|--------------------------------------------------------------------------
			| !note
			|--------------------------------------------------------------------------
			|
			| makesql関数内でマッチングさせている処理があるので
			| select max 〜〜 は 小文字で記述
			|
			*/
			$item_map['n'] = '(select max(n) + 1 from repo_n where cid = 1)';

			if(strlen($enclosure_url) > 0) $item_map["img1"] = outimg($enclosure_url);

			splittime($item_map["m_time"], $item_map["a_time"]);
			$sqla[] = makesql($item_map, 0);
			$sqla[] = sprintf("INSERT INTO repo_body(pid, body) VALUES(CURRVAL('repo_n_id_seq'),'%s');", $modbody);
			$sqla[] = relatedlink_New($related_links);
			$sqla[] = "insert into u_area(pageid, region, pref) values(currval('repo_n_id_seq'), '{$region}', '{$pref}');";
		}
	}



	if($sqla){
		$sqla=implode("\n",$sqla);
		$res = $o->query($sqla);
		// var_dump(htmlspecialchars($sqla));
		unset($sqla);
	}
}

include $INCLUDEPATH.'public/display.php';

function modifytag($s, $enclosure_url){
	global $ImgPath;
	$enclosure = basename($enclosure_url);
	if(count($s)==0)return "";
	$s = preg_replace('/ alt=""/', '', $s);
	preg_match_all("/<img[^>]+>/", $s, $u);
	for($i = 0; $i<count($u[0]); $i++){
		preg_match('/src="([^"]+)"/',$u[0][$i], $r);
		$image_url = $r[1];
		if($enclosure == basename($image_url))
		{
			$s = str_replace($u[0][$i], '', $s);
		}
		else
		{
			$img = outimg($image_url, 0, false);
			if(preg_match("/:\/\//", $r[1])) {
				if(strlen($img) > 0){
					$s = str_replace($u[0][$i], sprintf("<img src=\"%s/raw/%s\"><br>", $ImgPath, $img), $s);
				}else{
					$s = str_replace($u[0][$i], "", $s);
				}
			}else{
				$s = str_replace($u[0][$i], "", $s);
			}
		}
	}
	$s = str_replace(array("<p></p>", "<p>&nbsp;</p>"), "", $s);
	$s = str_replace("\'", "''", preg_replace("/(\r|\n|\t)/", "", $s));
	return $s;
}

?>
