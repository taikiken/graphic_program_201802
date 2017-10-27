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
$MEDIAID = 62;
const MEDIA_NAME = 'パラスポ';


# RSSファイル
# 現状、検証用RSSしかもらってないので一旦下記RSSを使用
#
const RSS_FILE = 'http://staging.paraspoplus.com/feed/sports-bull';
// const RSS_FILE = 'https://perfectanavi:C4IiJ8V7@test.perfectanavi.com/tag/sportsbull/?feed=sportsbull';
// $RSS_FILE = dirname(__FILE__) . '/rss.xml';

$o = new db;
$o->connect();

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

	$region = (string)$item->area;
	$pref   = (string)$item->pref;

	$body = (string)$item->description;
	#
	# youtubeのembedが存在する場合、例外対応が必要
	# bodyflag => 170
	# <div class="cms_widget ratio16_9"><div class="ratio16_9-inner">＜ここにbodyをいれる＞</div></div>
	if(strpos(false !== $body, 'www.youtube.com/embed')) {
		$body =<<<END_DOC
<div class="cms_widget ratio16_9"><div class="ratio16_9-inner">
{$body}
</div></div>
END_DOC;
		$sqla[] = sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(currval('repo_n_id_seq'),5,'%s',1,1,now(),now());",$body);
	}
	$modbody = str_replace('<p>&nbsp;</p>', '', str_replace("\'","''",preg_replace('/(\r|\n|\t)/', '', $body)));

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
			$item_map['n'] = '(select max(n) + 1 FROM repo_n WHERE cid = 1)';

			if(strlen($enclosure_url) > 0) $item_map["img1"] = outimg($enclosure_url);

			splittime($item_map["m_time"], $item_map["a_time"]);
			$sqla[] = makesql($item_map, 0);
			$sqla[] = sprintf("INSERT INTO repo_body(pid, body) VALUES(CURRVAL('repo_n_id_seq'),'%s');", $modbody);
			$sqla[] = relatedlink2($related_links);
		}
		if(! empty($region)) {
			$sqla[] = "insert into u_area(pageid, region, pref) values(currval('repo_n_id_seq'), '{$region}', '{$pref}');";
		}
	}


	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
		// var_dump(htmlspecialchars($sqla));
		unset($sqla);
	}
}

include $INCLUDEPATH.'public/display.php';

?>
