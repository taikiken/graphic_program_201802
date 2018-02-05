<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$apidetails=1;
$uid=auth();
$id=bind($_REQUEST["id"]);

if($_REQUEST["api"]!="next"){

	$sql=sprintf("select * from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id=%s",$id)));
}else{
	
	//番組表のみ順番を変える
	$sql=sprintf("select m1 from repo_n where id=%s",$id);
	$o->query($sql);
	$f=$o->fetch_array();
	$cid=$f["m1"];
	
	$offset=strlen($_REQUEST["offset"])>0?$_REQUEST["offset"]:0;
	$length=strlen($_REQUEST["length"])>0?$_REQUEST["length"]:10;
	$limit=sprintf(" limit %s offset %s",$length,$offset);
	
	if($cid!=152){

		$nsql=sprintf("select count(*) as n from (select m1,m_time from repo_n where id=%s) as t1,(select m1,m_time from repo_n where flag=1) as t2 where t2.m1=t1.m1 and t2.m_time<t1.m_time",$id);
		$o->query($nsql);
		$f=$o->fetch_array();
		$articlenum=$f["n"];
	
		$sql=sprintf("select st2.* from (select t2.id from (select m1,m_time from repo_n where id=%s) as t1,repo_n as t2 where t2.m1=t1.m1 and t2.m_time<t1.m_time order by t2.m_time desc %s) as st1,(select * from %s) as st2 where st1.id=st2.id order by m_time desc",
		$id,$limit,sprintf($articletable2,set_isbookmark($uid),"","",""));
	}else{

		$nsql=sprintf("select count(*) as n from (select m1,m_time from repo_n where id=%s) as t1,(select m1,m_time from repo_n where flag=1) as t2 where t2.m1=t1.m1 and t2.m_time>t1.m_time",$id);
		$o->query($nsql);
		$f=$o->fetch_array();
		$articlenum=$f["n"];
	
		$sql=sprintf("select st2.* from (select t2.id from (select m1,m_time from repo_n where id=%s) as t1,repo_n as t2 where t2.m1=t1.m1 and t2.m_time>t1.m_time order by t2.m_time %s) as st1,(select * from %s) as st2 where st1.id=st2.id order by m_time",
		$id,$limit,sprintf($articletable2,set_isbookmark($uid),"","",""));		
	}
}

if($_GET["debugg"]==1){
	echo $sql;
}

$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;

$relatedPosts=unserialize(get_contents(sprintf("%s/static/%s.dat",$ImgPath,$p[0]["m1"])));
if(!$relatedPosts)$relatedPosts=array();

// #860 - crazyのみ関連記事
if ($p[0]["m1"]==134){
	$sql=sprintf("select rt1.title as modtitle,rt2.%s from (select d2,title,n as sort from u_headline where cid=11 and flag=1) as rt1,(select %s from %s) as rt2 where rt1.d2=rt2.id order by sort",str_replace(",",",rt2.",$articlefield),$articlefield,sprintf($articletable,set_isbookmark($uid),""));
	$o->query($sql);
	while($f=$o->fetch_array()){
		$crazyRelatedArticles[]=set_articleinfo($f,1);
	}
}else{
	// crazy以外は空配列
	$crazyRelatedArticles = array();
}

$articles=array();

for($i=0;$i<count($p);$i++){

	$l="";
	$related_links = [];
	if(in_array($p[$i]["d2"],$RELATEDLINK_ALLOWED)){
		$ulink=array();
		$sql=sprintf("select title,link from u_link where pid=%s order by n",$p[$i]["id"]);
		$o->query($sql);
		while($ee=$o->fetch_array())$ulink[]=$ee;
		if(count($ulink)>0){
			$l="<p>関連リンク<br>";
			for($j=0;$j<count($ulink);$j++){
				if(strlen($ulink[$j]["title"])>0)$l.=sprintf("<a href=\"%s\" target=\"_blank\">%s</a><br>",$ulink[$j]["title"],$ulink[$j]["link"]);
				$related_links[] = [
					'label' => $ulink[$j]["link"],
					'url' => $ulink[$j]["title"],
				];
			}
			$l.="</p>";
		}
		$p[$i]["relatedpost"]=$l;
	}
	$ad=get_advertise($p[$i]["m1"],$p[$i]["userid"],$p[$i]["id"]);
	$s=set_articleinfo($p[$i],1);
	
	$s["keywords"]=array();
	for($j=10;$j<=15;$j++)if(strlen($p[$i]["t".$j])>0)$s["keywords"][]=$p[$i]["t".$j];
	
	$ad_put=set_advertise($ad,"detail");
	
	$s=$s+$ad_put;
	unset($s["vast"]);
	unset($s["ad_urlpc"]);
	unset($s["ad_urlsp"]);
	$s['related_links'] = $related_links;
	$s["recommend_articles"]=$crazyRelatedArticles;
	if($_REQUEST["api"]!="next")$s["related_articles"]=$relatedPosts;
	$articles[]=$s;
	unset($s);
}

