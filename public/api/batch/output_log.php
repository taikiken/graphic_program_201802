<?php

include $INCLUDEPATH."local.php";

$log="";

$fp=fopen($ACLOGTXT,"r");
while($l=fgets($fp,1024)){
	$log.=$l;
}
fclose($fp);

$fp=fopen($ACLOGTXT,"w");
fputs("");
fclose($fp);

echo $log;

?>