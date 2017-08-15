<?php

if(strlen(getSorC("mid"))>0){
	header("Location:./index_s.php");
}

$err=0;

if(isset($_POST["p_usr"])){

	$usr=mod_HTML($_POST["p_usr"]);
	$pwd=mod_HTML($_POST["p_pwd"]);

	$sql="select id,usr,m,pwd,email,repo,permission,systems,is_external from authentic where usr='".addslashes($usr)."'";
	$o->query($sql);
	$f=$o->fetch_array();


	if($f['pwd']==md5($MAGIC_STRING.$pwd)){

		if($ADMINUSR==0){
			setcookie("adminusr",1,time()+60*60*24*365,"/");
		}else{
			setcookie("adminusr","",time()-3600,"/");
		}

		if($SORC==1){
			//session_cache_limiter("nocache");
			//session_cache_expire(180);
			sessionregister(array("mid","alv","usr","repo","form","new","edit","delete","order","draft","categoryadmin","suadmin","formedit","download","formtemplate","master","environment","stylesheet","trackback","poll","updateping"));
		}

		setSorC("mid",$f["id"]);
		setSorC("alv",($f["m"]));
		setSorC("usr",($f["usr"]));
		
		if($f["id"]==1){
			$permission=array("new","edit","delete","draft","order","categoryadmin","suadmin","formedit","download","formtemplate","master","environment","stylesheet","trackback","poll","updateping");
			for($i=0;$i<count($permission);$i++){
				setSorC($permission[$i],1);
			}
			$sql="select id from repo where rid=0";
			$o->query($sql);
			while($ff=$o->fetch_array()){
				$j[]=$ff["id"];
			}
			$j=@implode(",",$j);
			setSorC("repo",($j));
			
		}else{
			$permission=array("new","edit","delete","draft","order");
			if(strlen($f["permission"])>0){
				for($i=0;$i<count($permission);$i++){
					if(gettype(strpos($f["permission"],(string)($i+75)))!="boolean"){
						setSorC($permission[$i],1);
					}else{
						setSorC($permission[$i],0);
					}
				}
			}else{
				for($i=0;$i<count($permission);$i++){
					setSorC($permission[$i],0);
				}
			}
			$permission=array("categoryadmin","suadmin","formedit","download","formtemplate","master","environment","stylesheet","trackback","poll","updateping","is_external");
			if(strlen($f["systems"])>0){
				for($i=0;$i<count($permission);$i++){
					if(gettype(strpos($f["systems"],(string)($i+86)))!="boolean"){
						setSorC($permission[$i],1);
					}else{
						setSorC($permission[$i],0);
					}
				}
			}else{
				for($i=0;$i<count($permission);$i++){
					setSorC($permission[$i],0);
				}
			}
			if($f['usr'] == 'ut') {
			    setSorC('suadmin',1);
            }
            if($f['is_external'] > 0) {
                setSorC('is_external',1);
            }
			setSorC("repo",($f["repo"]));
		}

		$alv=addslashes($f["m"]);
		$usr=addslashes($usr);

		$sql=sprintf("insert into login(usr,m,ip,ltime) values('%s',%s,'%s',now())",$usr,$alv,getenv("REMOTE_ADDR"));
		$o->query($sql);

		logIns("ログインしました",getSorC("usr"));
		header(sprintf("Location:%s","index_s.php"));
		//include "index_s.php";
		//exit;

	}else{
		$err=1;
	}
}

?>