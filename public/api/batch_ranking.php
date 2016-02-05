<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$minute=60*24*10;

$sql=sprintf("

insert into u_ranking 
	select t1.id,(case when t2.n>0 then t2.n else 0 end) as n from 
		(select id from repo_n where cid=1) as t1 
	left join 
		(select pageid as id,count(pageid) as n 
			from 
				(select pageid,regitime from u_bookmark 
				union all 
			select pageid,regitime from u_comment 
				union all 
			select t1.pageid,t2.regitime from u_comment as t1,u_reaction as t2 where t1.id=t2.commentid) as t where regitime > now() - interval '%s minute' group by pageid) as t2 on t1.id=t2.id",$minute);

$o->query($sql);

$sql=sprintf("update u_ranking set n=t.n from (select t1.id,(case when t2.n>0 then t2.n else 0 end) as n from (select id from repo_n where cid=1) as t1 left join (select pageid as id,count(pageid) as n from (select pageid,regitime from u_bookmark union all select pageid,regitime from u_comment union all select t1.pageid,t2.regitime from u_comment as t1,u_reaction as t2 where t1.id=t2.commentid) as t where regitime > now() - interval '%s minute' group by pageid) as t2 on t1.id=t2.id) as t where u_ranking.id=t.id",$minute);
$o->query($sql);

?>