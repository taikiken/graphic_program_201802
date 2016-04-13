<?php

if(count($_POST)){

	$S=explode("/",$_SERVER['REQUEST_URI']);
	$ID=$S[count($S)-1];
	$s=array("url","blog_name","title","excerpt");
	$encoding=mb_detect_encoding($_POST[$s[3]]);

	for($i=0;$i<count($s);$i++){
		$v=stripslashes($_POST[$s[$i]]);
		if(strlen($v)>0){
			$v=trim($v);
			$v=strip_tags($v);
			$v=htmlspecialchars($v);
			if($encoding!="EUC"){
				$v=mb_convert_encoding($v,"UTF-8",$encoding);
			}
			$v=addslashes($v);
			$v=str_replace("\r\n","\n",$v);
			$v=str_replace("\r","\n",$v);
			$v="'".$v."'";
		}else{
			$v="NULL";
		}
		$sv[$sn[]=$s[$i]]=$v;
	}

	$sv[$sn[]="cid"]=$ID;
	$sv[$sn[]="flag"]=2;
	$sv[$sn[]="n"]=1;
	$sv[$sn[]="ip"]=sprintf("'%s'",getenv("REMOTE_ADDR"));
	$sv[$sn[]="u_time"]='now()';
	$sv[$sn[]="m_time"]='now()';

	$o=new db;
	$o->connect();
	
	$sql="update trackback set n=n+1";
	$o->query($sql);
	$sql=sprintf("select title from repo_n where id=%s",$ID);
	$o->query($sql);
	$f=$o->fetch_array();
	$sv[$sn[]="page"]=(strlen($f["title"])>0)?sprintf("'%s'",$f["title"]):"NULL";
	
	$sql="insert into trackback(".implode(",",$sn).") values(".implode(",",$sv).")";
	$o->query($sql);
	$e=$o->affected_rows();

}

?>