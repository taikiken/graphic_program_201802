<?php

/* 60分おきに集計 */

include $INCLUDEPATH."local.php";

if($_GET["p"]){

	$server=array();
	$server[0]="localhost";
	$server[1]="52.192.238.87";
	$server[2]="52.193.228.54";
	
	$o=new db;
	$o->connect();
	
	$s=array();
	$fp=fopen(sprintf("http://%s/api/batch/output_log.php",$server[$_GET["p"]]),"r");
	//$fp=fopen("http://52.192.238.87/api/batch/output_log.php","r");
	while($f=fgetcsv($fp,1024,"\t")){
		if(strtotime($f[4])>strtotime('-30 day')){
			$y=sprintf("%s|%s|%s|%s|%s",$f[0],$f[1],$f[2],$f[3],$f[4]);
			if($s[$y]){
				$s[$y]++;
			}else{
				$s[$y]=1;
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
	
	$sql=implode("\n",$sql);
	$o->query($sql);
}

?>