if($_REQUEST["api"]!="next"){
	$y["response"]=$articles[0];
	//ランキングは外部処理にしたい
	wlog($ACLOGTXT,array(strlen($p[$i]["m1"])>0?$p[$i]["m1"]:0,strlen($p[$i]["m2"])>0?$p[$i]["m2"]:0,$id,$s["media_type"]=="image"?0:1,date("Y-m-d H:i:s",strtotime($p[$i]["m_time"])),date("Y-m-d H:i:s")));
}else{
	
	$y["response"]["count"]=(int)$articlenum;
	$y["response"]["articles"]=$articles;
	$y["response"]["related_articles"]=$relatedPosts;
	$y["request"]["length"]=(int)$length;
	$y["request"]["offset"]=(int)$offset;
}

/*
if(preg_match("/debugger/",$_SERVER['HTTP_REFERER'])){
	echo $sql;
}
*/

// お知らせ
if ($p > 0) {
  $sql = <<<SQL
SELECT 
		notices.*
FROM
		categories_notices,
		notices
WHERE
 		category_id = {$p[0]['categoryid']}
AND
		notice_id = notices.id
ORDER BY
		categories_notices.created_at DESC
SQL;

  $o->query($sql);
  $notice_list = $o->fetch_all();

  // お知らせ登録順(CMS上、上のもの優先)にループまわして、該当があれば そちらを採用して以降ループをbreak
  // -- 記事詳細では最新のお知らせ順から「詳細表示なし」であれば他のお知らせに該当カテゴリ「詳細表示あり」がないかあたる
  foreach ($notice_list as $notice)
  {
    if ($notice['is_hide_detail'] != 1)
    {
      $f = $notice;
      break;
    }
  }

// デフォルトのお知らせ取得
  if (empty($f))
  {
    $sql = <<<SQL
SELECT 
		notices.*
FROM
		categories_notices,
		notices
WHERE
 		category_id = 0
AND
		notice_id = notices.id
ORDER BY
		categories_notices.created_at DESC
LIMIT 1
SQL;

    $o->query($sql);
    $f = $o->fetch_array();
  }

  if (!empty($f))
  {
    // 定数
    $domain = "https://" . $_SERVER["HTTP_HOST"];
    $cf = $bucket=="img-sportsbull-jp" ? 'https://img.sportsbull.jp/raw/' : 'https://dev-img.sportsbull.jp/raw/';

    $type = $f['type'];
    $text_color = ['#333333', '#333333', ''];
    $background_color = ['#ffffff', '#ffcccc', ''];
    $icon = [
      $domain . '/information/icon/3x/information__icon__notice.png',
      $domain . '/information/icon/3x/information__icon__warning.png',
      '',
    ];
    $disp_type = ['notice', 'warning', 'img'];

    $platform_prefix_list = [
      'pc' 			=> '',
      'sp' 			=> 'sp_',
      'ios'			=> 'ios_',
      'android' => 'android_',
    ];
    // eof: 定数

    $f['text'] = isset($f['text']) ? $f['text'] : '';

    foreach($platform_prefix_list as $key => $prefix)
    {
      // フルパスで返す
      $img[$key] = isset($f[$prefix . 'img']) ? $cf . $f[$prefix . 'img'] : '';
      $link[$key] = isset($f[$prefix . 'link']) ? $f[$prefix . 'link'] : '';

      $information_list[$key] = [
        'type'             => $disp_type[$type],
        'text'             => $f['text'],
        'text_color'       => $text_color[$type],
        'background_color' => $background_color[$type],
        'icon'             => $icon[$type],
        'img'              => $img[$key],
        'link'             => $link[$key],
      ];
    }

  }
  else
  {
    $information_list = null;
  }

  $y['response']['information'] = $information_list;
}

print_json($y,$_SERVER['HTTP_REFERER']);

?>