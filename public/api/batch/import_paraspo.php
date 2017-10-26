<?php

include $INCLUDEPATH.'local.php';
include $INCLUDEPATH.'public/import.php';

/*
|--------------------------------------------------------------------------
| RSS取込バッチ
|--------------------------------------------------------------------------
|
| 取り込むメディア毎にバッチを作成する。らしい...
| RSSをパースしSQLに変換しDBに流し込む
|
*/
$MEDIAID = 66;
const MEDIA_NAME = 'パラスポ+';
const SPECIAL_CHAR = 'www.youtube.com/embed';

# RSSファイル
# 現状、検証用RSSしかもらってないので一旦下記RSSを使用
#
const RSS_FILE = 'http://staging.paraspoplus.com/feed/sports-bull';
// $RSS_FILE = dirname(__FILE__) . '/rss.xml';

$o = new db;
$o->connect();

// $sql = "delete from repo_body where pid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from u_link where pid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from u_area where pageid in (select id from repo_n where d2={$MEDIAID});";
// $o->query($sql);
// $sql = "delete from repo_e where nid in (select id from repo_n where d2={$MEDIAID});";
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
| パラスポRSS取込処理
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
	$enclosure_url = str_replace('http://','https://', (string)$item->enclosure->attributes()->url);
	$related_links = (array)$item->relatedLink;
	$link  = (string)$item->link;
	$title = (string)$item->title;

	$body = (string)$item->description;
	$modbody = str_replace("\'","''",preg_replace('/(\r|\n|\t)/', '', $body));

	#
	# SQL生成用map
	#
	$item_map = [
		'title'  		=> $title,
		't9'   			=> $link,
		't7'   			=> (string)$item->guid,
		'status' 		=> $status,
		'category' 		=> (string)$item->category,
		'description' 	=> $body,
		'm_time' 		=> date('Y-m-d H:i:s',strtotime((string)$item->pubDate)),
		'u_time' 		=> date('Y-m-d H:i:s',strtotime((string)$item->pubDate)),
		'a_time' 		=> date('Y-m-d H:i:s',strtotime((string)$item->lastUpdate)),
		't30' 			=> $enclosure_url,
		't1' 			=> (string)$item->enclosure->attributes()->caption,
		'keyword' 		=> $keyword,
	];

	#
	# タグの抽出
	#
	$tag = categorymatching($exword, $keyword);
	if(count($tag) > 0) {
		for($cnt=0; $cnt<count($tag); $cnt++) {
			if($cnt == 6) break;
			$s['t1' . $cnt] = esc($tag[$cnt]);
		}
	}

	#
	# 該当記事の抽出
	#
	$sql = sprintf(
		"SELECT * FROM repo_n WHERE cid = 1 AND d2 = %s AND t9 = '%s'",
		MEDIA_ID,
		$link
	);
	$o->query($sql);
	$data = (object)$o->fetch_array();

	# 既に登録されている記事の場合
	if(strlen($list['id']) > 0)
	{
		if($status == 1)
		{
			if(strtotime($item_map['a_time']) > strtotime($data->a_time))
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
				$sqla[] = relatedlink2($related_links, $data->id);
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
			$item_map['d2']   = MEDIA_ID;
			$item_map['m1']   = 128;
			$item_map['flag'] = 1;
			$item_map['cid']  = 1;
			$item_map['n']    = '(SELECT MAX(n) + 1 FROM repo_n WHERE cid = 1)';

			if(strlen($enclosure_url) > 0) $item_map["img1"] = outimg($enclosure_url);

			splittime($item_map["m_time"], $item_map["a_time"]);
			$sqla[] = makesql($item_map, 0);
			$sqla[] = sprintf("INSERT INTO repo_body(pid, body) VALUES(CURRVAL('repo_n_id_seq'),'%s');", $modbody);
			$sqla[] = relatedlink2($related_links);
		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
		unset($sqla);
	}
}

include $INCLUDEPATH.'public/display.php';

?>
