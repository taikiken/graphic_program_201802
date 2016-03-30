<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

$api=set_articleapi($_REQUEST["api"]);

if(strlen($api)>0){
	
	$limit=sprintf(" limit %s offset %s",$length,$offset);
	$orderby=set_orderby();

	if($api==="category"){
		
		$category=bind($_REQUEST["category"]);
		$type=bind($_REQUEST["type"]);
		$c=set_category($category,$type);
		
		if($type===""){

			$sql=sprintf("select * from %s%s",sprintf($articletable2,set_isbookmark($uid),$c,$orderby,$limit),$orderby);
			$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1%s",$c);
/*
			$sql=sprintf("select %s from %s order by m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid),$c),$length,$offset);
			$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1%s",$c);
*/
		}elseif($type==="ranking"){

			$sql=sprintf("select st2.* from (select pageid,n from u_view where %s and video=0 and regitime > now() - interval '3 day' order by n desc limit 20 offset 0) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s%s",
			str_replace(" and","",$c),sprintf($articletable2,set_isbookmark($uid),$c,"","")," order by st1.n desc",$limit);
			$nsql="select 20 as n";
/*
			$sql=sprintf("select tq2.%s from (select pageid,count(pageid) as n from u_view group by pageid) as tq1,(select %s from %s and m_time > now()-interval '3day') as tq2 where tq1.pageid=tq2.id order by n desc,m_time desc,id limit %s offset %s",str_replace(",",",tq2.",$articlefield),$articlefield,sprintf($articletable,set_isbookmark($uid),$c),$length,$offset);
			$nsql=sprintf("select count(id) as n from (select t2.* from (select pageid,count(pageid) as n from u_view group by pageid) as t1,(select id,cid,m1,m2,flag from repo_n where m_time > now()-interval '3day') as t2 where t1.pageid=t2.id) as tt1 where cid=1 and flag=1%s",$c);
*/
		}elseif($type==="video"){

			$sql=sprintf("select st2.* from (select pageid,n from u_view where %s and video=1 order by n desc limit 20 offset 0) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s%s",
			str_replace(" and","",$c),sprintf($articletable2,set_isbookmark($uid),$c,"","")," order by st1.n desc",$limit);
			$nsql="select 20 as n";
/*		
			$sql=sprintf("select %s from %s order by m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid),$c." and (swf is not null or youtube is not null or facebook is not null)"),$length,$offset);
			$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1 and (swf is not null or youtube is not null or facebook is not null)%s",$c);
*/
		}
	
	}elseif($api==="search"){

		$q=set_condition($_REQUEST["q"]);
		
		if(strlen($q)>0){
			
			$sql=sprintf("select st2.* from (select id from u_index where uptime > now() - interval '14 day' and %s order by uptime desc) as st1,(select * from %s) as st2 where st1.id=st2.id%s%s",$q,sprintf($articletable2,set_isbookmark($uid),"","",""),"",$limit);
			$nsql=sprintf("select count(t1.id) as n from (select id from u_index where uptime > now() - interval '14 day' and %s) as t1,(select id from repo_n where cid=1 and flag=1) as t2 where t1.id=t2.id",$q);
/*
			$sql=sprintf("select st02.%s from (select id from u_index where %s) as st01,(select %s from %s) as st02 where st01.id=st02.id order by m_time desc,id limit %s offset %s",str_replace(",",",st02.",$articlefield),$q,$articlefield,sprintf($articletable,set_isbookmark($uid),""),$length,$offset);
			$nsql=sprintf("select count(t1.id) as n from (select id from u_index where %s) as t1,(select id from repo_n where cid=1 and flag=1) as t2 where t1.id=t2.id",$q);
*/
		}
		
	}elseif($api=="home"||$api=="self"){
		
		$cx=set_home($_REQUEST["c"]);
		
		if(strlen($cx)>0){
			if($cx==="home"){
				
				if($uid!=""){
/*

					$sql=sprintf("select st2.* from (select id as pageid from (select categoryid from u_category where userid=%s and flag=1) as t1,(select max(id) as id,m1 from repo_n where m_time > interval '-3 day' and flag=1 group by m1) as t2 where t1.categoryid=t2.m1) as st1,(select * from %s) as st2 where st1.pageid=st2.id%s%s",
					$uid,sprintf($articletable2,set_isbookmark($uid),$c,"",""),"",$limit);

					$ex=sprintf("select id from (select categoryid from u_category where userid=%s and flag=1) as t1,(select max(id) as id,m1,max(m_time) as m_time from repo_n where cid=1 and flag=1 and m_time > now() - interval '3 day' group by m1) as  t2 where t1.categoryid=t2.m1",$uid);
					$sql=sprintf("select %s,1 as recommend from %s union select %s,0 as recommend from %s order by recommend desc,m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid),sprintf(" and id in(%s) and m_time > now() - interval '3 day'",$ex)),$articlefield,sprintf($articletable,set_isbookmark($uid),sprintf(" and id not in(%s) and m_time > now() - interval '3 day'",$ex)),$length,$offset);

*/
					$sql=sprintf("select t2.pageid from (select categoryid from u_category where userid=%s and flag=1) as t1,u_latestpost as t2 where t1.categoryid=t2.m1",$uid);
					$o->query($sql);
					while($f=$o->fetch_array()){
						$category[]=$f["pageid"];
					}
					
					if($_REQUEST["offset"]<count($category)){
						$category=implode(",",$category);
						$sql=sprintf("select *,1 as recommend from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id in(%s)",$category)));
						$sql.=sprintf(" union all select *,0 as recommend from %s order by recommend desc, m_time desc,id%s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id not in(%s) and m1!=130 and m_time > now() - interval '30 day'",$category)),$limit);
					}else{
						$sql=sprintf("select %s from %s order by m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid)," and m1!=130 and m_time > now() - interval '3 day'"),$length,$offset);
					}
					
				}else{
					$sql=sprintf("select %s from %s order by m_time desc,id limit %s offset %s",$articlefield,sprintf($articletable,set_isbookmark($uid)," and m1!=130 and m_time > now() - interval '3 day'"),$length,$offset);
				}
				$nsql="select count(id) as n from repo_n where cid=1 and flag=1 and m1!=130 and m_time > now() - interval '3 day'";
			
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

			$sql=sprintf("select rt2.* from (select id as bookmarkid,pageid,regitime from u_bookmark where userid=%s and flag=1 order by id desc%s) as rt1,(select * from %s) as rt2 where rt1.pageid=rt2.id order by bookmarkid desc",
			$uid,$limit,sprintf($articletable2,set_isbookmark($uid),"","",""));
			$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1 and id in(select pageid from u_bookmark where userid=%s and flag=1)",$uid);
/*
			$sql=sprintf("select rt2.%s from (select pageid,regitime from u_bookmark where userid=%s and flag=1) as rt1,(select %s from %s) as rt2 where rt1.pageid=rt2.id order by regitime desc,id limit %s offset %s",str_replace(",",",rt2.",$articlefield),$uid,$articlefield,sprintf($articletable,set_isbookmark($uid),""),$length,$offset);
			$nsql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1 and id in(select pageid from u_bookmark where userid=%s and flag=1)",$uid);
*/
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
		for($i=0;$i<count($p);$i++){
			
			$s[$i]=set_articleinfo($p[$i]);
			
			$sql=sprintf("select count(id) as n from u_comment where pageid=%s and commentid=0 and flag=1",$p[$i]["id"]);
			$o->query($sql);
			$f=$o->fetch_array();
			
			$s[$i]["comments_count"]=(int)$f["n"];
			
			if($f["n"]>0){
				
				$sql=sprintf("select * from 
					(select t2.*,t1.good,t1.bad,t1.rank from 
						(select commentid,good,bad,reply,rank from u_ranking where pageid=%s order by rank desc limit 6 offset 0) as t1,
						(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
					where t1.commentid=t2.id) as st1,
					(select 
						id as uid,
						cid as typeid,
						(select name from repo where id=cid) as type,
						title as name,
						t2 as profile,
						img1 as icon 
					from u_member where flag=1) as st2
					where st1.userid=st2.uid",$p[$i]["id"],set_isreaction($uid),$p[$i]["id"]);

				$o->query($sql);
				$n=0;
		
				while($f=$o->fetch_array()){
					$s[$i]["comments_popular"][$n]=set_commentinfo($f,1);
					$n++;
				}
			}else{
				$s[$i]["comments_popular"]=array();
			}
		}
	}else{
		if($api==="search")set_status(array("code"=>404,"user_message"=>sprintf("検索語%sに該当する記事はありませんでした。",$_REQUEST["q"]),"developer_message"=>""));
	}
}

$y["response"]["count"]=(int)$count;
$y["response"]["articles"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

print_json($y,$_SERVER['HTTP_REFERER']);

?>