<?php

for($i=0;$i<count($p);$i++){
	
	$s[$i]=set_articleinfo($p[$i]);
	
	$sql=sprintf("select count(*) as n from u_ranking where pageid=%s and flag=1 and userflag=1",$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s[$i]["comments_count"]=(int)$f["n"];
	
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

?>