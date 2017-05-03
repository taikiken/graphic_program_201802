<?php

$i=1;
$tu=array();

$sql=sprintf("select id,m_time,title from repo_n where d2=%s and title in('%s') order by m_time desc;",$MEDIAID,implode("','",$TITLE));
$o->query($sql);
while($f=$o->fetch_array()){
	$tu[]=sprintf('%s. <a href="%s/p/%s/">%s / %s</a>',$i++,$domain,$f["id"],$f["m_time"],$f["title"]);
}

?>
<!DOCTYPE html>
<html class="hanasekki-page-Frame" lang="ja">
<head>
  <meta charset="utf-8">
  <title><?=$MEDIANAME?>手動取り込み | SPORTS BULL</title>
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no,address=no,email=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="imagetoolbar" content="no">
  <style>
    body {
      margin: 3em 2em;
      font-size: 13px;
    }
    pre {
      margin: 0;
      font-size: 100%;
      line-height: 1.5;
    }
  </style>
</head>
<body>
<pre>
media  : <?=$MEDIANAME?>

date   : <?=date("Y-m-d H:i:s")?>

result : <?=$data?"success":"error"?>


---
<?php

if(count($tu)==0){
	echo "新規に取得された記事はありません。";
}else{
	echo implode("\n",$tu);
}

?>

---

<a href="<?=$_SERVER['PHP_SELF']?>">再取得</a> | <a href="javascript:window.close();">閉じる</a>
</pre>
</body>
</html>