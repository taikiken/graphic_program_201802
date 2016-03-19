<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();

if(strlen($uid)>0){
	$sql=sprintf("select id as uid,cid as typeid,(select name from repo where id=repo_n.cid) as type,title as name,t2 as profile,img1 as icon from repo_n where id=%s",!$_REQUEST["userid"]?$uid:$_REQUEST["userid"]);
	$o->query($sql);
	$f=$o->fetch_array();

	$s["user"]["id"]=(int)$f["uid"];
	$s["user"]["name"]=mod_HTML($f["name"]);
	$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
	$s["user"]["bio"]=checkstr($f["profile"]);
	$s["user"]["url"]=sprintf("%s/mypage/",$domain,$f["uid"]);
	
	$s["user"]["type"]["id"]=(int)$f["typeid"];
	$s["user"]["type"]["label"]=$f["type"];
	
	$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,name_e from pm_ where cid=20) as t2 where t1.categoryid=t2.id order by id",$uid);
	$o->query($sql);
	
	$n=0;
	while($f=$o->fetch_array()){
		$s["user"]["interest"][$n]["id"]=$f["id"];
		$s["user"]["interest"][$n]["slug"]=$f["name_e"];
		$s["user"]["interest"][$n]["label"]=$f["name"];
		$n++;
	}
}else{
	$s["user"]=(object)array();
}

if(strlen($uid)==0){
	$sql="select id,name,name_e,img from pm_ where cid=20 and flag=1 order by n";
}else{
	$sql=sprintf("select id,name,name_e,img,n,1 as m from pm_ where id in (select categoryid from u_category where userid=%s and flag=1) and flag=1 union select id,name,name_e,img,n,2 as m from pm_ where cid=20 and flag=1 and id not in (select categoryid from u_category where userid=%s and flag=1) order by m,n",$uid,$uid);
}

$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;
for($i=0;$i<count($p);$i++){
	$s["cateory"][$i]["id"]=(int)$p[$i]["id"];
	$s["cateory"][$i]["label"]=$p[$i]["name"];
	$s["cateory"][$i]["slug"]=$p[$i]["name_e"];
	$s["cateory"][$i]["url"]=sprintf("%s/category/%s/",$domain,$p[$i]["name_e"]);
	$s["cateory"][$i]["title_img"]=strlen($p[$i]["img"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["img"]):"";
}

if(strlen($uid)>0){
	$sql=sprintf("select count(id) as n from u_activity where id in (%s) and reuserid=%s and notice=1",sprintf($noticetable,$uid,$uid),$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	$s["unread"]=(int)$f["n"];
}else{
	$s["unread"]=0;

}

unset($p);

$sql=sprintf("
select 0 as h,0 as recommend,tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=8 and flag=1) as tt2,(select * from %s) as tt1 where tt2.d2=tt1.id union all 
select 1 as h,0 as recommend,tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=8 and flag=1) as tt2,(select * from %s) as tt1 where tt2.d2=tt1.id union all ",
sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",""),
sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"","")
);
if($uid!=""){
	$sql.=sprintf("(select 2 as h,1 as recommend,st02.*,1 as sort from (select t2.id,t2.m_time from (select categoryid from u_category where userid=%s and flag=1) as t1,(select max(id) as id,m1,max(m_time) as m_time from repo_n where cid=1 and flag=1 and m_time > now() - interval '3 day' group by m1) as  t2 where t1.categoryid=t2.m1 order by m_time desc limit 3 offset 0) as st01,(select * from %s) as st02 where st01.id=st02.id union (select 2 as h,0 as recommend,*,1 as sort from %s) order by recommend desc,m_time desc limit 10 offset 0)",
	$uid,sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):""," and m1!=130"),sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):""," and m1!=130"));
}else{
	$sql.=sprintf("(select 2 as h,0 as recommend,*,1 as sort from %s order by m_time desc limit 10 offset 0)",sprintf($articletable,""," and m1!=130"));
}
$sql.=" order by h,sort,recommend desc,relativetime";

$hg=array("headline","pickup","latest");

$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;

$nn=0;

for($i=0;$i<count($p);$i++){
	
	if($p[$i]["h"]<=1){
		$nm=$p[$i]["sort"]-1;
	}else{
		$nm=$nn;
		$nn++;
	}
	
	$s[$hg[$p[$i]["h"]]][$nm]=set_articleinfo($p[$i]);
	$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1",$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s[$hg[$p[$i]["h"]]][$nm]["comments_count"]=(int)$f["n"];
	
	if($f["n"]>0){

		$sql=sprintf("select t1.*,t2.*,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit 6 offset 0",
		sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$p[$i]["id"]),""));
		$o->query($sql);
		$n=0;

		while($f=$o->fetch_array()){
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]=set_commentinfo($f);
			$n++;
		}
		
	}else{
		$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"]=array();
	}
	
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);


?>