<?php

include "local.php";

$o=new db;
$o->connect();

$sql="select cid,flag,f_type,d_name,f_name,f_size,f_option,f_comment,bill,f_option2,f_option3,f_option4,f_option5,f_option6 from editor where directory='nid' order by cid,n";
$o->query($sql);

$cid=0;
while($f=$o->fetch_array()){
	
	if($f["cid"]!=$cid){
		$DX[]=sprintf("%sif(\$QS==%s){\n",$cid!=0?"}else":"",$f["cid"]);
		$cid=$f["cid"];
	}
	$DX[]=sprintf("\t%s\$a[]=array(\"%s\");\n",$f["flag"]!=1?"//":"",implode("\",\"",array($f["f_type"],$f["d_name"],$f["f_name"],$f["f_size"],$f["f_option"],$f["f_comment"],$f["bill"],str_replace("\n","\\n",$f["f_option2"]),str_replace("\n","\\n",$f["f_option3"]),str_replace("\n","\\n",$f["f_option4"]),str_replace("\n","\\n",$f["f_option5"]),str_replace("\n","\\n",$f["f_option6"]))));
}
$DX[]="}\n";

echo implode("",$DX);

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>output</title>
</head>

<body>
</body>
</html>