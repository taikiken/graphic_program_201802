<?php


include $INCLUDEPATH."local.php";

logIns("ログアウトしました",getSorC("usr"));
logIns(getSorC("mid"),getSorC("usr"));

if($SORC==1){
	$_SESSION=array();
	session_destroy();
}else{
	$cv=array("mid","alv","usr","repo","form","new","edit","delete","order","draft","categoryadmin","suadmin","formedit","download","formtemplate","master","environment","stylesheet","trackback","poll","updateping",'is_external');
	for($i=0;$i<count($cv);$i++){
		setcookie($cv[$i],"",time()-3600,"/");
	}
}

header("Location:..");

?>