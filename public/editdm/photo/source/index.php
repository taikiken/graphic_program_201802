<?php


include $INCLUDEPATH."local.php";


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style type="text/css">
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
<title><?=$SITE?></title>
<meta http-equiv="Content-Style-Type" content="text/css" >
<meta http-equiv="Content-Script-Type" content="text/javascript" >
</head>

<body>
<pre>
<?php

include $INCLUDEPATH."public/OutputDataField.php";
$c=new OutputDataField($_GET["CATEGORYID"],$_GET["id"],$_GET["eid"]);
$c->htmlPageOutput();
echo htmlspecialchars($c->econtents);

?>
</pre>
</body>
</html>