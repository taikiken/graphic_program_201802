<?php

/* 60分おきに集計 */

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$d=get_contents(sprintf("%s/api/batch/output_log.php",$domain));
$d=explode("\n",$d);
for($i=0;$i<count($d);$i++){
	if(strlen($d[$i])<3)continue;
	$f=explode("\t",$d[$i]);
	$y=sprintf("%s|%s|%s|%s|%s",$f[0],$f[1],$f[2],$f[3],$f[4]);
	if($s[$y]){
		$s[$y]++;
	}else{
		$s[$y]=1;
	}
}

/*
	TSVテキストの内容
	m1	m2	id	videoflag	m_time
	
	DBのフィールド
	m1	m2	pageid	video	regitime	n
*/

//ビューの無い記事を閲覧数0でランキングテーブルへ追加
$sql[]="insert into u_view(m1,m2,pageid,video,regitime,n) select m1,m2,id,0,m_time,0 from repo_n where id not in (select pageid from u_view);";

while(list($k,$v)=each($s)){
	$k=explode("|",$k);
	$sql[]=sprintf("update u_view set n=n+%s where pageid=%s;",$v,$k[2]);
	$sql[]=sprintf("insert into u_view select nextval('u_view_id_seq'),%s,%s,%s,%s,'%s',%s where not exists (select id from u_view where pageid=%s);",$k[0],$k[1],$k[2],$k[3],$k[4],$v,$k[2]);
}

//記事のカテゴリーが更新された際に、ランキングテーブルのカテゴリーも更新
$sql[]="update u_view set m1=t.m1a,m2=t.m2a from (select t2.id,t1.m1,t1.m2,t2.m1 as m1a,(case when t2.m2 is null then 0 else t2.m2 end) as m2a from u_view as t1,repo_n as t2 where t1.pageid=t2.id and (t1.m1!=t2.m1 or t1.m2!=t2.m2)) as t where pageid=t.id;";

//動画紐づけ include/conf/config.php の$VIDEOTAGで定義
for($i=0;$i<count($VIDEOTAG);$i++){
	$query[]=sprintf("title like '%s%s%s'","%",$VIDEOTAG[$i],"%");
}
$sql[]=sprintf("update u_view set video=1 where video=0 and pageid in (select max(nid) as id from repo_e where (types=5 or types=3) and (%s) group by nid);",implode(" or ",$query));
$sql[]="update u_view set video=1 where pageid in (select id from repo_n where videoflag=173 or brightcove is not null or swf is not null or youtube is not null or facebook is not null) and video=0;";
$sql[]="update u_view set video=0 where pageid in (select id from repo_n where videoflag=172) and video=1;";

//高校野球カテゴリー紐づけ ※大会期間内のみ
//$sql[]="update repo_n set m1=136 where (m1!=136 or m2!=136) and m1!=142 and keyword like '%高校野球%';";
//$sql[]="update repo_n set m1=136 where m1!=142 and m2!=136 and keyword like '%高校野球%' or keyword like '%地区大会%';";

//朝日新聞 keywordに リオパラ を含む記事をリオ五輪に紐づけ
$sql[]="update repo_n set m1=141,m2=128 where id in(select id from repo_n where keyword like '%リオパラ%' and m1!=141 and d2=1 and m2 is null);";

//第一、第二カテゴリーとも同じものを修正
$sql[]="update repo_n set m2=null where m1=m2;";

//第一カテゴリ未指定、第二カテゴリー指定の際に第二を第一に修正
$sql[]="update repo_n set m1=m2 where m1 is null and m2 is not null;";


$sql=implode("\n",$sql);
$o->query($sql);


?>