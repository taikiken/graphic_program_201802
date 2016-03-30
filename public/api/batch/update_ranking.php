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

$sql="select id,pageid from u_comment where flag=1 and (select flag from u_member where id=userid)=1";
$o->query($sql);
while($f=$o->fetch_array()){
	$s[]=$f;
}

for($i=0;$i<count($s);$i++){

	$update=array();
	
	$sql=sprintf("select id from u_ranking where commentid=%s",$s[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$id=$f["id"];	
	
	if($s[$i]["commentid"]==0){
		$sql=sprintf("select count(commentid) as n from u_reaction where commentid=%s and reaction=1 and flag=1 and (select flag from u_member where id=userid)=1",$s[$i]["id"]);
		$o->query($sql);
		$f=$o->fetch_array();
		$s[$i]["reply"]=$f["n"];
	}else{
		$s[$i]["reply"]=0;
	}
	
	$sql=sprintf("select count(commentid) as n from u_reaction where commentid=%s and reaction=1 and flag=1 and (select flag from u_member where id=userid)=1",$s[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$s[$i]["good"]=$f["n"];

	$sql=sprintf("select count(commentid) as n from u_reaction where commentid=%s and reaction=2 and flag=1 and (select flag from u_member where id=userid)=1",$s[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$s[$i]["bad"]=$f["n"];
	
	$s[$i]["rank"]=$s[$i]["reply"]+$s[$i]["like"]+$s[$i]["bad"];
	
	if(strlen($id)>0){
		$in[]=sprintf("update u_ranking set good=%s,bad=%s,reply=%s,rank=%s from u_ranking where id=%s and rank!=%s;",$s[$i]["good"],$s[$i]["bad"],$s[$i]["reply"],$s[$i]["rank"],$s[$i]["id"],$s[$i]["rank"]);
	}else{
		$in[]=sprintf("insert into u_ranking select nextval('u_ranking_id_seq'),%s,%s,%s,%s,%s,%s;",$s[$i]["pageid"],$s[$i]["id"],$s[$i]["good"],$s[$i]["bad"],$s[$i]["reply"],$s[$i]["rank"]);
	}	
}

$in=implode("\n",$in);
$o->query($in);

?>
