<?php

/* 60分おきに集計 */

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

/*
$sql="
update u_ranking set reaction=tmptable.reaction,reply=tmptable.reply,rank=tmptable.rank from 
 (select pt2.id,pt1.* from (
select et1.* from (select ot2.pageid,ot1.* from (select t1.commentid,t1.n as reaction,t2.n as reply,(t1.n+t2.n) as rank from 
(select commentid,count(commentid) as n from u_reaction where flag=1 and (select flag from u_member where id=userid)=1 group by commentid) as t1,
(select commentid,count(commentid) as n from u_comment where commentid!=0 and flag=1 and (select flag from u_member where id=userid)=1 group by commentid) as t2 
where t1.commentid=t2.commentid) as ot1,(select id,pageid from u_comment) as ot2 where ot1.commentid=ot2.id) as et1
) as pt1,
(select id,pageid as opageid,commentid as ocommentid,rank as orank from u_ranking) as pt2 where pt1.commentid=pt2.ocommentid and pt1.pageid=pt2.opageid and pt1.rank!=pt2.orank) as tmptable where u_ranking.id=tmptable.id;

insert into u_ranking select nextval('u_ranking_id_seq'),et1.* from (select ot2.pageid,ot1.* from (select t1.commentid,t1.n as reaction,t2.n as reply,(t1.n+t2.n) as rank from 
(select commentid,count(commentid) as n from u_reaction where flag=1 and (select flag from u_member where id=userid)=1 group by commentid) as t1,
(select commentid,count(commentid) as n from u_comment where commentid!=0 and flag=1 and (select flag from u_member where id=userid)=1 group by commentid) as t2 
where t1.commentid=t2.commentid) as ot1,(select id,pageid from u_comment) as ot2 where ot1.commentid=ot2.id) as et1 where not exists (select * from u_ranking where commentid=et1.commentid and pageid=et1.pageid);";
*/

$psql[]="update u_ranking set userflag=t2.uf from (select * from (select id,userflag,(select flag from u_member where id=u_ranking.userid) as uf from u_ranking) as t where t.userflag!=t.uf) as t2 where u_ranking.id=t2.id;";
$psql[]="update u_ranking set flag=0 where flag=1 and userflag=0;";
$psql[]="update u_comment set flag=0 where flag=1 and (select flag from u_member where id=u_comment.userid)=0;";
$psql=implode("\n",$psql);
$o->query($psql);

$sql="select 
	id,
	pageid,
	flag,
	userid,
	(select cid from u_member where id=userid) as cid,
	(select flag from u_member where id=userid) as userflag,
	(select count(*) as n from u_comment as t where t.commentid=u_comment.id and flag=1 and (select flag from u_member where id=t.userid)=1) as reply,
	(select count(commentid) as n from u_reaction where commentid=u_comment.id and flag=1 and reaction=1 and (select flag from u_member where id=u_reaction.userid)=1) as good,
	(select count(commentid) as n from u_reaction where commentid=u_comment.id and flag=1 and reaction=2 and (select flag from u_member where id=u_reaction.userid)=1) as bad 
from u_comment where commentid=0";

$o->query($sql);
while($f=$o->fetch_array()){
	
	$rank=$f["reply"]+$f["good"]+$f["bad"];
	$in[]=sprintf("update u_ranking set good=%s,bad=%s,reply=%s,rank=%s,flag=%s,userflag=%s,userid=%s,cid=%s where commentid=%s and (rank!=%s and flag!=%s and userflag!=%s);",
	$f["good"],$f["bad"],$f["reply"],$rank,$f["flag"],strlen($f["userflag"])>0?$f["userflag"]:0,$f["userid"],strlen($f["cid"])>0?$f["cid"]:6,$f["id"],$rank,$f["flag"],strlen($f["userflag"])>0?$f["userflag"]:0);

}

$in=implode("\n",$in);
$o->query($in);

?>
