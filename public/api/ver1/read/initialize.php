<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();

if(strlen($uid)>0){

	$sql=sprintf("select id as userid,cid as typeid,(select name from repo where id=u_member.cid) as type,title as name,t2 as profile,img1 as icon from u_member where id=%s",$uid);
	$o->query($sql);
	$f=$o->fetch_array();

	$category=array();
	$n=0;
	$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,name_e from u_categories where flag=1) as t2 where t1.categoryid=t2.id order by id",$uid);
	$o->query($sql);
	
	while($p=$o->fetch_array()){
		$category[$n]["id"]=(int)$p["id"];
		$category[$n]["slug"]=$p["name_e"];
		$category[$n]["label"]=$p["name"];
		$n++;
	}
	$f["interest"]=$category;
	$s["user"]=set_userinfo($f,1);

}else{
	$s["user"]=(object)array();
}

if(strlen($uid)==0){
	$sql="select id,name,name_e,img from u_categories where flag=1 order by n";
}else{
	$sql=sprintf("select t1.*,(case when t2.c=1 then 1 else 0 end) as interest from (select id,name,name_e,img,n from u_categories where flag=1) as t1 left join (select 1 as c,categoryid from u_category where userid=%s and flag=1) as t2 on t1.id=t2.categoryid order by c,n",$uid);
}

$o->query($sql);
while($f=$o->fetch_array()){
	$s["cateories"][]=set_categoryinfo($f,"",0);
}

if(strlen($uid)>0){

	$sql=sprintf("
	select count(t1.reuserid) as n from 
	(select id as uid from u_member where id=%s and flag=1) as t2,
	(select reuserid,(select title from repo_n where id=pageid and flag=1) as title,(select flag from u_member where id=reuserid) as uflag from u_activity where reuserid=%s and flag=1 and activity!=4 and notice=1 and activityid is not null) as t1
	where t2.uid=t1.reuserid",$uid,$uid);

	$o->query($sql);
	$f=$o->fetch_array();
	$s["unread"]=(int)$f["n"];

}else{
	$s["unread"]=0;

}

unset($p);

/*

重いので分ける

$sql=sprintf("
select 0 as h,0 as recommend,tt1.*,tt2.sort,tt2.modtitle from (select d2,title as modtitle,n as sort from repo_n where cid=8 and flag=1) as tt2,(select * from %s) as tt1 where tt2.d2=tt1.id union all 
select 1 as h,0 as recommend,tt1.*,tt2.sort,tt2.modtitle from (select d2,title as modtitle,n as sort from repo_n where cid=8 and flag=1) as tt2,(select * from %s) as tt1 where tt2.d2=tt1.id union all ",
sprintf($articletable,set_isbookmark($uid),""),
sprintf($articletable,set_isbookmark($uid),"")
);
if($uid!=""){
	$sql.=sprintf("(select 2 as h,1 as recommend,st02.*,1 as sort,'' as modtitle from (select t2.id,t2.m_time from (select categoryid from u_category where userid=%s and flag=1) as t1,(select max(id) as id,m1,max(m_time) as m_time from repo_n where cid=1 and flag=1 and m_time > now() - interval '3 day' group by m1) as  t2 where t1.categoryid=t2.m1 order by m_time desc limit 3 offset 0) as st01,(select * from %s) as st02 where st01.id=st02.id union (select 2 as h,0 as recommend,*,1 as sort,'' as modtitle from %s) order by recommend desc,m_time desc limit 10 offset 0)",
	$uid,sprintf($articletable,set_isbookmark($uid)," and m1!=130"),sprintf($articletable,set_isbookmark($uid)," and m1!=130"));
}else{
	$sql.=sprintf("(select 2 as h,0 as recommend,*,1 as sort,'' as modtitle from %s order by m_time desc limit 10 offset 0)",sprintf($articletable,set_isbookmark($uid)," and m1!=130"));
}
$sql.=" order by h,sort,recommend desc,m_time desc";
*/

$sql=sprintf("select 0 as h,0 as recommend,tt1.*,tt2.sort,tt2.modtitle from (select d2,n as sort,title as modtitle from u_headline where cid=8 and flag=1) as tt2,(select * from %s) as tt1 where tt2.d2=tt1.id order by sort",sprintf($articletable,set_isbookmark($uid),""));
$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;

$sql=sprintf("select 1 as h,0 as recommend,tt1.*,tt2.sort,tt2.modtitle from (select d2,n as sort,title as modtitle from u_headline where cid=8 and flag=1) as tt2,(select * from %s) as tt1 where tt2.d2=tt1.id order by sort",sprintf($articletable,set_isbookmark($uid),""));
$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;

if($uid!=""){

	$sql=sprintf("select t2.pageid from (select categoryid from u_category where userid=%s and flag=1) as t1,u_latestpost as t2 where t1.categoryid=t2.m1",$uid);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$categories[]=$f["pageid"];
	}
	
	if(count($category)>0){
		$categories=implode(",",$categories);
		$sql=sprintf("select 2 as h,*,1 as recommend from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id in(%s)",$categories)));
		$sql.=sprintf(" union all select 2 as h,*,0 as recommend from %s order by recommend desc, m_time desc,id%s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id not in(%s) and m_time > now() - interval '3 day'",$categories)),sprintf(" limit %s offset %s",100,0));
	}else{
		$sql=sprintf("select 2 as h,* from %s order by m_time desc,id limit %s offset %s",sprintf($articletable,set_isbookmark($uid)," and m_time > now() - interval '3 day'"),100,0);
	}
	
}else{
	$sql=sprintf("select 2 as h,* from %s order by m_time desc,id limit %s offset %s",sprintf($articletable,set_isbookmark($uid)," and m_time > now() - interval '3 day'"),100,0);
}

