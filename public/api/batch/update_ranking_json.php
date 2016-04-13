<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$sql="select id,name,name_e,img from pm_ where cid=20 and flag=1 order by n";
$o->query($sql);

$categorylist[]=array("id"=>"0","name_e"=>"すべて","name_e"=>"all");
while($f=$o->fetch_array()){
	$categorylist[]=$f;
}

$uid="";

$offset=0;
$length=5;
$limit=sprintf(" limit %s offset %s",$length,$offset);

for($i=0;$i<count($categorylist);$i++){


	/*
	
	ランキング出力
	
	*/
	unset($s);	
	$c=set_category2($categorylist[$i]["name_e"],"ranking");
	$sql=sprintf("select st1.n,st2.* from (select pageid,n from u_view where %s and video=0 and regitime > now() - interval '3 day' order by n desc) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s order by n desc %s",
	str_replace(" and","",$c[1]),sprintf($articletable2,set_isbookmark($uid),$c[1],"",""),"",$limit);

	$j=0;
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s[$j]=set_articleinfo($f);
		$s[$j]["comments_count"]=0;
		$s[$j]["comments_popular"]=array();
		$j++;
	}
	
	$y["response"]["count"]=count($s);
	$y["response"]["articles"]=$s;

	$y["request"]["length"]=$length;
	$y["request"]["offset"]=$offset;

	$s=json_encode($y);
	file_put_contents(sprintf("%s/ver1/static/%s-%s.json","..",$categorylist[$i]["name_e"],"ranking"),json_encode($y));


	/*
	
	レコメンド動画出力
	
	*/
	unset($s);	
	$c=set_category2($categorylist[$i]["name_e"],"video");
	$sql=sprintf("select st1.n,st2.* from (select pageid,n from u_view where %s and video=1 order by n desc) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s order by n desc  %s",
	str_replace(" and","",$c[1]),sprintf($articletable2,set_isbookmark($uid),$c[1],"",""),"",$limit);
	
	$j=0;
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s[$j]=set_articleinfo($f);
		$s[$j]["comments_count"]=0;
		$s[$j]["comments_popular"]=array();
		$j++;
	}
	
	$y["response"]["count"]=count($s);
	$y["response"]["articles"]=$s;

	$y["request"]["length"]=$length;
	$y["request"]["offset"]=$offset;

	$s=json_encode($y);
	file_put_contents(sprintf("%s/ver1/static/%s-%s.json","..",$categorylist[$i]["name_e"],"video"),json_encode($y));
	
	
	if($categorylist[$i]["id"]!=0){

		/*
		
		関連リンク出力
		
		*/
		unset($s);
		$sql=sprintf("select * from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and m1=%s order by m_time desc limit 4 offset 0",$categorylist[$i]["id"])));
		$o->query($sql);
		while($f=$o->fetch_array()){
			$s[]=set_articleinfo($f,1);
		}
		file_put_contents(sprintf("%s/ver1/static/%s.dat","..",$categorylist[$i]["id"]),serialize($s));
	}
}

unset($s);
for($i=1;$i<count($categorylist);$i++){
	$s[]=set_categoryinfo($categorylist[$i]);
}
$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";
$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;
file_put_contents(sprintf("%s/ver1/static/category.json",".."),json_encode($y));

unset($s);
$s=array();
$sql="select min(id) as id from repo_n where m_time > now() - interval '3 day'";
$o->query($sql);
$f=$o->fetch_array();
$s['3day']=$f["id"];

$sql="select min(id) as id from repo_n where m_time > now() - interval '30 day'";
$o->query($sql);
$f=$o->fetch_array();
$s['30day']=$f["id"];

file_put_contents(sprintf("%s/ver1/static/targetid.dat",".."),serialize($s));

?>