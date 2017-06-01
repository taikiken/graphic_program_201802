<?php

include "local.php";
include "public/import.php";

$deg =isset($_GET["d"])?$_GET["d"]:0;
$date=date("Y-m-d",strtotime(sprintf('+ %s day',$deg)));

$FPATH="../ver1/static/gguide";

$f[]=sprintf("http://api-stg.bangumi.org/table/sportsbull?siType=3&areaId=1&broadCastDate=%s&endDate=%s&dateType=28&token=8fe4514acf2e725af6117a675ea55239debb26f1",date("Ymd",strtotime(sprintf('+ %s day',$deg))),date("Ymd",strtotime(sprintf('+ %s day',$deg+1))));
$f[]=sprintf("http://api-stg.bangumi.org/table/sportsbull?siType=1&broadCastDate=%s&endDate=%s&dateType=24&token=8fe4514acf2e725af6117a675ea55239debb26f1",date("Ymd",strtotime(sprintf('+ %s day',$deg))),date("Ymd",strtotime(sprintf('+ %s day',$deg+1))));

for($i=0;$i<count($f);$i++){
	
	$v=get_contents($f[$i]);
	$file=sprintf("%s/%s_%s.json",$FPATH,$i===0?"dg":"bs",$date);
	file_put_contents($file,$v);
}

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>無題ドキュメント</title>
<?php if($deg<7){ ?>
<meta http-equiv="refresh" content="5;URL=output_gguide.php?d=<?=++$deg?>">
<?php } ?>
</head>
<body>
</body>
</html>
