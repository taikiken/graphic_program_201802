<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$offset=strlen($_REQUEST["offset"])>0?$_REQUEST["offset"]:0;
$length=strlen($_REQUEST["length"])>0?$_REQUEST["length"]:10;

$api=set_articleapi($_REQUEST["api"]);


function toFastArticleGitHub1377($row)
{
	unset($row["user"]);
	unset($row["description"]);
	unset($row["category"]);
	unset($row["category2"]);
	unset($row["media"]["original"]);

	unset($row["media"]["images"]["original"]);
	unset($row["media"]["video"]["url"]);
	unset($row["media"]["video"]["youtube"]);
	unset($row["media"]["video"]["facebook"]);
	unset($row["media"]["video"]["caption"]);
	unset($row["media"]["video"]["vast"]);
	unset($row["media"]["video"]["time"]);

	return $row;
}


if(strlen($api)>0){

	$limit=sprintf(" limit %s offset %s",$length,$offset);
	$orderby=set_orderby();

	if($api==="category"){

		$category=bind($_REQUEST["category"]);
		$type=bind($_REQUEST["type"]);
		$c=set_category2($category,$type);

		if($type===""){

			$sql=sprintf("select * from %s%s",sprintf($articletable2,set_isbookmark($uid),$c[1],$c[0]!=152?$orderby:" order by m_time,id desc",$limit),$c[0]!=152?$orderby:" order by m_time,id desc");
			$nsql=sprintf("select num as n from u_latestpost where m1=%s",$c[0]);

		}elseif($type==="ranking"){

			if($staticfileimport==1&&$offset==0&&$length==5){

				$file=sprintf("%s/static/%s-%s.json",$ImgPath,$category,$type);
				$y=get_contents($file);
				header('Content-Type: application/json; charset=utf-8');
				echo $y;
				exit;

			}else{

				if($category=="all"){
					$day=3;
				}else{
					$sql=sprintf("select p1 from u_categories where name_e='%s'",$category);
					$o->query($sql);
					$f=$o->fetch_array();
					$day=$f["p1"];
				}

				$sql=sprintf("select st2.* from (select pageid,n from u_view where %s and regitime > now() - interval '%s day' order by n desc) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s%s",
					str_replace(" and","",$c[1]),$day,sprintf($articletable2,set_isbookmark($uid),$c[1],"",""),"",$limit);
				$nsql=sprintf("select count(*) as n from (select pageid,n from u_view where %s and regitime > now() - interval '%s day') as st1,(select * from %s) as st2 where st1.pageid=st2.id%s",
					str_replace(" and","",$c[1]),$day,sprintf($articletable2c,$c[1],"",""),"");
			}
		}elseif($type==="video"){

			if($staticfileimport==1&&$offset==0&&$length==5){

				$file=sprintf("%s/static/%s-%s.json",$ImgPath,$category,$type);
				$y=get_contents($file);
				header('Content-Type: application/json; charset=utf-8');
				echo $y;
				exit;

			}else{

				$sql=sprintf("select st2.* from (select pageid,n from u_view where %s and video=1%s order by n desc) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s%s",
					str_replace(" and","",$c[1]),$category=="all"?" and regitime > now() - interval '7 day'":"",sprintf($articletable2,set_isbookmark($uid),$c[1],"",""),"",$limit);
				$nsql=sprintf("select count(*) as n from (select pageid,n from u_view where %s and video=1%s) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s",
					str_replace(" and","",$c[1]),$category=="all"?" and regitime > now() - interval '7 day'":"",sprintf($articletable2c,$c[1],"",""),"");
			}

			// #860 - ダミーレスポンス
		}elseif($type === "recommend"){


			if ( $category === 'crazy' ){
				$sql=sprintf("select rt1.title as modtitle,rt2.%s from (select d2,title,n as sort from u_headline where cid=11 and flag=1) as rt1,(select %s from %s) as rt2 where rt1.d2=rt2.id order by sort limit %s offset %s",str_replace(",",",rt2.",$articlefield),$articlefield,sprintf($articletable,set_isbookmark($uid),""),$length,$offset);
				$nsql="select count(id) as n from u_headline where cid=11 and flag=1";
			}else{

			}

		}

	}elseif($api==="search"){

		$q=set_condition($_REQUEST["q"]);

		if(strlen($q)>0){

			$sql=sprintf("select st02.* from (select id from u_index where %s and uptime > now() - interval '90 day') as st01,(select * from %s) as st02 where st01.id=st02.id order by m_time desc,id limit %s offset %s",$q,sprintf($articletable,set_isbookmark($uid)," and m1!=152"),$length,$offset);
			$nsql=sprintf("select count(t1.id) as n from (select id from u_index where %s and uptime > now() - interval '90 day') as t1,(select id from repo_n where cid=1 and m1!=152 and flag=1) as t2 where t1.id=t2.id",$q);

		}

	}elseif($api==="next"){

		$targetid=$_REQUEST["id"];

		$sql=sprintf("select st2.* from (select t2.id from (select m1,m_time from repo_n where id=%s) as t1,repo_n as t2 where t2.m1=t1.m1 and t2.m_time>t1.m_time order by t1.m_time %s) as st1,(select * from %s) as st2 where st1.id=st2.id order by m_time",
			$targetid,$limit,sprintf($articletable2,set_isbookmark($uid),"","",""));

		$nsql=sprintf("select count(*) as n from (select m1,m_time from repo_n where id=%s) as t1,repo_n as t2 where t2.m1=t1.m1 and t2.m_time>t1.m_time and t2.flag=1",$targetid);

	}elseif($api=="home"||$api=="self"){

		$cx=set_home($_REQUEST["c"]);

		if(strlen($cx)>0){
			if($cx==="home"){

				if($uid!=""){

					$sql=sprintf("select t2.pageid from (select categoryid from u_category where userid=%s and categoryid!=152 and flag=1) as t1,u_latestpost as t2 where t1.categoryid=t2.m1",$uid);
					$o->query($sql);
					while($f=$o->fetch_array()){
						$category[]=$f["pageid"];
					}

					if($_REQUEST["offset"]<count($category)){
						$category=implode(",",$category);
						$sql=sprintf("select *,1 as recommend from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id in(%s)",$category)));
						$sql.=sprintf(" union all select *,0 as recommend from %s order by recommend desc, m_time desc,id%s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id not in(%s) and m_time > now() - interval '3 day'",$category)),$limit);
					}else{
						$sql=sprintf("select * from %s order by m_time desc,id limit %s offset %s",sprintf($articletable,set_isbookmark($uid)," and m1!=152 and m_time > now() - interval '3 day'"),$length,$offset);
					}

				}else{
					$sql=sprintf("select %s from %s order by m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid)," and m1!=152 and m_time > now() - interval '3 day'"),$length,$offset);
				}
				$nsql="select count(id) as n from repo_n where cid=1 and flag=1 and m1!=152 and m_time > now() - interval '3 day'";

			}elseif($cx==="headline"){

				$sql=sprintf("select rt1.title as modtitle,rt2.%s from (select d2,title,n as sort from u_headline where cid=8 and flag=1) as rt1,(select %s from %s) as rt2 where rt1.d2=rt2.id order by sort limit %s offset %s",str_replace(",",",rt2.",$articlefield),$articlefield,sprintf($articletable,set_isbookmark($uid),""),$length,$offset);
				$nsql="select count(id) as n from u_headline where cid=8 and flag=1";

			}elseif($cx==="pickup"){

				$sql=sprintf("select rt1.title as modtitle,rt2.%s from (select d2,title,n as sort from u_headline where cid=8 and flag=1) as rt1,(select %s from %s) as rt2 where rt1.d2=rt2.id order by sort limit %s offset %s",str_replace(",",",rt2.",$articlefield),$articlefield,sprintf($articletable,set_isbookmark($uid),""),$length,$offset);
				$nsql="select count(id) as n from u_headline where cid=8 and flag=1";

			}elseif($cx==="personalized"){

				$c=$uid!=""?sprintf(" and (m1 in (select categoryid from u_category where userid=%s and flag=1) or m2 in (select categoryid from u_category where userid=%s and flag=1)) and m_time > now() - interval '3 day'",$uid,$uid):"";
				$sql=sprintf("select %s from %s order by m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid),$c),$length,$offset);
				$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1%s",$c);
			}
		}

	}elseif($api=="bookmark"){

		$uid=set_userid($uid);
		if(strlen($uid)>0){

			$sql=sprintf("select rt2.* from (select id as bookmarkid,pageid,regitime from u_bookmark where userid=%s and flag=1 order by regitime desc%s) as rt1,(select * from %s) as rt2 where rt1.pageid=rt2.id order by bookmarkid desc",
				$uid,$limit,sprintf($articletable2,set_isbookmark($uid),"","",""));
			$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1 and id in(select pageid from u_bookmark where userid=%s and flag=1)",$uid);

		}
	}
}

if($y["status"]["code"]===200){

	$o->query($nsql);
	$f=$o->fetch_array();
	$count=$f["n"];

	if($count>0){

		$o->query($sql);
		while($f=$o->fetch_array())$p[]=$f;

		//カテゴリー一覧でも使うのでファイルに出す
		for($i=0;$i<count($p);$i++){

			$s[$i]=toFastArticleGitHub1377(set_articleinfo($p[$i]));
		}

	}else{
		if($api==="search")set_status(array("code"=>404,"user_message"=>sprintf("検索語%sに該当する記事はありませんでした。",$_REQUEST["q"]),"developer_message"=>""));
	}
}

$y["response"]["count"]=(int)$count;
$y["response"]["articles"]=$s;

if($pickup){
	$y["response"]["pickup"]=$pickup;
}

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

print_json($y,$_SERVER['HTTP_REFERER']);

?>