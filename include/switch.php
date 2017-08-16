<?php

$CURRENTPATH=$_SERVER["SCRIPT_FILENAME"];
if(strpos($CURRENTPATH,$ADPATH)){
	
	include $INCLUDEPATH."dbutl.php";
	include $INCLUDEPATH."pos.php";
	include $INCLUDEPATH."tool.php";
	include $INCLUDEPATH."input.php";
	include $INCLUDEPATH."param.php";

	$q=new ps($_SERVER["PHP_SELF"]);
	$g=new gm($_GET);

	if($SORC==1){
		while(list($k,$v)=each($_SESSION)){
			$_SESSION[$k]=$v;
		}
	}else{
		while(list($k,$v)=each($_COOKIE)){
			if($k!="repeatcount")setcookie($k,$v,time()+60*60*3,"/editdm/");
		}
	}

	$o=new db;
	$o->connect();
	
	if(!strpos($CURRENTPATH,$ADPATH."index.php")){
		if(strlen(getSorC("mid"))==0){
			header(sprintf("Location:%sindex.php",$ADPATH));
		}
	}

}else{
	header('Cache-Control: no-cache="set-cookie", no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
}

?>