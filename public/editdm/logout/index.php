<?php


include $INCLUDEPATH."local.php";

logIns("ログアウトしました",getSorC("usr"));

if($SORC==1){
	$_SESSION=array();
	session_destroy();
}

foreach($_COOKIE as $k=>$v){
	setcookie($k,"",time()-3600,"/editdm/");
	setcookie($k,"",time()-3600,"/");
}

header("Location:..");

?>