/*
if($uid!=""){
	$sql=sprintf("select 2 as h,1 as recommend,st02.*,1 as sort from (select t2.id,t2.m_time from (select categoryid from u_category where userid=%s and flag=1) as t1,(select max(id) as id,m1,max(m_time) as m_time from repo_n where cid=1 and flag=1 and m_time > now() - interval '3 day' group by m1) as  t2 where t1.categoryid=t2.m1 order by m_time desc limit 3 offset 0) as st01,(select * from %s) as st02 where st01.id=st02.id union (select 2 as h,0 as recommend,*,1 as sort from %s) order by recommend desc,m_time desc limit 10 offset 0",$uid,sprintf($articletable,set_isbookmark($uid)," and m1!=130"),sprintf($articletable,set_isbookmark($uid)," and m1!=130"));
}else{
	$sql=sprintf("select 2 as h,0 as recommend,*,1 as sort from %s order by m_time desc limit 10 offset 0",sprintf($articletable,set_isbookmark($uid)," and m1!=130"));
}
*/

$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;

$hg=array("headline","pickup","latest");

$nn=0;

for($i=0;$i<count($p);$i++){
	
	if($p[$i]["h"]<=1){
		$nm=$p[$i]["sort"]-1;
	}else{
		$nm=$nn;
		$nn++;
	}
	
	$s[$hg[$p[$i]["h"]]][$nm]=set_articleinfo($p[$i]);
	
	$sql=sprintf("select count(*) as n from u_ranking where pageid=%s and flag=1 and userflag=1",$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s[$hg[$p[$i]["h"]]][$nm]["comments_count"]=(int)$f["n"];
	
	if($f["n"]>0){

				$sql=sprintf("select * from 
					(select t2.*,t1.good,t1.bad,t1.rank from 
						(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and flag=1 and userflag=1 order by rank desc limit %s offset %s) as t1,
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
					where st1.userid=st2.uid order by rank desc",$p[$i]["id"],6,0,set_isreaction($uid),$p[$i]["id"]);
					
/*
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
*/
		$o->query($sql);
		$n=0;

		while($f=$o->fetch_array()){
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]=set_commentinfo($f,1);
			$n++;
		}	
	}else{
		$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"]=array();
	}	
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);


?>