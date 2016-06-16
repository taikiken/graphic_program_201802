<?php

/* 60分おきに集計 */

include $INCLUDEPATH."local.php";

if($_GET["p"]){

	$server=array();	
	if(preg_match("/cms/",$servername)){
		$server[]="52.192.238.87";
		$server[]="52.193.228.54";
	}elseif(preg_match("/(dev|dev2|stg)/",$servername)){
		$server[]="52.69.203.137";
	}else{
		$server[]="localhost";
	}
	
	$o=new db;
	$o->connect();
	
	$s=array();
	
	for($i=0;$i<count($server);$i++){
		$fp=fopen(sprintf("http://%s/api/batch/output_log.php",$server[$i]),"r");
		while($f=fgetcsv($fp,1024,"\t")){
			if(strtotime($f[4])>strtotime('-365 day')){
				$y=sprintf("%s|%s|%s|%s|%s",$f[0],$f[1],$f[2],$f[3],$f[4]);
				if($s[$y]){
					$s[$y]++;
				}else{
					$s[$y]=1;
				}
			}	
		}
	}

	/*
		TSVテキストの内容
		m1	m2	id	videoflag	m_time
		
		DBのフィールド
		m1	m2	pageid	video	regitime	n
	*/

	while(list($k,$v)=each($s)){
		$k=explode("|",$k);
		$sql[]=sprintf("update u_view set n=n+%s where pageid=%s;",$v,$k[2]);
		$sql[]=sprintf("insert into u_view select nextval('u_view_id_seq'),%s,%s,%s,%s,'%s',%s where not exists (select id from u_view where pageid=%s);",$k[0],$k[1],$k[2],$k[3],$k[4],$v,$k[2]);
	}
	$sql[]="update u_view set m1=t.m1a,m2=t.m2a from (select t2.id,t1.m1,t1.m2,t2.m1 as m1a,(case when t2.m2 is null then 0 else t2.m2 end) as m2a from u_view as t1,repo_n as t2 where t1.pageid=t2.id and (t1.m1!=t2.m1 or t1.m2!=t2.m2)) as t where pageid=t.id;";
	$sql=implode("\n",$sql);
	$o->query($sql);

}

?>