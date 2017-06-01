<?php

include "local.php";
include "public/import.php";

$o=new db;
$o->connect();

$bucketName="wbc";
$mediaid=33;
$categoryid=150;
$imgpath="https://video-jp.sportsbull.jp";

$dev=array("title","a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","a11","a12","u_time","img1","t1","t2");
$cms=array("title","a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","a11","a12","u_time","img1","swf","t1");

$file=sprintf("%s/out_data.php?media=%s",$MEDIADATA,$bucketName);
$data=unserialize(get_contents($file));

while(list($k,$v)=each($data)){
	
	$sql=sprintf("select *,(select body from repo_body where pid=repo_n.id) as body from repo_n where swf='%s' and d2=%s",$v["t1"],$mediaid);
	$o->query($sql);
	$dbdata=$o->fetch_array();

	$sql=sprintf("select * from u_encoded where filename='%s' and bucket='%s' order by m_time desc limit 1 offset 0",$v["t1"],$bucketName);
	$o->query($sql);
	$encoded=$o->fetch_array();
	
	$sv[$sn[]="title"]=$v["title"];
	$sv[$sn[]="swf"]=$v["t1"];
	$sv[$sn[]="t1"]=$v["t2"];
	$sv[$sn[]="m1"]=$categoryid;
	$sv[$sn[]="m2"]=113;
	$sv[$sn[]="a1"]=$v["a1"];
	$sv[$sn[]="a2"]=sprintf('%02d',$v["a2"]);
	$sv[$sn[]="a3"]=sprintf('%02d',$v["a3"]);
	$sv[$sn[]="a4"]=sprintf('%02d',$v["a4"]);
	$sv[$sn[]="a5"]=sprintf('%02d',$v["a5"]);
	$sv[$sn[]="a6"]=sprintf('%02d',$v["a6"]);
	split_utime($v["u_time"]);
	$sv[$sn[]="m_time"]=sprintf("%s-%s-%s %s:%s:%s",$sv["a1"],$sv["a2"],$sv["a3"],$sv["a4"],$sv["a5"],$sv["a6"]);
	$sv[$sn[]="u_time"]=$v["u_time"];
	$sv[$sn[]="a_time"]=$v["u_time"];

	$body=pg_escape_string($v["body"]);
	$videoad=$v["m2"]==171?0:2;
	if(strlen($v["img1"])>0){
		$sv[$sn[]="img1"]=$v["img1"];
		$img=$v["img1"];
	}else{
		if($encoded["flag"]==1){
			
			/*
				$imgpath : S3パス（https://video-jp.undotsushin.com/）
				
			*/
			
			$sv[$sn[]="img1"]=outimg(sprintf("%s/%s/%s/%s.jpg",$imgpath,$bucketName,$v["t1"],$v["t1"]));
		}
	}
	
	if($v["flag"]!=1&&$dbdata["flag"]==1)$sqls[]=sprintf("update repo_n set flag=0 where id=%s;",$dbdata["id"]);
	
	if(!isset($dbdata["id"])&&$v["uid"]==0){
		
		//devデータ未登録＆encode完了テーブルデータあり
		if($encoded["flag"]==1){
			$sv[$sn[]="flag"]=$v["flag"]==1?1:0;
			$sqls[]=sprintf("update u_encoded set flag=0,u_time=now() where id=%s;",$encoded["id"]);
			$announce=1;
		}else{
			$sv[$sn[]="flag"]=0;
		}
		
		$c=implode(",",$sn);
		while(list($kk,$vv)=each($sv)){
			$qq[]=sprintf("'%s'",bind($vv));
		}
		$sv[$sn[]="body"]=$v["body"];
		$sqls[]=sprintf("insert into repo_n(id,cid,n,d1,d2,%s) select nextval('repo_n_id_seq'),1,(select max(n)+1 from repo_n),3,%s,%s where not exists (select*from repo_n where swf='%s' and d2=%s and flag=1);",$c,$mediaid,implode(",",$qq),$v["t1"],$mediaid);
		$sqls[]=sprintf("insert into repo_body select nextval('repo_body_id_seq'),currval('repo_n_id_seq'),'%s';",$body,$v["t1"],$mediaid);
		$imgflag=1;
		
	}else{

		$id=$dbdata["id"];
		if($v["uid"]!=0)$id=$v["uid"];

		if(strtotime($v["u_time"])>strtotime($dbdata["u_time"])){
			
			while(list($kk,$vv)=each($sv)){
				if($dbdata[$kk]!=$vv)$qq[]=sprintf("%s='%s'",$kk,bind($vv));
			}
			
			if($v["flag"]!=1){
				$qq[]="flag=0";
				$qq[]="swf=''";
			}else{
				//devデータ登録あり＆encode完了テーブルデータあり
				if($encoded["flag"]==1){
					$announce=1;
					$sqls[]=sprintf("update u_encoded set flag=0,u_time=now() where id=%s;",$encoded["id"]);
					$qq[]="flag=1";
				}else if($dbdata["flag"]!=1){
					$qq[]="flag=1";
				}
			}

			if(count($qq)>0){
				$sqls[]=sprintf("update repo_n set %s where id=%s;",implode(",",$qq),$id);
			}
			if($v["body"]!=$dbdata["body"]){
				$sqls[]=sprintf("update repo_body set body='%s' where pid=%s;",$body,$id);
			}
			if($img!=$dbdata["img1"]){
				$imgflag=1;
			}
		}else{
		  //devデータ登録あり＋更新なし＆encode完了テーブルデータあり
		  if($v["flag"]==1&&$encoded["flag"]==1){
			$announce=1;
			if(strlen($img)==0)$img1=sprintf(",img1='%s'",outimg(sprintf("%s/%s/%s/%s.jpg",$imgpath,$bucketName,$v["t1"],$v["t1"])));
			$sqls[]=sprintf("update u_encoded set flag=0,u_time=now() where id=%s;",$encoded["id"]);
			$sqls[]=sprintf("update repo_n set flag=1%s where id=%s;",$img1,$id);
		  }
		}		
	}
	
	$sqls=implode("\n",$sqls);
	$o->query($sqls);
	$e=$o->affected_rows2();
	
	if($e){
		
		if(!isset($id)){
			$o->query("select currval('repo_n_id_seq') as id");
			$ff=$o->fetch_array();
			$id=$ff["id"];	
		}
		
		if($announce==1){
			file_get_contents(sprintf("%s/in_data.php?bucket=%s&uid=%s&id=%s",$MEDIADATA,$bucketName,$id,$k));
		}
		
		/*
		$file=sprintf("%s/api/ver1/static/ad/1-%s.dat",$SERVERPATH,$id);
		if($vs=get_contents($file)){
			$vs=unserialize($vs);
		}
		$vs["ad_videoflag"]=$videoad;
		file_put_contents($file,serialize($vs));
		s3upload($file,sprintf("static/ad/1-%s.dat",$id));
		*/
		
		if(strlen($img)>0&&$imgflag==1){
			$path=str_replace("api","prg_img",$MEDIADATA);
			file_put_contents(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$img),get_contents(sprintf("%s/raw/%s",$path,$img)));
			file_put_contents(sprintf("%s/prg_img/img/%s",$SERVERPATH,$img),get_contents(sprintf("%s/img/%s",$path,$img)));
			file_put_contents(sprintf("%s/prg_img/thumbnail1/%s",$SERVERPATH,$img),get_contents(sprintf("%s/thumbnail1/%s",$path,$img)));
			file_put_contents(sprintf("%s/prg_img/thumbnail2/%s",$SERVERPATH,$img),get_contents(sprintf("%s/thumbnail2/%s",$path,$img)));

			$s3i=new S3Module;
			$s3i->upload(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$img),"raw/".$img);
			$s3i->upload(sprintf("%s/prg_img/img/%s",$SERVERPATH,$img),"img/".$img);
			$s3i->upload(sprintf("%s/prg_img/thumbnail1/%s",$SERVERPATH,$img),"thumbnail1/".$img);
			$s3i->upload(sprintf("%s/prg_img/thumbnail2/%s",$SERVERPATH,$img),"thumbnail2/".$img);
		}
	}

	unset($qq,$sv,$sn,$sqls,$announce,$id,$e,$file);
}

?>