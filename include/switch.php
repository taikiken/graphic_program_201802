<?php

$CURRENTPATH=$_SERVER["SCRIPT_FILENAME"];

if(strpos($CURRENTPATH,$ADPATH)){

	include $INCLUDEPATH."dbutl.php";
	include $INCLUDEPATH."pos.php";
	include $INCLUDEPATH."tool.php";

	$q=new ps($_SERVER["PHP_SELF"]);
	$g=new gm($_GET);

	if($SORC==1){
		//session_cache_limiter("nocache");
		//session_cache_expire(180);
		//session_start();
		while(list($k,$v)=each($_SESSION)){
			$_SESSION[$k]=$v;
		}
	}else{
		while(list($k,$v)=each($_COOKIE)){
			if($k!="repeatcount")setcookie($k,$v,time()+60*60*3,"/");
		}
	}

	$o=new db;
	$o->connect();
	//var_dump($_SESSION);
	if(!strpos($CURRENTPATH,$ADPATH."index.php")){
		if(strlen(getSorC("mid"))==0){
			header(sprintf("Location:%sindex.php",$ADPATH));
		}
	}

}else{
/*
	$ref=$_SERVER['HTTP_REFERER'];
	$uri=$_SERVER['REQUEST_URI'];
	$usa=$_SERVER['HTTP_USER_AGENT'];
	
	if(!preg_match("/(shared)/",$uri)){
	
		if(preg_match('/(Android.*Mobile|iPhone|iPod|Windows.*Phone|blackberry)/',$usa)){
			if(!preg_match("/^\/sp\//",$uri)){
				if(!preg_match("/(about)/",$uri)){
					header("Location:"."/sp".$uri);
				}
			}
		}else{
			if(preg_match("/^\/sp\//",$uri)){
				if(!preg_match("/(about)/",$uri)){
					header("Location:".preg_replace("/^\/sp/","",$uri));
				}
			}
		}
	
	}
*/

}

?>